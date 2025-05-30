import  React, { createContext, useContext, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Language, LanguageInfo } from '../types';
import { isRTLLanguage } from '../utils/rtlUtils';

interface LanguageContextType {
  currentLanguage: Language;
  isCurrentLangRTL: boolean;
  languages: LanguageInfo[];
  changeLanguage: (language: Language) => void;
  t: (key: string, options?: any) => string;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isCurrentLangRTL, setIsCurrentLangRTL] = useState(false);

  const languages: LanguageInfo[] = [
    { 
      code: 'en', 
      name: 'English', 
      localName: 'English',
      flag: '🇺🇸' 
    },
    { 
      code: 'fr', 
      name: 'French', 
      localName: 'Français',
      flag: '🇫🇷' 
    },
    { 
      code: 'rw', 
      name: 'Kinyarwanda', 
      localName: 'Kinyarwanda',
      flag: '🇷🇼' 
    },
    { 
      code: 'ar', 
      name: 'Arabic', 
      localName: 'العربية',
      flag: '🇸🇦' 
    }
  ];

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    setIsCurrentLangRTL(isRTLLanguage(language));
    
    // Update document direction
    document.documentElement.dir = isRTLLanguage(language) ? 'rtl' : 'ltr';
  };

  const value = {
    currentLanguage,
    isCurrentLangRTL,
    languages,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
 