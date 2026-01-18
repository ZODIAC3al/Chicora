import { useState, useEffect, useMemo } from "react";
import { useAppContext } from "../../../context/AppContext"; // Adjust path
import { useAuth } from "../../../context/AuthContext"; // Adjust path
import { useTranslation } from "react-i18next";

export const useProfile = () => {
  const {
    currentLanguage,
    isRTL,
    changeLanguage,
    orders,
    loading: appLoading,
  } = useAppContext();
  const { profile, updateProfile, signOut, user } = useAuth();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Order Filter State
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    address: "",
    date_of_birth: "",
    membership_level: "standard",
    preferred_language: "en",
    notification_preferences: true,
    promotional_emails: false,
  });

  // Sync Profile to State
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || user?.displayName || "",
        email: profile.email || user?.email || "",
        phone: profile.phone || "",
        address: profile.details?.address || "",
        gender: profile.details?.gender || "",
        date_of_birth: profile.details?.date_of_birth || "",
        membership_level: profile.details?.membership_level || "standard",
        preferred_language: profile.preferences?.language || currentLanguage,
        notification_preferences: profile.preferences?.notifications ?? true,
        promotional_emails: profile.preferences?.promotional ?? false,
      });
    }
  }, [profile, user, currentLanguage]);

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      // Structure the update to match your backend schema
      const updates = {
        name: formData.name,
        phone: formData.phone,
        details: {
          gender: formData.gender,
          address: formData.address,
          date_of_birth: formData.date_of_birth,
          membership_level: formData.membership_level,
        },
        preferences: {
          language: formData.preferred_language,
          notifications: formData.notification_preferences,
          promotional: formData.promotional_emails,
        },
      };

      await updateProfile(updates);

      // If language changed in form, apply it immediately
      if (formData.preferred_language !== currentLanguage) {
        changeLanguage(formData.preferred_language);
      }

      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = currentLanguage === "en" ? "ar" : "en";
    changeLanguage(newLang);
    setFormData((prev) => ({ ...prev, preferred_language: newLang }));
  };

  // Memoized Order Filtering
  const filteredOrders = useMemo(() => {
    if (appLoading || !user || !orders) return [];

    let result = orders.filter((order) => order.user_id === user.id);

    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.details?.service_name?.toLowerCase().includes(query) ||
          order.status.toLowerCase().includes(query),
      );
    }

    return result.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );
  }, [orders, user, statusFilter, searchQuery, appLoading]);

  return {
    state: {
      profile,
      user,
      formData,
      activeTab,
      editMode,
      isLoggingOut,
      filteredOrders,
      statusFilter,
      searchQuery,
      expandedOrderId,
      currentLanguage,
      isRTL,
      appLoading,
    },
    actions: {
      setActiveTab,
      setEditMode,
      handleChange,
      handleSaveProfile,
      handleLogout,
      toggleLanguage,
      setStatusFilter,
      setSearchQuery,
      setExpandedOrderId,
    },
    t,
  };
};
