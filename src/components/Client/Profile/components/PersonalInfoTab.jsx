import { motion } from "framer-motion";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";
import { RiVipCrownFill } from "react-icons/ri";

const PersonalInfoTab = ({
  formData,
  handleChange,
  editMode,
  setEditMode,
  handleSave,
  t,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden mb-4"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {t("profile.personalInfo")}
          </h2>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={editMode ? handleSave : () => setEditMode(true)}
            className={`flex items-center px-4 py-2 rounded-lg text-white text-sm font-medium shadow-md transition ${
              editMode
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editMode ? (
              <>
                <FaSave className="mr-2" /> {t("profile.save")}
              </>
            ) : (
              <>
                <FaEdit className="mr-2" /> {t("profile.edit")}
              </>
            )}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <InputGroup
              icon={FaUser}
              label={t("profile.name")}
              name="name"
              value={formData.name}
              onChange={handleChange}
              editMode={editMode}
            />
            <InputGroup
              icon={FaPhone}
              label={t("profile.phone")}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              editMode={editMode}
              type="tel"
            />
            <div>
              <label className="flex items-center text-gray-700 mb-2 text-sm font-medium">
                <BsGenderAmbiguous className="mr-2 text-blue-500" />{" "}
                {t("profile.gender")}
              </label>
              {editMode ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t("profile.selectGender")}</option>
                  <option value="male">{t("profile.male")}</option>
                  <option value="female">{t("profile.female")}</option>
                </select>
              ) : (
                <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
                  {formData.gender
                    ? t(`profile.${formData.gender}`)
                    : t("profile.notProvided")}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <InputGroup
              icon={FaMapMarkerAlt}
              label={t("profile.address")}
              name="address"
              value={formData.address}
              onChange={handleChange}
              editMode={editMode}
            />
            <InputGroup
              icon={FaCalendarAlt}
              label={t("profile.dateOfBirth")}
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              editMode={editMode}
              type="date"
            />
            <div>
              <label className="flex items-center text-gray-700 mb-2 text-sm font-medium">
                <RiVipCrownFill className="mr-2 text-blue-500" />{" "}
                {t("profile.membership")}
              </label>
              <div className="px-4 py-2 bg-blue-50 text-blue-800 rounded-lg font-medium border border-blue-100">
                {t(`profile.membership.${formData.membership_level}`)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InputGroup = ({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  editMode,
  type = "text",
}) => (
  <div>
    <label className="flex items-center text-gray-700 mb-2 text-sm font-medium">
      <Icon className="mr-2 text-blue-500" /> {label}
    </label>
    {editMode ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />
    ) : (
      <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800 min-h-[40px] flex items-center">
        {value || <span className="text-gray-400 italic">Not provided</span>}
      </div>
    )}
  </div>
);

export default PersonalInfoTab;
