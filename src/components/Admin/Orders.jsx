import { useState, useEffect } from 'react';
import { useAppContext, MotionDiv, fadeIn, slideUp, MotionH1 } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Orders = () => {
    const { 
        orders, 
        users, 
        services, 
        updateOrderStatus, 
        loading, 
        isRTL, 
        currentLanguage,
        user
    } = useAppContext();
    const { t } = useTranslation();
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdminView, setIsAdminView] = useState(false);

    useEffect(() => {
        // Check if user is admin to show admin view
        setIsAdminView(user?.isAdmin);
    }, [user]);

    useEffect(() => {
        if (orders && users && services) {
            let filtered = [...orders];
            
            // Filter by status
            if (statusFilter !== 'all') {
                filtered = filtered.filter(order => order.status === statusFilter);
            }
            
            // Filter by search term
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter(order => {
                    const user = users.find(u => u.$id === order.user_id);
                    const service = services.find(s => s.$id === order.service_id);
                    
                    return (
                        (user && user.name.toLowerCase().includes(term)) ||
                        (service && service.name.toLowerCase().includes(term)) ||
                        order.$id.toLowerCase().includes(term)
                    );
                });
            }

            // Filter by user if not admin
            if (!isAdminView) {
                filtered = filtered.filter(order => order.user_id === user?.$id);
            }
            
            // Sort by date (newest first)
            filtered.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
            
            setFilteredOrders(filtered);
        }
    }, [orders, users, services, statusFilter, searchTerm, isAdminView, user]);

    const getUserName = (userId) => {
        const user = users.find(u => u.$id === userId);
        return user ? user.name : t('orders.unknownUser');
    };

    const getServiceName = (serviceId) => {
        const service = services.find(s => s.$id === serviceId);
        return service ? service.name : t('orders.unknownService');
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

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(currentLanguage, options);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <MotionDiv 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="container mx-auto px-4 py-8"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <MotionH1 variants={slideUp} className="text-3xl font-bold text-center mb-8 text-gray-800">
                {isAdminView ? t('orders.adminTitle') : t('orders.myOrders')}
            </MotionH1>
            
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('orders.filter')}
                    </label>
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">{t('orders.all')}</option>
                        <option value="pending">{t('orders.pending')}</option>
                        <option value="in_progress">{t('orders.inProgress')}</option>
                        <option value="completed">{t('orders.completed')}</option>
                        <option value="cancelled">{t('orders.cancelled')}</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('orders.search')}
                    </label>
                    <input
                        type="text"
                        id="search"
                        placeholder={t('orders.searchPlaceholder')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">{t('orders.noOrders')}</p>
                    {!isAdminView && (
                        <Link 
                            to="/order"
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            {t('orders.placeFirstOrder')}
                        </Link>
                    )}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                {isAdminView && (
                                    <th className="py-3 px-4 text-left text-gray-700">{t('orders.orderId')}</th>
                                )}
                                {isAdminView && (
                                    <th className="py-3 px-4 text-left text-gray-700">{t('orders.customer')}</th>
                                )}
                                <th className="py-3 px-4 text-left text-gray-700">{t('orders.service')}</th>
                                <th className="py-3 px-4 text-left text-gray-700">{t('orders.quantity')}</th>
                                <th className="py-3 px-4 text-left text-gray-700">{t('orders.total')}</th>
                                <th className="py-3 px-4 text-left text-gray-700">{t('orders.orderDate')}</th>
                                <th className="py-3 px-4 text-left text-gray-700">{t('orders.pickupDate')}</th>
                                <th className="py-3 px-4 text-left text-gray-700">{t('orders.status')}</th>
                                {isAdminView && (
                                    <th className="py-3 px-4 text-left text-gray-700">{t('orders.actions')}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <tr 
                                    key={order.$id}
                                    className="hover:bg-gray-50"
                                >
                                    {isAdminView && (
                                        <td className="py-3 px-4 text-gray-700">
                                            <Link 
                                                to={`/order-details/${order.$id}`} 
                                                className="text-blue-600 hover:underline"
                                            >
                                                {order.$id.slice(0, 6)}...
                                            </Link>
                                        </td>
                                    )}
                                    {isAdminView && (
                                        <td className="py-3 px-4 text-gray-700">
                                            {getUserName(order.user_id)}
                                        </td>
                                    )}
                                    <td className="py-3 px-4 text-gray-700">
                                        {getServiceName(order.service_id)}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700">{order.quantity}</td>
                                    <td className="py-3 px-4 text-gray-700 font-semibold">
                                        ${order.total_price.toFixed(2)}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700">
                                        {formatDate(order.$createdAt)}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700">
                                        {formatDate(order.pickup_date)}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {t(`orders.${order.status.replace('_', '')}`)}
                                        </span>
                                    </td>
                                    {isAdminView && (
                                        <td className="py-3 px-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.$id, e.target.value)}
                                                className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            >
                                                <option value="pending">{t('orders.pending')}</option>
                                                <option value="in_progress">{t('orders.inProgress')}</option>
                                                <option value="completed">{t('orders.completed')}</option>
                                                <option value="cancelled">{t('orders.cancelled')}</option>
                                            </select>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </MotionDiv>
    );
};

export default Orders;