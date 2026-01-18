import React from "react";
import { FiCalendar, FiRefreshCw, FiDownload } from "react-icons/fi";
import { MotionH1, slideUp } from "../../../../context/AppContext"; // Adjust path

export const DashboardHeader = ({
  user,
  t,
  timeRange,
  setTimeRange,
  handleRefresh,
  isRefreshing,
  handleExport,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <MotionH1
          variants={slideUp}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900"
        >
          {t("dashboard.adminTitle")}
        </MotionH1>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          {t("dashboard.welcomeBack")}, {user?.name || t("dashboard.admin")}
        </p>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 mt-3 sm:mt-0">
        {/* Time Range Selector */}
        <div className="flex items-center space-x-1 sm:space-x-2 bg-white rounded-lg p-1 sm:p-2 shadow-sm border border-gray-200">
          <FiCalendar className="text-gray-500 text-sm sm:text-base" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-xs sm:text-sm text-gray-700 cursor-pointer outline-none"
          >
            <option value="weekly">{t("dashboard.weekly")}</option>
            <option value="monthly">{t("dashboard.monthly")}</option>
            <option value="yearly">{t("dashboard.yearly")}</option>
          </select>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="p-1 sm:p-2 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition"
          title={t("admin.export")}
        >
          <FiDownload className="text-gray-500 text-sm sm:text-base" />
        </button>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="p-1 sm:p-2 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition"
          title={t("dashboard.refresh")}
        >
          <FiRefreshCw
            className={`text-gray-500 text-sm sm:text-base ${
              isRefreshing ? "animate-spin" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};
