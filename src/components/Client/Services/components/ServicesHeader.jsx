import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { MotionH1, slideUp } from "../../../../context/AppContext"; // Adjust path

const ServicesHeader = ({ t, searchTerm, setSearchTerm, isRTL }) => {
  return (
    <>
      <MotionH1
        variants={slideUp}
        className="text-3xl font-bold text-center mb-8 text-gray-800"
      >
        {t("services.title")}
      </MotionH1>

      <motion.div
        variants={slideUp}
        className={`mb-8 max-w-md mx-auto ${isRTL ? "text-right" : "text-left"}`}
      >
        <div className="relative">
          <div
            className={`absolute inset-y-0 ${isRTL ? "right-0 pr-3" : "left-0 pl-3"} flex items-center pointer-events-none`}
          >
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t("services.searchPlaceholder")}
            className={`w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isRTL ? "pr-10 pl-4" : "pl-10 pr-4"}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>
    </>
  );
};

export default ServicesHeader;
