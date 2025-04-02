import { useState, useEffect } from 'react';
import { useAppContext, MotionDiv, fadeIn, slideUp, MotionH1 } from '../../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useTranslation } from 'react-i18next';

const OrderForm = () => {
    const { services, user, createOrder, loading, isRTL, currentLanguage } = useAppContext();
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
          // Validate form data
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
  
          // Calculate total price
          const totalPrice = selectedService.price * formData.quantity;
  
          // Create the order object
          const orderData = {
              service_id: formData.service_id,
              service_name: selectedService.name,
              quantity: formData.quantity,
              pickup_date: formData.pickup_date.toISOString(),
              status: 'pending',
              total_price: totalPrice,
              image_url: selectedService.image_url || '/service-placeholder.jpg'
          };
  
          // Create the order in your backend/database
          const createdOrder = await createOrder(orderData);
  
          // Navigate to history with the new order data
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
                {t('orderForm.title')}
            </MotionH1>
            
            <div className={`max-w-lg mx-auto bg-white rounded-lg shadow-md p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {error && (
                    <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                            {t('orderForm.service')}
                        </label>
                        {selectedService ? (
                            <div className={`flex items-center p-3 border border-gray-300 rounded-md ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <img 
                                    src={selectedService.image_url || '/service-placeholder.jpg'} 
                                    alt={selectedService.name} 
                                    className="w-16 h-16 object-cover rounded-md mr-4"
                                />
                                <div>
                                    <h4 className="font-semibold">{selectedService.name}</h4>
                                    <p className="text-gray-600">${selectedService.price} • {selectedService.delivery_days} {t('services.daysDelivery')}</p>
                                </div>
                            </div>
                        ) : (
                            <select
                                id="service"
                                name="service_id"
                                value={formData.service_id}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    
                    <div className="mb-6">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                            {t('orderForm.quantity')}
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="pickup_date" className="block text-sm font-medium text-gray-700">
                            {t('orderForm.pickupDate')}
                        </label>
                        <div className="react-date-picker__wrapper">
                            <DatePicker
                                onChange={handleDateChange}
                                value={formData.pickup_date}
                                minDate={new Date()}
                                className="w-full border border-gray-300 rounded-md"
                                calendarClassName="border border-gray-300 rounded-md shadow-lg"
                                clearIcon={null}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">
                            {t('orderForm.totalPrice')}
                        </label>
                        <div className="p-3 bg-gray-100 rounded-md">
                            {selectedService ? (
                                <span className="text-2xl font-bold text-blue-600">
                                    ${(selectedService.price * formData.quantity).toFixed(2)}
                                </span>
                            ) : (
                                <span className="text-gray-500">{t('orderForm.selectServiceTotal')}</span>
                            )}
                        </div>
                    </div>
                    
                    <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? t('orderForm.processing') : t('orderForm.placeOrder')}
                        </button>
                    </div>
                </form>
            </div>
        </MotionDiv>
    );
};

export default OrderForm;