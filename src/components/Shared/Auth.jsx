import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext, MotionDiv, fadeIn, slideUp, MotionH1 } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';
import { GiWashingMachine } from 'react-icons/gi';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login, register, isRTL } = useAppContext();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
                navigate('/dashboard');
            } else {
                if (formData.password !== formData.confirmPassword) {
                    throw new Error(t('auth.passwordsNotMatch'));
                }
                await register(formData.name, formData.email, formData.password);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message);
            if (!isLogin) {
                setFormData({
                    ...formData,
                    password: '',
                    confirmPassword: ''
                });
            }
        } finally {
            setLoading(false);
        }
    };

    // Animation variants
    const formItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        }
    };

    const switchButtonVariants = {
        hover: {
            scale: 1.02,
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.98 }
    };

    return (
        <MotionDiv 
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeIn}
            className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8"
        >
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center"
                >
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-blue-200 rounded-full blur opacity-75 animate-pulse"></div>
                            <div className="relative flex items-center justify-center h-12 w-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-lg">
                                <GiWashingMachine className="text-white text-2xl" />
                            </div>
                        </div>
                        <motion.span 
                            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
                            whileHover={{ scale: 1.05 }}
                        >
                            DryClean Pro
                        </motion.span>
                    </Link>
                </motion.div>

                <MotionH1 
                    variants={slideUp}
                    className="mt-6 text-center text-3xl font-extrabold text-gray-900"
                >
                    {isLogin ? t('auth.signInTitle') : t('auth.signUpTitle')}
                </MotionH1>
            </div>

            <MotionDiv 
                variants={slideUp}
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
            >
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-blue-100"
                >
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"
                        >
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <motion.div
                                variants={formItemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.4 }}
                            >
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('auth.fullName')}
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                                        placeholder={t('auth.fullNamePlaceholder')}
                                    />
                                </div>
                            </motion.div>
                        )}

                        <motion.div
                            variants={formItemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: isLogin ? 0.4 : 0.5 }}
                        >
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('auth.email')}
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                                    placeholder={t('auth.emailPlaceholder')}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            variants={formItemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: isLogin ? 0.5 : 0.6 }}
                        >
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('auth.password')}
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    minLength="8"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                                    placeholder={t('auth.passwordPlaceholder')}
                                />
                            </div>
                        </motion.div>

                        {!isLogin && (
                            <motion.div
                                variants={formItemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.7 }}
                            >
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('auth.confirmPassword')}
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        minLength="8"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                                        placeholder={t('auth.confirmPasswordPlaceholder')}
                                    />
                                </div>
                            </motion.div>
                        )}

                        <motion.div 
                            className="flex items-center justify-between"
                            variants={formItemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: isLogin ? 0.6 : 0.8 }}
                        >
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    {t('auth.rememberMe')}
                                </label>
                            </div>

                            {isLogin && (
                                <div className="text-sm">
                                    <Link 
                                        to="#" 
                                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                                    >
                                        {t('auth.forgotPassword')}
                                    </Link>
                                </div>
                            )}
                        </motion.div>

                        <motion.div
                            variants={formItemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: isLogin ? 0.7 : 0.9 }}
                        >
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={!loading ? { scale: 1.02 } : {}}
                                whileTap={!loading ? { scale: 0.98 } : {}}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {t('auth.processing')}
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        {isLogin ? (
                                            <>
                                                <FaSignInAlt className="mr-2" />
                                                {t('auth.signIn')}
                                            </>
                                        ) : (
                                            <>
                                                <FaUser className="mr-2" />
                                                {t('auth.signUp')}
                                            </>
                                        )}
                                    </span>
                                )}
                            </motion.button>
                        </motion.div>
                    </form>

                    <motion.div 
                        className="mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    {t('auth.or')}
                                </span>
                            </div>
                        </div>

                        <motion.div 
                            className="mt-6"
                            variants={switchButtonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                            >
                                {isLogin ? t('auth.needAccount') : t('auth.haveAccount')}
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </MotionDiv>
        </MotionDiv>
    );
};

export default Auth;