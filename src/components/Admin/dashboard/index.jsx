import { useState } from "react";
import { useAppContext, MotionDiv, fadeIn } from "../../../context/AppContext"; // Adjust path
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

// Custom Hooks and Components
import { useDashboardData } from "./hooks/useDashboardData";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatsGrid } from "./components/StatsGrid";
import { ChartsSection } from "./components/ChartsSection";
import { UsersTable, OrdersTable } from "./components/Tables";
import { GiClothes } from "react-icons/gi";

const Dashboard = () => {
  const { user, loading: appLoading, isRTL } = useAppContext();
  const { t, i18n } = useTranslation();

  // Local UI State
  const [timeRange, setTimeRange] = useState("monthly");
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Logic extracted to hook
  const {
    loading: dataLoading,
    stats,
    refresh,
    updateOrderStatus,
    exportData,
  } = useDashboardData(timeRange, searchQuery, statusFilter);

  // Theme Constants
  const theme = {
    primary: "#4F46E5", // Indigo
    secondary: "#10B981", // Emerald
    accent: "#F59E0B", // Amber
    danger: "#EF4444", // Red
    info: "#3B82F6", // Blue
    dark: "#1F2937",
    light: "#F9FAFB",
    chartGrid: "#E5E7EB",
  };

  const COLORS = [
    theme.primary,
    theme.secondary,
    theme.accent,
    theme.info,
    theme.danger,
  ];

  const handleRefreshWrapper = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  };

  // Loading State
  if (appLoading || dataLoading || !stats) {
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
      <DashboardHeader
        user={user}
        t={t}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleRefresh={handleRefreshWrapper}
        isRefreshing={isRefreshing}
        handleExport={exportData}
      />

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto no-scrollbar">
        <div className="flex space-x-1 sm:space-x-0">
          {["overview", "users", "orders", "services"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-3 sm:px-4 text-sm sm:text-base font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setSearchQuery(""); // Reset search when switching tabs
                setStatusFilter("all");
              }}
            >
              {t(`dashboard.${tab}`)}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <StatsGrid stats={stats} t={t} i18n={i18n} />
            <ChartsSection
              stats={stats}
              theme={theme}
              t={t}
              i18n={i18n}
              COLORS={COLORS}
            />

            {/* Top Lists Section - kept inline as it's specific to dashboard view */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              {/* Top Services */}
              <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                  {t("dashboard.topServices")}
                </h3>
                <div className="space-y-2 sm:space-y-4">
                  {stats.topServices.map((service, index) => (
                    <div
                      key={service.id}
                      className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-400 w-4">
                          {index + 1}.
                        </span>
                        <span className="text-sm font-medium">
                          {service.name}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {service.orderCount} {t("dashboard.orders")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Users */}
              <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                  {t("dashboard.topCustomers")}
                </h3>
                <div className="space-y-2 sm:space-y-4">
                  {stats.topUsers.map((u, index) => (
                    <div
                      key={u.id}
                      className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-400 w-4">
                          {index + 1}.
                        </span>
                        <div>
                          <div className="text-sm font-medium">{u.name}</div>
                          <div className="text-xs text-gray-400">{u.email}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat(i18n.language, {
                          style: "currency",
                          currency: "USD",
                        }).format(u.totalSpent)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "users" && (
          <motion.div
            key="users"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <UsersTable
              users={stats.userAnalytics}
              t={t}
              isRTL={isRTL}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </motion.div>
        )}

        {activeTab === "orders" && (
          <motion.div
            key="orders"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <OrdersTable
              orders={stats.filteredOrders}
              t={t}
              isRTL={isRTL}
              updateStatus={updateOrderStatus}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </motion.div>
        )}

        {activeTab === "services" && (
          <motion.div
            key="services"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">
                  {t("dashboard.serviceAnalytics")}
                </h3>
                <input
                  type="text"
                  placeholder={t("dashboard.searchServices")}
                  className="border p-2 rounded text-sm w-full md:w-auto focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.serviceStats
                  .filter((s) =>
                    s.name.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                  .map((service) => (
                    <div
                      key={service.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-white"
                    >
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full mr-3">
                          <GiClothes />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {service.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {service.description ||
                              t("dashboard.noDescription")}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm space-y-2 pt-2 border-t border-gray-100">
                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            {t("dashboard.price")}:
                          </span>
                          <span className="font-medium">${service.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            {t("dashboard.totalOrders")}:
                          </span>
                          <span className="font-medium">
                            {service.orderCount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            {t("dashboard.revenue")}:
                          </span>
                          <span className="font-medium text-green-600">
                            {new Intl.NumberFormat(i18n.language, {
                              style: "currency",
                              currency: "USD",
                            }).format(service.totalRevenue)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
};

export default Dashboard;
