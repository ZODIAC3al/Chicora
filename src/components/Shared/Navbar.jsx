import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppContext, MotionDiv, fadeIn } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { GiWashingMachine } from "react-icons/gi";
import {
  FaTimes,
  FaBars,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaHistory,
  FaHome,
} from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import {
  BsFillGearFill,
  BsInfoCircle,
  BsTelephone,
  BsCurrencyDollar,
} from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  // Context hooks
  const {
    currentLanguage,
    changeLanguage,
    isRTL,
    loading: appLoading,
  } = useAppContext();
  const { profile, user, signOut, loading: authLoading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Local state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Navigation configuration
  const navConfig = useMemo(
    () => [
      // Public routes
      {
        path: "/",
        label: t("navbar.home"),
        icon: <FaHome className="text-blue-200" />,
        roles: [],
        showWhenLoggedIn: true,
        showWhenLoggedOut: true,
      },
      {
        path: "/services",
        label: t("navbar.services"),
        icon: <BsFillGearFill className="text-blue-200" />,
        roles: [],
        showWhenLoggedIn: true,
        showWhenLoggedOut: true,
      },

      // Client routes
      {
        path: "/order",
        label: t("navbar.newOrder"),
        icon: <FaUser className="text-blue-200" />,
        roles: ["client"],
        showWhenLoggedIn: true,
        showWhenLoggedOut: false,
      },
      {
        path: "/history",
        label: t("navbar.orderHistory"),
        icon: <FaHistory className="text-blue-200" />,
        roles: ["client"],
        showWhenLoggedIn: true,
        showWhenLoggedOut: false,
      },
      {
        path: "/profile",
        label: t("navbar.profile"),
        icon: <CgProfile className="text-blue-200" />,
        roles: ["client"],
        showWhenLoggedIn: true,
        showWhenLoggedOut: false,
      },

      // Admin routes
      {
        path: "/admin",
        label: t("navbar.adminDashboard"),
        icon: <RiAdminFill className="text-blue-200" />,
        roles: ["admin"],
        showWhenLoggedIn: true,
        showWhenLoggedOut: false,
      },
      {
        path: "/admin/orders",
        label: t("navbar.adminOrders"),
        icon: <RiAdminFill className="text-blue-200" />,
        roles: ["admin"],
        showWhenLoggedIn: true,
        showWhenLoggedOut: false,
        hideFromNav: true,
      },
    ],
    [t]
  );

  // Filter navigation items based on user role and auth status
  const filteredNavItems = useMemo(() => {
    return navConfig.filter((item) => {
      if (item.hideFromNav) return false;

      if (user && !item.showWhenLoggedIn) return false;
      if (!user && !item.showWhenLoggedOut) return false;

      if (item.roles.length > 0) {
        if (!profile?.role || !item.roles.includes(profile.role)) {
          return false;
        }
      }

      return true;
    });
  }, [navConfig, user, profile]);

  // Handlers
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await signOut();
      navigate("/");
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, x: isRTL ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: { scale: 1.05 },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  // Don't render during initial loading
  if (appLoading || authLoading) return null;

  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Main Navigation Bar */}
        <motion.div
          className="flex justify-between items-center"
          variants={containerVariants}
        >
          {/* Logo/Brand */}
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            className="flex-shrink-0 min-w-0"
          >
            <Link
              to="/"
              className="flex items-center space-x-2 overflow-hidden"
            >
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 bg-white rounded-full blur opacity-75 animate-pulse" />
                <div className="relative flex items-center justify-center h-10 w-10 bg-blue-500 rounded-full shadow-lg">
                  <GiWashingMachine className="text-white text-xl" />
                </div>
              </div>
              <motion.span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 truncate">
                DryClean Pro
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <motion.div
            className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-4"
            variants={containerVariants}
          >
            {/* Render filtered navigation items */}
            {filteredNavItems.map((item) => (
              <motion.div key={item.path} variants={itemVariants}>
                <Link
                  to={item.path}
                  className={`hover:text-blue-200 transition flex items-center space-x-1 px-2 py-1 lg:px-3 lg:py-2 rounded ${
                    location.pathname === item.path
                      ? "font-bold text-blue-100 bg-blue-500/20"
                      : ""
                  }`}
                >
                  <span className="hidden lg:inline-block">{item.icon}</span>
                  <span className="text-sm lg:text-base whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}

            {/* Language Switcher */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-1 lg:space-x-2 ml-2 lg:ml-4 border-l border-blue-500 pl-2 lg:pl-4"
            >
              <button
                onClick={() => changeLanguage("en")}
                className={`px-2 py-1 text-xs lg:text-sm rounded-md whitespace-nowrap ${
                  currentLanguage === "en"
                    ? "bg-white text-blue-600"
                    : "bg-blue-500 hover:bg-blue-400"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("ar")}
                className={`px-2 py-1 text-xs lg:text-sm rounded-md whitespace-nowrap ${
                  currentLanguage === "ar"
                    ? "bg-white text-blue-600"
                    : "bg-blue-500 hover:bg-blue-400"
                }`}
              >
                AR
              </button>
            </motion.div>

            {/* Auth Buttons */}
            {user ? (
              <motion.div variants={itemVariants} className="ml-2 lg:ml-4">
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="bg-white text-blue-600 px-3 py-1 lg:px-4 lg:py-2 rounded-md hover:bg-blue-50 transition flex items-center space-x-1 lg:space-x-2 disabled:opacity-70 whitespace-nowrap text-sm lg:text-base"
                >
                  {logoutLoading ? (
                    <svg
                      className="animate-spin h-4 w-4 lg:h-5 lg:w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    <>
                      <FaSignOutAlt className="text-sm lg:text-base" />
                      <span>{t("navbar.logout")}</span>
                    </>
                  )}
                </button>
              </motion.div>
            ) : (
              <motion.div variants={itemVariants} className="ml-2 lg:ml-4">
                <Link
                  to="/auth"
                  className="bg-white text-blue-600 px-3 py-1 lg:px-4 lg:py-2 rounded-md hover:bg-blue-50 transition flex items-center space-x-1 lg:space-x-2 whitespace-nowrap text-sm lg:text-base"
                >
                  <FaSignInAlt className="text-sm lg:text-base" />
                  <span>{t("navbar.login")}</span>
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Mobile Menu Toggle Button */}
          <motion.div
            variants={itemVariants}
            className="md:hidden flex-shrink-0"
          >
            <button
              className="text-white focus:outline-none p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden"
            >
              <div className="pt-2 pb-4 space-y-2">
                {/* Render filtered navigation items */}
                {filteredNavItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    className="px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                  >
                    <Link
                      to={item.path}
                      className={`block px-3 py-2 rounded-md hover:bg-blue-500 transition flex items-center space-x-2 ${
                        location.pathname === item.path
                          ? "bg-blue-500 font-bold"
                          : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Language Switcher */}
                <motion.div
                  className="px-2 pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * (filteredNavItems.length + 1) }}
                >
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        changeLanguage("en");
                        setMobileMenuOpen(false);
                      }}
                      className={`flex-1 px-2 py-1 rounded-md text-sm ${
                        currentLanguage === "en"
                          ? "bg-white text-blue-600"
                          : "bg-blue-500"
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage("ar");
                        setMobileMenuOpen(false);
                      }}
                      className={`flex-1 px-2 py-1 rounded-md text-sm ${
                        currentLanguage === "ar"
                          ? "bg-white text-blue-600"
                          : "bg-blue-500"
                      }`}
                    >
                      العربية
                    </button>
                  </div>
                </motion.div>

                {/* Auth Buttons */}
                <motion.div
                  className="px-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * (filteredNavItems.length + 2) }}
                >
                  {user ? (
                    <button
                      onClick={handleLogout}
                      disabled={logoutLoading}
                      className="w-full px-3 py-2 rounded-md bg-white text-blue-600 hover:bg-blue-50 transition flex items-center justify-center space-x-2 text-sm"
                    >
                      {logoutLoading ? (
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      ) : (
                        <>
                          <FaSignOutAlt />
                          <span>{t("navbar.logout")}</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <Link
                      to="/auth"
                      className="w-full px-3 py-2 rounded-md bg-white text-blue-600 hover:bg-blue-50 transition flex items-center justify-center space-x-2 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaSignInAlt />
                      <span>{t("navbar.login")}</span>
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionDiv>
  );
};

export default Navbar;
