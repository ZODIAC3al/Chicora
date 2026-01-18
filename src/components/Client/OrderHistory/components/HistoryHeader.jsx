import { Link } from "react-router-dom";
import { FaHistory, FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { MotionH1 } from "../../../../context/AppContext"; // Adjust path

export const HistoryHeader = ({
  t,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
      {/* Title */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl shadow-lg">
          <FaHistory className="text-white text-2xl" />
        </div>
        <MotionH1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {t("orderHistory.title")}
        </MotionH1>
      </div>

      {/* Controls */}
      <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t("orderHistory.search")}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200 w-full sm:w-auto">
          <FaFilter className="text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1 border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-sm md:text-base cursor-pointer"
          >
            <option value="all">{t("orderHistory.all")}</option>
            <option value="pending">{t("orderHistory.pending")}</option>
            <option value="in_progress">{t("orderHistory.in_progress")}</option>
            <option value="completed">{t("orderHistory.completed")}</option>
            <option value="cancelled">{t("orderHistory.cancelled")}</option>
          </select>
        </div>

        {/* Desktop New Order Button */}
        <Link
          to="/order"
          className="hidden sm:flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition shadow-md hover:shadow-lg whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          {t("navbar.newOrder")}
        </Link>
      </div>
    </div>
  );
};
