import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useAppContext,
  MotionH1,
  MotionP,
  MotionDiv,
  slideUp,
} from "../../../context/AppContext";
import { FiCheck } from "react-icons/fi"; // Example icon

const ServiceCard = ({ service, index, isRTL, t }) => (
  <MotionDiv
    variants={slideUp}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
  >
    <div className="px-6 py-8 sm:p-10 flex-grow">
      {/* Icon Wrapper */}
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-xl">
        {/* Using a dynamic icon or a standard one */}
        <FiCheck />
      </div>
      <div className="mt-5">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {service.name}
        </h3>
        <p className="mt-2 text-base text-gray-500">{service.description}</p>
        <div
          className={`mt-4 flex items-center ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <span className="text-2xl font-bold text-gray-900">
            ${service.price}
          </span>
          <span className={`${isRTL ? "mr-2" : "ml-2"} text-sm text-gray-500`}>
            • {service.delivery}
          </span>
        </div>
      </div>
    </div>
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
      <Link
        to="/order"
        className="text-base font-medium text-blue-600 hover:text-blue-500 flex items-center gap-1"
      >
        {t("services.orderNow")}{" "}
        <span aria-hidden="true" className={isRTL ? "rotate-180" : ""}>
          →
        </span>
      </Link>
    </div>
  </MotionDiv>
);

const FeaturedServices = () => {
  const { isRTL } = useAppContext(); // Self-contained
  const { t } = useTranslation(); // Self-contained

  // MEMOIZATION: Only recalculate this array if language changes
  const services = useMemo(
    () => [
      {
        name: t("home.standardService"),
        price: 12.99,
        delivery: t("home.delivery24"),
        description: t("home.standardServiceDesc"),
        featured: true,
      },
      {
        name: t("home.expressService"),
        price: 19.99,
        delivery: t("home.sameDay"),
        description: t("home.expressServiceDesc"),
        featured: true,
      },
      {
        name: t("home.premiumService"),
        price: 29.99,
        delivery: t("home.delivery48"),
        description: t("home.premiumServiceDesc"),
        featured: false,
      },
    ],
    [t],
  );

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <MotionH1
            variants={slideUp}
            className="text-base text-blue-600 font-semibold tracking-wide uppercase"
          >
            {t("home.services")}
          </MotionH1>
          <MotionP
            variants={slideUp}
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            {t("home.popularServices")}
          </MotionP>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((s) => s.featured)
              .map((service, index) => (
                <ServiceCard
                  key={service.name}
                  service={service}
                  index={index}
                  isRTL={isRTL}
                  t={t}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;
