import  { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, CheckSquare, Calendar, User, LogOut, Users, Home, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      {/* Desktop navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Calendar className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">E-Plan</span>
              </Link>
            </div>
            
            {/* Desktop navigation links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {currentUser && (
                <>
                  <Link
                    to="/"
                    className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${
                      isActive('/')
                        ? 'border-primary-500 text-primary-700'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <Home className="h-4 w-4 mr-1" />
                    {t('nav.dashboard')}
                  </Link>
                  <Link
                    to="/todos"
                    className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${
                      isActive('/todos')
                        ? 'border-primary-500 text-primary-700'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <CheckSquare className="h-4 w-4 mr-1" />
                    {t('nav.tasks')}
                  </Link>
                  <Link
                    to="/agenda"
                    className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${
                      isActive('/agenda')
                        ? 'border-primary-500 text-primary-700'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    {t('nav.agenda')}
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${
                        isActive('/admin')
                          ? 'border-primary-500 text-primary-700'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      <Users className="h-4 w-4 mr-1" />
                      {t('nav.admin')}
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* User Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <LanguageSwitcher />
            
            {currentUser ? (
              <div className="ml-3 relative">
                <div className="group">
                  <button className="flex items-center space-x-1 bg-gray-100 p-2 rounded-full">
                    <span className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
                      {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10">
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          <LogOut className="h-4 w-4 mr-2 text-gray-500" />
                          {t('auth.logout')}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="btn btn-outline text-sm font-medium"
                >
                  {t('auth.login')}
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary text-sm font-medium"
                >
                  {t('auth.register')}
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-4 py-2 border-b border-gray-200">
          <LanguageSwitcher />
        </div>
        
        <div className="pt-2 pb-3 space-y-1">
          {currentUser ? (
            <>
              <Link
                to="/"
                className={`block pl-3 pr-4 py-2 ${
                  isActive('/')
                    ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700'
                    : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50'
                }`}
                onClick={closeMenu}
              >
                <Home className="h-5 w-5 inline mr-2" />
                {t('nav.dashboard')}
              </Link>
              <Link
                to="/todos"
                className={`block pl-3 pr-4 py-2 ${
                  isActive('/todos')
                    ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700'
                    : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50'
                }`}
                onClick={closeMenu}
              >
                <CheckSquare className="h-5 w-5 inline mr-2" />
                {t('nav.tasks')}
              </Link>
              <Link
                to="/agenda"
                className={`block pl-3 pr-4 py-2 ${
                  isActive('/agenda')
                    ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700'
                    : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50'
                }`}
                onClick={closeMenu}
              >
                <Calendar className="h-5 w-5 inline mr-2" />
                {t('nav.agenda')}
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`block pl-3 pr-4 py-2 ${
                    isActive('/admin')
                      ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700'
                      : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50'
                  }`}
                  onClick={closeMenu}
                >
                  <Users className="h-5 w-5 inline mr-2" />
                  {t('nav.admin')}
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-500 hover:bg-gray-50"
              >
                <LogOut className="h-5 w-5 inline mr-2" />
                {t('auth.logout')}
              </button>
            </>
          ) : (
            <div className="px-3 py-3 flex flex-col space-y-2">
              <Link
                to="/login"
                className="btn btn-outline w-full"
                onClick={closeMenu}
              >
                {t('auth.login')}
              </Link>
              <Link
                to="/register"
                className="btn btn-primary w-full"
                onClick={closeMenu}
              >
                {t('auth.register')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
 