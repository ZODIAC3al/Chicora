import { motion } from "framer-motion";
import {
  FiInfo,
  FiCheck,
  FiStar,
  FiCreditCard,
  FiShield,
  FiAward,
} from "react-icons/fi";
import { GiClothes } from "react-icons/gi";

const TrustIcon = ({ index }) => {
  switch (index) {
    case 0:
      return <FiCreditCard className="h-6 w-6 text-blue-500 mb-2" />;
    case 1:
      return <FiShield className="h-6 w-6 text-green-500 mb-2" />;
    case 2:
      return <FiAward className="h-6 w-6 text-yellow-500 mb-2" />;
    case 3:
      return <GiClothes className="h-6 w-6 text-purple-500 mb-2" />;
    default:
      return null;
  }
};

export const OrderSidebar = ({ t }) => (
  <div className="space-y-6">
    {/* What's Next */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <FiInfo className="text-blue-500 mr-2" />
          {t("orderForm.whatsNext")}
        </h3>
        <ul className="space-y-3">
          {t("orderForm.nextSteps", { returnObjects: true }).map(
            (step, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-3 mt-0.5">
                  <FiCheck />
                </div>
                <p className="text-gray-600">{step}</p>
              </li>
            ),
          )}
        </ul>
      </div>
    </motion.div>

    {/* Why Choose Us */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <FiStar className="text-yellow-500 mr-2" />
          {t("orderForm.whyChooseUs")}
        </h3>
        <ul className="space-y-3">
          {t("orderForm.benefits", { returnObjects: true }).map(
            (benefit, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-3 mt-0.5">
                  <FiCheck />
                </div>
                <p className="text-gray-600">{benefit}</p>
              </li>
            ),
          )}
        </ul>
      </div>
    </motion.div>

    {/* Trust Badges */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
          {t("orderForm.trustBadges.0")}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {t("orderForm.trustBadges", { returnObjects: true }).map(
            (badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 bg-gray-50 rounded-lg"
              >
                <TrustIcon index={index} />
                <p className="text-sm text-gray-600 text-center">{badge}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </motion.div>
  </div>
);
