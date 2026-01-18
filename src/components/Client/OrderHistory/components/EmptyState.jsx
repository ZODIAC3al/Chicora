import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GiWashingMachine } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { MotionDiv, MotionH1, MotionP } from "../../../../context/AppContext"; // Adjust path

export const EmptyState = ({ t }) => {
  return (
    <MotionDiv
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
  );
};
