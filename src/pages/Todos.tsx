import  { useState, useEffect, useMemo } from 'react';
import { useTodo } from '../contexts/TodoContext';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';
import { Filter, Plus, Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DataLoadingError from '../components/DataLoadingError';

const Todos = () => {
  const { todos, isLoading, error } = useTodo();
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const { t } = useTranslation();
  
  // Filter todos based on search and filters
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      // Search filter
      const matchesSearch = 
        searchQuery === '' || 
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Status filter
      const matchesStatus = 
        filterStatus === 'all' || 
        (filterStatus === 'completed' && todo.completed) || 
        (filterStatus === 'pending' && !todo.completed);
      
      // Priority filter
      const matchesPriority = 
        filterPriority === 'all' || 
        todo.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [todos, searchQuery, filterStatus, filterPriority]);
  
  const resetFilters = () => {
    setSearchQuery('');
    setFilterStatus('all');
    setFilterPriority('all');
  };
  
  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold gradient-heading mb-2">
            {t('todos.title')}
          </h1>
          <p className="text-gray-600">
            {filteredTodos.length} {filteredTodos.length === 1 ? t('todos.task') : t('todos.tasks')}
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary mt-4 md:mt-0 flex items-center justify-center"
        >
          {showForm ? (
            <>
              <X className="h-4 w-4 mr-2" />
              {t('common.cancel')}
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              {t('todos.addNew')}
            </>
          )}
        </button>
      </div>
      
      {error && <DataLoadingError message={error} onRetry={() => window.location.reload()} />}
      
      {showForm && <TodoForm onClose={() => setShowForm(false)} />}
      
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-1/2 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('todos.searchPlaceholder')}
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
          
          <div className="flex space-x-3">
            <div className="relative w-full sm:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="input pr-10 appearance-none"
              >
                <option value="all">{t('todos.statusAll')}</option>
                <option value="completed">{t('todos.completed')}</option>
                <option value="pending">{t('todos.incomplete')}</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="relative w-full sm:w-auto">
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as any)}
                className="input pr-10 appearance-none"
              >
                <option value="all">{t('todos.priorityAll')}</option>
                <option value="high">{t('todos.high')}</option>
                <option value="medium">{t('todos.medium')}</option>
                <option value="low">{t('todos.low')}</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        {(searchQuery || filterStatus !== 'all' || filterPriority !== 'all') && (
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-500 mr-2">
              {filteredTodos.length} {t('todos.resultsFound')}
            </span>
            <button
              onClick={resetFilters}
              className="text-xs text-primary-600 hover:text-primary-800"
            >
              {t('todos.clearFilters')}
            </button>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTodos.length > 0 ? (
            filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          ) : (
            <div className="card p-8 text-center">
              <div className="text-gray-400 mb-2 text-5xl">📝</div>
              <h3 className="text-xl font-medium text-gray-900 mb-1">{t('todos.noTasks')}</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || filterStatus !== 'all' || filterPriority !== 'all'
                  ? t('todos.noTasksMatchingFilters')
                  : t('todos.noTasksAddOne')}
              </p>
              {!showForm && (searchQuery === '' && filterStatus === 'all' && filterPriority === 'all') && (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn btn-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('todos.addNew')}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Todos;
 