import { useAppContext, MotionDiv, fadeIn } from "../../../context/AppContext";

// Import sub-components
import Hero from "./Hero";
import FeaturedServices from "./FeaturedServices";
import HowItWorks from "./HowItWorks";
import CTA from "./CTA";

const Home = () => {
  const { isRTL } = useAppContext();

  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-gradient-to-b from-blue-50 to-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Hero />
      <FeaturedServices />
      <HowItWorks />
      <CTA />
    </MotionDiv>
  );
};

export default Home;
