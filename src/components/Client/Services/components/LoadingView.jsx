import { MotionDiv, fadeIn } from "../../../../context/AppContext";

const LoadingView = ({ t }) => (
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

export default LoadingView;
