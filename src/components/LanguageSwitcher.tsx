import  { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const { currentLanguage, languages, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get current language display info
  const currentLangInfo = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline-block ml-1">{currentLangInfo?.name || 'Language'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900">
              {t('common.selectLanguage')}
            </p>
          </div>
          <div className="py-1">
            {languages.map(language => (
              <button
                key={language.code}
                onClick={() => {
                  changeLanguage(language.code);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between w-full text-left px-4 py-2 text-sm ${
                  currentLanguage === language.code 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2 w-6 h-4 overflow-hidden rounded flex-shrink-0">
                    <img
                      src={language.flag}
                      alt={`${language.name} flag`}
                      className="object-cover w-full h-full"
                    />
                  </span>
                  <span>{language.name}</span>
                </div>
                <span className="text-xs text-gray-500">{language.localName}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
 