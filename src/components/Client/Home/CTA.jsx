import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useAppContext,
  MotionH1,
  MotionP,
  MotionDiv,
  slideUp,
} from "../../../context/AppContext";

const CTA = () => {
  const { user } = useAppContext(); // Get user state directly
  const { t } = useTranslation();

  return (
    <div className="bg-blue-700">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <MotionH1
          variants={slideUp}
          className="text-3xl font-extrabold text-white sm:text-4xl"
        >
          <span className="block">{t("home.ready")}</span>
          <span className="block">{t("home.placeFirstOrder")}</span>
        </MotionH1>

        <MotionP
          variants={slideUp}
          className="mt-4 text-lg leading-6 text-blue-200"
        >
          {t("home.joinCustomers")}
        </MotionP>

        <MotionDiv variants={slideUp} className="mt-10">
          <Link
            to={user ? "/order" : "/auth"}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50"
          >
            {user ? t("home.placeNewOrder") : t("home.signUpNow")}
          </Link>
        </MotionDiv>
      </div>
    </div>
  );
};

export default CTA;
