import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

const ServicesGrid = ({ services, user, t, isRTL }) => {
  // Animation Variants
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          user={user}
          t={t}
          isRTL={isRTL}
          variants={itemVariants}
        />
      ))}
    </motion.div>
  );
};

export default ServicesGrid;
