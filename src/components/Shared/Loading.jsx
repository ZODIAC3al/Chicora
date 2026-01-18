import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GiWashingMachine } from "react-icons/gi";

const Loading = () => {
  const { t } = useTranslation();

  // Animation for the washing machine (Spinning)
  const spinnerVariants = {
    hidden: { rotate: 0 },
    visible: {
      rotate: 360,
      transition: {
        duration: 2, // Slowed down slightly for a better visual "tumble"
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  // Animation for the card/background elements
  const pulseVariants = {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Fade in for the overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={overlayVariants}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] backdrop-blur-sm"
      role="status"
      aria-label="Loading"
    >
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full mx-4 border border-gray-100"
        variants={pulseVariants}
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Background Glow */}
            <motion.div
              className="absolute inset-0 bg-blue-400 rounded-full opacity-20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Spinning Icon */}
            <motion.div
              variants={spinnerVariants}
              className="relative z-10 flex items-center justify-center h-16 w-16 mx-auto bg-blue-50 rounded-full text-blue-600"
            >
              <GiWashingMachine className="text-3xl" />
            </motion.div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {t("loading") || "Loading..."}
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          {t("loadingMessage") || "Please wait while we prepare everything"}
        </p>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loading;
