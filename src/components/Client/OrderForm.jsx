import { useState, useEffect } from 'react';
import { useAppContext, MotionDiv, fadeIn, slideUp, MotionH1 } from '../../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useTranslation } from 'react-i18next';
import { GiWashingMachine } from 'react-icons/gi';
import { FiX, FiCheck, FiCalendar, FiShoppingCart } from 'react-icons/fi';

const OrderForm = () => {
    const { services, user, createOrder, loading, isRTL } = useAppContext();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const serviceId = queryParams.get('service');
    
    const [formData, setFormData] = useState({
        service_id: serviceId || '',
        quantity: 1,
        pickup_date: new Date()
    });
    const [selectedService, setSelectedService] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (serviceId && services) {
            const service = services.find(s => s.$id === serviceId);
            if (service) {
                setSelectedService(service);
                setFormData(prev => ({
                    ...prev,
                    service_id: serviceId
                }));
            }
        }
    }, [serviceId, services]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'quantity' ? parseInt(value) : value
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            pickup_date: date
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            if (!formData.service_id) {
                throw new Error(t('orderForm.selectServiceError'));
            }

            if (formData.quantity < 1) {
                throw new Error(t('orderForm.invalidQuantity'));
            }

            const selectedService = services.find(s => s.$id === formData.service_id);
            if (!selectedService) {
                throw new Error(t('orderForm.invalidService'));
            }

            if (new Date(formData.pickup_date) < new Date()) {
                throw new Error(t('orderForm.invalidPickupDate'));
            }

            const totalPrice = selectedService.price * formData.quantity;

            const orderData = {
                service_id: formData.service_id,
                service_name: selectedService.name,
                quantity: formData.quantity,
                pickup_date: formData.pickup_date.toISOString(),
                status: 'pending',
                total_price: totalPrice,
                image_url: selectedService.image_url || '/service-placeholder.jpg'
            };

            const createdOrder = await createOrder(orderData);

            navigate('/history', {
                state: {
                    newOrder: {
                        ...createdOrder,
                        service_name: selectedService.name,
                        image_url: selectedService.image_url || '/service-placeholder.jpg'
                    }
                }
            });

        } catch (err) {
            setError(err.message);
        } 
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <div className="animate-spin rounded-full h-14 w-14 border-[3px] border-blue-500 border-t-transparent"></div>
            <p className="text-lg text-gray-600 font-medium">{t('common.loading')}</p>
        </div>
    );

    return (
        <MotionDiv 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="container mx-auto px-4 sm:px-6 py-10"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div className="max-w-4xl mx-auto">
                {/* Header with Logo */}
                <div className="flex flex-col items-center mb-10">
                    <div className="flex items-center mb-4">
                        <div className="relative mr-3">
                            <div className="absolute -inset-1 bg-blue-100 rounded-full blur opacity-75 animate-pulse"></div>
                            <div className="relative flex items-center justify-center h-14 w-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full shadow-lg">
                                <GiWashingMachine className="text-white text-2xl" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                            Chicora Pro
                        </h1>
                    </div>
                    <MotionH1 variants={slideUp} className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
                        {t('orderForm.title')}
                    </MotionH1>
                   
                </div>
                
                {/* Form Container */}
                <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start">
                            <FiX className="flex-shrink-0 h-5 w-5 text-red-500 mr-3 mt-0.5" />
                            <p className="text-red-700 font-medium">{error}</p>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        {/* Service Selection */}
                        <div className="space-y-3">
                            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                                {t('orderForm.service')}
                            </label>
                            {selectedService ? (
                                <div className={`flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <img 
                                        src={selectedService.image_url || '/service-placeholder.jpg'} 
                                        alt={selectedService.name} 
                                        className="w-20 h-20 object-cover rounded-lg mr-4 shadow-sm"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800 text-lg">{selectedService.name}</h4>
                                        <div className="flex items-center mt-1">
                                            <span className="text-blue-600 font-bold text-lg">${selectedService.price}</span>
                                            <span className="mx-2 text-gray-400">•</span>
                                            <span className="text-gray-600 flex items-center">
                                                <FiCalendar className="mr-1" />
                                                {selectedService.delivery_days} {t('services.daysDelivery')}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedService(null);
                                            setFormData(prev => ({ ...prev, service_id: '' }));
                                        }}
                                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                    >
                                        <FiX className="h-5 w-5" />
                                    </button>
                                </div>
                            ) : (
                                <select
                                    id="service"
                                    name="service_id"
                                    value={formData.service_id}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    required
                                >
                                    <option value="">{t('orderForm.selectService')}</option>
                                    {services.map(service => (
                                        <option key={service.$id} value={service.$id}>
                                            {service.name} (${service.price})
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                        
                        {/* Form Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Quantity */}
                            <div className="space-y-3">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                    {t('orderForm.quantity')}
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        min="1"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>
                            
                            {/* Pickup Date */}
                            <div className="space-y-3">
                                <label htmlFor="pickup_date" className="block text-sm font-medium text-gray-700">
                                    {t('orderForm.pickupDate')}
                                </label>
                                <div className="react-date-picker__wrapper">
                                    <DatePicker
                                        onChange={handleDateChange}
                                        value={formData.pickup_date}
                                        minDate={new Date()}
                                        className="w-full border border-gray-300 rounded-xl"
                                        calendarClassName="border border-gray-300 rounded-xl shadow-lg"
                                        clearIcon={null}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Total Price */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">
                                {t('orderForm.totalPrice')}
                            </label>
                            <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                                {selectedService ? (
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-medium">{t('orderForm.subtotal')}</span>
                                        <div className="flex items-center">
                                            <span className="text-2xl md:text-3xl font-bold text-blue-600 mr-2">
                                                ${(selectedService.price * formData.quantity).toFixed(2)}
                                            </span>
                                            <FiCheck className="h-5 w-5 text-green-500" />
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-gray-500">{t('orderForm.selectServiceTotal')}</span>
                                )}
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} pt-4`}>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="font-medium">{t('orderForm.processing')}</span>
                                    </>
                                ) : (
                                    <>
                                        <FiShoppingCart className="mr-2 h-5 w-5" />
                                        <span className="font-medium text-lg">{t('orderForm.placeOrder')}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MotionDiv>
    );
};

export default OrderForm;