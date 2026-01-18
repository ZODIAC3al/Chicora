import React from 'react';
import { motion } from "framer-motion";
import { FiDollarSign, FiShoppingCart, FiUsers } from "react-icons/fi";
import { GiClothes } from "react-icons/gi";

const StatCard = ({ title, value, subtext, icon: Icon, colorClass, borderClass, bgClass }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow border-l-4 ${borderClass}`}
  >
    <div className="flex justify-between">
      <div>
        <p className="text-xs sm:text-sm font-medium text-gray-500">
          {title}
        </p>
        <p className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2 text-gray-900">
          {value}
        </p>
        {subtext && (
            <p className="text-xs text-gray-500 mt-1">
                {subtext}
            </p>
        )}
      </div>
      <div className={`p-2 sm:p-3 rounded-lg ${bgClass} ${colorClass}`}>
        <Icon className="text-sm sm:text-base md:text-xl" />
      </div>
    </div>
  </motion.div>
);

export const StatsGrid = ({ stats, t, i18n }) => {
  const formatCurrency = (val) => new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: "USD",
  }).format(val || 0);

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
      {/* Revenue */}
      <StatCard
        title={t("dashboard.totalRevenue")}
        value={formatCurrency(stats.totalRevenue)}
        subtext={t("dashboard.last30Days")}
        icon={FiDollarSign}
        borderClass="border-indigo-500"
        bgClass="bg-indigo-100"
        colorClass="text-indigo-600"
      />

      {/* Orders */}
      <StatCard
        title={t("dashboard.totalOrders")}
        value={stats.totalOrders.toLocaleString()}
        subtext={`${stats.completedOrders} ${t("dashboard.completed")}`}
        icon={FiShoppingCart}
        borderClass="border-blue-500"
        bgClass="bg-blue-100"
        colorClass="text-blue-600"
      />

      {/* Users */}
      <StatCard
        title={t("dashboard.activeUsers")}
        value={stats.totalUsers.toLocaleString()}
        subtext={`${stats.conversionRate.toFixed(1)}% ${t("dashboard.conversion")}`}
        icon={FiUsers}
        borderClass="border-green-500"
        bgClass="bg-green-100"
        colorClass="text-green-600"
      />

      {/* Services */}
      <StatCard
        title={t("dashboard.services")}
        value={stats.totalServices.toLocaleString()}
        subtext={stats.topServices[0]?.name || t("dashboard.noServices")}
        icon={GiClothes}
        borderClass="border-purple-500"
        bgClass="bg-purple-100"
        colorClass="text-purple-600"
      />
    </div>
  );
};