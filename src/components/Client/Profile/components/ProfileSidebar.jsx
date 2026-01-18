import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { BsFillGearFill } from "react-icons/bs";
import { RiDashboardLine } from "react-icons/ri";
import Avatar from "./Avatar";

const ProfileSidebar = ({
  profile,
  user,
  activeTab,
  setActiveTab,
  t,
  isRTL,
  formData,
}) => {
  const NavButton = ({ id, icon: Icon, label }) => (
    <motion.button
      whileHover={{ x: isRTL ? -5 : 5 }}
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center px-4 py-3 rounded-lg transition text-sm md:text-base font-medium ${
        activeTab === id
          ? "bg-blue-100 text-blue-600"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <Icon
        className={`mr-3 ${activeTab === id ? "text-blue-500" : "text-gray-400"}`}
      />
      {label}
    </motion.button>
  );

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="mb-4">
            {/* Use the new smart Avatar here too */}
            <Avatar user={{ ...user, name: formData.name }} size="large" />
          </div>
          <h2 className="text-lg md:text-xl font-bold text-gray-800 text-center">
            {formData.name || profile.name}
          </h2>
          <p className="text-blue-600 text-sm text-center break-all">
            {profile.email}
          </p>
        </div>

        <nav className="space-y-2">
          <NavButton id="profile" icon={FaUser} label={t("profile.profile")} />
          <NavButton id="orders" icon={GiClothes} label={t("profile.orders")} />
          <NavButton
            id="preferences"
            icon={BsFillGearFill}
            label={t("profile.preferences")}
          />

          {profile.role === "admin" && (
            <motion.a
              whileHover={{ x: isRTL ? -5 : 5 }}
              href="/admin"
              className="w-full flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition text-sm md:text-base font-medium"
            >
              <RiDashboardLine className="mr-3 text-gray-400" />
              {t("profile.adminDashboard")}
            </motion.a>
          )}
        </nav>
      </div>
    </motion.div>
  );
};

export default ProfileSidebar;
