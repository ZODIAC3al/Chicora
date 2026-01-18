import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaChevronUp,
  FaFileInvoiceDollar,
  FaUser,
} from "react-icons/fa";
import { StatusBadge } from "./StatusBadge";

export const OrderCard = ({
  order,
  isExpanded,
  onToggle,
  t,
  currentLanguage,
}) => {
  // Helpers strictly for display logic
  const formatId = (id) => (id?.length > 8 ? `${id.slice(0, 8)}...` : id);
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(currentLanguage, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  const price = order.details?.total_price || 0;
  const unitPrice = order.details?.quantity
    ? (price / order.details.quantity).toFixed(2)
    : "0.00";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Card Header (Always Visible) */}
      <div
        className={`p-4 cursor-pointer transition-colors ${isExpanded ? "bg-gray-50" : "hover:bg-gray-50"}`}
        onClick={() => onToggle(order.id)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm bg-gray-100">
              <img
                src={order.details?.image_url || "/service-placeholder.jpg"}
                alt={order.details?.service_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/service-placeholder.jpg";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-800 truncate">
                {order.details?.service_name ||
                  t("orderHistory.unknownService")}
              </h3>
              <p className="text-sm text-gray-500 flex flex-wrap items-center gap-x-2">
                <span className="truncate">#{formatId(order.id)}</span>
                <span>•</span>
                <span className="truncate">{formatDate(order.created_at)}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="text-right">
              <p className="font-semibold text-gray-800">${price.toFixed(2)}</p>
              <StatusBadge status={order.status} t={t} />
            </div>
            <div className="flex-shrink-0">
              {isExpanded ? (
                <FaChevronUp className="text-gray-400" />
              ) : (
                <FaChevronDown className="text-gray-400" />
              )}
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
            transition={{
              height: { duration: 0.3 },
              opacity: { duration: 0.2, delay: 0.1 },
            }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Order Specs */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <FaFileInvoiceDollar /> {t("orderHistory.orderDetails")}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("orderHistory.quantity")}
                    </span>
                    <span className="font-medium">
                      {order.details.quantity || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("orderHistory.unitPrice")}
                    </span>
                    <span className="font-medium">${unitPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("orderHistory.pickupDate")}
                    </span>
                    <span className="font-medium">
                      {formatDate(order.details.pickup_date)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <FaUser /> {t("orderHistory.additionalInfo")}
                </p>
                {order.details.special_instructions ? (
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {order.details.special_instructions}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded-lg">
                    {t("orderHistory.noSpecialInstructions")}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
