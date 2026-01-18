import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useAppContext,
  MotionH1,
  MotionP,
  MotionDiv,
  slideUp,
} from "../../../context/AppContext";

const Hero = () => {
  const { isRTL } = useAppContext();
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden pt-10 pb-8 sm:pt-16 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center ${isRTL ? "lg:text-right" : "lg:text-left"}`}
        >
          <MotionH1
            variants={slideUp}
            className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
          >
            <span className="block">{t("home.professional")}</span>
            <span className="block text-blue-600">{t("home.dryCleaning")}</span>
            <span className="block">{t("home.service")}</span>
          </MotionH1>

          <MotionP
            variants={slideUp}
            className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
          >
            {t("home.description")}
          </MotionP>

          <div
            className={`mt-5 sm:mt-8 sm:flex ${isRTL ? "sm:justify-end" : "sm:justify-start"}`}
          >
            <MotionDiv variants={slideUp} className="rounded-md shadow">
              <Link
                to="/order"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                {t("home.placeOrder")}
              </Link>
            </MotionDiv>
            <MotionDiv
              variants={slideUp}
              className={`mt-3 sm:mt-0 ${isRTL ? "sm:mr-3" : "sm:ml-3"}`}
            >
              <Link
                to="/services"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
              >
                {t("home.viewServices")}
              </Link>
            </MotionDiv>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
