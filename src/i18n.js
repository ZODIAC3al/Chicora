import i18n from "i18next";
import { initReactI18next } from "react-i18next";
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // Navbar
        about: {
          title: "About Our Dry Cleaning Service",
          subtitle:
            "Discover our commitment to quality and customer satisfaction",
          missionTitle: "Our Mission",
          missionText:
            "To provide exceptional dry cleaning services with a focus on quality, convenience, and environmental responsibility.",
          visionTitle: "Our Vision",
          visionText:
            "To become the most trusted dry cleaning service in the region by consistently exceeding customer expectations.",
          valuesTitle: "Our Values",
          values: {
            quality: "Quality",
            qualityDesc: "We never compromise on the quality of our services",
            integrity: "Integrity",
            integrityDesc:
              "We conduct our business with honesty and transparency",
            innovation: "Innovation",
            innovationDesc:
              "We continuously improve our processes and services",
            sustainability: "Sustainability",
            sustainabilityDesc:
              "We care for the environment in all our operations",
            customerFocus: "Customer Focus",
            customerFocusDesc:
              "Our customers are at the heart of everything we do",
          },
          historyTitle: "Our History",
          historyText:
            "Founded in 2010, we started as a small neighborhood dry cleaner and have grown into a trusted service provider with multiple locations across the city.",
          features: {
            quality: {
              title: "Premium Quality",
              description:
                "We use only the finest cleaning solutions and techniques to care for your garments.",
            },
            eco: {
              title: "Eco-Friendly",
              description:
                "Our environmentally friendly processes ensure a clean planet along with clean clothes.",
            },
            delivery: {
              title: "Fast Delivery",
              description:
                "Enjoy quick turnaround times with our efficient pickup and delivery service.",
            },
          },
          team: {
            title: "Meet Our Team",
            subtitle: "The dedicated professionals behind our success",
            member1: {
              name: "John Smith",
              position: "Founder & CEO",
              bio: "With over 20 years in the industry, John founded the company with a vision to revolutionize dry cleaning services.",
            },
            member2: {
              name: "Sarah Johnson",
              position: "Head of Operations",
              bio: "Sarah ensures our operations run smoothly and our quality standards are consistently met.",
            },
            member3: {
              name: "Michael Brown",
              position: "Customer Service",
              bio: "Michael leads our customer service team with a focus on exceptional customer experiences.",
            },
            member4: {
              name: "Emily Davis",
              position: "Quality Control",
              bio: "Emily oversees our quality control processes to maintain our high standards.",
            },
          },
          stats: {
            title: "By The Numbers",
            years: "Years in Business",
            customers: "Happy Customers",
            locations: "Locations",
            items: "Items Cleaned Monthly",
          },
          testimonials: {
            title: "What Our Customers Say",
            subtitle: "Don't just take our word for it",
            testimonial1: {
              quote:
                "The best dry cleaning service I've ever used. My clothes always come back looking brand new!",
              author: "David Wilson",
            },
            testimonial2: {
              quote:
                "Fast, reliable, and eco-friendly. I wouldn't trust my clothes with anyone else.",
              author: "Maria Garcia",
            },
            testimonial3: {
              quote:
                "Their attention to detail is unmatched. Highly recommend their premium service.",
              author: "James Lee",
            },
            cta: {
              title: "Ready to Experience the Difference?",
              button: "Place Your First Order",
            },
          },
        },

        navbar: {
          home: "Home",
          services: "Services",
          newOrder: "New Order",
          orderHistory: "Order History",
          adminDashboard: "Admin Dashboard",
          login: "Login",
          logout: "Logout",
          profile: "Profile",
          language: "Language",
        },
           pricing: {
          title: "Simple, Transparent Pricing",
          subtitle: "Choose the perfect plan for your laundry needs. No hidden fees, no surprises.",
          perMonth: "month",
          mostPopular: "Most Popular",
          choosePlan: "Choose Plan",
          plans: {
            basic: {
              name: "Basic Wash",
              price: "$9.99",
              description: "Essential cleaning for everyday items",
              features: [
                "5 items per month",
                "Standard detergent",
                "24-hour turnaround"
              ]
            },
            standard: {
              name: "Standard Care",
              price: "$19.99",
              description: "Our most popular balanced option",
              features: [
                "15 items per month",
                "Premium detergent",
                "Eco-friendly cleaning",
                "12-hour express option"
              ]
            },
            premium: {
              name: "Premium Service",
              price: "$29.99",
              description: "The ultimate care for your garments",
              features: [
                "Unlimited items",
                "Organic detergent",
                "Same-day service",
                "Special fabric care",
                "Free pickup & delivery"
              ]
            }
          },
          faq: {
            title: "Frequently Asked Questions",
            questions: [
              {
                question: "What's included in each plan?",
                answer: "Each plan includes professional cleaning with quality detergents. Higher tiers offer faster turnaround and additional services."
              },
              {
                question: "Can I change plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time through your account settings."
              },
              {
                question: "How does billing work?",
                answer: "We charge your card monthly on the same date you signed up. You'll receive a receipt by email each month."
              },
              {
                question: "Is there a contract?",
                answer: "No contracts. Cancel anytime with no penalties."
              }
            ]
          }
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
          companyLogo: "Company Logo",
          fullNamePlaceholder: "Enter your full name",
          emailPlaceholder: "Enter your email",
          passwordPlaceholder: "Enter your password",
          confirmPasswordPlaceholder: "Confirm your password",
          // Auth error messages
          errors: {
            invalidEmail: "Please enter a valid email address",
            passwordLength: "Password must be at least 8 characters",
            passwordComplexity:
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            emailRequired: "Email is required",
            nameRequired: "Full name is required",
            passwordRequired: "Password is required",
            confirmPasswordRequired: "Please confirm your password",
            authFailed: "Authentication failed. Please check your credentials",
            userExists: "User with this email already exists",
            weakPassword: "Password is too weak",
            default: "An error occurred. Please try again",
          },
        },

        // Order Form
        orderForm: {
          title: "Place Your Order",
          subtitle: "Fill out the form to schedule your dry cleaning",
          service: "Service",
          selectService: "Select a service",
          selectServiceError: "Please select a service",
          quantity: "Quantity",
          pickupDate: "Pickup Date",
          totalPrice: "Total Price",
          subtotal: "Subtotal",
          selectServiceTotal: "Select a service to see total",
          placeOrder: "Place Order",
          processing: "Processing...",
          invalidQuantity: "Quantity must be at least 1",
          invalidPickupDate: "Pickup date must be in the future",
          invalidService: "Selected service is not available",
          daysDelivery: "days delivery",
          delivery: "Delivery in {{days}} days",
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
          revenue: "Revenue ($)",
          recentOrders: "Recent Orders",
          viewAll: "View All",
        }, 
         users: {
          title: "User Management",
          allUsers: "All Users",
          activeUsers: "Active Users",
          inactiveUsers: "Inactive Users",
          search: "Search Users",
          userId: "User ID",
          name: "Name",
          email: "Email",
          role: "Role",
          status: "Status",
          lastLogin: "Last Login",
          actions: "Actions",
          createUser: "Create User",
          editUser: "Edit User",
          deleteUser: "Delete User",
          deleteConfirm: "Are you sure you want to delete this user?",
          roles: {
            admin: "Admin",
            employee: "Employee",
            client: "Client"
          },
          statuses: {
            active: "Active",
            inactive: "Inactive"
          }
        },
        settings: {
          title: "Settings",
          general: "General Settings",
          services: "Service Management",  pricing: "Pricing Settings",
          notifications: "Notification Settings",
          businessHours: "Business Hours",
          deliverySettings: "Delivery Settings",
          saveChanges: "Save Changes",
          resetDefaults: "Reset to Defaults",
        },
        reports: {
          title: "Reports",
          sales: "Sales Reports",
          customers: "Customer Reports",
          inventory: "Inventory Reports",
          financial: "Financial Reports",
          export: "Export Report",
          generate: "Generate Report",
          dateRange: "Date Range",
          filter: "Filter",
        }
      ,

      // Employee Dashboard
      employee: {
        dashboard: {
          title: "Employee Dashboard",
          assignedTasks: "Assigned Tasks",
          completedTasks: "Completed Tasks",
          pendingApproval: "Pending Approval",
          performance: "Performance Metrics",
          efficiency: "Efficiency Rating",
          attendance: "Attendance Record",
          upcoming: "Upcoming Schedule",
          recentActivity: "Recent Activity",
        },
        orders: {
          process: "Process Order",
          updateStatus: "Update Status",
          addNotes: "Add Notes",
          viewDetails: "View Details",
          priority: "Priority",
          high: "High",
          medium: "Medium",
          low: "Low",
        },
        tasks: {
          title: "Task Management",
          new: "New Tasks",
          inProgress: "In Progress",
          completed: "Completed",
          overdue: "Overdue",
          dueToday: "Due Today",
          markComplete: "Mark Complete",
        }
      },

      // Client Portal
      client: {
        dashboard: {
          title: "My Account",
          recentOrders: "Recent Orders",
          loyaltyPoints: "Loyalty Points",
          preferences: "Preferences",
          addressBook: "Address Book",
          paymentMethods: "Payment Methods",
          notifications: "Notifications",
          referrals: "Referral Program",
        },
        loyalty: {
          points: "Loyalty Points",
          rewards: "Available Rewards",
          history: "Points History",
          redeem: "Redeem Reward",
          tier: "Membership Tier",
          silver: "Silver",
          gold: "Gold",
          platinum: "Platinum",
        }
      },

      // Calendar
      calendar: {
        title: "Calendar",
        today: "Today",
        week: "Week",
        month: "Month",
        year: "Year",
        agenda: "Agenda",
        noEvents: "No events scheduled",
        addEvent: "Add Event",
        eventDetails: "Event Details",
        allDay: "All Day",
        description: "Description",
        location: "Location",
        repeat: "Repeat",
        never: "Never",
        daily: "Daily",
        weekly: "Weekly",
        monthly: "Monthly",
        yearly: "Yearly",
      },

      // File Upload
      fileUpload: {
        title: "Upload Files",
        browse: "Browse Files",
        dragDrop: "Drag & Drop Files Here",
        maxSize: "Max file size: {{size}}MB",
        supportedFormats: "Supported formats: {{formats}}",
        uploadSuccess: "Upload successful",
        uploadFailed: "Upload failed",
        remove: "Remove",
        preview: "Preview",
      },

      // Data Tables
      dataTable: {
        rowsPerPage: "Rows per page:",
        of: "of",
        search: "Search",
        noData: "No data available",
        selected: "selected",
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        view: "View",
        sort: "Sort",
        filter: "Filter",
      },

      // Form Validation
      validation: {
        required: "This field is required",
        email: "Must be a valid email",
        minLength: "Must be at least {{count}} characters",
        maxLength: "Must be no more than {{count}} characters",
        numeric: "Must be a number",
        integer: "Must be an integer",
        positive: "Must be positive",
        url: "Must be a valid URL",
        phone: "Must be a valid phone number",
        matchField: "Must match {{field}}",
        passwordStrength: "Password must contain:",
        passwordReq1: "8+ characters",
        passwordReq2: "1 uppercase letter",
        passwordReq3: "1 lowercase letter",
        passwordReq4: "1 number",
        passwordReq5: "1 special character",
      },

      // System Status
      status: {
        online: "Online",
        offline: "Offline",
        maintenance: "Under Maintenance",
        degraded: "Degraded Performance",
        unknown: "Status Unknown",
        lastUpdated: "Last updated",
      },

        // Footer
        footer: {
          copyright: "Ali Maher",
          rightsReserved: "All rights reserved",
          about: "About Us",
          contact: "Contact",
          privacy: "Privacy Policy",
          terms: "Terms of Service",
        },
        contact: {
          title: "Get in Touch",
          subtitle:
            "We'd love to hear from you! Reach out for any questions or special requests.",
          form: {
            title: "Send Us a Message",
            name: "Your Name",
            namePlaceholder: "Enter your full name",
            email: "Email Address",
            emailPlaceholder: "Enter your email",
            message: "Your Message",
            messagePlaceholder: "How can we help you?",
            submit: "Send Message",
          },
          info: {
            title: "Contact Information",
            addressTitle: "Our Location",
            address: "123 Clean Street, Laundry City, LC 12345",
            phoneTitle: "Phone Number",
            phone: "+1 (555) 123-4567",
            emailTitle: "Email Address",
            email: "info@dryclean.example.com",
            hoursTitle: "Business Hours",
            hours: {
              weekdays: "Monday - Friday: 8:00 AM - 6:00 PM",
              weekend: "Saturday: 9:00 AM - 4:00 PM",
            },
          },
          map: {
            title: "Find Us on Map",
            placeholderTitle: "Our Location",
            placeholderText: "Map integration coming soon",
          },
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
          unknownService: "Unknown Service",
          updateStatus: "Update Status",
          deleteConfirm: "Are you sure you want to delete this order?",
        },

        // Home Page
        home: {
          professional: "Professional",
          dryCleaning: "Dry Cleaning",
          service: "Service",
          description:
            "We provide high-quality dry cleaning services with fast turnaround times and exceptional customer service.",
          placeOrder: "Place Order",
          viewServices: "View Services",
          services: "Services",
          popularServices: "Our Popular Services",
          process: "Process",
          howItWorks: "How It Works",
          placeOrderDesc:
            "Select your service and place your order online in just a few clicks.",
          weCollect: "We Collect",
          weCollectDesc:
            "We'll pick up your items at your preferred time and location.",
          deliverBack: "Deliver Back",
          deliverBackDesc:
            "Your clean items will be delivered back to you on time.",
          ready: "Ready to get started?",
          placeFirstOrder: "Place your first order today!",
          joinCustomers:
            "Join thousands of satisfied customers who trust us with their laundry needs.",
          placeNewOrder: "Place New Order",
          signUpNow: "Sign Up Now",
          standardService: "Standard Service",
          delivery24: "24-hour delivery",
          standardServiceDesc:
            "Our standard service with next-day delivery for your everyday laundry needs.",
          expressService: "Express Service",
          sameDay: "Same-day delivery",
          expressServiceDesc:
            "Get your laundry back the same day with our express service.",
          premiumService: "Premium Service",
          delivery48: "48-hour delivery",
          premiumServiceDesc:
            "Special care for delicate and high-end garments with our premium service.",
        },

        // Services Page
        services: {
          title: "Our Services",
          subtitle: "Choose from our professional cleaning services",
          searchPlaceholder: "Search services...",
          noServices: "No services found matching your search",
          noServicesDescription: "Try adjusting your search or filter criteria",
          resetSearch: "Reset Search",
          orderNow: "Order Now",
          loginToOrder: "Login to Order",
          daysDelivery: "days delivery",
          delivery: "Delivery in {{days}} days",
          popular: "Popular",
          allServices: "All Services",
          price: "Price",
          deliveryTime: "Delivery Time",
          defaultDescription:
            "Professional cleaning service with attention to detail",
        },

        // Order History
        orderHistory: {
          title: "Order History",
          subtitle: "View your past and current orders",
          filter: "Filter by status:",
          all: "All",
          pending: "Pending",
          in_progress: "In Progress",
          completed: "Completed",
          cancelled: "Cancelled",
          noOrders: "No orders found",
          noOrdersDescription: "You haven't placed any orders yet",
          firstOrder: "Place Your First Order",
          orderId: "Order ID",
          service: "Service",
          quantity: "Quantity",
          unitPrice: "Unit Price",
          total: "Total",
          pickupDate: "Pickup Date",
          status: "Status",
          unknownService: "Unknown Service",
          viewDetails: "View Details",
          cancelOrder: "Cancel Order",
          cancelConfirm: "Are you sure you want to cancel this order?",
        },

        // Common
        common: {
          loading: "Loading",
          loadingMessage: "Please wait while we process your request",
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
          maxLength: "Maximum length is {{count}} characters",
          optional: "Optional",
        },

        // Notifications
        notifications: {
          orderCreated: "Order created successfully!",
          orderUpdated: "Order updated successfully!",
          orderDeleted: "Order deleted successfully!",
          orderCancelled: "Order cancelled successfully!",
          loginSuccess: "Logged in successfully!",
          logoutSuccess: "Logged out successfully!",
          profileUpdated: "Profile updated successfully!",
          passwordUpdated: "Password updated successfully!",
          errorOccurred: "An error occurred. Please try again.",
          unauthorized: "You need to login to access this page",
          forbidden: "You don't have permission to access this resource",
        },

        // Statuses
        statuses: {
          pending: "Pending",
          in_progress: "In Progress",
          completed: "Completed",
          cancelled: "Cancelled",
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
          updatePassword: "Update Password",
          passwordRequirements:
            "Password must be at least 8 characters and contain a mix of letters, numbers, and symbols",
        },

        // Service Types (add your specific services here)
        serviceTypes: {
          standard_wash: "Standard Wash",
          express_wash: "Express Wash",
          premium_wash: "Premium Wash",
          shirt_laundry: "Shirt Laundry",
          suit_cleaning: "Suit Cleaning",
          dress_cleaning: "Dress Cleaning",
          curtain_cleaning: "Curtain Cleaning",
          leather_cleaning: "Leather Cleaning",
          stain_removal: "Stain Removal",
          ironing: "Ironing Service",
        },
      },
    },
    ar: {
      translation: {
        about: {
          title: "حول خدمة التنظيف الجاف لدينا",
          subtitle: "اكتشف التزامنا بالجودة ورضا العملاء",
          missionTitle: "مهمتنا",
          missionText:
            "توفير خدمات تنظيف جاف استثنائية مع التركيز على الجودة والراحة والمسؤولية البيئية.",
          visionTitle: "رؤيتنا",
          visionText:
            "أن نصبح خدمة التنظيف الجاف الأكثر ثقة في المنطقة من خلال تجاوز توقعات العملاء باستمرار.",
          valuesTitle: "قيمنا",
          values: {
            quality: "الجودة",
            qualityDesc: "لا نتنازل أبدًا عن جودة خدماتنا",
            integrity: "النزاهة",
            integrityDesc: "نمارس أعمالنا بصدق وشفافية",
            innovation: "الابتكار",
            innovationDesc: "نحن نتحسن باستمرار في عملياتنا وخدماتنا",
            sustainability: "الاستدامة",
            sustainabilityDesc: "نحن نهتم بالبيئة في جميع عملياتنا",
            customerFocus: "التركيز على العميل",
            customerFocusDesc: "عملاؤنا هم في قلب كل ما نقوم به",
          },
          historyTitle: "تاريخنا",
          historyText:
            "تأسست في عام 2010، بدأنا كمنظف جاف صغير في الحي ونمت لتصبح مزود خدمة موثوق به مع مواقع متعددة في جميع أنحاء المدينة.",
          features: {
            quality: {
              title: "جودة ممتازة",
              description:
                "نستخدم فقط أفضل حلول التنظيف والتقنيات للعناية بملابسك.",
            },
            eco: {
              title: "صديق للبيئة",
              description:
                "عملياتنا الصديقة للبيئة تضمن كوكبًا نظيفًا مع ملابس نظيفة.",
            },
            delivery: {
              title: "توصيل سريع",
              description:
                "استمتع بأوقات استجابة سريعة مع خدمة الاستلام والتوصيل الفعالة لدينا.",
            },
          },
          team: {
            title: "تعرف على فريقنا",
            subtitle: "المحترفون المتفانون وراء نجاحنا",
            member1: {
              name: "جون سميث",
              position: "المؤسس والرئيس التنفيذي",
              bio: "مع أكثر من 20 عامًا في المجال، أسس جون الشركة برؤية لإحداث ثورة في خدمات التنظيف الجاف.",
            },
            member2: {
              name: "سارة جونسون",
              position: "رئيس العمليات",
              bio: "تضمن سارة سير عملياتنا بسلاسة وأن معايير الجودة لدينا تتحقق باستمرار.",
            },
            member3: {
              name: "مايكل براون",
              position: "خدمة العملاء",
              bio: "يقود مايكل فريق خدمة العملاء لدينا مع التركيز على تجارب عملاء استثنائية.",
            },
            member4: {
              name: "إيميلي ديفيس",
              position: "مراقبة الجودة",
              bio: "تشرف إيميلي على عمليات مراقبة الجودة لدينا للحفاظ على معاييرنا العالية.",
            },
          },
          stats: {
            title: "بالأرقام",
            years: "سنوات في العمل",
            customers: "عملاء سعداء",
            locations: "مواقع",
            items: "عناصر يتم تنظيفها شهريًا",
          },
          testimonials: {
            title: "ما يقوله عملاؤنا",
            subtitle: "لا تأخذ كلمتنا فقط",
            testimonial1: {
              quote:
                "أفضل خدمة تنظيف جاف استخدمتها على الإطلاق. ملابسي تعود دائمًا وكأنها جديدة!",
              author: "ديفيد ويلسون",
            },
            testimonial2: {
              quote:
                "سريعة وموثوقة وصديقة للبيئة. لن أثق بملابسي مع أي شخص آخر.",
              author: "ماريا غارسيا",
            },
            testimonial3: {
              quote:
                "انتباههم للتفاصيل لا مثيل له. أوصي بشدة بخدمتهم الممتازة.",
              author: "جيمس لي",
            },
          },
          cta: {
            title: "هل أنت مستعد لتجربة الفرق؟",
            button: "ضع طلبك الأول",
          },
        },
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
          language: "اللغة",
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
          companyLogo: "شعار الشركة",
          fullNamePlaceholder: "أدخل اسمك الكامل",
          emailPlaceholder: "أدخل بريدك الإلكتروني",
          passwordPlaceholder: "أدخل كلمة المرور",
          confirmPasswordPlaceholder: "تأكيد كلمة المرور",
          // Auth error messages
          errors: {
            invalidEmail: "الرجاء إدخال عنوان بريد إلكتروني صالح",
            passwordLength: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل",
            passwordComplexity:
              "يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم ورمز خاص واحد على الأقل",
            emailRequired: "البريد الإلكتروني مطلوب",
            nameRequired: "الاسم الكامل مطلوب",
            passwordRequired: "كلمة المرور مطلوبة",
            confirmPasswordRequired: "الرجاء تأكيد كلمة المرور",
            authFailed:
              "فشل المصادقة. الرجاء التحقق من بيانات الاعتماد الخاصة بك",
            userExists: "يوجد مستخدم بهذا البريد الإلكتروني بالفعل",
            weakPassword: "كلمة المرور ضعيفة جدًا",
            default: "حدث خطأ. الرجاء المحاولة مرة أخرى",
          },
        },

        // Order Form
        orderForm: {
          title: "تقديم طلب جديد",
          subtitle: "املأ النموذج لجدولة خدمة التنظيف الجاف الخاصة بك",
          service: "الخدمة",
          selectService: "اختر خدمة",
          selectServiceError: "الرجاء اختيار خدمة",
          quantity: "الكمية",
          pickupDate: "تاريخ الاستلام",
          totalPrice: "السعر الإجمالي",
          subtotal: "المجموع الفرعي",
          selectServiceTotal: "اختر خدمة لرؤية السعر الإجمالي",
          placeOrder: "تقديم الطلب",
          processing: "جاري المعالجة...",
          invalidQuantity: "يجب أن تكون الكمية 1 على الأقل",
          invalidPickupDate: "يجب أن يكون تاريخ الاستلام في المستقبل",
          invalidService: "الخدمة المحددة غير متوفرة",
          daysDelivery: "أيام التوصيل",
          delivery: "توصيل خلال {{days}} أيام",
        },

        
        // Dashboard
     
        footer: {
          about: "معلومات عنا",
          quickLinks: "روابط سريعة",
          contact: "اتصل بنا",
          hours: "ساعات العمل",
          weekdays: "الإثنين - الجمعة",
          saturday: "السبت",
          sunday: "الأحد",
          closed: "مغلق",
          copyright: "علي ماهر",
          rightsReserved: "جميع الحقوق محفوظة",
          privacy: "سياسة الخصوصية",
          terms: "شروط الخدمة",
          sitemap: "خريطة الموقع",
        },
       pricing: {
        title: "أسعار بسيطة وشفافة",
        subtitle: "اختر الخطة المثالية لاحتياجات غسيل الملابس الخاصة بك. بدون رسوم خفية، بدون مفاجآت.",
        perMonth: "شهر",
        mostPopular: "الأكثر شعبية",
        choosePlan: "اختر الخطة",
        plans: {
          basic: {
            name: "الغسيل الأساسي",
            price: "٩٫٩٩ $",
            description: "تنظيف أساسي للملابس اليومية",
            features: [
              "٥ قطع شهرياً",
              "منظف قياسي",
              "تسليم خلال ٢٤ ساعة"
            ]
          },
          standard: {
            name: "العناية المعيارية",
            price: "١٩٫٩٩ $",
            description: "خيارنا المتوازن الأكثر شعبية",
            features: [
              "١٥ قطعة شهرياً",
              "منظف ممتاز",
              "تنظيف صديق للبيئة",
              "خيار سريع خلال ١٢ ساعة"
            ]
          },
          premium: {
            name: "الخدمة المميزة",
            price: "٢٩٫٩٩ $",
            description: "أفضل عناية لملابسك",
            features: [
              "قطع غير محدودة",
              "منظف عضوي",
              "خدمة في نفس اليوم",
              "عناية خاصة بالأقمشة",
              "استلام وتسليم مجاني"
            ]
          }
        },
        faq: {
          title: "أسئلة شائعة",
          questions: [
            {
              question: "ما المدرج في كل خطة؟",
              answer: "تتضمن كل خطة تنظيفًا احترافيًا باستخدام منظفات عالية الجودة. تقدم المستويات الأعلى خدمة أسرع وخدمات إضافية."
            },
            {
              question: "هل يمكنني تغيير الخطة لاحقًا؟",
              answer: "نعم، يمكنك الترقية أو التخفيض في خطتك في أي وقت من خلال إعدادات الحساب."
            },
            {
              question: "كيف يعمل الفوترة؟",
              answer: "نحن نخصم من بطاقتك شهريًا في نفس التاريخ الذي سجلت فيه. ستصلك إيصالًا بالبريد الإلكتروني كل شهر."
            },
            {
              question: "هل هناك عقد؟",
              answer: "لا توجد عقود. يمكنك الإلغاء في أي وقت دون عقوبات."
            }
          ]
        }
      }
    ,
        contact: {
          title: "تواصل معنا",
          subtitle:
            "نحن نتطلع لسماع منك! تواصل معنا لأي استفسارات أو طلبات خاصة.",
          form: {
            title: "أرسل لنا رسالة",
            name: "اسمك",
            namePlaceholder: "أدخل اسمك الكامل",
            email: "البريد الإلكتروني",
            emailPlaceholder: "أدخل بريدك الإلكتروني",
            message: "رسالتك",
            messagePlaceholder: "كيف يمكننا مساعدتك؟",
            submit: "إرسال الرسالة",
          },
          info: {
            title: "معلومات الاتصال",
            addressTitle: "موقعنا",
            address: "شارع النظافة 123، مدينة الغسيل",
            phoneTitle: "رقم الهاتف",
            phone: "+٩٦٦ ٥٥ ١٢٣ ٤٥٦٧",
            emailTitle: "البريد الإلكتروني",
            email: "info@dryclean.example.com",
            hoursTitle: "ساعات العمل",
            hours: {
              weekdays: "الإثنين - الجمعة: ٨ صباحاً - ٦ مساءً",
              weekend: "السبت: ٩ صباحاً - ٤ مساءً",
            },
          },
          map: {
            title: "ابحث عنا على الخريطة",
            placeholderTitle: "موقعنا",
            placeholderText: "خريطة التكامل قريباً",
          },
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
          unknownService: "خدمة غير معروفة",
          updateStatus: "تحديث الحالة",
          deleteConfirm: "هل أنت متأكد أنك تريد حذف هذا الطلب؟",
        },

        // Home Page
        home: {
          professional: "احترافية",
          dryCleaning: "تنظيف جاف",
          service: "خدمة",
          description:
            "نقدم خدمات تنظيف جاف عالية الجودة مع أوقات تسليم سريعة وخدمة عملاء استثنائية.",
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
          joinCustomers:
            "انضم إلى الآلاف من العملاء الراضين الذين يثقون بنا في احتياجات غسيل ملابسهم.",
          placeNewOrder: "تقديم طلب جديد",
          signUpNow: "سجل الآن",
          standardService: "الخدمة القياسية",
          delivery24: "توصيل خلال 24 ساعة",
          standardServiceDesc:
            "خدمتنا القياسية مع توصيل في اليوم التالي لاحتياجات غسيل الملابس اليومية.",
          expressService: "خدمة سريعة",
          sameDay: "توصيل في نفس اليوم",
          expressServiceDesc: "احصل على غسيلك في نفس اليوم مع خدمتنا السريعة.",
          premiumService: "خدمة مميزة",
          delivery48: "توصيل خلال 48 ساعة",
          premiumServiceDesc:
            "رعاية خاصة للملابس الحساسة والفاخرة مع خدمتنا المميزة.",
        },

        // Services Page
        services: {
          title: "خدماتنا",
          subtitle: "اختر من بين خدمات التنظيف الاحترافية لدينا",
          searchPlaceholder: "ابحث عن الخدمات...",
          noServices: "لا توجد خدمات تطابق بحثك",
          noServicesDescription: "حاول تعديل بحثك أو معايير التصفية",
          resetSearch: "إعادة تعيين البحث",
          orderNow: "اطلب الآن",
          loginToOrder: "سجل الدخول للطلب",
          daysDelivery: "أيام التوصيل",
          delivery: "توصيل خلال {{days}} أيام",
          popular: "شائع",
          allServices: "جميع الخدمات",
          price: "السعر",
          deliveryTime: "وقت التوصيل",
          defaultDescription: "خدمة تنظيف احترافية مع الاهتمام بالتفاصيل",
        },

        // Order History
        orderHistory: {
          title: "سجل الطلبات",
          subtitle: "عرض طلباتك السابقة والحالية",
          filter: "تصفية حسب الحالة:",
          all: "الكل",
          pending: "قيد الانتظار",
          in_progress: "قيد التنفيذ",
          completed: "مكتمل",
          cancelled: "ملغى",
          noOrders: "لا توجد طلبات",
          noOrdersDescription: "لم تقم بتقديم أي طلبات بعد",
          firstOrder: "قدم طلبك الأول",
          orderId: "رقم الطلب",
          service: "الخدمة",
          quantity: "الكمية",
          unitPrice: "سعر الوحدة",
          total: "المجموع",
          pickupDate: "تاريخ الاستلام",
          status: "الحالة",
          unknownService: "خدمة غير معروفة",
          viewDetails: "عرض التفاصيل",
          cancelOrder: "إلغاء الطلب",
          cancelConfirm: "هل أنت متأكد أنك تريد إلغاء هذا الطلب؟",
        },

        // Common
        common: {
          loading: "جاري التحميل",
          loadingMessage: "الرجاء الانتظار أثناء معالجة طلبك",
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
          maxLength: "الحد الأقصى للطول هو {{count}} أحرف",
          optional: "اختياري",
        },

        // Notifications
        notifications: {
          orderCreated: "تم إنشاء الطلب بنجاح!",
          orderUpdated: "تم تحديث الطلب بنجاح!",
          orderDeleted: "تم حذف الطلب بنجاح!",
          orderCancelled: "تم إلغاء الطلب بنجاح!",
          loginSuccess: "تم تسجيل الدخول بنجاح!",
          logoutSuccess: "تم تسجيل الخروج بنجاح!",
          profileUpdated: "تم تحديث الملف الشخصي بنجاح!",
          passwordUpdated: "تم تحديث كلمة المرور بنجاح!",
          errorOccurred: "حدث خطأ. الرجاء المحاولة مرة أخرى.",
          unauthorized: "تحتاج إلى تسجيل الدخول للوصول إلى هذه الصفحة",
          forbidden: "ليس لديك إذن للوصول إلى هذا المورد",
        },

        // Statuses
        statuses: {
          pending: "قيد الانتظار",
          in_progress: "قيد التنفيذ",
          completed: "مكتمل",
          cancelled: "ملغى",
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
          updatePassword: "تحديث كلمة المرور",
          passwordRequirements:
            "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل وتحتوي على مزيج من الحروف والأرقام والرموز",
        },

        // Service Types (add your specific services here)
        serviceTypes: {
          standard_wash: "غسيل قياسي",
          express_wash: "غسيل سريع",
          premium_wash: "غسيل مميز",
          shirt_laundry: "غسيل القمصان",
          suit_cleaning: "تنظيف البدلات",
          dress_cleaning: "تنظيف الفساتين",
          curtain_cleaning: "تنظيف الستائر",
          leather_cleaning: "تنظيف الجلود",
          stain_removal: "إزالة البقع",
          ironing: "خدمة الكي",
        },
          // App-wide translations
          app: {
            name: "دراي كلين برو",
            slogan: "رعاية احترافية لملابسك",
            loading: "جاري التحميل...",
            error: "حدث خطأ",
            success: "نجاح!",
            notFound: "الصفحة غير موجودة",
            goHome: "العودة للصفحة الرئيسية",
            welcome: "مرحباً",
          },

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
            language: "اللغة",
            employeeDashboard: "لوحة الموظف",
            settings: "الإعدادات",
            notifications: "الإشعارات",
            darkMode: "الوضع المظلم",
            lightMode: "الوضع المضيء",
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
            companyLogo: "شعار الشركة",
            fullNamePlaceholder: "أدخل اسمك الكامل",
            emailPlaceholder: "أدخل بريدك الإلكتروني",
            passwordPlaceholder: "أدخل كلمة المرور",
            confirmPasswordPlaceholder: "تأكيد كلمة المرور",
            resetPassword: "إعادة تعيين كلمة المرور",
            sendResetLink: "إرسال رابط التعيين",
            backToLogin: "العودة لتسجيل الدخول",
            // Auth error messages
            errors: {
              invalidEmail: "الرجاء إدخال بريد إلكتروني صالح",
              passwordLength: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل",
              passwordComplexity:
                "يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم ورمز خاص واحد على الأقل",
              emailRequired: "البريد الإلكتروني مطلوب",
              nameRequired: "الاسم الكامل مطلوب",
              passwordRequired: "كلمة المرور مطلوبة",
              confirmPasswordRequired: "الرجاء تأكيد كلمة المرور",
              authFailed: "فشل المصادقة. الرجاء التحقق من بيانات الاعتماد الخاصة بك",
              userExists: "يوجد مستخدم بهذا البريد الإلكتروني بالفعل",
              weakPassword: "كلمة المرور ضعيفة جدًا",
              default: "حدث خطأ. الرجاء المحاولة مرة أخرى",
              resetPasswordSuccess: "تم إرسال بريد إعادة تعيين كلمة المرور بنجاح",
            },
          },

          // Dashboard
          dashboard: {
            title: "لوحة التحكم",
            overview: "نظرة عامة",
            stats: {
              totalOrders: "إجمالي الطلبات",
              completedOrders: "الطلبات المكتملة",
              pendingOrders: "الطلبات المعلقة",
              totalRevenue: "إجمالي الإيرادات",
              activeUsers: "المستخدمون النشطون",
              newCustomers: "عملاء جدد",
            },
            recentActivity: "النشاط الحديث",
            viewAll: "عرض الكل",
            quickActions: "إجراءات سريعة",
            addNewOrder: "إضافة طلب جديد",
            manageServices: "إدارة الخدمات",
            viewReports: "عرض التقارير",
            customerFeedback: "تعليقات العملاء",
          },

          // Admin specific
          admin: {
            users: {
              title: "إدارة المستخدمين",
              allUsers: "جميع المستخدمين",
              activeUsers: "المستخدمون النشطون",
              inactiveUsers: "المستخدمون غير النشطين",
              search: "بحث عن المستخدمين",
              userId: "معرف المستخدم",
              name: "الاسم",
              email: "البريد الإلكتروني",
              role: "الدور",
              status: "الحالة",
              lastLogin: "آخر تسجيل دخول",
              actions: "الإجراءات",
              createUser: "إنشاء مستخدم",
              editUser: "تعديل المستخدم",
              deleteUser: "حذف المستخدم",
              deleteConfirm: "هل أنت متأكد أنك تريد حذف هذا المستخدم؟",
              roles: {
                admin: "مدير",
                employee: "موظف",
                client: "عميل"
              },
              statuses: {
                active: "نشط",
                inactive: "غير نشط"
              }
            },
            settings: {
              title: "الإعدادات",
              general: "الإعدادات العامة",
              services: "إدارة الخدمات",
              pricing: "إعدادات التسعير",
              notifications: "إعدادات الإشعارات",
              businessHours: "ساعات العمل",
              deliverySettings: "إعدادات التوصيل",
              saveChanges: "حفظ التغييرات",
              resetDefaults: "إعادة التعيين إلى الافتراضي",
            },
            reports: {
              title: "التقارير",
              sales: "تقارير المبيعات",
              customers: "تقارير العملاء",
              inventory: "تقارير المخزون",
              financial: "تقارير مالية",
              export: "تصدير التقرير",
              generate: "إنشاء تقرير",
              dateRange: "نطاق التاريخ",
              filter: "تصفية",
            }
          },

          // Employee Dashboard
          employee: {
            dashboard: {
              title: "لوحة الموظف",
              assignedTasks: "المهام الموكلة",
              completedTasks: "المهام المكتملة",
              pendingApproval: "بانتظار الموافقة",
              performance: "مقاييس الأداء",
              efficiency: "تصنيف الكفاءة",
              attendance: "سجل الحضور",
              upcoming: "الجدول القادم",
              recentActivity: "النشاط الحديث",
            },
            orders: {
              process: "معالجة الطلب",
              updateStatus: "تحديث الحالة",
              addNotes: "إضافة ملاحظات",
              viewDetails: "عرض التفاصيل",
              priority: "الأولوية",
              high: "عالي",
              medium: "متوسط",
              low: "منخفض",
            },
            tasks: {
              title: "إدارة المهام",
              new: "مهام جديدة",
              inProgress: "قيد التنفيذ",
              completed: "مكتملة",
              overdue: "متأخرة",
              dueToday: "مستحقة اليوم",
              markComplete: "وضع علامة مكتمل",
            }
          },

          // Client Portal
          client: {
            dashboard: {
              title: "حسابي",
              recentOrders: "الطلبات الحديثة",
              loyaltyPoints: "نقاط الولاء",
              preferences: "التفضيلات",
              addressBook: "دفتر العناوين",
              paymentMethods: "طرق الدفع",
              notifications: "الإشعارات",
              referrals: "برنامج الإحالة",
            },
            loyalty: {
              points: "نقاط الولاء",
              rewards: "المكافآت المتاحة",
              history: "سجل النقاط",
              redeem: "استبدال المكافأة",
              tier: "مستوى العضوية",
              silver: "فضي",
              gold: "ذهبي",
              platinum: "بلاتيني",
            }
          },

          // Calendar
          calendar: {
            title: "التقويم",
            today: "اليوم",
            week: "أسبوع",
            month: "شهر",
            year: "سنة",
            agenda: "جدول الأعمال",
            noEvents: "لا توجد أحداث مجدولة",
            addEvent: "إضافة حدث",
            eventDetails: "تفاصيل الحدث",
            allDay: "طوال اليوم",
            description: "الوصف",
            location: "الموقع",
            repeat: "تكرار",
            never: "أبداً",
            daily: "يومي",
            weekly: "أسبوعي",
            monthly: "شهري",
            yearly: "سنوي",
          },

          // File Upload
          fileUpload: {
            title: "رفع الملفات",
            browse: "تصفح الملفات",
            dragDrop: "اسحب وأسقط الملفات هنا",
            maxSize: "الحد الأقصى لحجم الملف: {{size}} ميجابايت",
            supportedFormats: "الصيغ المدعومة: {{formats}}",
            uploadSuccess: "تم الرفع بنجاح",
            uploadFailed: "فشل الرفع",
            remove: "إزالة",
            preview: "معاينة",
          },

          // Data Tables
          dataTable: {
            rowsPerPage: "صفوف لكل صفحة:",
            of: "من",
            search: "بحث",
            noData: "لا توجد بيانات متاحة",
            selected: "محدد",
            actions: "إجراءات",
            edit: "تعديل",
            delete: "حذف",
            view: "عرض",
            sort: "ترتيب",
            filter: "تصفية",
          },

          // Form Validation
          validation: {
            required: "هذا الحقل مطلوب",
            email: "يجب أن يكون بريدًا إلكترونيًا صالحًا",
            minLength: "يجب أن يكون {{count}} أحرف على الأقل",
            maxLength: "يجب ألا يزيد عن {{count}} أحرف",
            numeric: "يجب أن يكون رقمًا",
            integer: "يجب أن يكون عددًا صحيحًا",
            positive: "يجب أن يكون موجبًا",
            url: "يجب أن يكون رابطًا صالحًا",
            phone: "يجب أن يكون رقم هاتف صالح",
            matchField: "يجب أن يتطابق مع {{field}}",
            passwordStrength: "يجب أن تحتوي كلمة المرور على:",
            passwordReq1: "8+ أحرف",
            passwordReq2: "حرف كبير واحد على الأقل",
            passwordReq3: "حرف صغير واحد على الأقل",
            passwordReq4: "رقم واحد على الأقل",
            passwordReq5: "رمز خاص واحد على الأقل",
          },

          // System Status
          status: {
            online: "متصل",
            offline: "غير متصل",
            maintenance: "تحت الصيانة",
            degraded: "أداء منخفض",
            unknown: "حالة غير معروفة",
            lastUpdated: "آخر تحديث",
          },
      },
    },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
