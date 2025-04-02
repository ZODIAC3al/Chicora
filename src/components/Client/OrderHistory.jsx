import { useState, useEffect } from "react";
import {
  useAppContext,
  MotionDiv,
  fadeIn,
  slideUp,
  MotionH1,
} from "../../context/AppContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  FaLeaf, // Using this as the logo icon (replace with your preferred icon)
} from "react-icons/fa";
import { GiWashingMachine } from "react-icons/gi";

const OrderHistory = () => {
  const { orders, services, user, loading, isRTL } = useAppContext();
  const { t, i18n } = useTranslation();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const currentLanguage = i18n.language;

  useEffect(() => {
    if (orders && services) {
      let filtered = [...orders];

      if (statusFilter !== "all") {
        filtered = filtered.filter((order) => order.status === statusFilter);
      }

      filtered.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
      setFilteredOrders(filtered);
    }
  }, [orders, services, statusFilter]);

  const getServiceName = (serviceId) => {
    const service = services.find((s) => s.$id === serviceId);
    return service ? service.name : t("orderHistory.unknownService");
  };

  const getServicePrice = (serviceId) => {
    const service = services.find((s) => s.$id === serviceId);
    return service ? service.price : 0;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="inline mr-1" />;
      case "cancelled":
        return <FaTimesCircle className="inline mr-1" />;
      case "in_progress":
        return <FaSpinner className="inline mr-1 animate-spin" />;
      default:
        return <FaFileInvoiceDollar className="inline mr-1" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
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
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
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
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
       
          <MotionH1
            variants={slideUp}
            className="text-3xl font-bold text-gray-800 flex items-center gap-2"
          >
            <FaHistory className="text-blue-600" />
            {t("orderHistory.title")}
          </MotionH1>
        </div>

        <MotionDiv
          variants={slideUp}
          className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
            isRTL ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
            <FaFilter className="text-gray-500" />
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1 border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            >
              <option value="all">{t("orderHistory.all")}</option>
              <option value="pending">{t("orderHistory.pending")}</option>
              <option value="in_progress">
                {t("orderHistory.in_progress")}
              </option>
              <option value="completed">{t("orderHistory.completed")}</option>
              <option value="cancelled">{t("orderHistory.cancelled")}</option>
            </select>
          </div>

          <Link
            to="/order"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-md hover:from-blue-700 hover:to-blue-600 transition flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <FaPlus />
            {t("navbar.newOrder")}
          </Link>
        </MotionDiv>
      </div>

      {filteredOrders.length === 0 ? (
        <MotionDiv className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="max-w-md mx-auto">
            <MotionDiv variants={slideUp}>
              <FaFileInvoiceDollar className="mx-auto text-5xl text-gray-300 mb-4" />
            </MotionDiv>
            <MotionH1 variants={slideUp} className="text-gray-500 text-lg mb-6">
              {t("orderHistory.noOrders")}
            </MotionH1>
            <MotionDiv variants={slideUp}>
              <Link
                to="/order"
                className="mt-4 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-md hover:from-blue-700 hover:to-blue-600 transition shadow-md hover:shadow-lg"
              >
                <FaPlus className="mr-2" />
                {t("orderHistory.firstOrder")}
              </Link>
            </MotionDiv>
          </div>
        </MotionDiv>
      ) : (
        <MotionDiv className="overflow-hidden">
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-gray-700 font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaFileInvoiceDollar />
                      {t("orderHistory.orderId")}
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left text-gray-700 font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaTshirt />
                      {t("orderHistory.service")}
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left text-gray-700 font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaBoxes />
                      {t("orderHistory.quantity")}
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left text-gray-700 font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaMoneyBillWave />
                      {t("orderHistory.unitPrice")}
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left text-gray-700 font-medium uppercase tracking-wider">
                    {t("orderHistory.total")}
                  </th>
                  <th className="py-4 px-6 text-left text-gray-700 font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />
                      {t("orderHistory.pickupDate")}
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left text-gray-700 font-medium uppercase tracking-wider">
                    {t("orderHistory.status")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order, index) => (
                  <MotionDiv
                    key={order.$id}
                    variants={fadeIn}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                  >
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-gray-700 font-mono">
                        {order.$id.slice(0, 6)}...
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {getServiceName(order.service_id)}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {order.quantity}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        ${getServicePrice(order.service_id).toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-gray-700 font-semibold">
                        ${order.total_price.toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {new Date(order.pickup_date).toLocaleDateString(
                          currentLanguage
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order.status
                          )} border flex items-center gap-1`}
                        >
                          {getStatusIcon(order.status)}
                          {t(`orderHistory.${order.status.replace("_", "")}`)}
                        </span>
                      </td>
                    </tr>
                  </MotionDiv>
                ))}
              </tbody>
            </table>
          </div>
        </MotionDiv>
      )}
    </MotionDiv>
  );
};

export default OrderHistory;
