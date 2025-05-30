import  { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import { TodoItem as TodoItemType } from '../types';
import { Check, Edit, Trash, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

interface TodoItemProps {
  todo: TodoItemType;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate,
    priority: todo.priority
  });
  
  const { updateTodo, deleteTodo } = useTodo();
  
  const handleToggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTodo(todo.id, editForm);
    setIsEditing(false);
  };
  
  // Format the due date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No due date';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Priority icon
  const PriorityIcon = ({ priority }: { priority: string }) => {
    if (priority === 'high') return <ArrowUp className="h-3 w-3" />;
    if (priority === 'low') return <ArrowDown className="h-3 w-3" />;
    return null;
  };
  
  if (isEditing) {
    return (
      <div className="card mb-4 border-l-4 border-l-primary-500">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title" className="form-label">Task Title</label>
            <input
              type="text"
              id="edit-title"
              name="title"
              value={editForm.title}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-description" className="form-label">Description</label>
            <textarea
              id="edit-description"
              name="description"
              value={editForm.description}
              onChange={handleChange}
              className="input min-h-[80px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="edit-dueDate" className="form-label">Due Date</label>
              <input
                type="date"
                id="edit-dueDate"
                name="dueDate"
                value={editForm.dueDate}
                onChange={handleChange}
                className="input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-priority" className="form-label">Priority</label>
              <select
                id="edit-priority"
                name="priority"
                value={editForm.priority}
                onChange={handleChange}
                className="input"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <button type="submit" className="btn btn-primary flex-1">
              Save Changes
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className="btn btn-secondary"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  return (
    <div className={`card mb-4 transition-all card-hover ${todo.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start">
        {/* Checkbox */}
        <div className="mr-3 mt-1">
          <button 
            onClick={handleToggleComplete}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              todo.completed 
                ? 'bg-primary-500 border-primary-500 text-white' 
                : 'border-gray-300 text-transparent hover:border-primary-400'
            }`}
          >
            {todo.completed && <Check className="h-4 w-4" />}
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center mb-1">
            <h3 className={`text-lg font-medium mr-2 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {todo.title}
            </h3>
            
            {/* Priority badge */}
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(todo.priority)}`}>
              <PriorityIcon priority={todo.priority} />
              <span className="ml-1">
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
            </span>
          </div>
          
          {todo.description && (
            <p className={`text-sm mb-3 ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {todo.description}
            </p>
          )}
          
          {/* Due date */}
          {todo.dueDate && (
            <div className="flex items-center text-xs text-gray-500 mt-2">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(todo.dueDate)}
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-gray-400 hover:text-primary-600 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Edit task"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Delete task"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
 