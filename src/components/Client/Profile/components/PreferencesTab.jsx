import { motion } from "framer-motion";
import { BsFillGearFill } from "react-icons/bs";
import { FaLanguage, FaInfoCircle } from "react-icons/fa";

const PreferencesTab = ({ formData, handleChange, t }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden mb-4 md:mb-6"
    >
      <div className="p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center mb-4 md:mb-6">
          <BsFillGearFill className="text-blue-500 mr-2" />
          {t("profile.preferences")}
        </h2>

        <div className="space-y-6">
          {/* Language Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {t("profile.languageSettings")}
            </h3>
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-blue-50 rounded-lg gap-2">
              <div className="flex items-center">
                <FaLanguage className="text-blue-500 mr-2" />
                <span className="text-sm md:text-base">
                  {t("profile.preferredLanguage")}
                </span>
              </div>
              <select
                name="preferred_language"
                value={formData.preferred_language}
                onChange={handleChange}
                className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {t("profile.notificationSettings")}
            </h3>
            <div className="space-y-3">
              <label className="flex items-center p-3 bg-blue-50 rounded-lg cursor-pointer transition hover:bg-blue-100">
                <input
                  type="checkbox"
                  name="notification_preferences"
                  checked={formData.notification_preferences}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700 text-sm md:text-base">
                  {t("profile.emailNotifications")}
                </span>
              </label>

              <label className="flex items-center p-3 bg-blue-50 rounded-lg cursor-pointer transition hover:bg-blue-100">
                <input
                  type="checkbox"
                  name="promotional_emails"
                  checked={formData.promotional_emails}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700 text-sm md:text-base">
                  {t("profile.promotionalEmails")}
                </span>
              </label>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {t("profile.accountPreferences")}
            </h3>
            <div className="flex flex-col space-y-3">
              <button className="flex items-center w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm md:text-base font-medium">
                <FaInfoCircle className="mr-2" />
                {t("profile.requestDataExport")}
              </button>
              <button className="flex items-center w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm md:text-base font-medium">
                <FaInfoCircle className="mr-2" />
                {t("profile.deleteAccount")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PreferencesTab;
