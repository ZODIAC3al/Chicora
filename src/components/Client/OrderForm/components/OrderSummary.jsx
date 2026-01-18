import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronUp, FiChevronDown, FiCheck } from "react-icons/fi";

export const OrderSummary = ({
  selectedService,
  formData,
  deliveryEstimate,
  t,
  currentLanguage,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {t("orderForm.orderSummary")}
        </label>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 text-sm flex items-center"
        >
          {isExpanded ? t("common.showLess") : t("common.showMore")}
          {isExpanded ? (
            <FiChevronUp className="ml-1" />
          ) : (
            <FiChevronDown className="ml-1" />
          )}
        </button>
      </div>

      <AnimatePresence>
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
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
                      {formData.pickup_date.toLocaleDateString(currentLanguage)}
                    </span>
                  </div>
                  {deliveryEstimate && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        {t("orderForm.estimatedDelivery")}
                      </span>
                      <span className="font-medium text-gray-800">
                        {deliveryEstimate.toLocaleDateString(currentLanguage)}
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
                        {(selectedService.price * formData.quantity).toFixed(2)}
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
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
