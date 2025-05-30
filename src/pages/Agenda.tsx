import  { useState, useEffect, useMemo } from 'react';
import { useTodo } from '../contexts/TodoContext';
import AgendaItem from '../components/AgendaItem';
import AgendaForm from '../components/AgendaForm';
import { Filter, Plus, Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DataLoadingError from '../components/DataLoadingError';

const Agenda = () => {
  const { agendaItems, isLoading, error } = useTodo();
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMood, setFilterMood] = useState<'all' | 'happy' | 'neutral' | 'sad'>('all');
  const { t } = useTranslation();
  
  // Filter agenda items based on search and mood filter
  const filteredItems = useMemo(() => {
    return agendaItems.filter(item => {
      // Search filter
      const matchesSearch = 
        searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Mood filter
      const matchesMood = 
        filterMood === 'all' || 
        item.mood === filterMood;
      
      return matchesSearch && matchesMood;
    });
  }, [agendaItems, searchQuery, filterMood]);
  
  const resetFilters = () => {
    setSearchQuery('');
    setFilterMood('all');
  };
  
  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold gradient-heading mb-2">
            {t('agenda.title')}
          </h1>
          <p className="text-gray-600">
            {filteredItems.length} {filteredItems.length === 1 ? t('agenda.entry') : t('agenda.entries')}
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-accent mt-4 md:mt-0 flex items-center justify-center"
        >
          {showForm ? (
            <>
              <X className="h-4 w-4 mr-2" />
              {t('common.cancel')}
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              {t('agenda.addNew')}
            </>
          )}
        </button>
      </div>
      
      {error && <DataLoadingError message={error} onRetry={() => window.location.reload()} />}
      
      {showForm && <AgendaForm onClose={() => setShowForm(false)} />}
      
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-2/3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('agenda.searchPlaceholder')}
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
          
          <div className="relative w-full sm:w-1/3">
            <select
              value={filterMood}
              onChange={(e) => setFilterMood(e.target.value as any)}
              className="input pr-10 appearance-none"
            >
              <option value="all">{t('agenda.moodAll')}</option>
              <option value="happy">{t('agenda.happy')}</option>
              <option value="neutral">{t('agenda.neutral')}</option>
              <option value="sad">{t('agenda.sad')}</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        {(searchQuery || filterMood !== 'all') && (
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-500 mr-2">
              {filteredItems.length} {t('agenda.resultsFound')}
            </span>
            <button
              onClick={resetFilters}
              className="text-xs text-primary-600 hover:text-primary-800"
            >
              {t('agenda.clearFilters')}
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
          {filteredItems.length > 0 ? (
            filteredItems.map(agenda => (
              <AgendaItem key={agenda.id} agenda={agenda} />
            ))
          ) : (
            <div className="card p-8 text-center">
              <div className="text-gray-400 mb-2 text-5xl">📓</div>
              <h3 className="text-xl font-medium text-gray-900 mb-1">{t('agenda.noEntries')}</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || filterMood !== 'all'
                  ? t('agenda.noEntriesMatchingFilters')
                  : t('agenda.noEntriesAddOne')}
              </p>
              {!showForm && (searchQuery === '' && filterMood === 'all') && (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn btn-accent"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('agenda.addNew')}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Agenda;
 