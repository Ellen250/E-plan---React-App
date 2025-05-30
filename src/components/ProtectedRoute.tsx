import  { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { currentUser, isAdmin, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader border-primary-500 w-8 h-8"></div>
      </div>
    );
  }
  
  // Redirect if user is not logged in
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Redirect if the route requires admin but user is not an admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
}

export default ProtectedRoute;
 