import { motion } from "framer-motion";
import { FiX, FiCalendar, FiClock } from "react-icons/fi";

export const ServiceSelector = ({
  services,
  selectedService,
  formData,
  deliveryEstimate,
  t,
  currentLanguage,
  isRTL,
  actions,
}) => (
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
        className={`flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <motion.img
          src={selectedService.image_url || "/service-placeholder.jpg"}
          alt={selectedService.name}
          className="w-20 h-20 object-cover rounded-lg mr-4 shadow-sm"
          whileHover={{ scale: 1.05 }}
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 text-lg">
            {selectedService.name}
          </h4>
          <div className="flex flex-wrap items-center mt-1 gap-2">
            <span className="text-blue-600 font-bold text-lg">
              ${selectedService.price}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 flex items-center">
              <FiCalendar className="mr-1" />
              {selectedService.delivery_days} {t("services.daysDelivery")}
            </span>
          </div>
          {deliveryEstimate && (
            <div className="mt-1 text-sm text-gray-500 flex items-center">
              <FiClock className="mr-1" />
              {t("orderForm.estimatedDelivery")}:{" "}
              {deliveryEstimate.toLocaleDateString(currentLanguage)}
            </div>
          )}
        </div>
        <motion.button
          type="button"
          onClick={() => actions.handleServiceChange("")}
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
          onChange={(e) => actions.handleServiceChange(e.target.value)}
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
);
