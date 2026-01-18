import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const EmptyState = ({ t, onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
      <div className="inline-block p-6 bg-blue-50 rounded-full mb-4">
        <FiX className="h-10 w-10 text-blue-500" />
      </div>
      <h3 className="text-xl font-medium text-gray-800 mb-2">
        {t("services.noServicesTitle")}
      </h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        {t("services.noServicesDescription")}
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
      >
        {t("services.resetSearch")}
      </button>
    </motion.div>
  );
};

export default EmptyState;
