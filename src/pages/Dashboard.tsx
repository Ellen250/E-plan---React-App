import  { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTodo } from '../contexts/TodoContext';
import { useAuth } from '../contexts/AuthContext';
import { CheckSquare, Calendar, ArrowRight, CheckCheck } from 'lucide-react';
import TodoItem from '../components/TodoItem';

const Dashboard = () => {
  const { todos, agendaItems, isLoading } = useTodo();
  const { currentUser } = useAuth();
  
  // Stats for the dashboard
  const stats = useMemo(() => {
    const totalTasks = todos.length;
    const completedTasks = todos.filter(todo => todo.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const upcomingEvents = agendaItems.length;
    
    const completionRate = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100) 
      : 0;
    
    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      upcomingEvents,
      completionRate
    };
  }, [todos, agendaItems]);
  
  // Upcoming tasks (due in the next 3 days)
  const upcomingTasks = useMemo(() => {
    const now = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(now.getDate() + 3);
    
    return todos
      .filter(todo => {
        if (!todo.dueDate || todo.completed) return false;
        const dueDate = new Date(todo.dueDate);
        return dueDate >= now && dueDate <= threeDaysLater;
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 3);
  }, [todos]);
  
  // Upcoming events (in the next 7 days)
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() + 7);
    
    return agendaItems
      .filter(event => {
        if (!event.startDate) return false;
        const startDate = new Date(event.startDate);
        return startDate >= now && startDate <= sevenDaysLater;
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 3);
  }, [agendaItems]);
  
  // Format date for upcoming events
  const formatEventDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loader"></span>
      </div>
    );
  }
  
  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-heading mb-2">
          Welcome back, {currentUser?.displayName || 'there'}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your tasks and upcoming events.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card bg-gradient-to-br from-primary-50 to-blue-50 border-l-4 border-l-primary-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-700">Pending Tasks</p>
              <h3 className="text-2xl font-bold text-primary-900 mt-1">{stats.pendingTasks}</h3>
            </div>
            <div className="bg-white p-3 rounded-full shadow-sm">
              <CheckSquare className="h-6 w-6 text-primary-500" />
            </div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">Completed Tasks</p>
              <h3 className="text-2xl font-bold text-green-900 mt-1">{stats.completedTasks}</h3>
            </div>
            <div className="bg-white p-3 rounded-full shadow-sm">
              <CheckCheck className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-secondary-50 to-teal-50 border-l-4 border-l-secondary-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-700">Upcoming Events</p>
              <h3 className="text-2xl font-bold text-secondary-900 mt-1">{stats.upcomingEvents}</h3>
            </div>
            <div className="bg-white p-3 rounded-full shadow-sm">
              <Calendar className="h-6 w-6 text-secondary-500" />
            </div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-accent-50 to-amber-50 border-l-4 border-l-accent-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-accent-800">Completion Rate</p>
              <h3 className="text-2xl font-bold text-accent-900 mt-1">{stats.completionRate}%</h3>
            </div>
            <div className="bg-white p-3 rounded-full shadow-sm">
              <div className="h-6 w-6 rounded-full border-4 border-accent-500 flex items-center justify-center text-xs font-bold text-accent-700">
                {stats.completionRate}
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-white rounded-full h-2 mt-3">
            <div 
              className="bg-accent-500 h-2 rounded-full" 
              style={{ width: `${stats.completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Tasks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              <CheckSquare className="h-5 w-5 text-primary-500 inline mr-2" />
              Upcoming Tasks
            </h2>
            <Link to="/todos" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div>
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            ) : (
              <div className="card bg-gray-50 border border-dashed border-gray-200 p-6 text-center">
                <p className="text-gray-500">No upcoming tasks for the next 3 days</p>
                <Link to="/todos" className="btn btn-primary mt-3 inline-block">
                  Add New Task
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              <Calendar className="h-5 w-5 text-secondary-500 inline mr-2" />
              Upcoming Events
            </h2>
            <Link to="/agenda" className="text-sm text-secondary-600 hover:text-secondary-700 flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => (
                <div key={event.id} className="card mb-4 card-hover border-l-4 border-l-secondary-500">
                  <h3 className="font-medium text-gray-900 mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-secondary-500" />
                    {formatEventDate(event.startDate)}
                  </p>
                  {event.location && (
                    <p className="text-xs text-gray-500 mt-1">
                      Location: {event.location}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="card bg-gray-50 border border-dashed border-gray-200 p-6 text-center">
                <p className="text-gray-500">No upcoming events for the next 7 days</p>
                <Link to="/agenda" className="btn btn-secondary mt-3 inline-block">
                  Add New Event
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
 