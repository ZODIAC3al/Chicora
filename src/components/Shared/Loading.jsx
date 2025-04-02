import { MotionDiv, fadeIn } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';

const Loading = () => {
  const { t } = useTranslation();
  
  return (
    <MotionDiv 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-700">{t('loading')}...</p>
      </div>
    </MotionDiv>
  );
};

export default Loading;