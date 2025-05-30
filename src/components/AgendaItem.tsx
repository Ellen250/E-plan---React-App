import  { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import { AgendaItem as AgendaItemType } from '../types';
import { Edit, Trash, Calendar, BookOpen, Lock, Smile, Frown } from 'lucide-react';

interface AgendaItemProps {
  agenda: AgendaItemType;
}

const AgendaItem = ({ agenda }: AgendaItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: agenda.title,
    content: agenda.content,
    mood: agenda.mood,
    date: agenda.date,
    isPrivate: agenda.isPrivate
  });
  
  const { updateAgendaItem, deleteAgendaItem } = useTodo();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditForm(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAgendaItem(agenda.id, editForm);
    setIsEditing(false);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Get mood icon
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy':
        return <Smile className="h-4 w-4 text-green-500" />;
      case 'sad':
        return <Frown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  if (isEditing) {
    return (
      <div className="card mb-4 border-l-4 border-l-primary-500">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title" className="form-label">Entry Title</label>
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
            <label htmlFor="edit-content" className="form-label">Journal Content</label>
            <textarea
              id="edit-content"
              name="content"
              value={editForm.content}
              onChange={handleChange}
              className="input min-h-[160px]"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="edit-date" className="form-label">Date</label>
              <input
                type="date"
                id="edit-date"
                name="date"
                value={editForm.date}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-mood" className="form-label">Mood</label>
              <select
                id="edit-mood"
                name="mood"
                value={editForm.mood}
                onChange={handleChange}
                className="input"
              >
                <option value="">Choose a mood</option>
                <option value="happy">Happy</option>
                <option value="neutral">Neutral</option>
                <option value="sad">Sad</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="edit-isPrivate"
                name="isPrivate"
                checked={editForm.isPrivate}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="edit-isPrivate" className="ml-2 text-sm text-gray-700">
                Mark as private
              </label>
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
    <div className="card mb-4 card-hover border-l-4 border-l-primary-500">
      <div className="flex items-start">
        {/* Journal icon */}
        <div className="mr-4 mt-1">
          <div className="bg-primary-100 text-primary-700 h-10 w-10 rounded-full flex items-center justify-center">
            <BookOpen className="h-5 w-5" />
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <h3 className="text-lg font-medium text-gray-900">
              {agenda.title}
            </h3>
            {agenda.isPrivate && (
              <Lock className="h-4 w-4 ml-2 text-gray-400" />
            )}
            {getMoodIcon(agenda.mood)}
          </div>
          
          <p className="text-sm text-gray-500 mb-2">
            <Calendar className="h-4 w-4 inline mr-1 text-primary-500" />
            {formatDate(agenda.date)}
          </p>
          
          <div className="prose prose-sm text-gray-700 max-w-none break-words whitespace-pre-wrap">
            {agenda.content}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-gray-400 hover:text-primary-600 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Edit entry"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => deleteAgendaItem(agenda.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Delete entry"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgendaItem;
 