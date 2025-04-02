import { useState, useEffect } from 'react';
import { useAppContext, MotionDiv, fadeIn, slideUp, MotionH1 } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Services = () => {
    const { services, loading, user, isRTL } = useAppContext();
    const { t } = useTranslation();
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (services) {
            setFilteredServices(
                services.filter(service => 
                    service.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [services, searchTerm]);

    if (loading) return null;

    return (
        <MotionDiv 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="container mx-auto px-4 py-8"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <MotionH1 variants={slideUp} className="text-3xl font-bold text-center mb-8 text-gray-800">
                {t('services.title')}
            </MotionH1>
            
            <div className={`mb-6 max-w-md mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
                <input
                    type="text"
                    placeholder={t('services.searchPlaceholder')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                    <MotionDiv
                        key={service.$id}
                        variants={slideUp}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="h-48 bg-gray-200 overflow-hidden">
                            <img 
                                src={service.image_url || '/service-placeholder.jpg'} 
                                alt={service.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                            <p className="text-gray-600 mb-4">
                                {t('services.delivery', { days: service.delivery_days })}
                            </p>
                            <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <span className="text-2xl font-bold text-blue-600">${service.price}</span>
                                {user ? (
                                    <Link
                                        to={`/order?service=${service.$id}`}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                    >
                                        {t('services.orderNow')}
                                    </Link>
                                ) : (
                                    <Link
                                        to="/auth"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                    >
                                        {t('services.loginToOrder')}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </MotionDiv>
                ))}
            </div>
            
            {filteredServices.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">{t('services.noServices')}</p>
                </div>
            )}
        </MotionDiv>
    );
};

export default Services;