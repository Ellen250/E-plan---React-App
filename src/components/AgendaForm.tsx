import  { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import { Book, Calendar, MessageSquare, Smile } from 'lucide-react';

const initialFormState = {
  title: '',
  content: '',
  mood: '',
  date: new Date().toISOString().split('T')[0],
  isPrivate: false
};

const AgendaForm = () => {
  const [form, setForm] = useState(initialFormState);
  const { title, content, mood, date, isPrivate } = form;
  
  const { addAgendaItem } = useTodo();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !date) return;
    
    try {
      await addAgendaItem({
        title,
        content,
        mood,
        date,
        isPrivate
      });
      
      setForm({
        ...initialFormState,
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error adding journal entry:', error);
    }
  };
  
  return (
    <div className="card bg-white shadow-md rounded-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-primary-700 mb-4">New Journal Entry</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            <Book className="h-4 w-4 text-primary-600 inline mr-1" />
            Entry Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Title your journal entry"
            className="input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            <MessageSquare className="h-4 w-4 text-primary-600 inline mr-1" />
            Journal Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleChange}
            placeholder="Write your thoughts, feelings, and experiences..."
            className="input min-h-[160px]"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              <Calendar className="h-4 w-4 text-primary-600 inline mr-1" />
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="mood" className="form-label">
              <Smile className="h-4 w-4 text-primary-600 inline mr-1" />
              Mood
            </label>
            <select
              id="mood"
              name="mood"
              value={mood}
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
              id="isPrivate"
              name="isPrivate"
              checked={isPrivate}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="isPrivate" className="ml-2 text-sm text-gray-700">
              Mark as private (only visible to you)
            </label>
          </div>
        </div>
        
        <div className="mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Save Journal Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgendaForm;
 