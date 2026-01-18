import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

export const ChartsSection = ({ stats, theme, t, i18n, COLORS }) => {
  const formatCurrency = (val) =>
    new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: "USD",
    }).format(val);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
      {/* Revenue Trend Chart */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow"
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
          {t("dashboard.revenueTrend")}
        </h3>
        <div className="h-60 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  formatCurrency(value),
                  t("dashboard.revenue"),
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={theme.primary}
                fill={theme.primary}
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Order Status Pie Chart */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow"
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
          {t("dashboard.orderStatus")}
        </h3>
        <div className="h-60 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats.statusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {stats.statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, t("dashboard.orders")]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};
