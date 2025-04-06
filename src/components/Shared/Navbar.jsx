import { Link, useNavigate } from 'react-router-dom';
import { useAppContext, MotionDiv, fadeIn } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { GiWashingMachine } from 'react-icons/gi';
import { FaTimes, FaBars, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { BsFillGearFill } from 'react-icons/bs';

const Navbar = () => {
    // Context hooks
    const { 
        currentLanguage, 
        changeLanguage, 
        isRTL,
        loading: appLoading 
    } = useAppContext();
    const { 
        user, 
        signOut, 
        loading: authLoading 
    } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Local state
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);

    // Handlers
    const handleLogout = async () => {
        try {
            setLogoutLoading(true);
            await signOut();
            navigate('/');
            setMobileMenuOpen(false);
        } catch (error) {
            console.error('Logout failed:', error);
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
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    const logoVariants = {
        hidden: { opacity: 0, x: isRTL ? 50 : -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        },
        hover: { scale: 1.05 }
    };

    const mobileMenuVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { 
            opacity: 1, 
            height: 'auto',
            transition: { duration: 0.3, ease: 'easeInOut' }
        },
        exit: { 
            opacity: 0, 
            height: 0,
            transition: { duration: 0.2, ease: 'easeInOut' }
        }
    };

    // Don't render during initial loading
    if (appLoading || authLoading) return null;

    return (
        <MotionDiv 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div className="container mx-auto px-4 py-3">
                {/* Main Navigation Bar */}
                <motion.div 
                    className="flex justify-between items-center"
                    variants={containerVariants}
                >
                    {/* Logo/Brand */}
                    <motion.div
                        variants={logoVariants}
                        whileHover="hover"
                        className="flex-shrink-0"
                    >
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-white rounded-full blur opacity-75 animate-pulse" />
                                <div className="relative flex items-center justify-center h-10 w-10 bg-blue-500 rounded-full shadow-lg">
                                    <GiWashingMachine className="text-white text-xl" />
                                </div>
                            </div>
                            <motion.span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                                DryClean Pro
                            </motion.span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation Links */}
                    <motion.div 
                        className="hidden md:flex items-center space-x-6"
                        variants={containerVariants}
                    >
                        {/* Services Link */}
                        <motion.div variants={itemVariants}>
                            <Link 
                                to="/services" 
                                className="hover:text-blue-200 transition flex items-center space-x-1"
                            >
                                <BsFillGearFill className="text-blue-200" />
                                <span>{t('navbar.services')}</span>
                            </Link>
                        </motion.div>
                        
                        {/* Client-specific Links */}
                        {user?.role === 'client' && (
                            <>
                                <motion.div variants={itemVariants}>
                                    <Link 
                                        to="/orders/new" 
                                        className="hover:text-blue-200 transition flex items-center space-x-1"
                                    >
                                        <FaUser className="text-blue-200" />
                                        <span>{t('navbar.newOrder')}</span>
                                    </Link>
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Link 
                                        to="/orders" 
                                        className="hover:text-blue-200 transition flex items-center space-x-1"
                                    >
                                        <FaUser className="text-blue-200" />
                                        <span>{t('navbar.orderHistory')}</span>
                                    </Link>
                                </motion.div>
                            </>
                        )}
                        
                        {/* Admin Dashboard Link */}
                        {user?.role === 'admin' && (
                            <motion.div variants={itemVariants}>
                                <Link 
                                    to="/admin" 
                                    className="hover:text-blue-200 transition flex items-center space-x-1"
                                >
                                    <RiAdminFill className="text-blue-200" />
                                    <span>{t('navbar.adminDashboard')}</span>
                                </Link>
                            </motion.div>
                        )}

                        {/* Language Switcher */}
                        <motion.div 
                            variants={itemVariants}
                            className="flex items-center space-x-2 ml-4 border-l border-blue-500 pl-4"
                        >
                            <button 
                                onClick={() => changeLanguage('en')}
                                className={`px-2 py-1 rounded-md ${currentLanguage === 'en' ? 'bg-white text-blue-600' : 'bg-blue-500 hover:bg-blue-400'}`}
                            >
                                EN
                            </button>
                            <button 
                                onClick={() => changeLanguage('ar')}
                                className={`px-2 py-1 rounded-md ${currentLanguage === 'ar' ? 'bg-white text-blue-600' : 'bg-blue-500 hover:bg-blue-400'}`}
                            >
                                AR
                            </button>
                        </motion.div>
                        
                        {/* Auth Buttons */}
                        {user ? (
                            <motion.div variants={itemVariants}>
                                <button 
                                    onClick={handleLogout}
                                    disabled={logoutLoading}
                                    className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition flex items-center space-x-2 disabled:opacity-70"
                                >
                                    {logoutLoading ? (
                                        <svg 
                                            className="animate-spin h-5 w-5" 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    ) : (
                                        <>
                                            <FaSignOutAlt />
                                            <span>{t('navbar.logout')}</span>
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div variants={itemVariants}>
                                <Link 
                                    to="/auth" 
                                    className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition flex items-center space-x-2"
                                >
                                    <FaSignInAlt />
                                    <span>{t('navbar.login')}</span>
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Mobile Menu Toggle Button */}
                    <motion.div 
                        variants={itemVariants}
                        className="md:hidden"
                    >
                        <button 
                            className="text-white focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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
                            <div className="pt-2 pb-4 space-y-3">
                                {/* Services Link */}
                                <motion.div 
                                    className="px-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Link 
                                        to="/services" 
                                        className="block px-3 py-2 rounded-md hover:bg-blue-500 transition flex items-center space-x-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <BsFillGearFill />
                                        <span>{t('navbar.services')}</span>
                                    </Link>
                                </motion.div>
                                
                                {/* Client-specific Links */}
                                {user?.role === 'client' && (
                                    <>
                                        <motion.div 
                                            className="px-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <Link 
                                                to="/orders/new" 
                                                className="block px-3 py-2 rounded-md hover:bg-blue-500 transition flex items-center space-x-2"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <FaUser />
                                                <span>{t('navbar.newOrder')}</span>
                                            </Link>
                                        </motion.div>
                                        <motion.div 
                                            className="px-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <Link 
                                                to="/orders" 
                                                className="block px-3 py-2 rounded-md hover:bg-blue-500 transition flex items-center space-x-2"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <FaUser />
                                                <span>{t('navbar.orderHistory')}</span>
                                            </Link>
                                        </motion.div>
                                    </>
                                )}
                                
                                {/* Admin Dashboard Link */}
                                {user?.role === 'admin' && (
                                    <motion.div 
                                        className="px-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <Link 
                                            to="/admin" 
                                            className="block px-3 py-2 rounded-md hover:bg-blue-500 transition flex items-center space-x-2"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <RiAdminFill />
                                            <span>{t('navbar.adminDashboard')}</span>
                                        </Link>
                                    </motion.div>
                                )}

                                {/* Language Switcher */}
                                <motion.div 
                                    className="px-2 pt-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => {
                                                changeLanguage('en');
                                                setMobileMenuOpen(false);
                                            }}
                                            className={`flex-1 px-2 py-1 rounded-md ${currentLanguage === 'en' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}
                                        >
                                            English
                                        </button>
                                        <button 
                                            onClick={() => {
                                                changeLanguage('ar');
                                                setMobileMenuOpen(false);
                                            }}
                                            className={`flex-1 px-2 py-1 rounded-md ${currentLanguage === 'ar' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}
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
                                    transition={{ delay: 0.6 }}
                                >
                                    {user ? (
                                        <button 
                                            onClick={handleLogout}
                                            disabled={logoutLoading}
                                            className="w-full px-3 py-2 rounded-md bg-white text-blue-600 hover:bg-blue-50 transition flex items-center justify-center space-x-2"
                                        >
                                            {logoutLoading ? (
                                                <svg 
                                                    className="animate-spin h-5 w-5" 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            ) : (
                                                <>
                                                    <FaSignOutAlt />
                                                    <span>{t('navbar.logout')}</span>
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        <Link 
                                            to="/auth" 
                                            className="w-full px-3 py-2 rounded-md bg-white text-blue-600 hover:bg-blue-50 transition flex items-center justify-center space-x-2"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <FaSignInAlt />
                                            <span>{t('navbar.login')}</span>
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