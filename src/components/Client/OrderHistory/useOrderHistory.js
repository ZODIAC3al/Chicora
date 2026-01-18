import { useState, useMemo } from "react";
import { useAppContext } from "../../../context/AppContext"; // Adjust path
import { useTranslation } from "react-i18next";

export const useOrderHistory = () => {
  const { orders = [], user, loading, isRTL } = useAppContext();
  const { t, i18n } = useTranslation();

  // UI State
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // MEMOIZED FILTERING (Senior Pattern: Derived State)
  // We use useMemo instead of useEffect to avoid double-renders
  const filteredOrders = useMemo(() => {
    if (loading || !user || !orders) return [];

    let result = orders.filter(
      (order) =>
        order && order.user_id === user.id && order.details && order.id,
    );

    // 1. Filter by Status
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    // 2. Filter by Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((order) => {
        const serviceName = order.details.service_name?.toLowerCase() || "";
        return (
          order.id.toLowerCase().includes(query) ||
          serviceName.includes(query) ||
          order.status.toLowerCase().includes(query)
        );
      });
    }

    // 3. Sort (Newest first)
    return result.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );
  }, [orders, user, loading, statusFilter, searchQuery]);

  // Actions
  const toggleOrderExpansion = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return {
    state: {
      orders: filteredOrders,
      loading,
      searchQuery,
      statusFilter,
      expandedOrderId,
      isRTL,
      user,
    },
    actions: {
      setSearchQuery,
      setStatusFilter,
      toggleOrderExpansion,
    },
    context: { t, i18n },
  };
};
