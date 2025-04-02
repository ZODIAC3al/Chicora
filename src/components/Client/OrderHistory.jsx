import { useState, useEffect } from 'react';
import { useAppContext, MotionDiv, fadeIn, slideUp, MotionH1 } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OrderHistory = () => {
    const { orders, services, user, loading, isRTL } = useAppContext();
    const { t } = useTranslation();
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        if (orders && services) {
            let filtered = [...orders];
            
            if (statusFilter !== 'all') {
                filtered = filtered.filter(order => order.status === statusFilter);
            }
            
            // Sort by date (newest first)
            filtered.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
            
            setFilteredOrders(filtered);
        }
    }, [orders, services, statusFilter]);

    const getServiceName = (serviceId) => {
        const service = services.find(s => s.$id === serviceId);
        return service ? service.name : t('orderHistory.unknownService');
    };

    const getServicePrice = (serviceId) => {
        const service = services.find(s => s.$id === serviceId);
        return service ? service.price : 0;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'in_progress':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-blue-100 text-blue-800';
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
                {t('orderHistory.title')}
            </MotionH1>
            
            <div className={`mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex items-center space-x-2">
                    <label htmlFor="statusFilter" className="text-gray-700">{t('orderHistory.filter')}</label>
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">{t('orderHistory.all')}</option>
                        <option value="pending">{t('orderHistory.pending')}</option>
                        <option value="in_progress">{t('orderHistory.in_progress')}</option>
                        <option value="completed">{t('orderHistory.completed')}</option>
                        <option value="cancelled">{t('orderHistory.cancelled')}</option>
                    </select>
                </div>
                
                <Link
                    to="/order"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    {t('navbar.newOrder')}
                </Link>
            </div>
            
            {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">{t('orderHistory.noOrders')}</p>
                    <Link
                        to="/order"
                        className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        {t('orderHistory.firstOrder')}
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-gray-700">{t('orderHistory.orderId')}</th>
                                <th className="py-3 px-4 text-left text-gray-700">{t('orderHistory.service')}</th>
                                <th className="py-3 px-4 text-left text-gray-700">{t('orderHistory.quantity')}</th>
                                <th className="py-3 px-4 text-left text-gray-700">{t('orderHistory.unitPrice')}</th>
                                <th className="py-3 px-4 text-left text-gray-700">{t('orderHistory.total')}</th>
                                <th className="py-3 px-4 text-left text-gray-700">{t('orderHistory.pickupDate')}</th>
                                <th className="py-3 px-4 text-left text-gray-700">{t('orderHistory.status')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <tr 
                                    key={order.$id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="py-3 px-4 text-gray-700">{order.$id.slice(0, 6)}...</td>
                                    <td className="py-3 px-4 text-gray-700">
                                        {getServiceName(order.service_id)}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700">{order.quantity}</td>
                                    <td className="py-3 px-4 text-gray-700">
                                        ${getServicePrice(order.service_id).toFixed(2)}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700 font-semibold">
                                        ${order.total_price.toFixed(2)}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700">
                                        {new Date(order.pickup_date).toLocaleDateString(currentLanguage)}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {t(`orderHistory.${order.status.replace('_', '')}`)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </MotionDiv>
    );
};

export default OrderHistory;