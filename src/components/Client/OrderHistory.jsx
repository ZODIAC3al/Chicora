import { useState, useEffect } from "react";
import { useAppContext, MotionDiv, fadeIn, slideUp, MotionH1, MotionP } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHistory,
  FaFilter,
  FaPlus,
  FaFileInvoiceDollar,
  FaTshirt,
  FaBoxes,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaUser
} from "react-icons/fa";
import { GiWashingMachine } from "react-icons/gi";

const OrderHistory = () => {
  const { orders = [], services = [], user, loading, isRTL } = useAppContext();
  const { t, i18n } = useTranslation();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const currentLanguage = i18n.language;

  useEffect(() => {
    if (!loading && user) {
      let filtered = orders.filter(order => 
        order && 
        order.user_id === user.id &&
        order.details && 
        order.id
      );

      if (statusFilter !== "all") {
        filtered = filtered.filter((order) => order.status === statusFilter);
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(order => {
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
  }, [orders, statusFilter, searchQuery, loading, user]);

  const getServiceName = (order) => {
    return order?.details?.service_name || t("orderHistory.unknownService");
  };

  const getServicePrice = (order) => {
    return order?.details?.total_price || 0;
  };

  const getServiceImage = (order) => {
    return order?.details?.image_url || '/service-placeholder.jpg';
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

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatOrderId = (id) => {
    if (!id) return "N/A";
    return id.length > 8 ? `${id.slice(0, 8)}...` : id;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(currentLanguage, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <MotionDiv
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex justify-center items-center h-64"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container mx-auto px-4 sm:px-6 py-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl shadow-lg">
            <FaHistory className="text-white text-2xl" />
          </div>
          <MotionH1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {t("orderHistory.title")}
          </MotionH1>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t("orderHistory.search")}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200 w-full sm:w-auto">
            <FaFilter className="text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1 border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-sm md:text-base"
            >
              <option value="all">{t("orderHistory.all")}</option>
              <option value="pending">{t("orderHistory.pending")}</option>
              <option value="in_progress">{t("orderHistory.in_progress")}</option>
              <option value="completed">{t("orderHistory.completed")}</option>
              <option value="cancelled">{t("orderHistory.cancelled")}</option>
            </select>
          </div>

          {/* New Order Button - Only visible on md and larger */}
          <Link
            to="/order"
            className="hidden sm:flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition shadow-md hover:shadow-lg whitespace-nowrap"
          >
            <FaPlus className="mr-2" />
            {t("navbar.newOrder")}
          </Link>
        </div>
      </div>

      {/* Floating New Order Button for mobile */}
      <div className="sm:hidden fixed bottom-6 right-6 z-10">
        <Link
          to="/order"
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <FaPlus className="text-xl" />
        </Link>
      </div>

      {/* Orders List */}
      <AnimatePresence>
        {filteredOrders.length === 0 ? (
          <MotionDiv
            key="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6"
            >
              <GiWashingMachine className="text-blue-500 text-4xl" />
            </motion.div>
            <MotionH1 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
              {t("orderHistory.noOrders")}
            </MotionH1>
            <MotionP className="text-gray-500 mb-6 max-w-md mx-auto px-4">
              {t("orderHistory.noOrdersDescription")}
            </MotionP>
            <Link
              to="/order"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition shadow-md hover:shadow-lg"
            >
              <FaPlus className="mr-2" />
              {t("orderHistory.firstOrder")}
            </Link>
          </MotionDiv>
        ) : (
          <motion.div
            key="orders-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="space-y-4"
          >
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.3, 
                    delay: index * 0.05,
                  }
                }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div 
                  className={`p-4 cursor-pointer transition-colors ${expandedOrder === order.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                  onClick={() => toggleOrderExpansion(order.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm">
                        <img 
                          src={getServiceImage(order)} 
                          alt={getServiceName(order)}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/service-placeholder.jpg';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-800 truncate">
                          {getServiceName(order)}
                        </h3>
                        <p className="text-sm text-gray-500 flex flex-wrap items-center gap-x-2">
                          <span className="truncate">#{formatOrderId(order.id)}</span>
                          <span>•</span>
                          <span className="truncate">{formatDate(order.created_at)}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          ${getServicePrice(order).toFixed(2)}
                        </p>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)} flex items-center justify-end sm:justify-start gap-1`}>
                          {getStatusIcon(order.status)}
                          <span className="hidden sm:inline">
                            {t(`orderHistory.${order.status.replace("_", "")}`)}
                          </span>
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        {expandedOrder === order.id ? 
                          <FaChevronUp className="text-gray-400" /> : 
                          <FaChevronDown className="text-gray-400" />
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedOrder === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: 'auto', 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3 },
                          opacity: { duration: 0.2, delay: 0.1 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.2 },
                          opacity: { duration: 0.1 }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-2 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                            <FaFileInvoiceDollar />
                            {t("orderHistory.orderDetails")}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">{t("orderHistory.quantity")}</span>
                              <span className="font-medium">{order.details.quantity || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">{t("orderHistory.unitPrice")}</span>
                              <span className="font-medium">
                                ${order.details.quantity ? (getServicePrice(order) / order.details.quantity).toFixed(2) : '0.00'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">{t("orderHistory.pickupDate")}</span>
                              <span className="font-medium">
                                {formatDate(order.details.pickup_date)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                            <FaUser />
                            {t("orderHistory.additionalInfo")}
                          </p>
                          {order.details.special_instructions ? (
                            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                              {order.details.special_instructions}
                            </p>
                          ) : (
                            <p className="text-gray-400 italic bg-gray-50 p-3 rounded-lg">
                              {t("orderHistory.noSpecialInstructions")}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
};

export default OrderHistory;