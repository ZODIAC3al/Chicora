import React, { useState } from "react";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiServer,
  FiUser,
} from "react-icons/fi";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

// --- Helper Components ---

const StatusIcon = ({ status }) => {
  if (!status) return <FiServer className="text-blue-500" />;
  const s = status.toLowerCase();
  if (s === "completed") return <FaCheckCircle className="text-green-500" />;
  if (s === "cancelled") return <FaTimesCircle className="text-red-500" />;
  if (s === "in_progress" || s === "inprogress")
    return <FaSpinner className="text-yellow-500 animate-spin" />;
  return <FiServer className="text-blue-500" />;
};

const Pagination = ({ currentPage, totalPages, setCurrentPage, t, isRTL }) => (
  <div
    className={`flex flex-col sm:flex-row items-center justify-between mt-4 gap-2 ${isRTL ? "sm:flex-row-reverse" : ""}`}
  >
    <div className="text-xs sm:text-sm text-gray-700">
      {t("dashboard.page")} {currentPage} {t("dashboard.of")} {totalPages}
    </div>
    <div className="flex gap-1">
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-1 rounded-md text-indigo-600 hover:bg-indigo-50 disabled:text-gray-400 border border-gray-200"
      >
        {isRTL ? <FiChevronRight /> : <FiChevronLeft />}{" "}
        <span className="mx-1">{t("dashboard.previous")}</span>
      </button>
      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-1 rounded-md text-indigo-600 hover:bg-indigo-50 disabled:text-gray-400 border border-gray-200"
      >
        <span className="mx-1">{t("dashboard.next")}</span>{" "}
        {isRTL ? <FiChevronLeft /> : <FiChevronRight />}
      </button>
    </div>
  </div>
);

// --- Exported Table Components ---

export const UsersTable = ({
  users,
  t,
  isRTL,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate Pagination
  const filteredUsers = users; // The filtering is mostly done in hook, but if you need extra local filtering, do it here
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginated = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-3">
        <h3 className="font-semibold text-gray-900 text-lg">
          {t("dashboard.userManagement")}
        </h3>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative flex-grow">
            <FiSearch
              className={`absolute top-3 text-gray-400 ${isRTL ? "right-3" : "left-3"}`}
            />
            <input
              type="text"
              placeholder={t("dashboard.searchUsers")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${isRTL ? "pr-8 pl-3" : "pl-8 pr-3"}`}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="all">{t("dashboard.allUsers")}</option>
            <option value="active">{t("dashboard.active")}</option>
            <option value="inactive">{t("dashboard.inactive")}</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "user",
                "contact",
                "orders",
                "spending",
                "lastActive",
                "actions",
              ].map((head) => (
                <th
                  key={head}
                  className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? "text-right" : "text-left"}`}
                >
                  {t(`dashboard.${head}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginated.length > 0 ? (
              paginated.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <FiUser />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.role || t("dashboard.customer")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-xs text-gray-500">
                      {user.phone || t("dashboard.noPhone")}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.orderCount}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(user.totalSpent)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {user.lastOrder
                      ? new Date(user.lastOrder).toLocaleDateString()
                      : t("dashboard.never")}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-indigo-600 font-medium cursor-pointer hover:text-indigo-800">
                    {t("dashboard.view")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                  {t("dashboard.noResults")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        setCurrentPage={setPage}
        t={t}
        isRTL={isRTL}
      />
    </div>
  );
};

export const OrdersTable = ({
  orders,
  t,
  isRTL,
  updateStatus,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Note: 'orders' passed here is usually filtered by the hook, but for full pagination we slice it here
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginated = orders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-3">
        <h3 className="font-semibold text-gray-900 text-lg">
          {t("dashboard.orderManagement")}
        </h3>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder={t("dashboard.searchOrders")}
            className="border border-gray-300 p-2 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">{t("dashboard.allStatus")}</option>
            <option value="pending">{t("dashboard.pending")}</option>
            <option value="in_progress">{t("dashboard.inProgress")}</option>
            <option value="completed">{t("dashboard.completed")}</option>
            <option value="cancelled">{t("dashboard.cancelled")}</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "orderId",
                "customer",
                "service",
                "amount",
                "status",
                "date",
                "actions",
              ].map((k) => (
                <th
                  key={k}
                  className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? "text-right" : "text-left"}`}
                >
                  {t(`dashboard.${k}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginated.length > 0 ? (
              paginated.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.user?.name || t("dashboard.unknown")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.service?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(order.details.total_price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={order.status} />
                      <span className="capitalize text-sm">
                        {order.status.replace("_", " ")}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="pending">{t("dashboard.pending")}</option>
                      <option value="in_progress">
                        {t("dashboard.inProgress")}
                      </option>
                      <option value="completed">
                        {t("dashboard.completed")}
                      </option>
                      <option value="cancelled">
                        {t("dashboard.cancelled")}
                      </option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  {t("dashboard.noOrders")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        setCurrentPage={setPage}
        t={t}
        isRTL={isRTL}
      />
    </div>
  );
};
