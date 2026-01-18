import { motion } from "framer-motion";
import { GiWashingMachine } from "react-icons/gi";

export const OrderHeader = ({ t }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center mb-8 sm:mb-12"
  >
    <motion.div
      animate={{
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
      className="relative mb-4"
    >
      <div className="absolute -inset-1 bg-blue-100 rounded-full blur opacity-75 animate-pulse"></div>
      <div className="relative flex items-center justify-center h-16 w-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full shadow-lg">
        <GiWashingMachine className="text-white text-2xl" />
      </div>
    </motion.div>
    <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-2">
      {t("orderForm.title")}
    </h1>
    <p className="text-gray-500 text-center max-w-md">
      {t("orderForm.subtitle")}
    </p>
  </motion.div>
);
