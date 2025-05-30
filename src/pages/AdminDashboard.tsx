import   { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase';
import { UserStats } from '../types';
import UserStatCard from '../components/UserStatCard';
import { Users, Search, X, Filter, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'lastActive' | 'todoCount'>('lastActive');
  const { t } = useTranslation();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        
        const userTodosMap = new Map<string, { todoCount: number; completedCount: number }>();
        
        // Get all todos to count by user
        const todosQuery = query(collection(db, 'todos'));
        const todosSnapshot = await getDocs(todosQuery);
        
        todosSnapshot.forEach(doc => {
          const todoData = doc.data();
          const userId = todoData.userId;
          
          if (userId) {
            const currentStats = userTodosMap.get(userId) || { todoCount: 0, completedCount: 0 };
            
            currentStats.todoCount += 1;
            if (todoData.completed) {
              currentStats.completedCount += 1;
            }
            
            userTodosMap.set(userId, currentStats);
          }
        });
        
        // Get users
        const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
        const usersSnapshot = await getDocs(usersQuery);
        
        const userData: UserStats[] = usersSnapshot.docs.map(doc => {
          const user = doc.data();
          const userStats = userTodosMap.get(doc.id) || { todoCount: 0, completedCount: 0 };
          
          return {
            id: doc.id,
            email: user.email || null,
            displayName: user.displayName || null,
            todoCount: userStats.todoCount,
            completedCount: userStats.completedCount,
            lastActive: user.lastActive?.toDate() || user.createdAt?.toDate() || new Date()
          };
        });
        
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  // Filter and sort users
  const filteredUsers = useMemo(() => {
    return users
      .filter(user => {
        if (searchQuery.trim() === '') return true;
        
        const query = searchQuery.toLowerCase();
        return (
          (user.email && user.email.toLowerCase().includes(query)) ||
          (user.displayName && user.displayName.toLowerCase().includes(query))
        );
      })
      .sort((a, b) => {
        if (sortBy === 'lastActive') {
          return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
        } else {
          return b.todoCount - a.todoCount;
        }
      });
  }, [users, searchQuery, sortBy]);
  
  // Calculate total stats
  const totalStats = useMemo(() => {
    return users.reduce(
      (acc, user) => {
        acc.totalUsers += 1;
        acc.totalTasks += user.todoCount;
        acc.completedTasks += user.completedCount;
        return acc;
      },
      { totalUsers: 0, totalTasks: 0, completedTasks: 0 }
    );
  }, [users]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loader"></span>
      </div>
    );
  }
  
  const exportUserStats = () => {
    const csvContent = [
      ['User ID', 'Email', 'Name', 'Task Count', 'Completed Tasks', 'Completion Rate', 'Last Active'],
      ...filteredUsers.map(user => [
        user.id,
        user.email || 'N/A',
        user.displayName || 'N/A',
        user.todoCount.toString(),
        user.completedCount.toString(),
        user.todoCount > 0 ? `${Math.round((user.completedCount / user.todoCount) * 100)}%` : '0%',
        new Date(user.lastActive).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'user_stats.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-heading mb-2">
          {t('admin.dashboard')}
        </h1>
        <p className="text-gray-600">
          {t('admin.userManagement')}
        </p>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card bg-primary-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-700">{t('admin.totalUsers')}</p>
              <h3 className="text-2xl font-bold text-primary-900 mt-1">{totalStats.totalUsers}</h3>
            </div>
            <div className="bg-white p-3 rounded-full shadow-sm">
              <Users className="h-6 w-6 text-primary-500" />
            </div>
          </div>
        </div>
        
        <div className="card bg-secondary-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-700">{t('admin.totalTasks')}</p>
              <h3 className="text-2xl font-bold text-secondary-900 mt-1">{totalStats.totalTasks}</h3>
            </div>
            <div className="bg-white p-3 rounded-full shadow-sm">
              <span className="h-6 w-6 flex items-center justify-center font-bold text-secondary-600">T</span>
            </div>
          </div>
        </div>
        
        <div className="card bg-accent-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-accent-800">{t('admin.completionRate')}</p>
              <h3 className="text-2xl font-bold text-accent-900 mt-1">
                {totalStats.totalTasks > 0 
                  ? Math.round((totalStats.completedTasks / totalStats.totalTasks) * 100) 
                  : 0}%
              </h3>
            </div>
            <div className="bg-white p-3 rounded-full shadow-sm">
              <span className="h-6 w-6 flex items-center justify-center font-bold text-accent-600">%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* User Stats */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Users className="h-5 w-5 text-primary-600 mr-2" />
            {t('admin.userStats')}
          </h2>
          
          <button 
            onClick={exportUserStats}
            className="btn btn-secondary inline-flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            {t('admin.exportData')}
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-center mb-6">
          <div className="w-full sm:w-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('admin.searchUsers')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 pr-10"
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              </button>
            )}
          </div>
          
          <div className="relative w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'lastActive' | 'todoCount')}
              className="input pr-10 appearance-none"
            >
              <option value="lastActive">{t('admin.lastActive')}</option>
              <option value="todoCount">{t('todos.title')}</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* User cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <UserStatCard key={user.id} user={user} />
            ))
          ) : (
            <div className="col-span-3 p-8 text-center border border-dashed border-gray-200 rounded-lg">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">{t('admin.noUsers')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
 