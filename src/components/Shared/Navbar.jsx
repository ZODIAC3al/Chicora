import { Link, useNavigate } from 'react-router-dom';
import { useAppContext, MotionDiv } from '../../context/AppContext';
import { fadeIn } from '../../context/AppContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { user, logout, currentLanguage, changeLanguage } = useAppContext();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <MotionDiv 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-blue-600 text-white shadow-md"
        >
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src="/logo-placeholder.svg" alt="DryClean Logo" className="h-10" />
                        <span className="text-xl font-bold">DryClean</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/services" className="hover:text-blue-200 transition">
                            {t('navbar.services')}
                        </Link>
                        
                        {user?.role === 'client' && (
                            <>
                                <Link to="/order" className="hover:text-blue-200 transition">
                                    {t('navbar.newOrder')}
                                </Link>
                                <Link to="/history" className="hover:text-blue-200 transition">
                                    {t('navbar.orderHistory')}
                                </Link>
                            </>
                        )}
                        
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="hover:text-blue-200 transition">
                                {t('navbar.adminDashboard')}
                            </Link>
                        )}

                        {/* Language Switcher */}
                        <div className="flex items-center space-x-2 ml-4">
                            <button 
                                onClick={() => changeLanguage('en')}
                                className={`px-2 py-1 rounded ${currentLanguage === 'en' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}
                            >
                                EN
                            </button>
                            <button 
                                onClick={() => changeLanguage('ar')}
                                className={`px-2 py-1 rounded ${currentLanguage === 'ar' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}
                            >
                                AR
                            </button>
                        </div>
                        
                        {user ? (
                            <button 
                                onClick={handleLogout}
                                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
                            >
                                {t('navbar.logout')}
                            </button>
                        ) : (
                            <Link 
                                to="/auth" 
                                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
                            >
                                {t('navbar.login')}
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button 
                        className="md:hidden text-white focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <MotionDiv 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden mt-4 space-y-3 pb-3"
                    >
                        <div className="flex flex-col space-y-3">
                            <Link 
                                to="/services" 
                                className="hover:text-blue-200 transition"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('navbar.services')}
                            </Link>
                            
                            {user?.role === 'client' && (
                                <>
                                    <Link 
                                        to="/order" 
                                        className="hover:text-blue-200 transition"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t('navbar.newOrder')}
                                    </Link>
                                    <Link 
                                        to="/history" 
                                        className="hover:text-blue-200 transition"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t('navbar.orderHistory')}
                                    </Link>
                                </>
                            )}
                            
                            {user?.role === 'admin' && (
                                <Link 
                                    to="/admin" 
                                    className="hover:text-blue-200 transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {t('navbar.adminDashboard')}
                                </Link>
                            )}

                            {/* Mobile Language Switcher */}
                            <div className="flex items-center space-x-2 pt-2">
                                <button 
                                    onClick={() => {
                                        changeLanguage('en');
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`px-2 py-1 rounded ${currentLanguage === 'en' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}
                                >
                                    EN
                                </button>
                                <button 
                                    onClick={() => {
                                        changeLanguage('ar');
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`px-2 py-1 rounded ${currentLanguage === 'ar' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}
                                >
                                    AR
                                </button>
                            </div>
                            
                            {user ? (
                                <button 
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition text-left"
                                >
                                    {t('navbar.logout')}
                                </button>
                            ) : (
                                <Link 
                                    to="/auth" 
                                    className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition text-left"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {t('navbar.login')}
                                </Link>
                            )}
                        </div>
                    </MotionDiv>
                )}
            </div>
        </MotionDiv>
    );
};

export default Navbar;