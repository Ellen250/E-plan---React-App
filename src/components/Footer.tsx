import  { Mail, Globe, Link } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">E-Plan</h2>
            <p className="text-sm text-gray-400 mb-4">
              Organize your life with our powerful task management and personal agenda tool.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-primary-400" />
                <a 
                  href="mailto:imanzilutfy30@gmail.com" 
                  className="hover:text-primary-400 transition-colors"
                >
                  imanzilutfy30@gmail.com
                </a>
              </li>
              <li className="flex items-center text-sm">
                <Globe className="h-4 w-4 mr-2 text-primary-400" />
                <a 
                  href="https://imanzilutfy.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  imanzilutfy.netlify.app
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.termsOfService')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {t('footer.privacyPolicy')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {t('footer.termsOfService')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-center text-gray-400">
          <p>&copy; {currentYear} E-Plan. {t('footer.copyright')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
 