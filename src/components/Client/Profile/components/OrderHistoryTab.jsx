import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaChevronDown,
  FaChevronUp,
  FaUser,
} from "react-icons/fa";
import { GiWashingMachine, GiClothes } from "react-icons/gi";

const OrderHistoryTab = ({
  orders,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  expandedOrderId,
  setExpandedOrderId,
  t,
  isRTL,
  currentLanguage,
}) => {
  // --- Helper Functions (Pure Display Logic) ---

  const getStatusConfig = (status) => {
    const s = status?.toLowerCase() || "";
    switch (s) {
      case "completed":
        return {
          icon: <FaCheckCircle />,
          color: "bg-green-50 text-green-700 border-green-200",
        };
      case "cancelled":
        return {
          icon: <FaTimesCircle />,
          color: "bg-red-50 text-red-700 border-red-200",
        };
      case "in_progress":
        return {
          icon: <FaSpinner className="animate-spin" />,
          color: "bg-yellow-50 text-yellow-700 border-yellow-200",
        };
      default:
        return {
          icon: <FaFileInvoiceDollar />,
          color: "bg-blue-50 text-blue-700 border-blue-200",
        };
    }
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

  const getServiceImage = (order) =>
    order?.details?.image_url || "/service-placeholder.jpg";
  const getServiceName = (order) =>
    order?.details?.service_name || t("orderHistory.unknownService");
  const getPrice = (order) => order?.details?.total_price || 0;

  // --- Render ---

  return (
    <motion.div
      initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isRTL ? -50 : 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center w-full md:w-auto">
              <GiClothes className="text-blue-500 mr-2" />
              {t("profile.orderHistory")}
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                <div
                  className={`absolute inset-y-0 ${isRTL ? "right-0 pr-3" : "left-0 pl-3"} flex items-center pointer-events-none`}
                >
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={t("orderHistory.search")}
                  className={`w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isRTL ? "pr-10 pl-4" : "pl-10 pr-4"}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <div
                  className={`absolute inset-y-0 ${isRTL ? "right-0 pr-3" : "left-0 pl-3"} flex items-center pointer-events-none`}
                >
                  <FaFilter className="text-gray-500" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`appearance-none bg-white border border-gray-300 text-gray-700 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full sm:w-auto ${isRTL ? "pr-10 pl-8" : "pl-10 pr-8"}`}
                >
                  <option value="all">{t("orderHistory.all")}</option>
                  <option value="pending">{t("orderHistory.pending")}</option>
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

          {/* Orders List */}
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <GiWashingMachine className="mx-auto text-4xl text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-500">
                  {t("orderHistory.noOrders")}
                </h3>
                <p className="text-sm text-gray-400">
                  {t("orderHistory.noOrdersDescription")}
                </p>
              </div>
            ) : (
              orders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const isExpanded = expandedOrderId === order.id;

                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white"
                  >
                    {/* Card Header (Clickable) */}
                    <div
                      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        setExpandedOrderId(isExpanded ? null : order.id)
                      }
                    >
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        {/* Left: Image & Info */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                            <img
                              src={getServiceImage(order)}
                              alt={getServiceName(order)}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "/service-placeholder.jpg";
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                              {getServiceName(order)}
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                              #{order.id.slice(0, 8).toUpperCase()} •{" "}
                              {formatDate(order.created_at)}
                            </p>
                          </div>
                        </div>

                        {/* Right: Status & Price */}
                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                          <div className="text-right">
                            <p className="font-bold text-gray-900 text-sm md:text-base">
                              ${getPrice(order).toFixed(2)}
                            </p>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${statusConfig.color}`}
                            >
                              {statusConfig.icon}
                              {t(
                                `orderHistory.${order.status.replace("_", "")}`,
                              )}
                            </span>
                          </div>
                          <div className="text-gray-400">
                            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-gray-50 border-t border-gray-100"
                        >
                          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {/* Detail Column 1 */}
                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-700 flex items-center gap-2">
                                <FaFileInvoiceDollar className="text-blue-500" />
                                {t("orderHistory.orderDetails")}
                              </h4>
                              <div className="bg-white p-3 rounded-lg border border-gray-100 space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    {t("orderHistory.quantity")}:
                                  </span>
                                  <span className="font-medium">
                                    {order.details?.quantity || 1}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    {t("orderHistory.unitPrice")}:
                                  </span>
                                  <span className="font-medium">
                                    $
                                    {(
                                      getPrice(order) /
                                      (order.details?.quantity || 1)
                                    ).toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    {t("orderHistory.pickupDate")}:
                                  </span>
                                  <span className="font-medium">
                                    {formatDate(order.details?.pickup_date)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Detail Column 2 (Notes) */}
                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-700 flex items-center gap-2">
                                <FaUser className="text-blue-500" />
                                {t("orderHistory.additionalInfo")}
                              </h4>
                              <div className="bg-white p-3 rounded-lg border border-gray-100 min-h-[88px]">
                                {order.details?.special_instructions ? (
                                  <p className="text-gray-600">
                                    {order.details.special_instructions}
                                  </p>
                                ) : (
                                  <p className="text-gray-400 italic text-xs">
                                    {t("orderHistory.noSpecialInstructions")}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderHistoryTab;
