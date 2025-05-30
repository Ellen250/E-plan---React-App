import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, CheckSquare, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [showAdminField, setShowAdminField] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage(t('errors.requiredField'));
      return;
    }
    
    if (password.length < 6) {
      setErrorMessage(t('errors.minLength', { length: 6 }));
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage(t('errors.passwordMismatch'));
      return;
    }
    
    try {
      setErrorMessage('');
      setIsSubmitting(true);
      await signUp(email, password, name, adminCode);
      navigate('/');
    } catch (error: any) {
      let message = t('errors.register');
      if (error.code === 'auth/email-already-in-use') {
        message = t('errors.emailInUse');
      } else if (error.code === 'auth/invalid-email') {
        message = t('errors.invalidEmail');
      } else if (error.code === 'auth/weak-password') {
        message = t('errors.weakPassword');
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
              {t('auth.register')}
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
              <label htmlFor="name" className="form-label">
                {t('auth.name')}
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            
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
              <label htmlFor="password" className="form-label">
                {t('auth.password')}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {t('errors.minLength', { length: 6 })}
              </p>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                {t('auth.confirmPassword')}
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="flex items-center">
                <input
                  id="showAdminField"
                  name="showAdminField"
                  type="checkbox"
                  checked={showAdminField}
                  onChange={() => setShowAdminField(!showAdminField)}
                  className="custom-checkbox"
                />
                <label htmlFor="showAdminField" className="ml-2 text-sm text-gray-700">
                  I have an admin code
                </label>
              </div>
            </div>
            
            {showAdminField && (
              <div className="form-group">
                <label htmlFor="adminCode" className="form-label">
                  {t('auth.adminCode')}
                </label>
                <div className="mt-1">
                  <input
                    id="adminCode"
                    name="adminCode"
                    type="text"
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    className="input"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t('auth.adminCodeInfo')}
                </p>
              </div>
            )}
            
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
                    <UserPlus className="h-4 w-4 mr-2" />
                    {t('auth.registerCta')}
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t('auth.hasAccount')}{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                {t('auth.loginCta')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
 