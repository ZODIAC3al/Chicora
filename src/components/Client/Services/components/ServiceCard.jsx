import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiShoppingCart, FiLogIn } from "react-icons/fi";

const ServiceCard = ({ service, user, t, isRTL, variants }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full"
    >
      <div className="h-56 bg-gray-200 overflow-hidden relative">
        <img
          src={service.image_url || "/service-placeholder.jpg"}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.src = "/service-placeholder.jpg";
          }}
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {service.name}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">
          {service.description || t("services.defaultDescription")}
        </p>

        <div className="flex items-center text-gray-500 mb-4 text-sm">
          <FiClock
            className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"} text-gray-400`}
          />
          <span>{t("services.delivery", { days: service.delivery_days })}</span>
        </div>

        <div
          className={`flex justify-between items-center mt-auto ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <span className="text-2xl font-bold text-blue-600">
            ${service.price}
          </span>

          {user ? (
            <Link
              to={`/order?service=${service.id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center text-sm font-medium shadow-sm hover:shadow"
            >
              <FiShoppingCart
                className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`}
              />
              {t("services.orderNow")}
            </Link>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition flex items-center text-sm font-medium"
            >
              <FiLogIn className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t("services.loginToOrder")}
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
