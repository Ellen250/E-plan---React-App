import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import { TodoItem, AgendaItem } from '../types';

interface TodoContextType {
  todos: TodoItem[];
  agendaItems: AgendaItem[];
  isLoading: boolean;
  error: string | null;
  addTodo: (todo: Omit<TodoItem, 'id' | 'createdAt' | 'userId'>) => Promise<string>;
  updateTodo: (id: string, todo: Partial<TodoItem>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  addAgendaItem: (item: Omit<AgendaItem, 'id' | 'createdAt' | 'userId'>) => Promise<string>;
  updateAgendaItem: (id: string, item: Partial<AgendaItem>) => Promise<void>;
  deleteAgendaItem: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}

interface TodoProviderProps {
  children: ReactNode;
}

//  Helper function to safely convert Firestore timestamp or string to Date
const convertTimestamp = (timestamp: any): Date | undefined => {
  if (!timestamp) return undefined;
  try {
    // For Firestore Timestamp objects
    if (timestamp && typeof timestamp.toDate === 'function') {
      return timestamp.toDate();
    }
    // For timestamp stored as seconds & nanoseconds
    else if (timestamp.seconds !== undefined && timestamp.nanoseconds !== undefined) {
      return new Date(timestamp.seconds * 1000);
    }
    // For ISO string or any other date format
    else if (timestamp instanceof Date) {
      return timestamp;
    }
    else if (typeof timestamp === 'string') {
      return new Date(timestamp);
    }
    else if (typeof timestamp === 'number') {
      return new Date(timestamp);
    }
    return undefined;
  } catch (error) {
    console.error("Error converting timestamp:", error);
    return undefined;
  }
};
 

//  Helper function to safely parse document data
const parseTodoData = (doc: DocumentData): TodoItem => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title || '',
    description: data.description || '',
    completed: !!data.completed,
    priority: data.priority || 'medium',
    dueDate: data.dueDate ? convertTimestamp(data.dueDate) : undefined,
    createdAt: data.createdAt ? convertTimestamp(data.createdAt) : new Date(),
    userId: data.userId || '',
    tags: data.tags || []
  };
};
 

