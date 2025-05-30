import  { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs,
  setDoc,
  doc,
  enableIndexedDbPersistence
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8OIOu7ehIcJ-jE_sMdHlzRoO1fLkTHnU",
  authDomain: "e-plan-c8bc0.firebaseapp.com",
  projectId: "e-plan-c8bc0",
  storageBucket: "e-plan-c8bc0.firebasestorage.app",
  messagingSenderId: "243382999480",
  appId: "1:243382999480:web:b5af35ccf7a7bb5cbc574d",
  measurementId: "G-7GWBSGSJYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Enable offline persistence where available
try {
  // This is not available in all environments and may fail
  if (typeof window !== 'undefined') {
    enableIndexedDbPersistence(db).catch((err) => {
      console.error("Firestore persistence error:", err.code);
    });
  }
} catch (error) {
  console.log("Persistence not enabled:", error);
}

// Check if a user has admin privileges
export const checkIsAdmin = async (userId: string): Promise<boolean> => {
  try {
    const adminQuery = query(collection(db, "admins"), where("userId", "==", userId));
    const querySnapshot = await getDocs(adminQuery);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

// Verify admin code and set admin status
export const verifyAdminCode = async (userId: string, code: string): Promise<boolean> => {
  const validCode = "ellencody#admin";
  
  if (code === validCode) {
    try {
      // Add the user to the admins collection
      await setDoc(doc(db, "admins", userId), {
        userId,
        isAdmin: true,
        createdAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error("Error setting admin status:", error);
      return false;
    }
  }
  
  return false;
};

export { app, auth, db, analytics };
 