import { motion } from "framer-motion";
import { FaLanguage, FaSignOutAlt } from "react-icons/fa";
import { RiVipCrownFill } from "react-icons/ri";
import Avatar from "./Avatar";

const ProfileHeader = ({
  user,
  profile,
  formData,
  t,
  currentLanguage,
  toggleLanguage,
  handleLogout,
  isLoggingOut,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
      <div className="flex items-center">
        <div className="mr-3 md:mr-4">
          {/* Pass user object which contains photoURL and displayName */}
          <Avatar user={{ ...user, name: formData.name }} size="large" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {t("profile.title")}
          </h1>
          <p className="text-blue-600 flex items-center text-sm md:text-base mt-1">
            <RiVipCrownFill className="mr-1" />
            <span className="uppercase font-medium tracking-wide">
              {t(`profile.membership.${formData.membership_level}`)}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 w-full md:w-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleLanguage}
          className="flex items-center px-3 py-1 md:px-4 md:py-2 bg-white rounded-lg shadow-md text-blue-600 text-sm md:text-base"
        >
          <FaLanguage className="mr-1 md:mr-2" />
          {currentLanguage === "en" ? "العربية" : "English"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded-lg shadow-md text-sm md:text-base"
        >
          {isLoggingOut ? (
            <svg
              className="animate-spin h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <FaSignOutAlt className="mr-1 md:mr-2" />
          )}
          {t("profile.logout")}
        </motion.button>
      </div>
    </div>
  );
};

export default ProfileHeader;