const  parseAgendaData = (doc: DocumentData): AgendaItem => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title || '',
    content: data.content || '',
    date: data.date ? convertTimestamp(data.date) : new Date(),
    mood: data.mood || 'neutral',
    isPrivate: !!data.isPrivate,
    createdAt: data.createdAt ? convertTimestamp(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : undefined,
    userId: data.userId || '',
    audioUrl: data.audioUrl || '',
    tags: data.tags || []
  };
};
 

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    if (!currentUser) {
      setTodos([]);
      setAgendaItems([]);
      setIsLoading(false);
      setError(null);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    let unsubscribeTodos: () => void = () => {};
    let unsubscribeAgenda: () => void = () => {};
    
    try {
      // Subscribe to todos collection
      // Using only where clause to avoid composite index requirement
      const todosQuery = query(
        collection(db, 'todos'),
        where('userId', '==', currentUser.uid)
      );
      
      unsubscribeTodos = onSnapshot(
        todosQuery, 
        (snapshot) => {
          try {
            // Sort the data client-side instead of using orderBy
            const todosList = snapshot.docs.map(parseTodoData)
              .sort((a, b) => {
                let dateA: Date, dateB: Date;
                try {
                  dateA = a.createdAt instanceof Date ? a.createdAt : new Date(String(a.createdAt));
                } catch (e) {
                  dateA = new Date(0); // fallback to epoch
                }
                try {
                  dateB = b.createdAt instanceof Date ? b.createdAt : new Date(String(b.createdAt));  
                } catch (e) {
                  dateB = new Date(0); // fallback to epoch
                }
                return dateB.getTime() - dateA.getTime(); // descending order
              });
            setTodos(todosList);
            setError(null);
          } catch (err) {
            console.error("Error processing todos snapshot:", err);
            setError("Failed to load tasks data.");
          }
        },
        (err) => {
          console.error("Todos snapshot error:", err);
          setError("Failed to connect to the tasks database.");
        }
      );
      
      // Subscribe to agenda items collection
      // Using only where clause to avoid composite index requirement
      const agendaQuery = query(
        collection(db, 'agendaItems'),
        where('userId', '==', currentUser.uid)
      );
      
      unsubscribeAgenda = onSnapshot(
        agendaQuery, 
        (snapshot) => {
          try {
            // Sort the data client-side instead of using orderBy
            const agendaList = snapshot.docs.map(parseAgendaData)
              .sort((a, b) => {
                let dateA: Date, dateB: Date;
                try {
                  dateA = a.createdAt instanceof Date ? a.createdAt : new Date(String(a.createdAt));
                } catch (e) {
                  dateA = new Date(0); // fallback to epoch
                }
                try {
                  dateB = b.createdAt instanceof Date ? b.createdAt : new Date(String(b.createdAt));  
                } catch (e) {
                  dateB = new Date(0); // fallback to epoch
                }
                return dateB.getTime() - dateA.getTime(); // descending order
              });
            setAgendaItems(agendaList);
            setError(null);
          } catch (err) {
            console.error("Error processing agenda snapshot:", err);
            setError("Failed to load agenda data.");
          }
        },
        (err) => {
          console.error("Agenda snapshot error:", err);
          setError("Failed to connect to the agenda database.");
        }
      );
    } catch (err) {
      console.error("Error setting up Firebase listeners:", err);
      setError("Failed to connect to the database.");
    } finally {
      setIsLoading(false);
    }
    
    return () => {
      try {
        unsubscribeTodos();
        unsubscribeAgenda();
      } catch (err) {
        console.error("Error unsubscribing from Firebase:", err);
      }
    };
  }, [currentUser]);
  
  // Todo CRUD operations with error handling
  const addTodo = async (todo: Omit<TodoItem, 'id' | 'createdAt' | 'userId'>): Promise<string> => {
    if (!currentUser) throw new Error('User not authenticated');
    
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        ...todo,
        completed: todo.completed || false,
        userId: currentUser.uid,
        createdAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Failed to add task.");
      throw err;
    }
  };
  
  const updateTodo = async (id: string, todo: Partial<TodoItem>): Promise<void> => {
    try {
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, todo);
      setError(null);
    } catch (err) {
      console.error("Error updating todo:", err);
      setError("Failed to update task.");
      throw err;
    }
  };
  
  const deleteTodo = async (id: string): Promise<void> => {
    try {
      const todoRef = doc(db, 'todos', id);
      await deleteDoc(todoRef);
      setError(null);
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("Failed to delete task.");
      throw err;
    }
  };
  
  // Agenda CRUD operations with error handling
  const addAgendaItem = async (item: Omit<AgendaItem, 'id' | 'createdAt' | 'userId'>): Promise<string> => {
    if (!currentUser) throw new Error('User not authenticated');
    
    try {
      const docRef = await addDoc(collection(db, 'agendaItems'), {
        ...item,
        userId: currentUser.uid,
        createdAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (err) {
      console.error("Error adding agenda item:", err);
      setError("Failed to add agenda entry.");
      throw err;
    }
  };
  
  const updateAgendaItem = async (id: string, item: Partial<AgendaItem>): Promise<void> => {
    try {
      const itemRef = doc(db, 'agendaItems', id);
      await updateDoc(itemRef, item);
      setError(null);
    } catch (err) {
      console.error("Error updating agenda item:", err);
      setError("Failed to update agenda entry.");
      throw err;
    }
  };
  
  const deleteAgendaItem = async (id: string): Promise<void> => {
    try {
      const itemRef = doc(db, 'agendaItems', id);
      await deleteDoc(itemRef);
      setError(null);
    } catch (err) {
      console.error("Error deleting agenda item:", err);
      setError("Failed to delete agenda entry.");
      throw err;
    }
  };
  
  const value = {
    todos,
    agendaItems,
    isLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    addAgendaItem,
    updateAgendaItem,
    deleteAgendaItem
  };
  
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
 