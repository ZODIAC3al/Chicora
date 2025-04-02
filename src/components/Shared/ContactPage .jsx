import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GiWashingMachine, GiPathDistance } from 'react-icons/gi';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBusinessTime } from 'react-icons/fa';
import { BsSendFill } from 'react-icons/bs';

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-200 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative flex items-center justify-center h-16 w-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-lg mx-auto">
                <GiWashingMachine className="text-white text-2xl" />
              </div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            {t('contact.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BsSendFill className="text-blue-600" />
              {t('contact.form.title')}
            </h3>
            
            <form className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={t('contact.form.messagePlaceholder')}
                ></textarea>
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <BsSendFill />
                {t('contact.form.submit')}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" />
                {t('contact.info.title')}
              </h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full text-blue-600 mt-1">
                    <FaMapMarkerAlt className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800">{t('contact.info.addressTitle')}</h4>
                    <p className="text-gray-600 mt-1">{t('contact.info.address')}</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full text-blue-600 mt-1">
                    <FaPhoneAlt className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800">{t('contact.info.phoneTitle')}</h4>
                    <p className="text-gray-600 mt-1">{t('contact.info.phone')}</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full text-blue-600 mt-1">
                    <FaEnvelope className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800">{t('contact.info.emailTitle')}</h4>
                    <p className="text-gray-600 mt-1">{t('contact.info.email')}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full text-blue-600 mt-1">
                    <FaBusinessTime className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800">{t('contact.info.hoursTitle')}</h4>
                    <div className="text-gray-600 mt-1 space-y-1">
                      <p>{t('contact.info.hours.weekdays')}</p>
                      <p>{t('contact.info.hours.weekend')}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <GiPathDistance className="text-blue-600" />
                {t('contact.map.title')}
              </h3>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden flex flex-col items-center justify-center">
                <div className="text-center p-4">
                  <FaMapMarkerAlt className="mx-auto text-4xl text-blue-600 mb-4" />
                  <h4 className="text-xl font-medium text-gray-800 mb-2">{t('contact.map.placeholderTitle')}</h4>
                  <p className="text-gray-600">{t('contact.map.placeholderText')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ContactPage;