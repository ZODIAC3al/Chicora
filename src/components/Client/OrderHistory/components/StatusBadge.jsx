import {
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaFileInvoiceDollar,
} from "react-icons/fa";

export const StatusBadge = ({ status, t }) => {
  const getStatusConfig = (status) => {
    const s = status?.toLowerCase() || "";
    switch (s) {
      case "completed":
        return {
          icon: <FaCheckCircle className="text-green-500" />,
          classes: "bg-green-50 text-green-700 border-green-200",
        };
      case "cancelled":
        return {
          icon: <FaTimesCircle className="text-red-500" />,
          classes: "bg-red-50 text-red-700 border-red-200",
        };
      case "in_progress":
        return {
          icon: <FaSpinner className="text-yellow-500 animate-spin" />,
          classes: "bg-yellow-50 text-yellow-700 border-yellow-200",
        };
      default:
        return {
          icon: <FaFileInvoiceDollar className="text-blue-500" />,
          classes: "bg-blue-50 text-blue-700 border-blue-200",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs flex items-center justify-end sm:justify-start gap-1 border ${config.classes}`}
    >
      {config.icon}
      <span className="hidden sm:inline capitalize">
        {t(`orderHistory.${status?.replace("_", "") || "pending"}`)}
      </span>
    </span>
  );
};
