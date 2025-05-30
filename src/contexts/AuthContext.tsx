import  React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile, 
  User as FirebaseUser
} from 'firebase/auth';
import { User } from '../types';
import { checkIsAdmin, verifyAdminCode } from '../firebase';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  signUp: (email: string, password: string, name: string, adminCode?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userObj: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        };
        
        // Check if the user is an admin
        try {
          const adminStatus = await checkIsAdmin(user.uid);
          setIsAdmin(adminStatus);
          userObj.isAdmin = adminStatus;
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
        
        setCurrentUser(userObj);
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  // Sign up function
  const signUp = async (email: string, password: string, name: string, adminCode?: string) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile with the name
      await updateProfile(user, {
        displayName: name
      });
      
      // If an admin code was provided, check if it's valid
      if (adminCode) {
        try {
          const isValidAdminCode = await verifyAdminCode(user.uid, adminCode);
          if (isValidAdminCode) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error("Error setting admin status:", error);
        }
      }
      
      return;
    } catch (error: any) {
      console.error("Registration error:", error.code, error.message);
      setError(error.message);
      throw error;
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Login error:", error.code, error.message);
      setError(error.message);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (error: any) {
      console.error("Logout error:", error.message);
      setError(error.message);
      throw error;
    }
  };

  const value = {
    currentUser,
    isAdmin,
    isLoading,
    error,
    signUp,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
 