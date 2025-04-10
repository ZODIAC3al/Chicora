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
          (sum, order) => sum + (order.details.total_price || 0),
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
          (sum, order) => sum + (order.details.total_price || 0),
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
      { completed: 0, pending: 0, inProgress: 0, cancelled: 0 }
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
          (revenueByPeriod[period] || 0) + (order.details.total_price || 0);
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
      inProgressOrders: statusDistribution.inProgress,
      cancelledOrders: statusDistribution.cancelled,
      totalRevenue: filteredOrders.reduce(
        (sum, order) =>
          sum +
          (order.status === "completed" ? order.details.total_price || 0 : 0),
        0
      ),
      avgOrderValue:
        filteredOrders.length > 0
          ? filteredOrders.reduce(
              (sum, order) => sum + (order.details.total_price || 0),
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
    if (!allOrders.length || !allUsers.length || !allServices.length)
      return null;
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
      className="container mx-auto px-2 sm:px-4 py-6"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <MotionH1
            variants={slideUp}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900"
          >
            {t("dashboard.adminTitle")}
          </MotionH1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            {t("dashboard.welcomeBack")}, {user?.name || t("dashboard.admin")}
          </p>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 mt-3 sm:mt-0">
          <div className="flex items-center space-x-1 sm:space-x-2 bg-white rounded-lg p-1 sm:p-2 shadow-sm border border-gray-200">
            <FiCalendar className="text-gray-500 text-sm sm:text-base" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-xs sm:text-sm text-gray-700"
            >
              <option value="weekly">{t("dashboard.weekly")}</option>
              <option value="monthly">{t("dashboard.monthly")}</option>
              <option value="yearly">{t("dashboard.yearly")}</option>
            </select>
          </div>

          <button
            onClick={handleRefresh}
            className="p-1 sm:p-2 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition"
            title={t("dashboard.refresh")}
          >
            <FiRefreshCw
              className={`text-gray-500 text-sm sm:text-base ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Navigation Tabs - Scrollable on mobile */}
      <div className="flex border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto">
        <div className="flex space-x-1 sm:space-x-0">
          <button
            className={`py-2 px-3 sm:px-4 text-sm sm:text-base font-medium whitespace-nowrap ${
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
            className={`py-2 px-3 sm:px-4 text-sm sm:text-base font-medium whitespace-nowrap ${
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
            className={`py-2 px-3 sm:px-4 text-sm sm:text-base font-medium whitespace-nowrap ${
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
            className={`py-2 px-3 sm:px-4 text-sm sm:text-base font-medium whitespace-nowrap ${
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
              {/* Key Metrics - Adjusted for mobile */}
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow border-l-4 border-indigo-500"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500">
                        {t("dashboard.totalRevenue")}
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2 text-gray-900">
                        {new Intl.NumberFormat(i18n.language, {
                          style: "currency",
                          currency: "USD",
                        }).format(stats.totalRevenue)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {t("dashboard.last30Days")}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-indigo-100 rounded-lg text-indigo-600">
                      <FiDollarSign className="text-sm sm:text-base md:text-xl" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow border-l-4 border-blue-500"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500">
                        {t("dashboard.totalOrders")}
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2 text-gray-900">
                        {stats.totalOrders.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {stats.completedOrders} {t("dashboard.completed")}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-blue-100 rounded-lg text-blue-600">
                      <FiShoppingCart className="text-sm sm:text-base md:text-xl" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow border-l-4 border-green-500"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500">
                        {t("dashboard.activeUsers")}
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2 text-gray-900">
                        {stats.totalUsers.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {stats.conversionRate.toFixed(1)}%{" "}
                        {t("dashboard.conversion")}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-green-100 rounded-lg text-green-600">
                      <FiUsers className="text-sm sm:text-base md:text-xl" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow border-l-4 border-purple-500"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500">
                        {t("dashboard.services")}
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2 text-gray-900">
                        {stats.totalServices.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {stats.topServices[0]?.name ||
                          t("dashboard.noServices")}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-purple-100 rounded-lg text-purple-600">
                      <GiClothes className="text-sm sm:text-base md:text-xl" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Main Charts - Stack on mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                    {t("dashboard.revenueTrend")}
                  </h3>
                  <div className="h-60 sm:h-80">
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
                  className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                    {t("dashboard.orderStatus")}
                  </h3>
                  <div className="h-60 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.statusData}
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          innerRadius={30}
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

              {/* Top Performers - Stack on mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                    {t("dashboard.topServices")}
                  </h3>
                  <div className="space-y-2 sm:space-y-4">
                    {stats.topServices.map((service, index) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition"
                      >
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 mr-2 sm:mr-3 w-4 sm:w-6 text-center text-sm sm:text-base">
                            {index + 1}.
                          </span>
                          <span className="truncate text-sm sm:text-base">
                            {service.name}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
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
                  className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                    {t("dashboard.topCustomers")}
                  </h3>
                  <div className="space-y-2 sm:space-y-4">
                    {stats.topUsers.map((user, index) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition"
                      >
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 mr-2 sm:mr-3 w-4 sm:w-6 text-center text-sm sm:text-base">
                            {index + 1}.
                          </span>
                          <div>
                            <p className="font-medium text-sm sm:text-base">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-none">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
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
              className="w-full"
            >
              <div
                className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow"
                dir={isRTL ? "rtl" : "ltr"}
              >
                {/* Header with Search and Filter */}
                <div
                  className={`flex flex-col ${
                    isRTL ? "md:flex-row-reverse" : "md:flex-row"
                  } justify-between items-start md:items-center mb-4 sm:mb-6 gap-3`}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 whitespace-nowrap">
                    {t("dashboard.userManagement")}
                  </h3>
                  <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-grow">
                      <div
                        className={`absolute inset-y-0 ${
                          isRTL ? "right-0 pr-3" : "left-0 pl-3"
                        } flex items-center pointer-events-none`}
                      >
                        <FiSearch className="text-gray-400 text-sm sm:text-base" />
                      </div>
                      <input
                        type="text"
                        placeholder={t("dashboard.searchUsers")}
                        className={`w-full ${
                          isRTL ? "pr-8 pl-3" : "pl-8 pr-3"
                        } py-1 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <select
                        className={`w-full sm:w-auto px-3 py-1 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">{t("dashboard.allUsers")}</option>
                        <option value="active">{t("dashboard.active")}</option>
                        <option value="inactive">
                          {t("dashboard.inactive")}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Scrollable Table */}
                <div className="overflow-x-auto">
                  <div className="min-w-[600px]">
                    {" "}
                    {/* Minimum width for small screens */}
                    <table className="w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            className={`px-3 sm:px-4 py-2 text-${
                              isRTL ? "right" : "left"
                            } text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap`}
                          >
                            {t("dashboard.user")}
                          </th>
                          <th
                            className={`px-3 sm:px-4 py-2 text-${
                              isRTL ? "right" : "left"
                            } text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap`}
                          >
                            {t("dashboard.contact")}
                          </th>
                          <th
                            className={`px-3 sm:px-4 py-2 text-${
                              isRTL ? "right" : "left"
                            } text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap`}
                          >
                            {t("dashboard.orders")}
                          </th>
                          <th
                            className={`px-3 sm:px-4 py-2 text-${
                              isRTL ? "right" : "left"
                            } text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell`}
                          >
                            {t("dashboard.spending")}
                          </th>
                          <th
                            className={`px-3 sm:px-4 py-2 text-${
                              isRTL ? "right" : "left"
                            } text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell`}
                          >
                            {t("dashboard.lastActive")}
                          </th>
                          <th
                            className={`px-3 sm:px-4 py-2 text-${
                              isRTL ? "right" : "left"
                            } text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap`}
                          >
                            {t("dashboard.actions")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td
                              className={`px-3 sm:px-4 py-3 whitespace-nowrap`}
                            >
                              <div
                                className={`flex items-center ${
                                  isRTL ? "flex-row-reverse" : ""
                                }`}
                              >
                                <div className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-indigo-100 flex items-center justify-center">
                                  <FiUser className="text-indigo-600 text-sm sm:text-base" />
                                </div>
                                <div
                                  className={
                                    isRTL ? "mr-2 sm:mr-3" : "ml-2 sm:ml-3"
                                  }
                                >
                                  <div
                                    className={`text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap`}
                                  >
                                    {user.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {user.role || t("dashboard.customer")}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td
                              className={`px-3 sm:px-4 py-3 text-${
                                isRTL ? "right" : "left"
                              }`}
                            >
                              <div
                                className={`text-xs sm:text-sm text-gray-900 whitespace-nowrap`}
                              >
                                {user.email}
                              </div>
                              <div className="text-xs text-gray-500">
                                {user.phone || t("dashboard.noPhone")}
                              </div>
                            </td>
                            <td
                              className={`px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 font-medium text-${
                                isRTL ? "right" : "left"
                              }`}
                            >
                              {user.orderCount}
                            </td>
                            <td
                              className={`px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden sm:table-cell text-${
                                isRTL ? "right" : "left"
                              }`}
                            >
                              {new Intl.NumberFormat(i18n.language, {
                                style: "currency",
                                currency: "USD",
                              }).format(user.totalSpent)}
                            </td>
                            <td
                              className={`px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell text-${
                                isRTL ? "right" : "left"
                              }`}
                            >
                              {user.lastOrder
                                ? new Date(user.lastOrder).toLocaleDateString(
                                    i18n.language,
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )
                                : t("dashboard.never")}
                            </td>
                            <td
                              className={`px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-${
                                isRTL ? "left" : "right"
                              }`}
                            >
                              <button className="text-indigo-600 hover:text-indigo-900 mx-1">
                                {t("dashboard.view")}
                              </button>
                              <button className="text-gray-600 hover:text-gray-900 mx-1">
                                {t("dashboard.edit")}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                <div
                  className={`flex flex-col sm:flex-row items-center justify-between mt-3 sm:mt-4 gap-2 ${
                    isRTL ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <div className="text-xs sm:text-sm text-gray-700">
                    {t("dashboard.showing")}{" "}
                    {(currentPage - 1) * itemsPerPage + 1}-
                    {Math.min(
                      currentPage * itemsPerPage,
                      stats?.userAnalytics.length || 0
                    )}{" "}
                    {t("dashboard.of")} {stats?.userAnalytics.length || 0}{" "}
                    {t("dashboard.users")}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className={`flex items-center px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-indigo-600 hover:bg-indigo-50"
                      } ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      {isRTL ? (
                        <>
                          {t("dashboard.next")}
                          <FiChevronRight className="ml-1" />
                        </>
                      ) : (
                        <>
                          <FiChevronLeft className="mr-1" />
                          {t("dashboard.previous")}
                        </>
                      )}
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm ${
                            currentPage === pageNum
                              ? "bg-indigo-600 text-white"
                              : "text-indigo-600 hover:bg-indigo-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {totalPages > 5 && (
                      <span className="px-2 py-1 text-xs sm:text-sm text-gray-500">
                        ...
                      </span>
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`flex items-center px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-indigo-600 hover:bg-indigo-50"
                      } ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      {isRTL ? (
                        <>
                          {t("dashboard.previous")}
                          <FiChevronLeft className="ml-1" />
                        </>
                      ) : (
                        <>
                          {t("dashboard.next")}
                          <FiChevronRight className="mr-1" />
                        </>
                      )}
                    </button>
                  </div>
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
              <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {t("dashboard.orderManagement")}
                  </h3>
                  <div className="mt-2 md:mt-0 flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <div className="relative w-full sm:w-auto">
                      <input
                        type="text"
                        placeholder={t("dashboard.searchOrders")}
                        className="w-full pl-8 pr-3 py-1 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <FiSearch className="absolute left-2 sm:left-3 top-2 sm:top-3 text-gray-400 text-sm sm:text-base" />
                    </div>
                    <select
                      className="w-full sm:w-auto px-3 py-1 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">{t("dashboard.allStatus")}</option>
                      <option value="pending">{t("dashboard.pending")}</option>
                      <option value="inProgress">
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
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.orderId")}
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.customer")}
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                          {t("dashboard.service")}
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.amount")}
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.status")}
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          {t("dashboard.date")}
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("dashboard.actions")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stats.recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </td>
                          <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                            {order.user?.name || t("dashboard.unknown")}
                          </td>
                          <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                            {order.service?.name || t("dashboard.unknown")}
                          </td>
                          <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                            {new Intl.NumberFormat(i18n.language, {
                              style: "currency",
                              currency: "USD",
                            }).format(order.details.total_price || 0)}
                          </td>
                          <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(order.status)}
                              <span className="ml-1 sm:ml-2 capitalize text-xs sm:text-sm">
                                {order.status.replace("_", " ")}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">
                            {new Date(order.created_at).toLocaleDateString(
                              i18n.language
                            )}
                          </td>
                          <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                updateOrderStatus(order.id, e.target.value)
                              }
                              className="text-xs sm:text-sm border border-gray-300 rounded-md px-1 sm:px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
              <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {t("dashboard.serviceAnalytics")}
                  </h3>
                  <div className="mt-2 md:mt-0 relative w-full md:w-auto">
                    <input
                      type="text"
                      placeholder={t("dashboard.searchServices")}
                      className="w-full pl-8 pr-3 py-1 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FiSearch className="absolute left-2 sm:left-3 top-2 sm:top-3 text-gray-400 text-sm sm:text-base" />
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
