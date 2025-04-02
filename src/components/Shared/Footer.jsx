import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
          <div className="mt-2 text-sm text-gray-400">
            {t('footer.rightsReserved')}
          </div>
        </div>
        
        <div className="flex justify-center mt-4 space-x-4">
          <button 
            onClick={() => changeLanguage('en')}
            className={`px-3 py-1 rounded ${i18n.language === 'en' ? 'bg-blue-500' : 'bg-gray-600'}`}
          >
            English
          </button>
          <button 
            onClick={() => changeLanguage('ar')}
            className={`px-3 py-1 rounded ${i18n.language === 'ar' ? 'bg-blue-500' : 'bg-gray-600'}`}
          >
            العربية
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;