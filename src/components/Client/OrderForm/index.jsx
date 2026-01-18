import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiShoppingCart } from "react-icons/fi";
import { useOrderForm } from "./useOrderForm";

// Components
import { OrderHeader } from "./components/OrderHeader";
import { ServiceSelector } from "./components/ServiceSelector";
import { OrderInputs } from "./components/OrderInputs";
import { OrderSummary } from "./components/OrderSummary";
import { OrderSidebar } from "./components/OrderSidebar";
import { SuccessView } from "./components/SuccessView";

const OrderForm = () => {
  const { state, context, actions } = useOrderForm();
  const { t, isRTL, currentLanguage } = context;
  const {
    formData,
    selectedService,
    deliveryEstimate,
    error,
    isSubmitting,
    showSuccess,
    appLoading,
    services,
  } = state;

  if (appLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-14 w-14 border-[3px] border-blue-500 border-t-transparent"
        ></motion.div>
        <p className="text-lg text-gray-600 font-medium">
          {t("common.loading")}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 ${isRTL ? "text-right" : "text-left"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto">
        <OrderHeader t={t} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
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
                <SuccessView t={t} />
              ) : (
                <form
                  onSubmit={actions.handleSubmit}
                  className="p-6 sm:p-8 space-y-6"
                >
                  <ServiceSelector
                    services={services}
                    selectedService={selectedService}
                    formData={formData}
                    deliveryEstimate={deliveryEstimate}
                    t={t}
                    currentLanguage={currentLanguage}
                    isRTL={isRTL}
                    actions={actions}
                  />

                  <OrderInputs
                    formData={formData}
                    t={t}
                    currentLanguage={currentLanguage}
                    actions={actions}
                  />

                  <OrderSummary
                    selectedService={selectedService}
                    formData={formData}
                    deliveryEstimate={deliveryEstimate}
                    t={t}
                    currentLanguage={currentLanguage}
                  />

                  {/* Submit Button */}
                  <div
                    className={`flex ${isRTL ? "justify-start" : "justify-end"} pt-4`}
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <OrderSidebar t={t} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
