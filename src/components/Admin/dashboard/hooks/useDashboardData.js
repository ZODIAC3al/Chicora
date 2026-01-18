import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../../../../../lib/supabase"; // Adjust path to your lib/supabase
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useDashboardData = (timeRange, searchQuery, statusFilter) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState({ orders: [], users: [], services: [] });

  // Fetch Data from Supabase
  const fetchData = useCallback(async () => {
    try {
      // Don't set loading to true here if we want background refreshes to be smooth
      // But for initial load, it's fine.
      
      const [ordersRes, usersRes, servicesRes] = await Promise.all([
        supabase
          .from("orders")
          .select(`*, user:users(*), service:services(*)`)
          .order("created_at", { ascending: false }),
        supabase
          .from("users")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("services")
          .select("*")
          .order("created_at", { ascending: false })
      ]);

      if (ordersRes.error) throw ordersRes.error;
      if (usersRes.error) throw usersRes.error;
      if (servicesRes.error) throw servicesRes.error;

      setRawData({
        orders: ordersRes.data || [],
        users: usersRes.data || [],
        services: servicesRes.data || []
      });

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error(t("dashboard.fetchError"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  // Process Data (Heavy calculation - Memoized)
  const stats = useMemo(() => {
    const { orders, users, services } = rawData;
    if (!orders.length && !users.length && !services.length) return null;

    // 1. Filtering Logic
    let filteredOrders = [...orders];
    
    if (statusFilter !== "all") {
      filteredOrders = filteredOrders.filter(o => o.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredOrders = filteredOrders.filter(o => 
        o.id.toLowerCase().includes(query) ||
        o.user?.name?.toLowerCase().includes(query) ||
        o.service?.name?.toLowerCase().includes(query) ||
        o.status.toLowerCase().includes(query)
      );
    }

    // 2. Metrics Calculation
    const totalRevenue = filteredOrders.reduce((sum, order) => 
      sum + (order.status === "completed" ? order.details.total_price || 0 : 0), 0
    );

    const statusDistribution = filteredOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, { completed: 0, pending: 0, in_progress: 0, cancelled: 0 });

    // 3. Service Stats
    const serviceStats = services.map(service => {
      const sOrders = filteredOrders.filter(o => o.service_id === service.id);
      return {
        ...service,
        orderCount: sOrders.length,
        totalRevenue: sOrders.reduce((sum, o) => sum + (o.details.total_price || 0), 0),
        pendingOrders: sOrders.filter(o => o.status === "pending").length,
        completedOrders: sOrders.filter(o => o.status === "completed").length,
      };
    });

    // 4. User Analytics
    const userAnalytics = users.map(user => {
      const uOrders = filteredOrders.filter(o => o.user_id === user.id);
      return {
        ...user,
        orderCount: uOrders.length,
        totalSpent: uOrders.reduce((sum, o) => sum + (o.details.total_price || 0), 0),
        lastOrder: uOrders.length > 0 ? uOrders[0].created_at : null,
      };
    });

    // 5. Revenue Chart Data
    const revenueByPeriod = {};
    const now = new Date();
    
    filteredOrders.forEach(order => {
      if (order.status === "completed") {
        let period;
        const d = new Date(order.created_at);
        
        if (timeRange === "weekly") {
          const start = new Date(now);
          start.setDate(now.getDate() - now.getDay());
          const weekNum = Math.floor((d - start) / (7 * 24 * 60 * 60 * 1000)) + 1;
          period = `${t("dashboard.week")} ${weekNum}`;
        } else if (timeRange === "monthly") {
          period = new Intl.DateTimeFormat(i18n.language, { month: "short" }).format(d);
        } else {
          period = d.getFullYear();
        }
        
        revenueByPeriod[period] = (revenueByPeriod[period] || 0) + (order.details.total_price || 0);
      }
    });

    const revenueChartData = Object.keys(revenueByPeriod).map(key => ({
      name: key,
      revenue: revenueByPeriod[key]
    })).sort((a, b) => {
        if (timeRange === 'weekly') {
             // Basic sort for "Week X"
             return parseInt(a.name.split(' ')[1] || 0) - parseInt(b.name.split(' ')[1] || 0);
        }
        if (timeRange === 'yearly') return a.name - b.name;
        // Default monthly sort approximation
        return new Date(`1 ${a.name} 2023`) - new Date(`1 ${b.name} 2023`);
    });

    const statusData = Object.keys(statusDistribution).map(key => ({
      name: t(`status.${key}`),
      value: statusDistribution[key],
      status: key
    }));

    return {
      totalOrders: filteredOrders.length,
      totalUsers: users.length,
      totalServices: services.length,
      completedOrders: statusDistribution.completed,
      pendingOrders: statusDistribution.pending,
      inProgressOrders: statusDistribution.in_progress, // careful with naming convention in DB (in_progress vs inProgress)
      cancelledOrders: statusDistribution.cancelled,
      totalRevenue,
      avgOrderValue: filteredOrders.length ? totalRevenue / filteredOrders.length : 0,
      conversionRate: users.length ? (filteredOrders.length / users.length) * 100 : 0,
      revenueChartData,
      statusData,
      serviceStats,
      userAnalytics,
      topServices: [...serviceStats].sort((a, b) => b.orderCount - a.orderCount).slice(0, 5),
      topUsers: [...userAnalytics].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5),
      recentOrders: [...filteredOrders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10),
      filteredOrders
    };
  }, [rawData, searchQuery, statusFilter, timeRange, t, i18n.language]);

  // Actions
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId)
        .select();

      if (error) throw error;
      
      // Update local state without re-fetching everything (Optimistic UI update pattern could go here, but re-fetching is safer for sync)
      await fetchData(); 
      toast.success(t("dashboard.statusUpdated"));
      return data;
    } catch (error) {
      console.error(error);
      toast.error(t("dashboard.updateError"));
    }
  };

  // CSV Export Functionality
  const exportData = () => {
    if (!stats?.filteredOrders || stats.filteredOrders.length === 0) {
        toast.info(t("dashboard.noRecords"));
        return;
    }

    const headers = ["Order ID", "Customer Name", "Service", "Total Price", "Status", "Date"];
    
    const rows = stats.filteredOrders.map(order => [
        order.id,
        order.user?.name || "Unknown",
        order.service?.name || "Unknown",
        order.details.total_price,
        order.status,
        new Date(order.created_at).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { 
    loading, 
    stats, 
    refresh: fetchData, 
    updateOrderStatus, 
    exportData 
  };
};