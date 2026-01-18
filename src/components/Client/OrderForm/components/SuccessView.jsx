import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

export const SuccessView = ({ t }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="p-8 sm:p-10 flex flex-col items-center justify-center text-center"
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
    <p className="text-gray-600 mb-6">{t("orderForm.successMessage")}</p>
    <div className="w-full h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
  </motion.div>
);
  