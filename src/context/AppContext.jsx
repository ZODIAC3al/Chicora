import { createContext, useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Navbar
          navbar: {
            home: "Home",
            services: "Services",
            newOrder: "New Order",
            orderHistory: "Order History",
            adminDashboard: "Admin Dashboard",
            login: "Login",
            logout: "Logout",
            profile: "Profile",
            language: "Language"
          },

          // Auth
          auth: {
            signInTitle: "Sign in to your account",
            signUpTitle: "Create a new account",
            fullName: "Full Name",
            email: "Email address",
            password: "Password",
            confirmPassword: "Confirm Password",
            rememberMe: "Remember me",
            forgotPassword: "Forgot your password?",
            processing: "Processing...",
            signIn: "Sign in",
            signUp: "Sign up",
            or: "Or",
            needAccount: "Need an account? Sign up",
            haveAccount: "Already have an account? Sign in",
            passwordsNotMatch: "Passwords do not match",
            companyLogo: "Company Logo"
          },

          // Order Form
          orderForm: {
            title: "Place Your Order",
            service: "Service",
            selectService: "Select a service",
            selectServiceError: "Please select a service",
            quantity: "Quantity",
            pickupDate: "Pickup Date",
            totalPrice: "Total Price",
            selectServiceTotal: "Select a service to see total",
            placeOrder: "Place Order",
            processing: "Processing..."
          },

          // Dashboard
          dashboard: {
            title: "Admin Dashboard",
            totalOrders: "Total Orders",
            completedOrders: "Completed Orders",
            totalUsers: "Total Users",
            totalRevenue: "Total Revenue",
            monthlyRevenue: "Monthly Revenue",
            orderStatus: "Order Status Distribution",
            revenue: "Revenue ($)"
          },
"footer": {
  "copyright": "DryClean Service",
  "rightsReserved": "All rights reserved"
},
          // Orders Management
          orders: {
            title: "Order Management",
            filter: "Filter by status",
            all: "All Orders",
            pending: "Pending",
            inProgress: "In Progress",
            completed: "Completed",
            cancelled: "Cancelled",
            search: "Search",
            searchPlaceholder: "Search by customer, service, or order ID",
            noOrders: "No orders matching your criteria",
            orderId: "Order ID",
            customer: "Customer",
            service: "Service",
            quantity: "Quantity",
            total: "Total",
            pickupDate: "Pickup Date",
            status: "Status",
            actions: "Actions",
            unknownUser: "Unknown User",
            unknownService: "Unknown Service"
          },

          // Home Page
          home: {
            professional: "Professional",
            dryCleaning: "Dry Cleaning",
            service: "Service",
            description: "We provide high-quality dry cleaning services with fast turnaround times and exceptional customer service.",
            placeOrder: "Place Order",
            viewServices: "View Services",
            services: "Services",
            popularServices: "Our Popular Services",
            process: "Process",
            howItWorks: "How It Works",
            placeOrderDesc: "Select your service and place your order online in just a few clicks.",
            weCollect: "We Collect",
            weCollectDesc: "We'll pick up your items at your preferred time and location.",
            deliverBack: "Deliver Back",
            deliverBackDesc: "Your clean items will be delivered back to you on time.",
            ready: "Ready to get started?",
            placeFirstOrder: "Place your first order today!",
            joinCustomers: "Join thousands of satisfied customers who trust us with their laundry needs.",
            placeNewOrder: "Place New Order",
            signUpNow: "Sign Up Now",
            standardService: "Standard Service",
            delivery24: "24-hour delivery",
            standardServiceDesc: "Our standard service with next-day delivery for your everyday laundry needs.",
            expressService: "Express Service",
            sameDay: "Same-day delivery",
            expressServiceDesc: "Get your laundry back the same day with our express service.",
            premiumService: "Premium Service",
            delivery48: "48-hour delivery",
            premiumServiceDesc: "Special care for delicate and high-end garments with our premium service."
          },

          // Services Page
          services: {
            title: "Our Services",
            searchPlaceholder: "Search services...",
            noServices: "No services found matching your search",
            orderNow: "Order Now",
            loginToOrder: "Login to Order",
            daysDelivery: "days delivery",
            delivery: "Delivery in {{days}} days"
          },
          orderHistory: {
            title: "Order History",
            filter: "Filter by status:",
            all: "All",
            pending: "Pending",
            in_progress: "In Progress",
            completed: "Completed",
            cancelled: "Cancelled",
            noOrders: "No orders found",
            firstOrder: "Place Your First Order",
            orderId: "Order ID",
            service: "Service",
            quantity: "Quantity",
            unitPrice: "Unit Price",
            total: "Total",
            pickupDate: "Pickup Date",
            status: "Status",
            unknownService: "Unknown Service"
          },
          // Common
          common: {
            loading: "Loading",
            error: "Error",
            success: "Success",
            tryAgain: "Try Again",
            backToHome: "Back to Home",
            viewDetails: "View Details",
            edit: "Edit",
            delete: "Delete",
            save: "Save",
            cancel: "Cancel",
            yes: "Yes",
            no: "No",
            confirm: "Confirm",
            close: "Close",
            submit: "Submit",
            requiredField: "This field is required",
            invalidEmail: "Invalid email address",
            minLength: "Minimum length is {{count}} characters",
            maxLength: "Maximum length is {{count}} characters"
          },

          // Notifications
          notifications: {
            orderCreated: "Order created successfully!",
            orderUpdated: "Order updated successfully!",
            orderDeleted: "Order deleted successfully!",
            loginSuccess: "Logged in successfully!",
            logoutSuccess: "Logged out successfully!",
            profileUpdated: "Profile updated successfully!",
            errorOccurred: "An error occurred. Please try again."
          },

          // Statuses
          statuses: {
            pending: "Pending",
            in_progress: "In Progress",
            completed: "Completed",
            cancelled: "Cancelled"
          },

          // Profile
          profile: {
            title: "My Profile",
            personalInfo: "Personal Information",
            contactInfo: "Contact Information",
            changePassword: "Change Password",
            currentPassword: "Current Password",
            newPassword: "New Password",
            confirmNewPassword: "Confirm New Password",
            updateProfile: "Update Profile",
            updatePassword: "Update Password"
          }
        }
      },
      ar: {
        translation: {
          // Navbar
          navbar: {
            home: "الصفحة الرئيسية",
            services: "الخدمات",
            newOrder: "طلب جديد",
            orderHistory: "سجل الطلبات",
            adminDashboard: "لوحة التحكم",
            login: "تسجيل الدخول",
            logout: "تسجيل الخروج",
            profile: "الملف الشخصي",
            language: "اللغة"
          },
"footer": {
  "copyright": "خدمة دراي كلين",
  "rightsReserved": "جميع الحقوق محفوظة"
},
          // Auth
          auth: {
            signInTitle: "تسجيل الدخول إلى حسابك",
            signUpTitle: "إنشاء حساب جديد",
            fullName: "الاسم الكامل",
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            confirmPassword: "تأكيد كلمة المرور",
            rememberMe: "تذكرني",
            forgotPassword: "نسيت كلمة المرور؟",
            processing: "جاري المعالجة...",
            signIn: "تسجيل الدخول",
            signUp: "تسجيل حساب",
            or: "أو",
            needAccount: "تحتاج إلى حساب؟ سجل الآن",
            haveAccount: "لديك حساب بالفعل؟ سجل الدخول",
            passwordsNotMatch: "كلمات المرور غير متطابقة",
            companyLogo: "شعار الشركة"
          },
         
          
          // Order Form
          orderForm: {
            title: "تقديم طلب جديد",
            service: "الخدمة",
            selectService: "اختر خدمة",
            selectServiceError: "الرجاء اختيار خدمة",
            quantity: "الكمية",
            pickupDate: "تاريخ الاستلام",
            totalPrice: "السعر الإجمالي",
            selectServiceTotal: "اختر خدمة لرؤية السعر الإجمالي",
            placeOrder: "تقديم الطلب",
            processing: "جاري المعالجة..."
          },
          orderHistory: {
            title: "سجل الطلبات",
            filter: "تصفية حسب الحالة:",
            all: "الكل",
            pending: "قيد الانتظار",
            in_progress: "قيد التنفيذ",
            completed: "مكتمل",
            cancelled: "ملغى",
            noOrders: "لا توجد طلبات",
            firstOrder: "قم بطلبك الأول",
            orderId: "رقم الطلب",
            service: "الخدمة",
            quantity: "الكمية",
            unitPrice: "سعر الوحدة",
            total: "المجموع",
            pickupDate: "تاريخ الاستلام",
            status: "الحالة",
            unknownService: "خدمة غير معروفة"
          },
          // Dashboard
          dashboard: {
            title: "لوحة التحكم",
            totalOrders: "إجمالي الطلبات",
            completedOrders: "الطلبات المكتملة",
            totalUsers: "إجمالي المستخدمين",
            totalRevenue: "إجمالي الإيرادات",
            monthlyRevenue: "الإيرادات الشهرية",
            orderStatus: "توزيع حالات الطلبات",
            revenue: "الإيرادات ($)"
          },

          // Orders Management
          orders: {
            title: "إدارة الطلبات",
            filter: "تصفية حسب الحالة",
            all: "جميع الطلبات",
            pending: "قيد الانتظار",
            inProgress: "قيد التنفيذ",
            completed: "مكتمل",
            cancelled: "ملغى",
            search: "بحث",
            searchPlaceholder: "ابحث حسب العميل، الخدمة، أو رقم الطلب",
            noOrders: "لا توجد طلبات تطابق معاييرك",
            orderId: "رقم الطلب",
            customer: "العميل",
            service: "الخدمة",
            quantity: "الكمية",
            total: "المجموع",
            pickupDate: "تاريخ الاستلام",
            status: "الحالة",
            actions: "الإجراءات",
            unknownUser: "عميل غير معروف",
            unknownService: "خدمة غير معروفة"
          },

          // Home Page
          home: {
            professional: "احترافية",
            dryCleaning: "تنظيف جاف",
            service: "خدمة",
            description: "نقدم خدمات تنظيف جاف عالية الجودة مع أوقات تسليم سريعة وخدمة عملاء استثنائية.",
            placeOrder: "تقديم طلب",
            viewServices: "عرض الخدمات",
            services: "الخدمات",
            popularServices: "خدماتنا الشائعة",
            process: "العملية",
            howItWorks: "كيف تعمل الخدمة",
            placeOrderDesc: "اختر خدمتك وقدم طلبك عبر الإنترنت ببضع نقرات.",
            weCollect: "نحن نجمع",
            weCollectDesc: "سنقوم بجمع العناصر في الوقت والمكان الذي تفضله.",
            deliverBack: "تسليم مرة أخرى",
            deliverBackDesc: "سيتم تسليم العناصر النظيفة إليك في الوقت المحدد.",
            ready: "هل أنت مستعد للبدء؟",
            placeFirstOrder: "قدم طلبك الأول اليوم!",
            joinCustomers: "انضم إلى الآلاف من العملاء الراضين الذين يثقون بنا في احتياجات غسيل ملابسهم.",
            placeNewOrder: "تقديم طلب جديد",
            signUpNow: "سجل الآن",
            standardService: "الخدمة القياسية",
            delivery24: "توصيل خلال 24 ساعة",
            standardServiceDesc: "خدمتنا القياسية مع توصيل في اليوم التالي لاحتياجات غسيل الملابس اليومية.",
            expressService: "خدمة سريعة",
            sameDay: "توصيل في نفس اليوم",
            expressServiceDesc: "احصل على غسيلك في نفس اليوم مع خدمتنا السريعة.",
            premiumService: "خدمة مميزة",
            delivery48: "توصيل خلال 48 ساعة",
            premiumServiceDesc: "رعاية خاصة للملابس الحساسة والفاخرة مع خدمتنا المميزة."
          },

          // Services Page
          services: {
            title: "خدماتنا",
            searchPlaceholder: "ابحث عن الخدمات...",
            noServices: "لا توجد خدمات تطابق بحثك",
            orderNow: "اطلب الآن",
            loginToOrder: "سجل الدخول للطلب",
            daysDelivery: "أيام التوصيل",
            delivery: "توصيل خلال {{days}} أيام"
          },

          // Common
          common: {
            loading: "جاري التحميل",
            error: "خطأ",
            success: "نجاح",
            tryAgain: "حاول مرة أخرى",
            backToHome: "العودة إلى الصفحة الرئيسية",
            viewDetails: "عرض التفاصيل",
            edit: "تعديل",
            delete: "حذف",
            save: "حفظ",
            cancel: "إلغاء",
            yes: "نعم",
            no: "لا",
            confirm: "تأكيد",
            close: "إغلاق",
            submit: "إرسال",
            requiredField: "هذا الحقل مطلوب",
            invalidEmail: "بريد إلكتروني غير صالح",
            minLength: "الحد الأدنى للطول هو {{count}} أحرف",
            maxLength: "الحد الأقصى للطول هو {{count}} أحرف"
          },

          // Notifications
          notifications: {
            orderCreated: "تم إنشاء الطلب بنجاح!",
            orderUpdated: "تم تحديث الطلب بنجاح!",
            orderDeleted: "تم حذف الطلب بنجاح!",
            loginSuccess: "تم تسجيل الدخول بنجاح!",
            logoutSuccess: "تم تسجيل الخروج بنجاح!",
            profileUpdated: "تم تحديث الملف الشخصي بنجاح!",
            errorOccurred: "حدث خطأ. الرجاء المحاولة مرة أخرى."
          },

          // Statuses
          statuses: {
            pending: "قيد الانتظار",
            in_progress: "قيد التنفيذ",
            completed: "مكتمل",
            cancelled: "ملغى"
          },

          // Profile
          profile: {
            title: "ملفي الشخصي",
            personalInfo: "المعلومات الشخصية",
            contactInfo: "معلومات الاتصال",
            changePassword: "تغيير كلمة المرور",
            currentPassword: "كلمة المرور الحالية",
            newPassword: "كلمة المرور الجديدة",
            confirmNewPassword: "تأكيد كلمة المرور الجديدة",
            updateProfile: "تحديث الملف الشخصي",
            updatePassword: "تحديث كلمة المرور"
          }
        }
      }
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
const AppContext = createContext();

