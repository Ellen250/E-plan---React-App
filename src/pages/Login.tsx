import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, CheckSquare, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage(t('errors.requiredField'));
      return;
    }
    
    try {
      setErrorMessage('');
      setIsSubmitting(true);
      await login(email, password);
      navigate('/');
    } catch (error: any) {
      let message = t('errors.login');
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        message = 'Invalid email or password';
      } else if (error.code === 'auth/invalid-email') {
        message = t('errors.invalidEmail');
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many failed login attempts. Please try again later.';
      }
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="page-container flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center justify-center">
              <CheckSquare className="h-10 w-10 text-primary-600" />
            </Link>
            <h1 className="text-2xl font-bold mt-4 gradient-heading">
              {t('auth.login')}
            </h1>
            <p className="text-gray-600 mt-2">
              {t('common.appName')} - Organize your tasks and schedule
            </p>
          </div>
          
          {errorMessage && (
            <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                {t('auth.email')}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="form-label">
                  {t('auth.password')}
                </label>
                <button type="button" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                  {t('auth.forgotPassword')}
                </button>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loader h-5 w-5 border-2 border-white border-t-transparent"></span>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    {t('auth.loginCta')}
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t('auth.noAccount')}{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                {t('auth.registerCta')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
 