import { useState, useEffect, useMemo } from "react";
import {
  useAppContext,
  MotionDiv,
  fadeIn,
  slideUp,
  MotionH1,
} from "../../context/AppContext";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
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
} from "recharts";
import {
  FiDollarSign,
  FiUsers,
  FiShoppingCart,
  FiSearch,
  FiRefreshCw,
  FiCalendar,
  FiUser,
  FiServer,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { supabase } from "../../../lib/supabase";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user, loading: appLoading, isRTL } = useAppContext();
  const { t, i18n } = useTranslation();
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState("monthly");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [allOrders, setAllOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Color theme
  const theme = {
    primary: "#4F46E5", // Indigo
    secondary: "#10B981", // Emerald
    accent: "#F59E0B", // Amber
    danger: "#EF4444", // Red
    info: "#3B82F6", // Blue
    dark: "#1F2937", // Gray-800
    light: "#F9FAFB", // Gray-50
    textDark: "#111827", // Gray-900
    textLight: "#6B7280", // Gray-500
    cardBg: "#FFFFFF", // White
    chartGrid: "#E5E7EB", // Gray-200
  };

  const COLORS = [
    theme.primary,
    theme.secondary,
    theme.accent,
    theme.info,
    theme.danger,
  ];

  // Fetch all necessary data from Supabase
  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch orders with user and service details
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(
          `
          *,
          user:users(*),
          service:services(*)
        `
        )
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch all users
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (usersError) throw usersError;

      // Fetch all services
      const { data: servicesData, error: servicesError } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

      if (servicesError) throw servicesError;

      setAllOrders(ordersData || []);
      setAllUsers(usersData || []);
      setAllServices(servicesData || []);

      processDashboardData(ordersData, usersData, servicesData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error(t("dashboard.fetchError"));
    } finally {
      setLoading(false);
    }
  };

  // Process data for dashboard visualization
  const processDashboardData = (orders, users, services) => {
    if (!orders || !users || !services) return;

    // Filter orders based on search query and status filter
    let filteredOrders = [...orders];

    if (statusFilter !== "all") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === statusFilter
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredOrders = filteredOrders.filter((order) => {
        const userName = order.user?.name?.toLowerCase() || "";
        const serviceName = order.service?.name?.toLowerCase() || "";
        return (
          order.id.toLowerCase().includes(query) ||
          userName.includes(query) ||
          serviceName.includes(query) ||
          order.status.toLowerCase().includes(query)
        );
      });
    }

    // Calculate service statistics
    const serviceStats = services.map((service) => {
      const serviceOrders = filteredOrders.filter(
        (order) => order.service_id === service.id
      );
      return {
        ...service,
        orderCount: serviceOrders.length,
        totalRevenue: serviceOrders.reduce(
          (sum, order) => sum + (order.total_price || 0),
          0
        ),
        pendingOrders: serviceOrders.filter((o) => o.status === "pending")
          .length,
        completedOrders: serviceOrders.filter((o) => o.status === "completed")
          .length,
      };
    });

    // User analytics
    const userAnalytics = users.map((user) => {
      const userOrders = filteredOrders.filter(
        (order) => order.user_id === user.id
      );
      return {
        ...user,
        orderCount: userOrders.length,
        totalSpent: userOrders.reduce(
          (sum, order) => sum + (order.total_price || 0),
          0
        ),
        lastOrder: userOrders.length > 0 ? userOrders[0].created_at : null,
      };
    });

    // Order status distribution
    const statusDistribution = filteredOrders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      { completed: 0, pending: 0, in_progress: 0, cancelled: 0 }
    );

    // Revenue by time period
    const revenueByPeriod = {};
    const now = new Date();

    filteredOrders.forEach((order) => {
      if (order.status === "completed") {
        let period;
        const orderDate = new Date(order.created_at);

        if (timeRange === "weekly") {
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay());
          const weekNum =
            Math.floor((orderDate - weekStart) / (7 * 24 * 60 * 60 * 1000)) + 1;
          period = `${t("dashboard.week")} ${weekNum}`;
        } else if (timeRange === "monthly") {
          period = new Intl.DateTimeFormat(i18n.language, {
            month: "short",
          }).format(orderDate);
        } else {
          // yearly
          period = orderDate.getFullYear();
        }

        revenueByPeriod[period] =
          (revenueByPeriod[period] || 0) + (order.total_price || 0);
      }
    });

    // Format data for charts
    const revenueChartData = Object.keys(revenueByPeriod)
      .map((key) => ({
        name: key,
        revenue: revenueByPeriod[key],
      }))
      .sort((a, b) => {
        if (timeRange === "weekly")
          return (
            parseInt(a.name.split(" ")[1]) - parseInt(b.name.split(" ")[1])
          );
        if (timeRange === "yearly") return a.name - b.name;
        return new Date(`1 ${a.name} 2023`) - new Date(`1 ${b.name} 2023`);
      });

    const statusData = Object.keys(statusDistribution).map((status) => ({
      name: t(`status.${status}`),
      value: statusDistribution[status],
      status: status,
    }));

    // Top performing services
    const topServices = [...serviceStats]
      .sort((a, b) => b.orderCount - a.orderCount)
      .slice(0, 5);

    // Top spending users
    const topUsers = [...userAnalytics]
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);

    // Recent orders with all details
    const recentOrders = [...filteredOrders]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10);

    setStats({
      totalOrders: filteredOrders.length,
      totalUsers: users.length,
      totalServices: services.length,
      completedOrders: statusDistribution.completed,
      pendingOrders: statusDistribution.pending,
      inProgressOrders: statusDistribution.in_progress,
      cancelledOrders: statusDistribution.cancelled,
      totalRevenue: filteredOrders.reduce(
        (sum, order) =>
          sum + (order.status === "completed" ? order.total_price || 0 : 0),
        0
      ),
      avgOrderValue:
        filteredOrders.length > 0
          ? filteredOrders.reduce(
              (sum, order) => sum + (order.total_price || 0),
              0
            ) / filteredOrders.length
          : 0,
      conversionRate:
        users.length > 0 ? (filteredOrders.length / users.length) * 100 : 0,
      revenueChartData,
      statusData,
      serviceStats,
      userAnalytics,
      topServices,
      topUsers,
      recentOrders,
      filteredOrders,
    });
  };

  // Memoize processed data
  const processedData = useMemo(() => {
    if (!allOrders.length || !allUsers.length || !allServices.length) return null;
    return processDashboardData(allOrders, allUsers, allServices);
  }, [allOrders, allUsers, allServices, timeRange, searchQuery, statusFilter]);

  const getStatusIcon = (status) => {
    if (!status) return <FiServer className="text-blue-500" />;

    switch (status.toLowerCase()) {
      case "completed":
        return <FaCheckCircle className="text-green-500" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-500" />;
      case "in_progress":
        return <FaSpinner className="text-yellow-500 animate-spin" />;
      default:
        return <FiServer className="text-blue-500" />;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
    toast.success(t("dashboard.dataRefreshed"));
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId)
        .select();

      if (error) throw error;

      // Refresh data after update
      await fetchData();
      toast.success(t("dashboard.statusUpdated"));
      return data;
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(t("dashboard.updateError"));
      throw error;
    }
  };

  // Calculate paginated data
  const paginatedUsers = useMemo(() => {
    if (!stats?.userAnalytics) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return stats.userAnalytics.slice(start, start + itemsPerPage);
  }, [stats?.userAnalytics, currentPage]);

  const totalPages = useMemo(() => {
    if (!stats?.userAnalytics) return 0;
    return Math.ceil(stats.userAnalytics.length / itemsPerPage);
  }, [stats?.userAnalytics]);

  useEffect(() => {
    fetchData();
  }, [timeRange, i18n.language, searchQuery, statusFilter]);

  if (appLoading || loading) {
    return (
      <MotionDiv
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4 py-8 flex justify-center items-center h-64"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"
        />
      </MotionDiv>
    );
  }

  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container mx-auto px-4 py-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <MotionH1
            variants={slideUp}
            className="text-2xl md:text-3xl font-bold text-gray-900"
          >
            {t("dashboard.adminTitle")}
          </MotionH1>
          <p className="text-gray-500 mt-1">
            {t("dashboard.welcomeBack")}, {user?.name || t("dashboard.admin")}
          </p>
        </div>

        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-sm border border-gray-200">
            <FiCalendar className="text-gray-500" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm text-gray-700"
            >
              <option value="weekly">{t("dashboard.weekly")}</option>
              <option value="monthly">{t("dashboard.monthly")}</option>
              <option value="yearly">{t("dashboard.yearly")}</option>
            </select>
          </div>

          <button
            onClick={handleRefresh}
            className="p-2 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition"
            title={t("dashboard.refresh")}
          >
            <FiRefreshCw
              className={`text-gray-500 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          className={`py-2 px-4 font-medium whitespace-nowrap ${
            activeTab === "overview"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("overview");
            setCurrentPage(1);
          }}
        >
          {t("dashboard.overview")}
        </button>
        <button
          className={`py-2 px-4 font-medium whitespace-nowrap ${
            activeTab === "users"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("users");
            setCurrentPage(1);
          }}
        >
          {t("dashboard.users")}
        </button>
        <button
          className={`py-2 px-4 font-medium whitespace-nowrap ${
            activeTab === "orders"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("orders");
            setCurrentPage(1);
          }}
        >
          {t("dashboard.orders")}
        </button>
        <button
          className={`py-2 px-4 font-medium whitespace-nowrap ${
            activeTab === "services"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("services");
            setCurrentPage(1);
          }}
        >
          {t("dashboard.services")}
        </button>
      </div>

      {stats && (
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t("dashboard.totalRevenue")}
                      </p>
                      <p className="text-2xl font-bold mt-2 text-gray-900">
                        {new Intl.NumberFormat(i18n.language, {
                          style: "currency",
                          currency: "USD",
                        }).format(stats.totalRevenue)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {t("dashboard.last30Days")}
                      </p>
                    </div>
                    <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                      <FiDollarSign className="text-xl" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t("dashboard.totalOrders")}
                      </p>
                      <p className="text-2xl font-bold mt-2 text-gray-900">
                        {stats.totalOrders.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {stats.completedOrders} {t("dashboard.completed")}
                      </p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      <FiShoppingCart className="text-xl" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t("dashboard.activeUsers")}
                      </p>
                      <p className="text-2xl font-bold mt-2 text-gray-900">
                        {stats.totalUsers.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {stats.conversionRate.toFixed(1)}%{" "}
                        {t("dashboard.conversion")}
                      </p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg text-green-600">
                      <FiUsers className="text-xl" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t("dashboard.services")}
                      </p>
                      <p className="text-2xl font-bold mt-2 text-gray-900">
                        {stats.totalServices.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {stats.topServices[0]?.name ||
                          t("dashboard.noServices")}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                      <GiClothes className="text-xl" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Main Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white p-6 rounded-lg shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {t("dashboard.revenueTrend")}
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats.revenueChartData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={theme.chartGrid}
                        />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [
                            new Intl.NumberFormat(i18n.language, {
                              style: "currency",
                              currency: "USD",
                            }).format(value),
                            t("dashboard.revenue"),
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke={theme.primary}
                          fill={theme.primary}
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white p-6 rounded-lg shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {t("dashboard.orderStatus")}
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.statusData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {stats.statusData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [value, t("dashboard.orders")]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              {/* Top Performers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white p-6 rounded-lg shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {t("dashboard.topServices")}
                  </h3>
                  <div className="space-y-4">
                    {stats.topServices.map((service, index) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition"
                      >
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 mr-3 w-6 text-center">
                            {index + 1}.
                          </span>
                          <span className="truncate">{service.name}</span>
                        </div>
                        <div className="text-sm text-gray-500 whitespace-nowrap">
                          {service.orderCount} {t("dashboard.orders")} •{" "}
                          {new Intl.NumberFormat(i18n.language, {
                            style: "currency",
                            currency: "USD",
                          }).format(service.totalRevenue)}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white p-6 rounded-lg shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {t("dashboard.topCustomers")}
                  </h3>
                  <div className="space-y-4">
                    {stats.topUsers.map((user, index) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition"
                      >
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 mr-3 w-6 text-center">
                            {index + 1}.
                          </span>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 whitespace-nowrap">
                          {user.orderCount} {t("dashboard.orders")} •{" "}
                          {new Intl.NumberFormat(i18n.language, {
                            style: "currency",
                            currency: "USD",
                          }).format(user.totalSpent)}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("dashboard.userManagement")}
                  </h3>
                  <div className="mt-2 md:mt-0 relative">
                    <input
                      type="text"
                      placeholder={t("dashboard.searchUsers")}
                      className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.name")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.email")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.phone")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.orders")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.totalSpent")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.lastActivity")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <FiUser className="text-indigo-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {user.role || "customer"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.phone || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.orderCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Intl.NumberFormat(i18n.language, {
                              style: "currency",
                              currency: "USD",
                            }).format(user.totalSpent)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.lastOrder
                              ? new Date(user.lastOrder).toLocaleDateString(
                                  i18n.language
                                )
                              : t("dashboard.never")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Controls */}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center px-3 py-1 rounded-md ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    <FiChevronLeft className="mr-1" />
                    {t("dashboard.previous")}
                  </button>
                  <span className="text-sm text-gray-700">
                    {t("dashboard.page")} {currentPage} {t("dashboard.of")}{" "}
                    {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-3 py-1 rounded-md ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    {t("dashboard.next")}
                    <FiChevronRight className="ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("dashboard.orderManagement")}
                  </h3>
                  <div className="mt-2 md:mt-0 flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t("dashboard.searchOrders")}
                        className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <select
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">{t("dashboard.allStatus")}</option>
                      <option value="pending">{t("dashboard.pending")}</option>
                      <option value="in_progress">
                        {t("dashboard.inProgress")}
                      </option>
                      <option value="completed">
                        {t("dashboard.completed")}
                      </option>
                      <option value="cancelled">
                        {t("dashboard.cancelled")}
                      </option>
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.orderId")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.customer")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.service")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.amount")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.status")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.date")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.actions")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stats.recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.user?.name || t("dashboard.unknown")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.service?.name || t("dashboard.unknown")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Intl.NumberFormat(i18n.language, {
                              style: "currency",
                              currency: "USD",
                            }).format(order.total_price || 0)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(order.status)}
                              <span className="ml-2 capitalize">
                                {order.status.replace("_", " ")}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString(
                              i18n.language
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                updateOrderStatus(order.id, e.target.value)
                              }
                              className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                              <option value="pending">
                                {t("dashboard.pending")}
                              </option>
                              <option value="in_progress">
                                {t("dashboard.inProgress")}
                              </option>
                              <option value="completed">
                                {t("dashboard.completed")}
                              </option>
                              <option value="cancelled">
                                {t("dashboard.cancelled")}
                              </option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("dashboard.serviceAnalytics")}
                  </h3>
                  <div className="mt-2 md:mt-0 relative">
                    <input
                      type="text"
                      placeholder={t("dashboard.searchServices")}
                      className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stats.serviceStats.map((service) => (
                    <motion.div
                      key={service.id}
                      whileHover={{ y: -5 }}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                    >
                      <div className="flex items-center mb-3">
                        <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mr-3">
                          <GiClothes />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {service.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {service.description ||
                              t("dashboard.noDescription")}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            {t("dashboard.price")}:
                          </span>
                          <span className="font-medium">
                            {new Intl.NumberFormat(i18n.language, {
                              style: "currency",
                              currency: "USD",
                            }).format(service.price || 0)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            {t("dashboard.totalOrders")}:
                          </span>
                          <span className="font-medium">
                            {service.orderCount}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            {t("dashboard.revenue")}:
                          </span>
                          <span className="font-medium">
                            {new Intl.NumberFormat(i18n.language, {
                              style: "currency",
                              currency: "USD",
                            }).format(service.totalRevenue)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            {t("dashboard.pending")}:
                          </span>
                          <span className="font-medium">
                            {service.pendingOrders}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            {t("dashboard.completed")}:
                          </span>
                          <span className="font-medium">
                            {service.completedOrders}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </MotionDiv>
  );
};

export default Dashboard;