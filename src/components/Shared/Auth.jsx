import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../lib/supabase"; // Ensure this path is correct

// Icons
import { GiWashingMachine } from "react-icons/gi";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaGoogle,
  FaFacebookF,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { ChevronRight, Sparkles } from "lucide-react";

// Animation
import { motion, AnimatePresence } from "framer-motion";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Context
  const { user } = useAppContext();
  const { signIn, signUp } = useAuth(); // Assuming loginWithGoogle is here or we use supabase directly
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  // Handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
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
        // Validation
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

  // --- Animations ---
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.2 },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.3 + i * 0.1 },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={backdropVariants}
      className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#0f172a]"
    >
      {/* 1. Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/50 to-[#1e3a8a]/30 backdrop-blur-[2px]" />
      </div>

      {/* 2. Animated Floating Blobs (Background Effects) */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-[100px] z-0"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] z-0"
      />

      {/* 3. Glassmorphism Card */}
      <motion.div
        variants={cardVariants}
        className="relative z-10 w-full max-w-[480px] mx-4 p-8 md:p-10 rounded-3xl border border-white/20 bg-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl"
      >
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 mb-4 group"
          >
            <div className="p-3 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
              <GiWashingMachine className="text-white text-3xl" />
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">
              Chicora
            </span>
          </Link>
          <motion.h2
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-semibold text-white/90"
          >
            {isLogin
              ? t("auth.welcomeBack", "Welcome Back")
              : t("auth.createAccount", "Create Account")}
          </motion.h2>
          <p className="text-blue-200/70 text-sm mt-2">
            {isLogin
              ? t(
                  "auth.loginSubtitle",
                  "Enter your details to access your account",
                )
              : t(
                  "auth.signupSubtitle",
                  "Get started with premium laundry services",
                )}
          </p>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-3 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center gap-3 overflow-hidden"
            >
              <div className="w-1 h-full bg-red-500 rounded-full" />
              <p className="text-red-100 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <>
                {/* Name Input */}
                <motion.div
                  custom={0}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="relative group">
                    <FaUser className="absolute left-0 top-3 text-blue-300/60 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      placeholder={t("auth.fullName")}
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full bg-transparent border-b border-white/20 py-2.5 pl-8 pr-3 text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                </motion.div>

                {/* Phone Input */}
                <motion.div
                  custom={1}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="relative group">
                    <FaPhone className="absolute left-0 top-3 text-blue-300/60 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t("auth.phoneNumber")}
                      value={formData.phone}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full bg-transparent border-b border-white/20 py-2.5 pl-8 pr-3 text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Email Input */}
          <motion.div
            custom={2}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative group">
              <FaEnvelope className="absolute left-0 top-3 text-blue-300/60 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="email"
                name="email"
                placeholder={t("auth.email")}
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-2.5 pl-8 pr-3 text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400 transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div
            custom={3}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative group">
              <FaLock className="absolute left-0 top-3 text-blue-300/60 group-focus-within:text-blue-400 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t("auth.password")}
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-2.5 pl-8 pr-10 text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-blue-300/60 hover:text-white transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </motion.div>

          {/* Confirm Password (Signup only) */}
          {!isLogin && (
            <motion.div
              custom={4}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative group">
                <FaLock className="absolute left-0 top-3 text-blue-300/60 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder={t("auth.confirmPassword")}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full bg-transparent border-b border-white/20 py-2.5 pl-8 pr-3 text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400 transition-all duration-300"
                />
              </div>
            </motion.div>
          )}

          {/* Remember Me & Forgot Password */}
          {isLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between text-sm"
            >
              <label className="flex items-center gap-2 text-blue-200/80 cursor-pointer hover:text-white transition-colors">
                <input
                  type="checkbox"
                  className="rounded border-white/20 bg-transparent text-blue-500 focus:ring-offset-0 focus:ring-0"
                />
                {t("auth.rememberMe")}
              </label>
              <Link
                to="/forgot-password"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {t("auth.forgotPassword")}
              </Link>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-lg hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? t("auth.signIn") : t("auth.signUp")}
                <ChevronRight size={18} />
              </>
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="text-white/40 text-sm font-medium">
            {t("auth.or")}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-1 gap-4">
          <motion.button
            onClick={handleGoogleLogin}
            whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/10 border border-white/10 backdrop-blur-sm transition-all text-white hover:border-white/30"
          >
            <FaGoogle className="text-red-400" />
            <span className="text-sm font-medium">Google</span>
          </motion.button>
        </div>

        {/* Switch Mode */}
        <div className="mt-8 text-center">
          <p className="text-blue-200/60 text-sm">
            {isLogin
              ? t("auth.needAccount", "Don't have an account?")
              : t("auth.haveAccount", "Already have an account?")}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="ml-2 text-white font-semibold hover:text-blue-400 underline underline-offset-4 transition-colors"
            >
              {isLogin
                ? t("auth.signUp", "Sign Up")
                : t("auth.signIn", "Sign In")}
            </button>
          </p>
        </div>
      </motion.div>

      {/* Footer Text */}
      <div className="absolute bottom-4 text-center w-full z-10">
        <p className="text-white/20 text-xs flex items-center justify-center gap-1">
          <Sparkles size={10} /> Powered by Chicora Systems
        </p>
      </div>
    </motion.div>
  );
};

export default Auth;
