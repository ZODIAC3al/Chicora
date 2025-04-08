import { useState, useEffect } from "react";
import {
  useAppContext,
  MotionDiv,
  fadeIn,
  slideUp,
  MotionH1,
  MotionP,
} from "../../context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useTranslation } from "react-i18next";
import { GiWashingMachine } from "react-icons/gi";
import {
  FiX,
  FiCheck,
  FiCalendar,
  FiShoppingCart,
  FiInfo,
  FiClock,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
const OrderForm = () => {
  const {
    services,
    user,
    createOrder,
    loading: appLoading,
    isRTL,
  } = useAppContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = queryParams.get("service");

  const [formData, setFormData] = useState({
    service_id: serviceId || "",
    quantity: 1,
    pickup_date: new Date(new Date().setHours(12, 0, 0, 0)), // Default to noon today
    special_instructions: "",
  });
  const [selectedService, setSelectedService] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);

  useEffect(() => {
    if (serviceId && services) {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        setSelectedService(service);
        setFormData((prev) => ({
          ...prev,
          service_id: serviceId,
        }));
        calculateDeliveryEstimate(service.delivery_days);
      }
    }
  }, [serviceId, services]);

  const calculateDeliveryEstimate = (deliveryDays) => {
    if (!deliveryDays) return;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    setDeliveryEstimate(deliveryDate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" ? Math.max(1, parseInt(value) || 1) : value,
    });
  };

  const handleDateChange = (date) => {
    if (!date) return;

    // Ensure time is set to noon for consistency
    const adjustedDate = new Date(date);
    adjustedDate.setHours(12, 0, 0, 0);

    setFormData({
      ...formData,
      pickup_date: adjustedDate,
    });
  };

  const handleServiceChange = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      calculateDeliveryEstimate(service.delivery_days);
    }
    setFormData({
      ...formData,
      service_id: serviceId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!user) {
        navigate("/login", { state: { from: location.pathname } });
        return;
      }

      // Validation
      if (!formData.service_id) {
        throw new Error(t("orderForm.selectServiceError"));
      }

      if (formData.quantity < 1) {
        throw new Error(t("orderForm.invalidQuantity"));
      }

      const selectedService = services.find(
        (s) => s.id === formData.service_id
      );
      if (!selectedService) {
        throw new Error(t("orderForm.invalidService"));
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(formData.pickup_date);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        throw new Error(t("orderForm.invalidPickupDate"));
      }

      // Prepare order data with proper UUID validation
      const orderData = {
        id: uuidv4(),
        service_id: formData.service_id,
        user_id: user.id,
        status: "pending",
        details: {
          quantity: formData.quantity,
          pickup_date: formData.pickup_date.toISOString(),
          total_price: selectedService.price * formData.quantity,
          image_url: selectedService.image_url || "/service-placeholder.jpg",
          special_instructions: formData.special_instructions,
          service_name: selectedService.name,
          estimated_delivery: deliveryEstimate?.toISOString(),
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Validate UUIDs
      if (!isValidUUID(orderData.service_id)) {
        throw new Error("Invalid service ID format");
      }

      if (!isValidUUID(orderData.user_id)) {
        throw new Error("Invalid user ID format");
      }

      // Create the order through context
      const createdOrder = await createOrder(orderData);

      // Show success animation before redirect
      setShowSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      navigate("/history", {
        state: {
          newOrder: createdOrder,
        },
      });
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  // Helper function to validate UUID
  const isValidUUID = (uuid) => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };

  if (appLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-14 w-14 border-[3px] border-blue-500 border-t-transparent"
        ></motion.div>
        <MotionP
          variants={slideUp}
          className="text-lg text-gray-600 font-medium"
        >
          {t("common.loading")}
        </MotionP>
      </div>
    );

  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container mx-auto px-4 sm:px-6 py-10"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="flex items-center mb-4">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              className="relative mr-3"
            >
              <div className="absolute -inset-1 bg-blue-100 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative flex items-center justify-center h-14 w-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full shadow-lg">
                <GiWashingMachine className="text-white text-2xl" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Chicora Pro
            </h1>
          </div>
          <MotionH1
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2"
          >
            {t("orderForm.title")}
          </MotionH1>
          <MotionP
            variants={slideUp}
            className="text-gray-500 text-center max-w-md"
          >
            {t("orderForm.subtitle")}
          </MotionP>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start"
              >
                <FiX className="flex-shrink-0 h-5 w-5 text-red-500 mr-3 mt-0.5" />
                <p className="text-red-700 font-medium">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {showSuccess ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-10 flex flex-col items-center justify-center text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green-100 rounded-full opacity-75 animate-ping"></div>
                  <div className="relative flex items-center justify-center h-16 w-16 bg-gradient-to-br from-green-500 to-green-400 rounded-full shadow-lg">
                    <FiCheck className="text-white text-3xl" />
                  </div>
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {t("orderForm.successTitle")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("orderForm.successMessage")}
              </p>
              <div className="w-full h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              {/* Service Selection */}
              <div className="space-y-3">
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("orderForm.service")}
                </label>
                {selectedService ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <motion.img
                      src={
                        selectedService.image_url || "/service-placeholder.jpg"
                      }
                      alt={selectedService.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4 shadow-sm"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-lg">
                        {selectedService.name}
                      </h4>
                      <div className="flex items-center mt-1">
                        <span className="text-blue-600 font-bold text-lg">
                          ${selectedService.price}
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-600 flex items-center">
                          <FiCalendar className="mr-1" />
                          {selectedService.delivery_days}{" "}
                          {t("services.daysDelivery")}
                        </span>
                      </div>
                      {deliveryEstimate && (
                        <div className="mt-1 text-sm text-gray-500 flex items-center">
                          <FiClock className="mr-1" />
                          {t("orderForm.estimatedDelivery")}:{" "}
                          {deliveryEstimate.toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => {
                        setSelectedService(null);
                        setFormData((prev) => ({ ...prev, service_id: "" }));
                        setDeliveryEstimate(null);
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiX className="h-5 w-5" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <select
                      id="service"
                      name="service_id"
                      value={formData.service_id}
                      onChange={(e) => handleServiceChange(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    >
                      <option value="">{t("orderForm.selectService")}</option>
                      {services
                        .filter((s) => s.is_active)
                        .map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name} (${service.price})
                          </option>
                        ))}
                    </select>
                  </motion.div>
                )}
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quantity */}
                <div className="space-y-3">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("orderForm.quantity")}
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </motion.div>
                </div>

                {/* Pickup Date */}
                <div className="space-y-3">
                  <label
                    htmlFor="pickup_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("orderForm.pickupDate")}
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="react-date-picker__wrapper"
                  >
                    <DatePicker
                      onChange={handleDateChange}
                      value={formData.pickup_date}
                      minDate={new Date()}
                      className="w-full border border-gray-300 rounded-xl"
                      calendarClassName="border border-gray-300 rounded-xl shadow-lg"
                      clearIcon={null}
                      required
                    />
                  </motion.div>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="space-y-3">
                <label
                  htmlFor="special_instructions"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("orderForm.specialInstructions")}
                </label>
                <motion.div whileHover={{ scale: 1.01 }}>
                  <textarea
                    id="special_instructions"
                    name="special_instructions"
                    value={formData.special_instructions}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder={t("orderForm.specialInstructionsPlaceholder")}
                  />
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  {t("orderForm.orderSummary")}
                </label>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 space-y-3"
                >
                  {selectedService ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                          {t("orderForm.service")}
                        </span>
                        <span className="font-medium text-gray-800">
                          {selectedService.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                          {t("orderForm.quantity")}
                        </span>
                        <span className="font-medium text-gray-800">
                          {formData.quantity}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                          {t("orderForm.pickupDate")}
                        </span>
                        <span className="font-medium text-gray-800">
                          {formData.pickup_date.toLocaleDateString()}
                        </span>
                      </div>
                      {deliveryEstimate && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">
                            {t("orderForm.estimatedDelivery")}
                          </span>
                          <span className="font-medium text-gray-800">
                            {deliveryEstimate.toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <div className="border-t border-blue-200 my-2"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                          {t("orderForm.subtotal")}
                        </span>
                        <div className="flex items-center">
                          <motion.span
                            key={formData.quantity}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="text-2xl md:text-3xl font-bold text-blue-600 mr-2"
                          >
                            $
                            {(
                              selectedService.price * formData.quantity
                            ).toFixed(2)}
                          </motion.span>
                          <FiCheck className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <span className="text-gray-500">
                      {t("orderForm.selectServiceTotal")}
                    </span>
                  )}
                </motion.div>
              </div>

              {/* Submit Button */}
              <div
                className={`flex ${
                  isRTL ? "justify-start" : "justify-end"
                } pt-4`}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !selectedService}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                  whileHover={{ scale: selectedService ? 1.02 : 1 }}
                  whileTap={{ scale: selectedService ? 0.98 : 1 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
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
                      <span className="font-medium">
                        {t("orderForm.processing")}
                      </span>
                    </>
                  ) : (
                    <>
                      <FiShoppingCart className="mr-2 h-5 w-5" />
                      <span className="font-medium text-lg">
                        {t("orderForm.placeOrder")}
                      </span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </MotionDiv>
  );
};

export default OrderForm;
