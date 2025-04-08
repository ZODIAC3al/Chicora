import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEdit,
  FaSave,
  FaHistory,
  FaSignOutAlt,
  FaLanguage,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaIdCard,
  FaTshirt,
  FaBox,
  FaMoneyBillWave,
  FaCreditCard,
  FaInfoCircle,
  FaPlus,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaFilter,
} from "react-icons/fa";
import { GiClothes, GiWashingMachine } from "react-icons/gi";
import { RiDashboardLine, RiVipCrownFill } from "react-icons/ri";
import { BsGenderAmbiguous, BsFillGearFill } from "react-icons/bs";

const ProfilePage = () => {
  const {
    currentLanguage,
    isRTL,
    changeLanguage,
    orders = [],
    loading: appLoading,
  } = useAppContext();
  const { profile, updateProfile, signOut, user } = useAuth();
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    date_of_birth: "",
    membership_level: "standard",
    preferred_language: currentLanguage,
    notification_preferences: true,
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Initialize form data with profile
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        gender: profile.gender || "",
        date_of_birth: profile.date_of_birth || "",
        membership_level: profile.membership_level || "standard",
        preferred_language: profile.preferred_language || currentLanguage,
        notification_preferences: profile.notification_preferences !== false,
      });
    }
  }, [profile, currentLanguage]);

  // Filter orders based on status and search query
  useEffect(() => {
    if (!appLoading && user) {
      let filtered = orders.filter(
        (order) =>
          order && order.user_id === user.id && order.details && order.id
      );

      if (statusFilter !== "all") {
        filtered = filtered.filter((order) => order.status === statusFilter);
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter((order) => {
          const serviceName = order.details.service_name?.toLowerCase() || "";
          return (
            order.id.toLowerCase().includes(query) ||
            serviceName.includes(query) ||
            order.status.toLowerCase().includes(query)
          );
        });
      }

      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setFilteredOrders(filtered);
    }
  }, [orders, statusFilter, searchQuery, appLoading, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    changeLanguage(newLanguage);
    setFormData((prev) => ({ ...prev, preferred_language: newLanguage }));
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Helper functions for orders
  const getServiceName = (order) => {
    return order?.details?.service_name || t("orderHistory.unknownService");
  };

  const getServicePrice = (order) => {
    return order?.details?.total_price || 0;
  };

  const getServiceImage = (order) => {
    return order?.details?.image_url || "/service-placeholder.jpg";
  };

  const getStatusIcon = (status) => {
    if (!status) return <FaFileInvoiceDollar className="text-blue-500" />;

    switch (status.toLowerCase()) {
      case "completed":
        return <FaCheckCircle className="text-green-500" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-500" />;
      case "in_progress":
        return <FaSpinner className="text-yellow-500 animate-spin" />;
      default:
        return <FaFileInvoiceDollar className="text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-blue-50 text-blue-700 border-blue-200";

    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      case "in_progress":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const formatOrderId = (id) => {
    if (!id) return "N/A";
    return id.length > 8 ? `${id.slice(0, 8)}...` : id;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(currentLanguage, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    },
  };

  if (!profile) return null;

  if (appLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8 ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header - Stack on mobile, row on desktop */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4"
        >
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full shadow-lg mr-3 md:mr-4"
            >
              <FaUser className="text-white text-xl md:text-2xl" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {t("profile.title")}
              </h1>
              <p className="text-blue-600 flex items-center text-sm md:text-base">
                <RiVipCrownFill className="mr-1" />
                {t(`profile.membership.${formData.membership_level}`)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center px-3 py-1 md:px-4 md:py-2 bg-white rounded-lg shadow-md text-blue-600 text-sm md:text-base"
            >
              <FaLanguage className="mr-1 md:mr-2" />
              {currentLanguage === "en" ? "العربية" : "English"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded-lg shadow-md text-sm md:text-base"
            >
              {isLoggingOut ? (
                <svg
                  className="animate-spin h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <FaSignOutAlt className="mr-1 md:mr-2" />
              )}
              {t("profile.logout")}
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content - Stack on mobile, sidebar + content on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Sidebar - Full width on mobile, 1 column on desktop */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-4 md:p-6">
                <div className="flex flex-col items-center mb-4 md:mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative mb-3 md:mb-4"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full blur opacity-75"></div>
                    <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                      <FaUser className="text-indigo-500 text-3xl md:text-4xl" />
                    </div>
                  </motion.div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 text-center">
                    {profile.name}
                  </h2>
                  <p className="text-blue-600 text-sm md:text-base text-center">
                    {profile.email}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1 flex items-center">
                    <FaIdCard className="mr-1" />
                    {profile.role === "admin"
                      ? t("profile.admin")
                      : t("profile.member")}
                  </p>
                </div>

                <nav className="space-y-1 md:space-y-2">
                  <motion.button
                    whileHover={{ x: isRTL ? -5 : 5 }}
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center px-3 py-2 md:px-4 md:py-3 rounded-lg transition ${
                      activeTab === "profile"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    } text-sm md:text-base`}
                  >
                    <FaUser
                      className={`mr-2 md:mr-3 ${
                        activeTab === "profile"
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                    />
                    {t("profile.profile")}
                  </motion.button>

                  <motion.button
                    whileHover={{ x: isRTL ? -5 : 5 }}
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center px-3 py-2 md:px-4 md:py-3 rounded-lg transition ${
                      activeTab === "orders"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    } text-sm md:text-base`}
                  >
                    <GiClothes
                      className={`mr-2 md:mr-3 ${
                        activeTab === "orders"
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                    />
                    {t("profile.orders")}
                  </motion.button>

                  <motion.button
                    whileHover={{ x: isRTL ? -5 : 5 }}
                    onClick={() => setActiveTab("preferences")}
                    className={`w-full flex items-center px-3 py-2 md:px-4 md:py-3 rounded-lg transition ${
                      activeTab === "preferences"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    } text-sm md:text-base`}
                  >
                    <BsFillGearFill
                      className={`mr-2 md:mr-3 ${
                        activeTab === "preferences"
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                    />
                    {t("profile.preferences")}
                  </motion.button>

                  {profile.role === "admin" && (
                    <motion.a
                      whileHover={{ x: isRTL ? -5 : 5 }}
                      href="/admin"
                      className="w-full flex items-center px-3 py-2 md:px-4 md:py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition text-sm md:text-base"
                    >
                      <RiDashboardLine className="mr-2 md:mr-3 text-gray-500" />
                      {t("profile.adminDashboard")}
                    </motion.a>
                  )}
                </nav>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Panel - Full width on mobile, 3 columns on desktop */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -50 : 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-white rounded-xl shadow-md overflow-hidden mb-4 md:mb-6"
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4 md:mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                          {t("profile.personalInfo")}
                        </h2>
                        {editMode ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSubmit}
                            className="flex items-center justify-center px-3 py-1 md:px-4 md:py-2 bg-green-500 text-white rounded-lg shadow-md text-sm md:text-base"
                          >
                            <FaSave className="mr-1 md:mr-2" />
                            {t("profile.save")}
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setEditMode(true)}
                            className="flex items-center justify-center px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white rounded-lg shadow-md text-sm md:text-base"
                          >
                            <FaEdit className="mr-1 md:mr-2" />
                            {t("profile.edit")}
                          </motion.button>
                        )}
                      </div>

                      <form className="space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          {/* Basic Info */}
                          <div className="space-y-3 md:space-y-4">
                            <div>
                              <label className="flex items-center text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                <FaUser className="mr-1 md:mr-2 text-blue-500" />
                                {t("profile.name")}
                              </label>
                              {editMode ? (
                                <input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  className="w-full px-3 py-1 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                                />
                              ) : (
                                <div className="px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-lg text-sm md:text-base">
                                  {profile.name || t("profile.notProvided")}
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="flex items-center text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                <FaPhone className="mr-1 md:mr-2 text-blue-500" />
                                {t("profile.phone")}
                              </label>
                              {editMode ? (
                                <input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  className="w-full px-3 py-1 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                                />
                              ) : (
                                <div className="px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-lg text-sm md:text-base">
                                  {profile.phone || t("profile.notProvided")}
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="flex items-center text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                <BsGenderAmbiguous className="mr-1 md:mr-2 text-blue-500" />
                                {t("profile.gender")}
                              </label>
                              {editMode ? (
                                <select
                                  name="gender"
                                  value={formData.gender}
                                  onChange={handleChange}
                                  className="w-full px-3 py-1 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                                >
                                  <option value="">
                                    {t("profile.selectGender")}
                                  </option>
                                  <option value="male">
                                    {t("profile.male")}
                                  </option>
                                  <option value="female">
                                    {t("profile.female")}
                                  </option>
                                  <option value="other">
                                    {t("profile.other")}
                                  </option>
                                </select>
                              ) : (
                                <div className="px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-lg text-sm md:text-base">
                                  {profile.gender
                                    ? t(`profile.${profile.gender}`)
                                    : t("profile.notProvided")}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className="space-y-3 md:space-y-4">
                            <div>
                              <label className="flex items-center text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                <FaMapMarkerAlt className="mr-1 md:mr-2 text-blue-500" />
                                {t("profile.address")}
                              </label>
                              {editMode ? (
                                <input
                                  type="text"
                                  name="address"
                                  value={formData.address}
                                  onChange={handleChange}
                                  className="w-full px-3 py-1 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                                />
                              ) : (
                                <div className="px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-lg text-sm md:text-base">
                                  {profile.address || t("profile.notProvided")}
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="flex items-center text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                <FaCalendarAlt className="mr-1 md:mr-2 text-blue-500" />
                                {t("profile.dateOfBirth")}
                              </label>
                              {editMode ? (
                                <input
                                  type="date"
                                  name="date_of_birth"
                                  value={formData.date_of_birth}
                                  onChange={handleChange}
                                  className="w-full px-3 py-1 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                                />
                              ) : (
                                <div className="px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-lg text-sm md:text-base">
                                  {profile.date_of_birth
                                    ? new Date(
                                        profile.date_of_birth
                                      ).toLocaleDateString()
                                    : t("profile.notProvided")}
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="flex items-center text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                <RiVipCrownFill className="mr-1 md:mr-2 text-blue-500" />
                                {t("profile.membership")}
                              </label>
                              {editMode ? (
                                <select
                                  name="membership_level"
                                  value={formData.membership_level}
                                  onChange={handleChange}
                                  className="w-full px-3 py-1 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                                >
                                  <option value="standard">
                                    {t("profile.membership.standard")}
                                  </option>
                                  <option value="premium">
                                    {t("profile.membership.premium")}
                                  </option>
                                  <option value="vip">
                                    {t("profile.membership.vip")}
                                  </option>
                                </select>
                              ) : (
                                <div className="px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-lg text-sm md:text-base">
                                  {t(
                                    `profile.membership.${formData.membership_level}`
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -50 : 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-white rounded-xl shadow-md overflow-hidden mb-4 md:mb-6"
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4 md:mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
                          <GiClothes className="text-blue-500 mr-1 md:mr-2" />
                          {t("profile.orderHistory")}
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-3">
                          {/* Search Bar */}
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaSearch className="text-gray-400" />
                            </div>
                            <input
                              type="text"
                              placeholder={t("orderHistory.search")}
                              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>

                          {/* Filter Dropdown */}
                          <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                            <FaFilter className="text-gray-500" />
                            <select
                              value={statusFilter}
                              onChange={(e) => setStatusFilter(e.target.value)}
                              className="px-3 py-1 border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-sm"
                            >
                              <option value="all">
                                {t("orderHistory.all")}
                              </option>
                              <option value="pending">
                                {t("orderHistory.pending")}
                              </option>
                              <option value="in_progress">
                                {t("orderHistory.in_progress")}
                              </option>
                              <option value="completed">
                                {t("orderHistory.completed")}
                              </option>
                              <option value="cancelled">
                                {t("orderHistory.cancelled")}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        {filteredOrders.length === 0 ? (
                          <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <GiWashingMachine className="mx-auto text-4xl text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                              {t("orderHistory.noOrders")}
                            </h3>
                            <p className="text-gray-500">
                              {t("orderHistory.noOrdersDescription")}
                            </p>
                          </div>
                        ) : (
                          filteredOrders.map((order) => (
                            <motion.div
                              key={order.id}
                              whileHover={{ scale: 1.01 }}
                              className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md transition"
                            >
                              <div
                                className="cursor-pointer"
                                onClick={() => toggleOrderExpansion(order.id)}
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg overflow-hidden shadow-sm">
                                      <img
                                        src={getServiceImage(order)}
                                        alt={getServiceName(order)}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.target.src =
                                            "/service-placeholder.jpg";
                                        }}
                                      />
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-gray-800 text-sm md:text-base">
                                        {getServiceName(order)}
                                      </h3>
                                      <p className="text-xs text-gray-500">
                                        #{formatOrderId(order.id)} •{" "}
                                        {formatDate(order.created_at)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between sm:justify-end gap-4">
                                    <div className="text-right">
                                      <p className="font-semibold text-gray-800 text-sm md:text-base">
                                        ${getServicePrice(order).toFixed(2)}
                                      </p>
                                      <span
                                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                          order.status
                                        )} flex items-center justify-end gap-1`}
                                      >
                                        {getStatusIcon(order.status)}
                                        <span>
                                          {t(
                                            `orderHistory.${order.status.replace(
                                              "_",
                                              ""
                                            )}`
                                          )}
                                        </span>
                                      </span>
                                    </div>
                                    <div className="flex-shrink-0">
                                      {expandedOrder === order.id ? (
                                        <FaChevronUp className="text-gray-400" />
                                      ) : (
                                        <FaChevronDown className="text-gray-400" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <AnimatePresence>
                                {expandedOrder === order.id && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                      height: "auto",
                                      opacity: 1,
                                      transition: {
                                        height: { duration: 0.3 },
                                        opacity: { duration: 0.2, delay: 0.1 },
                                      },
                                    }}
                                    exit={{
                                      height: 0,
                                      opacity: 0,
                                      transition: {
                                        height: { duration: 0.2 },
                                        opacity: { duration: 0.1 },
                                      },
                                    }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pt-3 mt-3 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-3">
                                      <div className="space-y-2">
                                        <p className="text-xs font-medium text-gray-500 flex items-center gap-2">
                                          <FaFileInvoiceDollar />
                                          {t("orderHistory.orderDetails")}
                                        </p>
                                        <div className="space-y-1">
                                          <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                              {t("orderHistory.quantity")}
                                            </span>
                                            <span className="font-medium">
                                              {order.details.quantity || "N/A"}
                                            </span>
                                          </div>
                                          <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                              {t("orderHistory.unitPrice")}
                                            </span>
                                            <span className="font-medium">
                                              $
                                              {order.details.quantity
                                                ? (
                                                    getServicePrice(order) /
                                                    order.details.quantity
                                                  ).toFixed(2)
                                                : "0.00"}
                                            </span>
                                          </div>
                                          <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                              {t("orderHistory.pickupDate")}
                                            </span>
                                            <span className="font-medium">
                                              {formatDate(
                                                order.details.pickup_date
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <p className="text-xs font-medium text-gray-500 flex items-center gap-2">
                                          <FaUser />
                                          {t("orderHistory.additionalInfo")}
                                        </p>
                                        {order.details.special_instructions ? (
                                          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                                            {order.details.special_instructions}
                                          </p>
                                        ) : (
                                          <p className="text-sm text-gray-400 italic bg-gray-50 p-2 rounded-lg">
                                            {t(
                                              "orderHistory.noSpecialInstructions"
                                            )}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Payment Methods */}
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <div className="p-4 md:p-6">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center mb-3 md:mb-4">
                        <FaCreditCard className="text-blue-500 mr-1 md:mr-2" />
                        {t("profile.paymentMethods")}
                      </h2>
                      <div className="space-y-3 md:space-y-4">
                        <div className="p-3 md:p-4 bg-blue-50 rounded-lg">
                          <div className="flex justify-between items-center gap-2">
                            <div className="flex items-center">
                              <div className="bg-blue-100 p-1 md:p-2 rounded-full mr-2 md:mr-3">
                                <FaCreditCard className="text-blue-600 text-sm md:text-base" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800 text-sm md:text-base">
                                  Visa •••• 4242
                                </h3>
                                <p className="text-gray-600 text-xs md:text-sm">
                                  {t("profile.expires")} 12/25
                                </p>
                              </div>
                            </div>
                            <button className="text-red-500 text-xs md:text-sm">
                              {t("profile.remove")}
                            </button>
                          </div>
                        </div>
                        <button className="w-full flex items-center justify-center px-3 py-2 md:px-4 md:py-3 border-2 border-dashed border-blue-300 text-blue-500 rounded-lg hover:bg-blue-50 transition text-sm md:text-base">
                          <FaPlus className="mr-1 md:mr-2" />
                          {t("profile.addPaymentMethod")}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "preferences" && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -50 : 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-white rounded-xl shadow-md overflow-hidden mb-4 md:mb-6"
                  >
                    <div className="p-4 md:p-6">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center mb-4 md:mb-6">
                        <BsFillGearFill className="text-blue-500 mr-1 md:mr-2" />
                        {t("profile.preferences")}
                      </h2>

                      <form className="space-y-4 md:space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3 md:mb-4">
                            {t("profile.languageSettings")}
                          </h3>
                          <div className="flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 bg-blue-50 rounded-lg gap-2">
                            <div className="flex items-center">
                              <FaLanguage className="text-blue-500 mr-1 md:mr-2" />
                              <span className="text-sm md:text-base">
                                {t("profile.preferredLanguage")}
                              </span>
                            </div>
                            <select
                              name="preferred_language"
                              value={formData.preferred_language}
                              onChange={handleChange}
                              className="px-2 py-1 md:px-3 md:py-1 border border-gray-300 rounded-md bg-white text-sm md:text-base"
                            >
                              <option value="en">English</option>
                              <option value="ar">العربية</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3 md:mb-4">
                            {t("profile.notificationSettings")}
                          </h3>
                          <div className="space-y-2 md:space-y-3">
                            <label className="flex items-center p-2 md:p-3 bg-blue-50 rounded-lg cursor-pointer">
                              <input
                                type="checkbox"
                                name="notification_preferences"
                                checked={formData.notification_preferences}
                                onChange={handleChange}
                                className="form-checkbox h-4 w-4 md:h-5 md:w-5 text-blue-600 rounded"
                              />
                              <span className="ml-2 md:ml-3 text-gray-700 text-sm md:text-base">
                                {t("profile.emailNotifications")}
                              </span>
                            </label>
                            <label className="flex items-center p-2 md:p-3 bg-blue-50 rounded-lg cursor-pointer">
                              <input
                                type="checkbox"
                                name="promotional_emails"
                                checked={formData.promotional_emails || false}
                                onChange={handleChange}
                                className="form-checkbox h-4 w-4 md:h-5 md:w-5 text-blue-600 rounded"
                              />
                              <span className="ml-2 md:ml-3 text-gray-700 text-sm md:text-base">
                                {t("profile.promotionalEmails")}
                              </span>
                            </label>
                          </div>
                        </div>

                        <div className="pt-3 md:pt-4 border-t border-gray-200">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3 md:mb-4">
                            {t("profile.accountPreferences")}
                          </h3>
                          <div className="flex flex-col space-y-2 md:space-y-4">
                            <button className="flex items-center px-3 py-2 md:px-4 md:py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm md:text-base">
                              <FaInfoCircle className="mr-1 md:mr-2" />
                              {t("profile.requestDataExport")}
                            </button>
                            <button className="flex items-center px-3 py-2 md:px-4 md:py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm md:text-base">
                              <FaInfoCircle className="mr-1 md:mr-2" />
                              {t("profile.deleteAccount")}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
