import { MotionDiv, fadeIn } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GiWashingMachine } from 'react-icons/gi';

const Loading = () => {
  const { t } = useTranslation();
  
  const spinnerVariants = {
    hidden: { rotate: 0 },
    visible: { 
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <MotionDiv 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      <motion.div 
        className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full mx-4"
        variants={pulseVariants}
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-blue-400 rounded-full opacity-20 blur-md"
              variants={pulseVariants}
            />
            <motion.div
              variants={spinnerVariants}
              className="relative z-10 flex items-center justify-center h-16 w-16 mx-auto"
            >
              <GiWashingMachine className="text-blue-600 text-3xl" />
            </motion.div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('loading')}</h3>
        <p className="text-gray-500">{t('loadingMessage')}</p>
        
        <div className="mt-6">
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </motion.div>
    </MotionDiv>
  );
};

export default Loading;