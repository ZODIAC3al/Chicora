import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GiWashingMachine, GiPriceTag } from 'react-icons/gi';
import { FaCheck, FaQuestionCircle, FaStar, FaFire } from 'react-icons/fa';

const PricingPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const plans = [
    {
      name: t('pricing.plans.basic.name'),
      price: t('pricing.plans.basic.price'),
      description: t('pricing.plans.basic.description'),
      features: [
        t('pricing.plans.basic.features.0'),
        t('pricing.plans.basic.features.1'),
        t('pricing.plans.basic.features.2')
      ],
      popular: false,
      icon: <GiPriceTag className="text-blue-500 text-3xl" />
    },
    {
      name: t('pricing.plans.standard.name'),
      price: t('pricing.plans.standard.price'),
      description: t('pricing.plans.standard.description'),
      features: [
        t('pricing.plans.standard.features.0'),
        t('pricing.plans.standard.features.1'),
        t('pricing.plans.standard.features.2'),
        t('pricing.plans.standard.features.3')
      ],
      popular: true,
      icon: <FaStar className="text-yellow-500 text-3xl" />
    },
    {
      name: t('pricing.plans.premium.name'),
      price: t('pricing.plans.premium.price'),
      description: t('pricing.plans.premium.description'),
      features: [
        t('pricing.plans.premium.features.0'),
        t('pricing.plans.premium.features.1'),
        t('pricing.plans.premium.features.2'),
        t('pricing.plans.premium.features.3'),
        t('pricing.plans.premium.features.4')
      ],
      popular: false,
      icon: <FaFire className="text-red-500 text-3xl" />
    }
  ];

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
            {t('pricing.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t('pricing.subtitle')}
          </motion.p>
        </div>

        {/* Pricing Plans */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col ${plan.popular ? 'border-2 border-blue-500 shadow-2xl' : 'border border-gray-200 shadow-lg'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg flex items-center">
                  <FaStar className="mr-1" />
                  {t('pricing.mostPopular')}
                </div>
              )}
              
              <div className={`p-8 flex-1 flex flex-col ${plan.popular ? 'bg-white' : 'bg-white'}`}>
                <div className="flex items-center gap-3 mb-4">
                  {plan.icon}
                  <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                  <span className="text-gray-500">/{t('pricing.perMonth')}</span>
                </div>
                
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all mt-auto ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-md' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  {t('pricing.choosePlan')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center gap-3"
          >
            <FaQuestionCircle className="text-blue-500" />
            {t('pricing.faq.title')}
          </motion.h2>
          
          <motion.div
            className="space-y-6"
          >
            {[1, 2, 3, 4].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <FaQuestionCircle className="text-blue-500 text-lg" />
                  {t(`pricing.faq.questions.${item-1}.question`)}
                </h4>
                <p className="text-gray-600 pl-8">
                  {t(`pricing.faq.questions.${item-1}.answer`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
export default PricingPage;