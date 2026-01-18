import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../../context/AppContext"; // Adjust path as needed

export const useOrderForm = () => {
  const {
    services,
    user,
    createOrder,
    loading: appLoading,
    isRTL,
    currentLanguage,
  } = useAppContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Parse Query Params
  const queryParams = new URLSearchParams(location.search);
  const initialServiceId = queryParams.get("service");

  // Form State
  const [formData, setFormData] = useState({
    service_id: initialServiceId || "",
    quantity: 1,
    pickup_date: new Date(new Date().setHours(12, 0, 0, 0)),
    special_instructions: "",
  });

  const [selectedService, setSelectedService] = useState(null);
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Logic: Calculate Delivery
  const calculateDeliveryEstimate = useCallback((deliveryDays) => {
    if (!deliveryDays) {
      setDeliveryEstimate(null);
      return;
    }
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    setDeliveryEstimate(deliveryDate);
  }, []);

  // Effect: Sync Service ID from URL or Selection
  useEffect(() => {
    if (formData.service_id && services.length > 0) {
      const service = services.find((s) => s.id === formData.service_id);
      if (service) {
        setSelectedService(service);
        calculateDeliveryEstimate(service.delivery_days);
      }
    } else {
      setSelectedService(null);
      setDeliveryEstimate(null);
    }
  }, [formData.service_id, services, calculateDeliveryEstimate]);

  // Handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Math.max(1, parseInt(value) || 1) : value,
    }));
  }, []);

  const handleDateChange = useCallback((date) => {
    if (!date) return;
    const adjustedDate = new Date(date);
    adjustedDate.setHours(12, 0, 0, 0);
    setFormData((prev) => ({ ...prev, pickup_date: adjustedDate }));
  }, []);

  const handleServiceChange = useCallback((serviceId) => {
    setFormData((prev) => ({ ...prev, service_id: serviceId }));
  }, []);

  const adjustQuantity = useCallback((amount) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + amount),
    }));
  }, []);

  // Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!user) {
        navigate("/auth", { state: { from: location.pathname } }); // Changed /login to /auth based on your previous routes
        return;
      }

      // Validations
      if (!formData.service_id)
        throw new Error(t("orderForm.selectServiceError"));
      if (formData.quantity < 1)
        throw new Error(t("orderForm.invalidQuantity"));

      const service = services.find((s) => s.id === formData.service_id);
      if (!service) throw new Error(t("orderForm.invalidService"));

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.pickup_date);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today)
        throw new Error(t("orderForm.invalidPickupDate"));

      // Payload
      const orderData = {
        id: uuidv4(),
        service_id: formData.service_id,
        user_id: user.id,
        status: "pending",
        details: {
          quantity: formData.quantity,
          pickup_date: formData.pickup_date.toISOString(),
          total_price: service.price * formData.quantity,
          image_url: service.image_url || "/service-placeholder.jpg",
          special_instructions: formData.special_instructions,
          service_name: service.name,
          estimated_delivery: deliveryEstimate?.toISOString(),
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await createOrder(orderData);

      setShowSuccess(true);
      setTimeout(() => {
        navigate("/history", { state: { newOrder: orderData } });
      }, 1500);
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return {
    state: {
      formData,
      selectedService,
      deliveryEstimate,
      error,
      isSubmitting,
      showSuccess,
      appLoading,
      services,
    },
    context: { t, isRTL, currentLanguage },
    actions: {
      handleChange,
      handleDateChange,
      handleServiceChange,
      adjustQuantity,
      handleSubmit,
    },
  };
};
