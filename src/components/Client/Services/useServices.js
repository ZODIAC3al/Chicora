import { useState, useMemo } from "react";
import { useAppContext } from "../../../context/AppContext"; // Adjust path
import { useTranslation } from "react-i18next";

export const useServices = () => {
  const { services, loading, user, isRTL } = useAppContext();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  // MEMOIZATION: Derived state.
  // Calculating this inside render (wrapped in useMemo) is faster/cleaner than useEffect.
  const filteredServices = useMemo(() => {
    if (!services) return [];

    const lowerTerm = searchTerm.toLowerCase();

    return services.filter(
      (service) =>
        service.name.toLowerCase().includes(lowerTerm) ||
        (service.description &&
          service.description.toLowerCase().includes(lowerTerm)),
    );
  }, [services, searchTerm]);

  return {
    state: {
      filteredServices,
      searchTerm,
      loading,
      user,
      isRTL,
    },
    actions: {
      setSearchTerm,
    },
    t,
  };
};
