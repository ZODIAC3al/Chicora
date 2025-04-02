import { useState, useEffect } from 'react';
import { useAppContext, MotionDiv, fadeIn, slideUp, MotionH1 } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const { orders, users, loading } = useAppContext();
    const [stats, setStats] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (orders && users) {
            const statusCounts = orders.reduce((acc, order) => {
                acc[order.status] = (acc[order.status] || 0) + 1;
                return acc;
            }, {});

            const monthlyRevenue = {};
            orders.forEach(order => {
                if (order.status === 'completed') {
                    const month = new Date(order.$createdAt).toLocaleString('default', { month: 'short' });
                    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.total_price;
                }
            });

            const statusData = Object.keys(statusCounts).map(key => ({
                name: key.replace('_', ' '),
                value: statusCounts[key]
            }));

            const revenueData = Object.keys(monthlyRevenue).map(key => ({
                name: key,
                revenue: monthlyRevenue[key]
            }));

            setStats({
                totalOrders: orders.length,
                totalUsers: users.length,
                completedOrders: statusCounts.completed || 0,
                totalRevenue: orders.reduce((sum, order) => sum + (order.status === 'completed' ? order.total_price : 0), 0),
                statusData,
                revenueData
            });
        }
    }, [orders, users]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    if (loading) return null;

    return (
        <MotionDiv 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="container mx-auto px-4 py-8"
        >
            <MotionH1 variants={slideUp} className="text-3xl font-bold text-center mb-8 text-gray-800">
                {t('dashboard.title')}
            </MotionH1>
            
            {stats && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <MotionDiv 
                            variants={slideUp}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
                            <h3 className="text-gray-500 text-sm font-medium">{t('dashboard.totalOrders')}</h3>
                            <p className="text-3xl font-bold text-blue-600">{stats.totalOrders}</p>
                        </MotionDiv>
                        
                        <MotionDiv 
                            variants={slideUp}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
                            <h3 className="text-gray-500 text-sm font-medium">{t('dashboard.completedOrders')}</h3>
                            <p className="text-3xl font-bold text-green-600">{stats.completedOrders}</p>
                        </MotionDiv>
                        
                        <MotionDiv 
                            variants={slideUp}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
                            <h3 className="text-gray-500 text-sm font-medium">{t('dashboard.totalUsers')}</h3>
                            <p className="text-3xl font-bold text-purple-600">{stats.totalUsers}</p>
                        </MotionDiv>
                        
                        <MotionDiv 
                            variants={slideUp}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
                            <h3 className="text-gray-500 text-sm font-medium">{t('dashboard.totalRevenue')}</h3>
                            <p className="text-3xl font-bold text-yellow-600">${stats.totalRevenue.toFixed(2)}</p>
                        </MotionDiv>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <MotionDiv 
                            variants={slideUp}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
                            <h3 className="text-gray-700 text-lg font-semibold mb-4">{t('dashboard.monthlyRevenue')}</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.revenueData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="revenue" fill="#8884d8" name={t('dashboard.revenue')} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </MotionDiv>
                        
                        <MotionDiv 
                            variants={slideUp}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
                            <h3 className="text-gray-700 text-lg font-semibold mb-4">{t('dashboard.orderStatus')}</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={stats.statusData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            nameKey="name"
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {stats.statusData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </MotionDiv>
                    </div>
                </>
            )}
        </MotionDiv>
    );
};

export default Dashboard;