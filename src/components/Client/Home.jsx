import { Link } from 'react-router-dom';
import { useAppContext, MotionDiv, fadeIn, slideUp, MotionH1, MotionP } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { user, isRTL } = useAppContext();
  const { t } = useTranslation();

  const services = [
    {
      name: t('home.standardService'),
      price: 12.99,
      delivery: t('home.delivery24'),
      description: t('home.standardServiceDesc'),
      featured: true
    },
    {
      name: t('home.expressService'),
      price: 19.99,
      delivery: t('home.sameDay'),
      description: t('home.expressServiceDesc'),
      featured: true
    },
    {
      name: t('home.premiumService'),
      price: 29.99,
      delivery: t('home.delivery48'),
      description: t('home.premiumServiceDesc'),
      featured: false
    }
  ];

  return (
    <MotionDiv 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-gradient-to-b from-blue-50 to-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8">
              <div className={`text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
                <MotionH1 
                  variants={slideUp}
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                >
                  <span className="block">{t('home.professional')}</span>
                  <span className="block text-blue-600">{t('home.dryCleaning')}</span>
                  <span className="block">{t('home.service')}</span>
                </MotionH1>
                <MotionP
                  variants={slideUp}
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                >
                  {t('home.description')}
                </MotionP>
                <div className={`mt-5 sm:mt-8 sm:flex ${isRTL ? 'sm:justify-end' : 'sm:justify-start'}`}>
                  <MotionDiv variants={slideUp} className="rounded-md shadow">
                    <Link
                      to="/order"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      {t('home.placeOrder')}
                    </Link>
                  </MotionDiv>
                  <MotionDiv variants={slideUp} className={`mt-3 sm:mt-0 ${isRTL ? 'sm:mr-3' : 'sm:ml-3'}`}>
                    <Link
                      to="/services"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    >
                      {t('home.viewServices')}
                    </Link>
                  </MotionDiv>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Featured Services */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <MotionH1 
              variants={slideUp}
              className="text-base text-blue-600 font-semibold tracking-wide uppercase"
            >
              {t('home.services')}
            </MotionH1>
            <MotionP
              variants={slideUp}
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              {t('home.popularServices')}
            </MotionP>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {services.filter(s => s.featured).map((service, index) => (
                <MotionDiv
                  key={service.name}
                  variants={slideUp}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="px-6 py-8 sm:p-10">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <div className="mt-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{service.name}</h3>
                      <p className="mt-2 text-base text-gray-500">
                        {service.description}
                      </p>
                      <div className={`mt-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-2xl font-bold text-gray-900">${service.price}</span>
                        <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-sm text-gray-500`}>• {service.delivery}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <Link
                      to="/order"
                      className="text-base font-medium text-blue-600 hover:text-blue-500"
                    >
                      {t('services.orderNow')} <span aria-hidden="true">{isRTL ? '←' : '→'}</span>
                    </Link>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <MotionH1 
              variants={slideUp}
              className="text-base text-blue-600 font-semibold tracking-wide uppercase"
            >
              {t('home.process')}
            </MotionH1>
            <MotionP
              variants={slideUp}
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              {t('home.howItWorks')}
            </MotionP>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {[
                {
                  name: t('home.placeOrder'),
                  description: t('home.placeOrderDesc'),
                  icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                },
                {
                  name: t('home.weCollect'),
                  description: t('home.weCollectDesc'),
                  icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                },
                {
                  name: t('home.deliverBack'),
                  description: t('home.deliverBackDesc'),
                  icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                }
              ].map((step, index) => (
                <MotionDiv
                  key={step.name}
                  variants={slideUp}
                  transition={{ delay: index * 0.1 }}
                  className="pt-6"
                >
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow h-full">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                          </svg>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{step.name}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <MotionH1 variants={slideUp} className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">{t('home.ready')}</span>
            <span className="block">{t('home.placeFirstOrder')}</span>
          </MotionH1>
          <MotionP variants={slideUp} className="mt-4 text-lg leading-6 text-blue-200">
            {t('home.joinCustomers')}
          </MotionP>
          <MotionDiv variants={slideUp} className="mt-10">
            <Link
              to={user ? "/order" : "/auth"}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50"
            >
              {user ? t('home.placeNewOrder') : t('home.signUpNow')}
            </Link>
          </MotionDiv>
        </div>
      </div>
    </MotionDiv>
  );
};

export default Home;