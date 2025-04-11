import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import i18n from "i18next";
import {
  supabase,
  getPublicServices,
  getServices,
  createOrder as createSupabaseOrder,
  getOrders as getSupabaseOrders,
  getAllUsers as getSupabaseAllUsers,
  updateUserProfile,
} from "../../lib/supabase";
import { useAuth } from "./AuthContext";

const AppContext = createContext();

// Animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const MotionDiv = motion.div;
export const MotionH1 = motion.h1;
export const MotionP = motion.p;

export const AppProvider = ({ children }) => {
  const { user, loading: authLoading, profile, checkSession } = useAuth(); // Changed from refreshSession to checkSession
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isRTL, setIsRTL] = useState(false);

  const changeLanguage = useCallback((lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    setIsRTL(lng === "ar");
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  }, []);

  const fetchPublicServices = useCallback(async () => {
    try {
      setLoading(true);
      const { services: fetchedServices, error } = await getPublicServices();
      if (error) throw error;
      setServices(fetchedServices || []);
    } catch (error) {
      console.error("Failed to fetch public services:", error);
      setServices([
        { id: "1", name: "Basic Service", price: 100, is_active: true },
        { id: "2", name: "Premium Service", price: 200, is_active: true },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const { services: fetchedServices, error } = await getServices();
      if (error) throw error;
      setServices(fetchedServices || []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      if (!user) return;

      setLoading(true);
      const { orders: fetchedOrders, error } = await getSupabaseOrders(user.id);
      if (error) throw error;
      setOrders(fetchedOrders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createOrder = useCallback(
    async (orderData) => {
      try {
        if (!user) throw new Error("You must be logged in to create an order");

        setLoading(true);
        const { data, error } = await supabase
          .from("orders")
          .insert([
            {
              service_id: orderData.service_id,
              user_id: orderData.user_id,
              status: orderData.status,
              details: orderData.details,
            },
          ])
          .select()
          .single();

        if (error) throw error;
        await fetchOrders();
        return data;
      } catch (error) {
        console.error("Failed to create order:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [user, fetchOrders]
  );

  const fetchAllUsers = useCallback(async () => {
    try {
      if (!user || profile?.role !== "admin") return;

      setLoading(true);
      const { users: fetchedUsers, error } = await getSupabaseAllUsers();
      if (error) throw error;
      setUsers(fetchedUsers || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user, profile]);

  const updateProfile = useCallback(
    async (updates) => {
      try {
        if (!user)
          throw new Error("You must be logged in to update your profile");

        setLoading(true);
        const { user: updatedUser, error } = await updateUserProfile(
          user.id,
          updates
        );
        if (error) throw error;

        return updatedUser;
      } catch (error) {
        console.error("Failed to update profile:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const refreshData = useCallback(async () => {
    if (user) {
      await Promise.all([
        fetchServices(),
        fetchOrders(),
        profile?.role === "admin" ? fetchAllUsers() : Promise.resolve(),
      ]);
    } else {
      await fetchPublicServices();
    }
  }, [user, profile, fetchServices, fetchOrders, fetchAllUsers, fetchPublicServices]);

  useEffect(() => {
    changeLanguage("en");
    fetchPublicServices();
  }, [changeLanguage, fetchPublicServices]);

  useEffect(() => {
    refreshData();
  }, [user, profile, refreshData]);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        try {
          // First check the session
          await checkSession?.();
          
          // Then refresh data if needed
          await refreshData();
        } catch (error) {
          console.error("Error during visibility change handling:", error);
          // Fallback to full page reload if session check fails
          if (error.message.includes("Session expired") || error.message.includes("Invalid token")) {
            window.location.reload();
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkSession, refreshData]);

  const value = useMemo(
    () => ({
      user: user
        ? { ...user, ...profile, role: profile?.role || "client" }
        : null,
      loading: loading || authLoading,
      services,
      orders,
      users,
      currentLanguage,
      isRTL,
      changeLanguage,
      createOrder,
      getOrders: fetchOrders,
      getAllUsers: fetchAllUsers,
      getServices: fetchServices,
      updateProfile,
      fadeIn,
      slideUp,
      MotionDiv,
      MotionH1,
      MotionP,
    }),
    [
      user,
      profile,
      loading,
      authLoading,
      services,
      orders,
      users,
      currentLanguage,
      isRTL,
      changeLanguage,
      createOrder,
      fetchOrders,
      fetchAllUsers,
      fetchServices,
      updateProfile,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};