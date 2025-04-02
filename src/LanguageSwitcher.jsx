import { useAppContext } from './context/AppContext';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useAppContext();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-md ${currentLanguage === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('ar')}
        className={`px-3 py-1 rounded-md ${currentLanguage === 'ar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageSwitcher;