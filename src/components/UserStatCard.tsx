import  { CheckSquare, Clock } from 'lucide-react';
import { UserStats } from '../types';
import { useTranslation } from 'react-i18next';

interface UserStatCardProps {
  user: UserStats;
}

const UserStatCard = ({ user }: UserStatCardProps) => {
  const { t } = useTranslation();
  
  // Format last active date
  const formatLastActive = (date: Date) => {
    if (!date) return t('admin.never');
    
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };
  
  // Calculate completion rate
  const completionRate = user.todoCount > 0 
    ? Math.round((user.completedCount / user.todoCount) * 100) 
    : 0;
  
  return (
    <div className="card card-hover">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
          <span className="text-primary-700 font-semibold">
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || '?'}
          </span>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">
            {user.displayName || t('admin.anonymousUser')}
          </h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="border border-gray-100 rounded-md p-3 bg-gray-50">
          <div className="flex items-center text-gray-700 mb-1">
            <CheckSquare className="h-4 w-4 mr-1 text-primary-500" />
            <span>{t('todos.title')}</span>
          </div>
          <div className="text-2xl font-semibold text-primary-700">
            {user.todoCount}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {user.completedCount} {t('todos.completed').toLowerCase()}
          </div>
        </div>
        
        <div className="border border-gray-100 rounded-md p-3 bg-gray-50">
          <div className="flex items-center text-gray-700 mb-1">
            <CheckSquare className="h-4 w-4 mr-1 text-secondary-500" />
            <span>{t('admin.completion')}</span>
          </div>
          <div className="text-2xl font-semibold text-secondary-600">
            {completionRate}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-secondary-500 h-2 rounded-full" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center">
        <Clock className="h-3 w-3 mr-1" />
        {t('admin.lastActive')}: {formatLastActive(user.lastActive)}
      </div>
    </div>
  );
};

export default UserStatCard;
 