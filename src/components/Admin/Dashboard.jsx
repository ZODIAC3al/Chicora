import { useState, useEffect } from 'react';
import { useAppContext, MotionDiv, fadeIn, slideUp, MotionH1 } from '../../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiDollarSign, 
  FiUsers, 
  FiPackage, 
  FiCheckCircle,
  FiTrendingUp,
  FiCalendar,
  FiRefreshCw,
  FiShoppingCart,
  FiActivity,
  FiBarChart2,
  FiPieChart
} from 'react-icons/fi';
import { 
  FaMoneyBillWave, 
  FaChartLine, 
  FaUserPlus,
  FaBoxOpen,
  FaRegChartBar
} from 'react-icons/fa';
import { IoStatsChart } from 'react-icons/io5';
import { RiExchangeDollarFill } from 'react-icons/ri';

const Dashboard = () => {
    const { orders, users, loading } = useAppContext();
    const [stats, setStats] = useState(null);
    const [timeRange, setTimeRange] = useState('monthly');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { t, i18n } = useTranslation();

    // Calm color theme
    const theme = {
      primary: '#5B6ABF',      // Soft blue
      secondary: '#6BBBA1',    // Mint green
      accent: '#FFA07A',       // Light salmon
      danger: '#FF6B6B',       // Soft red
      info: '#7EC8E3',        // Sky blue
      dark: '#3A4A6B',        // Navy blue
      light: '#F8F9FA',        // Very light gray
      textDark: '#2D3748',     // Dark gray for text
      textLight: '#718096',    // Light gray for text
      cardBg: '#FFFFFF',       // White for cards
      darkCardBg: '#2D3748'    // Dark blue-gray for dark mode cards
    };

    const processData = () => {
      if (!orders || !users) return;

      // Status counts
      const statusCounts = orders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
      }, {});

      // Revenue data by time range
      const revenueData = {};
      const now = new Date();
      
      orders.forEach(order => {
          if (order.status === 'completed') {
              let period;
              const orderDate = new Date(order.$createdAt);
              
              if (timeRange === 'weekly') {
                  const weekStart = new Date(now);
                  weekStart.setDate(now.getDate() - now.getDay());
                  const weekNum = Math.floor((orderDate - weekStart) / (7 * 24 * 60 * 60 * 1000)) + 1;
                  period = `${t('dashboard.week')} ${weekNum}`;
              } else if (timeRange === 'monthly') {
                  period = new Intl.DateTimeFormat(i18n.language, { month: 'short' }).format(orderDate);
              } else { // yearly
                  period = orderDate.getFullYear();
              }
              
              revenueData[period] = (revenueData[period] || 0) + order.total_price;
          }
      });

      // User signups by time range
      const userSignups = {};
      users.forEach(user => {
          let period;
          const signupDate = new Date(user.created_at);
          
          if (timeRange === 'weekly') {
              const weekStart = new Date(now);
              weekStart.setDate(now.getDate() - now.getDay());
              const weekNum = Math.floor((signupDate - weekStart) / (7 * 24 * 60 * 60 * 1000)) + 1;
              period = `${t('dashboard.week')} ${weekNum}`;
          } else if (timeRange === 'monthly') {
              period = new Intl.DateTimeFormat(i18n.language, { month: 'short' }).format(signupDate);
          } else { // yearly
              period = signupDate.getFullYear();
          }
          
          userSignups[period] = (userSignups[period] || 0) + 1;
      });

      // Format data for charts
      const statusData = Object.keys(statusCounts).map(key => ({
          name: t(`status.${key}`),
          value: statusCounts[key],
          count: statusCounts[key]
      }));

      const revenueChartData = Object.keys(revenueData).map(key => ({
          name: key,
          revenue: revenueData[key],
          pv: revenueData[key] * 0.8,
          amt: revenueData[key] * 1.2
      })).sort((a, b) => {
          if (timeRange === 'weekly') return parseInt(a.name.split(' ')[1]) - parseInt(b.name.split(' ')[1]);
          if (timeRange === 'yearly') return a.name - b.name;
          return new Date(`1 ${a.name} 2023`) - new Date(`1 ${b.name} 2023`);
      });

      const userSignupData = Object.keys(userSignups).map(key => ({
          name: key,
          users: userSignups[key]
      })).sort((a, b) => {
          if (timeRange === 'weekly') return parseInt(a.name.split(' ')[1]) - parseInt(b.name.split(' ')[1]);
          if (timeRange === 'yearly') return a.name - b.name;
          return new Date(`1 ${a.name} 2023`) - new Date(`1 ${b.name} 2023`);
      });

      // Calculate metrics
      const conversionRate = users.length > 0 
          ? (orders.length / users.length) * 100 
          : 0;

      const totalRevenue = orders.reduce((sum, order) => sum + (order.status === 'completed' ? order.total_price : 0), 0);
      const avgOrderValue = orders.length > 0 
          ? orders.reduce((sum, order) => sum + order.total_price, 0) / orders.length 
          : 0;

      setStats({
          totalOrders: orders.length,
          totalUsers: users.length,
          completedOrders: statusCounts.completed || 0,
          pendingOrders: statusCounts.pending || 0,
          totalRevenue,
          avgOrderValue,
          conversionRate,
          statusData,
          revenueChartData,
          userSignupData
      });
    };

    useEffect(() => {
        processData();
    }, [orders, users, timeRange, i18n.language]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            processData();
            setIsRefreshing(false);
        }, 1000);
    };

    const COLORS = [theme.primary, theme.secondary, theme.accent, theme.info, theme.danger];

    // Animation variants
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5 }
      },
      hover: {
        y: -5,
        transition: { duration: 0.2 }
      }
    };

    const chartVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.8 }
      }
    };

    if (loading) return (
        <MotionDiv 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="container mx-auto px-4 py-8 flex justify-center items-center h-64"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
            />
        </MotionDiv>
    );

    return (
        <MotionDiv 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="container mx-auto px-4 py-8"
        >
            {/* Header Section */}
            <motion.div 
                className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
                variants={slideUp}
            >
                <MotionH1 
                    variants={slideUp}
                    className="text-3xl font-bold text-gray-800 dark:text-white flex items-center"
                >
                    <IoStatsChart className="mr-3 text-indigo-600 dark:text-indigo-400" />
                    {t('dashboard.title')}
                </MotionH1>
                
                <motion.div 
                    className="flex items-center space-x-4 mt-4 md:mt-0"
                    variants={slideUp}
                >
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                        <FiCalendar className="text-gray-500" />
                        <select 
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-sm text-gray-700 dark:text-gray-300"
                        >
                            <option value="weekly">{t('dashboard.weekly')}</option>
                            <option value="monthly">{t('dashboard.monthly')}</option>
                            <option value="yearly">{t('dashboard.yearly')}</option>
                        </select>
                    </motion.div>
                    
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRefresh}
                        className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex items-center justify-center border border-gray-200 dark:border-gray-700"
                        title={t('dashboard.refresh')}
                    >
                        <FiRefreshCw className={`text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </motion.button>
                </motion.div>
            </motion.div>
            
            {stats && (
                <AnimatePresence>
                    {/* Stats Cards */}
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        {/* Total Revenue */}
                        <motion.div 
                            variants={cardVariants}
                            whileHover="hover"
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-indigo-500"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('dashboard.totalRevenue')}</p>
                                    <p className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">
                                        {new Intl.NumberFormat(i18n.language, { 
                                            style: 'currency', 
                                            currency: 'USD',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }).format(stats.totalRevenue)}
                                    </p>
                                    <div className="mt-3 flex items-center text-xs">
                                        <FiTrendingUp className="mr-1 text-green-500" />
                                        <span className="text-green-500">{t('dashboard.growth', {percent: 22, period: t(`dashboard.${timeRange}`)})}</span>
                                    </div>
                                </div>
                                <motion.div 
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-300"
                                >
                                    <RiExchangeDollarFill className="text-xl" />
                                </motion.div>
                            </div>
                        </motion.div>
                        
                        {/* Total Orders */}
                        <motion.div 
                            variants={cardVariants}
                            whileHover="hover"
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-blue-500"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('dashboard.totalOrders')}</p>
                                    <p className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">
                                        {stats.totalOrders.toLocaleString(i18n.language)}
                                    </p>
                                    <div className="mt-3 flex items-center text-xs">
                                        <FiTrendingUp className="mr-1 text-green-500" />
                                        <span className="text-green-500">{t('dashboard.growth', {percent: 12, period: t(`dashboard.${timeRange}`)})}</span>
                                    </div>
                                </div>
                                <motion.div 
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                                    className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300"
                                >
                                    <FiShoppingCart className="text-xl" />
                                </motion.div>
                            </div>
                        </motion.div>
                        
                        {/* Completed Orders */}
                        <motion.div 
                            variants={cardVariants}
                            whileHover="hover"
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-green-500"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('dashboard.completedOrders')}</p>
                                    <p className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">
                                        {stats.completedOrders.toLocaleString(i18n.language)}
                                    </p>
                                    <div className="mt-3 flex items-center text-xs">
                                        <FiTrendingUp className="mr-1 text-green-500" />
                                        <span className="text-green-500">{t('dashboard.growth', {percent: 8, period: t(`dashboard.${timeRange}`)})}</span>
                                    </div>
                                </div>
                                <motion.div 
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                                    className="p-3 bg-green-100 dark:bg-green-900 rounded-full text-green-600 dark:text-green-300"
                                >
                                    <FiCheckCircle className="text-xl" />
                                </motion.div>
                            </div>
                        </motion.div>
                        
                        {/* Total Users */}
                        <motion.div 
                            variants={cardVariants}
                            whileHover="hover"
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-purple-500"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('dashboard.totalUsers')}</p>
                                    <p className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">
                                        {stats.totalUsers.toLocaleString(i18n.language)}
                                    </p>
                                    <div className="mt-3 flex items-center text-xs">
                                        <FiTrendingUp className="mr-1 text-green-500" />
                                        <span className="text-green-500">{t('dashboard.growth', {percent: 15, period: t(`dashboard.${timeRange}`)})}</span>
                                    </div>
                                </div>
                                <motion.div 
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                                    className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-600 dark:text-purple-300"
                                >
                                    <FaUserPlus className="text-xl" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                    
                    {/* Main Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Revenue Area Chart */}
                        <motion.div 
                            variants={chartVariants}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg lg:col-span-2"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-white flex items-center mb-2 sm:mb-0">
                                    <FaChartLine className="mr-2 text-indigo-600" />
                                    {t('dashboard.revenueTrend')}
                                </h3>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full"
                                >
                                    <FiActivity className="mr-1" />
                                    <span>{t('dashboard.trend')}</span>
                                </motion.div>
                            </div>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats.revenueChartData}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={theme.primary} stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor={theme.primary} stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                                        <XAxis 
                                            dataKey="name" 
                                            tick={{ fill: '#6b7280' }}
                                            axisLine={false}
                                        />
                                        <YAxis 
                                            tick={{ fill: '#6b7280' }}
                                            axisLine={false}
                                            tickFormatter={(value) => new Intl.NumberFormat(i18n.language, { 
                                                style: 'currency', 
                                                currency: 'USD',
                                                maximumFractionDigits: 0
                                            }).format(value)}
                                        />
                                        <Tooltip 
                                            contentStyle={{
                                                borderRadius: '8px',
                                                border: 'none',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                backgroundColor: theme.dark
                                            }}
                                            formatter={(value) => [
                                                new Intl.NumberFormat(i18n.language, { 
                                                    style: 'currency', 
                                                    currency: 'USD',
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                }).format(value), 
                                                t('dashboard.revenue')
                                            ]}
                                            labelStyle={{ color: theme.light }}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="revenue" 
                                            stroke={theme.primary} 
                                            fillOpacity={1} 
                                            fill="url(#colorRevenue)" 
                                            name={t('dashboard.revenue')}
                                            strokeWidth={2}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                        
                        {/* Conversion Rate Radial Chart */}
                        <motion.div 
                            variants={chartVariants}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                        >
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-6 flex items-center">
                                <FiPieChart className="mr-2 text-indigo-600" />
                                {t('dashboard.conversionRate')}
                            </h3>
                            <div className="h-80 flex flex-col items-center justify-center">
                                <ResponsiveContainer width="100%" height="80%">
                                    <RadialBarChart 
                                        innerRadius="20%" 
                                        outerRadius="80%" 
                                        data={[{ name: 'Conversion', value: stats.conversionRate, fill: theme.secondary }]}
                                        startAngle={180} 
                                        endAngle={-180}
                                    >
                                        <RadialBar
                                            minAngle={15}
                                            label={{ 
                                                position: 'center', 
                                                fill: theme.dark,
                                                formatter: (value) => `${value.toFixed(1)}%`
                                            }}
                                            background
                                            clockWise
                                            dataKey="value"
                                        />
                                        <Tooltip 
                                            formatter={(value) => [`${value.toFixed(1)}%`, t('dashboard.conversionRate')]}
                                            contentStyle={{
                                                borderRadius: '8px',
                                                border: 'none',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                backgroundColor: theme.dark
                                            }}
                                            labelStyle={{ color: theme.light }}
                                        />
                                    </RadialBarChart>
                                </ResponsiveContainer>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                                    {t('dashboard.conversionDescription')}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                    
                    {/* Secondary Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Order Status Pie Chart */}
                        <motion.div 
                            variants={chartVariants}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-white flex items-center mb-2 sm:mb-0">
                                    <FaBoxOpen className="mr-2 text-indigo-600" />
                                    {t('dashboard.orderStatus')}
                                </h3>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full"
                                >
                                    <FiBarChart2 className="mr-1" />
                                    <span>{t('dashboard.distribution')}</span>
                                </motion.div>
                            </div>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={stats.statusData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius="60%"
                                            outerRadius="80%"
                                            paddingAngle={5}
                                            dataKey="value"
                                            nameKey="name"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            labelLine={false}
                                        >
                                            {stats.statusData.map((entry, index) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={COLORS[index % COLORS.length]} 
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            formatter={(value, name, props) => [
                                                value, 
                                                `${props.payload.name} (${Math.round(props.payload.percent * 100)}%)`
                                            ]}
                                            contentStyle={{
                                                borderRadius: '8px',
                                                border: 'none',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                backgroundColor: theme.dark
                                            }}
                                            labelStyle={{ color: theme.light }}
                                        />
                                        <Legend 
                                            layout="horizontal"
                                            verticalAlign="bottom"
                                            align="center"
                                            wrapperStyle={{ paddingTop: '20px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                        
                        {/* User Signups Line Chart */}
                        <motion.div 
                            variants={chartVariants}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-white flex items-center mb-2 sm:mb-0">
                                    <FaUserPlus className="mr-2 text-indigo-600" />
                                    {t('dashboard.userGrowth')}
                                </h3>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full"
                                >
                                    <FiTrendingUp className="mr-1" />
                                    <span>{t('dashboard.growth', {percent: 15, period: ''})}</span>
                                </motion.div>
                            </div>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={stats.userSignupData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                                        <XAxis 
                                            dataKey="name" 
                                            tick={{ fill: '#6b7280' }}
                                            axisLine={false}
                                        />
                                        <YAxis 
                                            tick={{ fill: '#6b7280' }}
                                            axisLine={false}
                                        />
                                        <Tooltip 
                                            contentStyle={{
                                                borderRadius: '8px',
                                                border: 'none',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                backgroundColor: theme.dark
                                            }}
                                            labelStyle={{ color: theme.light }}
                                        />
                                        <Legend />
                                        <Line 
                                            type="monotone" 
                                            dataKey="users" 
                                            stroke={theme.secondary} 
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6, stroke: theme.secondary, strokeWidth: 2, fill: theme.light }}
                                            name={t('dashboard.newUsers')}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>
                    
                    {/* Recent Activity Section */}
                    <motion.div 
                        variants={chartVariants}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-white flex items-center mb-2 sm:mb-0">
                                <FiActivity className="mr-2 text-indigo-600" />
                                {t('dashboard.recentActivity')}
                            </h3>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {t('dashboard.lastOrders', {count: 5})}
                            </div>
                        </div>
                        <div className="space-y-4">
                            {orders.slice(0, 5).map((order, index) => (
                                <motion.div 
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.01 }}
                                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-100 dark:border-gray-700"
                                >
                                    <div className="flex items-center mb-2 sm:mb-0">
                                        <div className={`p-3 rounded-full mr-4 ${
                                            order.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300' :
                                            'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                                        }`}>
                                            {order.status === 'completed' ? <FiCheckCircle /> : <FiPackage />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-white">
                                                {t('dashboard.order')} #{order.id.slice(0, 8).toUpperCase()}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Intl.DateTimeFormat(i18n.language, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }).format(new Date(order.$createdAt))}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="font-semibold text-gray-800 dark:text-white">
                                            {new Intl.NumberFormat(i18n.language, { 
                                                style: 'currency', 
                                                currency: 'USD',
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }).format(order.total_price)}
                                        </p>
                                        <span className={`text-xs px-2 py-1 rounded-full mt-1 ${
                                            order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                        }`}>
                                            {t(`status.${order.status}`)}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
        </MotionDiv>
    );
};

export default Dashboard;