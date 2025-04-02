import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const Footer = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <footer className="bg-gray-900 text-white py-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.about')}</h3>
            <p className="text-gray-400">
              {t('about.description', {
                defaultValue: "Professional dry cleaning services with fast turnaround times and exceptional customer service."
              })}
            </p>
            <div className="mt-4 flex items-center">
              <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-400">
                {t('contact.info.phone', { defaultValue: "+1 (555) 123-4567" })}
              </span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks', { defaultValue: "Quick Links" })}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/services" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {t('navbar.services')}
                </a>
              </li>
              <li>
                <a href="/pricing" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {t('pricing.title', { defaultValue: "Pricing" })}
                </a>
              </li>
              <li>
                <a href="/about" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a href="/contact" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.contact')}</h3>
            <address className="not-italic text-gray-400">
              <div className="flex items-start mb-3">
                <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>{t('contact.info.address')}</p>
              </div>
              <div className="flex items-center mb-3">
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p>{t('contact.info.phone')}</p>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p>{t('contact.info.email')}</p>
              </div>
            </address>
          </div>
          
          {/* Business Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.hours', { defaultValue: "Business Hours" })}</h3>
            <ul className="text-gray-400 space-y-2">
              <li className="flex justify-between">
                <span>{t('footer.weekdays', { defaultValue: "Monday - Friday" })}</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>{t('footer.saturday', { defaultValue: "Saturday" })}</span>
                <span>9:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>{t('footer.sunday', { defaultValue: "Sunday" })}</span>
                <span>{t('footer.closed', { defaultValue: "Closed" })}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} {t('footer.copyright')}. {t('footer.rightsReserved')}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                {t('footer.terms')}
              </a>
              <a href="/sitemap" className="text-sm text-gray-400 hover:text-white transition-colors">
                {t('footer.sitemap', { defaultValue: "Sitemap" })}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;