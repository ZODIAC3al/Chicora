import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  MotionH1,
  MotionP,
  MotionDiv,
  slideUp,
} from "../../../context/AppContext";
import { FiMousePointer, FiTruck, FiRefreshCw } from "react-icons/fi"; // Clean icons

const StepCard = ({ step, index }) => (
  <MotionDiv
    variants={slideUp}
    transition={{ delay: index * 0.1 }}
    className="pt-6 h-full"
  >
    <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow h-full hover:shadow-md transition-shadow">
      <div className="-mt-6">
        <div>
          <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg text-white text-2xl">
            {/* Render the Icon Component passed in props */}
            <step.icon />
          </span>
        </div>
        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
          {step.name}
        </h3>
        <p className="mt-5 text-base text-gray-500">{step.description}</p>
      </div>
    </div>
  </MotionDiv>
);

const HowItWorks = () => {
  const { t } = useTranslation();

  // MEMOIZATION + React Icons
  const steps = useMemo(
    () => [
      {
        name: t("home.placeOrder"),
        description: t("home.placeOrderDesc"),
        icon: FiMousePointer,
      },
      {
        name: t("home.weCollect"),
        description: t("home.weCollectDesc"),
        icon: FiTruck,
      },
      {
        name: t("home.deliverBack"),
        description: t("home.deliverBackDesc"),
        icon: FiRefreshCw,
      },
    ],
    [t],
  );

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <MotionH1
            variants={slideUp}
            className="text-base text-blue-600 font-semibold tracking-wide uppercase"
          >
            {t("home.process")}
          </MotionH1>
          <MotionP
            variants={slideUp}
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            {t("home.howItWorks")}
          </MotionP>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {steps.map((step, index) => (
              <StepCard key={step.name} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
