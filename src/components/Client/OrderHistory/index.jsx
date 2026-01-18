import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { MotionDiv, fadeIn } from "../../../context/AppContext";

// Hooks & Components
import { useOrderHistory } from "./useOrderHistory";
import { HistoryHeader } from "./components/HistoryHeader";
import { OrderCard } from "./components/OrderCard";
import { EmptyState } from "./components/EmptyState";

const OrderHistory = () => {
  const { state, actions, context } = useOrderHistory();
  const { orders, loading, searchQuery, statusFilter, expandedOrderId, isRTL } =
    state;
  const { setSearchQuery, setStatusFilter, toggleOrderExpansion } = actions;
  const { t, i18n } = context;

  // Mobile Floating Action Button (FAB)
  const MobileFAB = () => (
    <div className="sm:hidden fixed bottom-6 right-6 z-10">
      <Link
        to="/order"
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <FaPlus className="text-xl" />
      </Link>
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <MotionDiv
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex justify-center items-center h-64"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </MotionDiv>
    );
  }

  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container mx-auto px-4 sm:px-6 py-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <HistoryHeader
        t={t}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <MobileFAB />

      <AnimatePresence mode="wait">
        {orders.length === 0 ? (
          <EmptyState key="empty" t={t} />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="space-y-4"
          >
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isExpanded={expandedOrderId === order.id}
                onToggle={toggleOrderExpansion}
                t={t}
                currentLanguage={i18n.language}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
};

export default OrderHistory;
