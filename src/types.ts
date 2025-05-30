//  User types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  isAdmin?: boolean;
}

// Todo item types
export interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  userId: string;
  tags?: string[];
}

// Agenda item types
export interface AgendaItem {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood: 'happy' | 'neutral' | 'sad' | string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt?: Date;
  userId: string;
  audioUrl?: string;
  tags?: string[];
}

// User statistics
export interface UserStats {
  id: string;
  displayName: string;
  email: string;
  registrationDate: Date;
  todoCount: number;
  agendaCount: number;
  lastActive?: Date;
}

// Language types
export type Language = 'en' | 'fr' | 'rw' | 'ar';

export interface LanguageInfo {
  code: Language;
  name: string;
  localName: string;
  flag: string;
}

// Translation namespace types
export interface Translations {
  common: {
    appName: string;
    loading: string;
    error: string;
    retry: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    selectLanguage: string;
    search: string;
    logout: string;
    login: string;
    register: string;
    [key: string]: string;
  };
  
  auth: {
    login: string;
    register: string;
    email: string;
    password: string;
    [key: string]: string;
  };
  
  todos: {
    title: string;
    addTodo: string;
    [key: string]: string;
  };
  
  agenda: {
    title: string;
    addEntry: string;
    [key: string]: string;
  };
  
  admin: {
    dashboard: string;
    users: string;
    [key: string]: string;
  };
  
  [key: string]: { [key: string]: string };
}
 