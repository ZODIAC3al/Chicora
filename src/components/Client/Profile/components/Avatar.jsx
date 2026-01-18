import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

const Avatar = ({ user, size = "large" }) => {
  // Logic to get initials (e.g., "Ali Maher" -> "AM")
  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const dimensions =
    size === "large"
      ? "h-20 w-20 md:h-24 md:w-24 text-3xl md:text-4xl"
      : "h-10 w-10 text-sm";

  return (
    <motion.div whileHover={{ scale: 1.1 }} className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full blur opacity-75"></div>

      <div
        className={`relative ${dimensions} rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-lg`}
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "Profile"}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer" // Important for Google Images
          />
        ) : user?.name || user?.displayName ? (
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            {getInitials(user.displayName || user.name)}
          </span>
        ) : (
          <FaUser className="text-indigo-300" />
        )}
      </div>
    </motion.div>
  );
};

export default Avatar;
