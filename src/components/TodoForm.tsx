import  { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import { Calendar, CheckSquare, Clock, MessageSquare } from 'lucide-react';

const initialFormState = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium' as 'low' | 'medium' | 'high'
};

const TodoForm = () => {
  const [form, setForm] = useState(initialFormState);
  const { title, description, dueDate, priority } = form;
  
  const { addTodo } = useTodo();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    try {
      await addTodo({
        title,
        description,
        dueDate,
        priority,
        completed: false
      });
      
      setForm(initialFormState);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  
  return (
    <div className="card bg-white shadow-md rounded-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-primary-700 mb-4">Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            <CheckSquare className="h-4 w-4 text-primary-600 inline mr-1" />
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className="input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            <MessageSquare className="h-4 w-4 text-primary-600 inline mr-1" />
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Add details about this task"
            className="input min-h-[80px]"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="dueDate" className="form-label">
              <Calendar className="h-4 w-4 text-primary-600 inline mr-1" />
              Due Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={dueDate}
                onChange={handleChange}
                className="input pl-10"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              <Clock className="h-4 w-4 text-primary-600 inline mr-1" />
              Priority
            </label>
            <div className="relative">
              <select
                id="priority"
                name="priority"
                value={priority}
                onChange={handleChange}
                className="input"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
 