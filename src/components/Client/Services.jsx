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
import { motion } from "framer-motion";

const Services = () => {
  const { services, loading, user, isRTL } = useAppContext();
  const { t } = useTranslation();
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (services) {
      setFilteredServices(
        services.filter(
          (service) =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (service.description &&
              service.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        )
      );
    }
  }, [services, searchTerm]);

  if (loading) {
    return (
      <MotionDiv
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4 py-20 text-center"
      >
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">{t("common.loading")}</p>
      </MotionDiv>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container mx-auto px-4 py-12"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <MotionH1
        variants={slideUp}
        className="text-3xl font-bold text-center mb-8 text-gray-800"
      >
        {t("services.title")}
      </MotionH1>

      <motion.div
        variants={slideUp}
        className={`mb-8 max-w-md mx-auto ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        <div className="relative">
          <input
            type="text"
            placeholder={t("services.searchPlaceholder")}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredServices.map((service) => (
          <motion.div
            key={service.$id}
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div className="h-56 bg-gray-200 overflow-hidden">
              <img
                src={service.image_url}
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {service.description || t("services.defaultDescription")}
              </p>
              <div className="flex items-center text-gray-500 mb-4">
                <svg
                  className="h-5 w-5 mr-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  {t("services.delivery", { days: service.delivery_days })}
                </span>
              </div>
              <div
                className={`flex justify-between items-center ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <span className="text-2xl font-bold text-blue-600">
                  ${service.price}
                </span>
                {user ? (
                  <Link
                    to={`/order?service=${service.$id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {t("services.orderNow")}
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    {t("services.loginToOrder")}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredServices.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="inline-block p-6 bg-blue-50 rounded-full mb-4">
            <svg
              className="h-10 w-10 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            {t("services.noServicesTitle")}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            {t("services.noServicesDescription")}
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {t("services.resetSearch")}
          </button>
        </motion.div>
      )}
    </MotionDiv>
  );
};

export default Services;
