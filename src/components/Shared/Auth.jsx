import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../lib/supabase";

// Icons
import {
  FaUser,
  FaLock,
  FaLockOpen, // Added for the "unlocked" state
  FaEnvelope,
  FaPhone,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { GiWashingMachine } from "react-icons/gi";
import { Check, Loader2 } from "lucide-react"; // Added Loader2 based on usage in code

// Animation
import { motion, AnimatePresence } from "framer-motion";

// --- Sub-Components for Clean Architecture ---

const SocialButton = ({ icon: Icon, label, onClick, colorClass }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm active:scale-95"
  >
    <Icon className={colorClass} size={18} />
    <span className="text-sm font-medium text-gray-600">{label}</span>
  </button>
);

const InputField = ({
  icon: Icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  showToggle,
  isVisible,
  onToggle,
  error,
}) => {
  // Logic to swap the Lock icon to Unlocked if password is visible
  const DisplayIcon =
    showToggle && isVisible && Icon === FaLock ? FaLockOpen : Icon;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="relative"
    >
      {/* Leading Icon: Left in LTR, Right in RTL */}
      <div className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-4 rtl:left-auto rtl:right-4 pointer-events-none z-10">
        <DisplayIcon size={16} />
      </div>

      <input
        type={showToggle ? (isVisible ? "text" : "password") : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        // RTL Fix: Padding flips based on direction
        // LTR: pl-11 (for icon), pr-12 (for toggle)
        // RTL: pr-11 (for icon), pl-12 (for toggle)
        className={`w-full py-3.5 bg-gray-50 border ${
          error ? "border-red-500" : "border-gray-200"
        } rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all
        pl-11 pr-4 
        rtl:pr-11 rtl:pl-4
        ${showToggle ? "pr-12 rtl:pl-12" : ""}`}
      />

      {/* Password Toggle: Right in LTR, Left in RTL */}
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer z-20 right-4 rtl:right-auto rtl:left-4"
        >
          {isVisible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      )}
    </motion.div>
  );
};

const Auth = () => {
  // --- Business Logic ---
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { user } = useAppContext();
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
    } catch (err) {
      console.error("Google Login Error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword)
          throw new Error(t("auth.passwordsNotMatch"));
        if (formData.password.length < 8)
          throw new Error(t("auth.passwordTooShort"));
        if (!formData.name.trim()) throw new Error(t("auth.nameRequired"));

        await signUp(formData.email.trim().toLowerCase(), formData.password, {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
        });
      }
    } catch (err) {
      console.error("Auth Error:", err);
      let msg = err.message;
      if (msg.includes("credentials")) msg = t("auth.invalidCredentials");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // --- Render ---
  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* --- LEFT COLUMN: FORM --- */}
      {/* Mobile Enhancement: Added justify-center and tweaked padding for better vertical centering on small screens */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 relative">
        {/* Mobile Animation Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo */}
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
            <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20">
              <GiWashingMachine size={26} />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              Chicora
            </span>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left rtl:lg:text-right">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin
                ? t("auth.signInTitle", "Log in to your Account")
                : t("auth.signUpTitle", "Create your Account")}
            </h1>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            <SocialButton
              icon={FaGoogle}
              label="Google"
              colorClass="text-red-500"
              onClick={handleGoogleLogin}
            />
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-wider font-medium">
              {t("auth.or", "or continue with email")}
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Error Alert */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm text-center font-medium"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <>
                  <InputField
                    icon={FaUser}
                    type="text"
                    name="name"
                    placeholder={t("auth.fullName")}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <InputField
                    icon={FaPhone}
                    type="tel"
                    name="phone"
                    placeholder={t("auth.phoneNumber")}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </>
              )}
            </AnimatePresence>

            <InputField
              icon={FaEnvelope}
              type="email"
              name="email"
              placeholder={t("auth.email")}
              value={formData.email}
              onChange={handleChange}
            />

            <InputField
              icon={FaLock}
              type="password"
              name="password"
              placeholder={t("auth.password")}
              value={formData.password}
              onChange={handleChange}
              showToggle={true}
              isVisible={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />

            <AnimatePresence>
              {!isLogin && (
                <InputField
                  icon={FaLock}
                  type="password"
                  name="confirmPassword"
                  placeholder={t("auth.confirmPassword")}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              )}
            </AnimatePresence>

            {/* Footer Row (Remember / Forgot) */}
            {isLogin && (
              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 transition-all focus:ring-2 focus:ring-blue-500/20"
                    />
                    <Check
                      size={10}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                    />
                  </div>
                  <span className="text-gray-500 group-hover:text-gray-700 transition-colors select-none">
                    {t("auth.rememberMe")}
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  {t("auth.forgotPassword")}
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : isLogin ? (
                t("auth.signIn")
              ) : (
                t("auth.signUp")
              )}
            </button>
          </form>

          {/* Toggle View */}
          <p className="text-center text-sm text-gray-500 mt-8">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-blue-600 font-bold hover:underline ml-1"
            >
              {isLogin ? t("auth.createAccount") : t("auth.signIn")}
            </button>
          </p>
        </motion.div>
      </div>

      {/* --- RIGHT COLUMN: BRANDING (Hidden on Mobile) --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative items-center justify-center overflow-hidden">
        {/* Decorative Circle Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-blue-500" />
        <div className="absolute w-[150%] h-[150%] bg-white/5 rounded-full blur-3xl -top-1/2 -right-1/2" />

        <div className="relative z-10 text-center px-16 max-w-xl">
          {/* Illustration Container */}
          <div className="relative mb-12 aspect-square max-w-sm mx-auto">
            {/* Center Hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border border-white/20 rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
                <div className="w-48 h-48 border border-white/10 rounded-full" />
              </div>
            </div>

            {/* Floating Cards Graphic */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Dashboard Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-2xl shadow-2xl p-4 w-48 rotate-3 z-10"
              >
                <div className="h-2 w-full bg-gray-100 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-8 w-full bg-blue-50 rounded-lg flex items-center px-2">
                    <div className="w-4 h-4 bg-blue-200 rounded-full" />
                    <div className="ml-2 h-1.5 w-16 bg-blue-100 rounded" />
                  </div>
                  <div className="h-8 w-full bg-gray-50 rounded-lg flex items-center px-2">
                    <div className="w-4 h-4 bg-gray-200 rounded-full" />
                    <div className="ml-2 h-1.5 w-12 bg-gray-100 rounded" />
                  </div>
                  <div className="h-8 w-full bg-gray-50 rounded-lg flex items-center px-2">
                    <div className="w-4 h-4 bg-gray-200 rounded-full" />
                    <div className="ml-2 h-1.5 w-10 bg-gray-100 rounded" />
                  </div>
                </div>
              </motion.div>

              {/* Connected Bubbles */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-4 top-1/4 bg-white p-3 rounded-2xl shadow-xl z-20"
              >
                <GiWashingMachine className="text-blue-500 text-xl" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -right-2 bottom-1/4 bg-white p-3 rounded-2xl shadow-xl z-20"
              >
                <FaGoogle className="text-red-500 text-lg" />
              </motion.div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Connect with every application.
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            Everything you need in an easily customizable dashboard. Manage your
            laundry services seamlessly.
          </p>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white/40" />
            <div className="w-2 h-2 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