// Animation components
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    } 
  },
  exit: { 
    y: 20, 
    opacity: 0, 
    transition: { 
      duration: 0.5,
      ease: "easeIn"
    } 
  }
};

export const MotionDiv = motion.div;
export const MotionH1 = motion.h1;
export const MotionP = motion.p;

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([
        { $id: '1', name: 'Basic Service', price: 100, is_active: true },
        { $id: '2', name: 'Premium Service', price: 200, is_active: true }
    ]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [isRTL, setIsRTL] = useState(false);

    // Change language function
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setCurrentLanguage(lng);
        setIsRTL(lng === 'ar');
        document.documentElement.lang = lng;
        document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    };

    // Mock login function
    const login = async (email, password) => {
        setUser({
            $id: 'mock-user-id',
            email: email,
            name: 'Mock User',
            role: 'client'
        });
        return true;
    };

    // Mock register function
    const register = async (name, email, password) => {
        setUser({
            $id: 'mock-user-id',
            email: email,
            name: name,
            role: 'client'
        });
        return true;
    };

    // Mock logout function
    const logout = async () => {
        setUser(null);
        return true;
    };

    // Mock create order function
    const createOrder = async (serviceId, quantity, pickupDate) => {
        const service = services.find(s => s.$id === serviceId);
        if (!service) throw new Error(i18n.t('orderHistory.unknownService'));
        
        const newOrder = {
            $id: Date.now().toString(),
            user_id: user?.$id || 'mock-user-id',
            service_id: serviceId,
            status: 'pending',
            quantity: Number(quantity),
            total_price: service.price * quantity,
            pickup_date: new Date(pickupDate).toISOString()
        };
        
        setOrders(prev => [...prev, newOrder]);
        return newOrder;
    };

    // Initialize language on first load
    useEffect(() => {
        changeLanguage('en');
    }, []);

    return (
        <AppContext.Provider value={{
            user,
            loading,
            services,
            orders,
            users,
            currentLanguage,
            isRTL,
            changeLanguage,
            login,
            register,
            logout,
            createOrder,
            fadeIn,
            slideUp,
            MotionDiv,
            MotionH1,
            MotionP
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};