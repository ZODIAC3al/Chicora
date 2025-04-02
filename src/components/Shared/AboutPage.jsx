import { MotionDiv, fadeIn, slideUp, MotionH1 } from "../../context/AppContext";
import { useTranslation } from "react-i18next";
import { GiWashingMachine } from "react-icons/gi";
import { motion } from "framer-motion";
import i18n from "../../i18n";

const AboutPage = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";

  const features = [
    {
      title: t("about.features.quality.title"),
      description: t("about.features.quality.description"),
      icon: "✨",
    },
    {
      title: t("about.features.eco.title"),
      description: t("about.features.eco.description"),
      icon: "🌱",
    },
    {
      title: t("about.features.delivery.title"),
      description: t("about.features.delivery.description"),
      icon: "🚚",
    },
  ];

  const values = [
    {
      title: t("about.values.quality"),
      description: t("about.values.qualityDesc"),
      icon: "🏆",
    },
    {
      title: t("about.values.integrity"),
      description: t("about.values.integrityDesc"),
      icon: "🤝",
    },
    {
      title: t("about.values.innovation"),
      description: t("about.values.innovationDesc"),
      icon: "💡",
    },
    {
      title: t("about.values.sustainability"),
      description: t("about.values.sustainabilityDesc"),
      icon: "🌍",
    },
    {
      title: t("about.values.customerFocus"),
      description: t("about.values.customerFocusDesc"),
      icon: "❤️",
    },
  ];

  const stats = [
    { value: "13+", label: t("about.stats.years") },
    { value: "10K+", label: t("about.stats.customers") },
    { value: "5", label: t("about.stats.locations") },
    { value: "50K+", label: t("about.stats.items") },
  ];

  const testimonials = [
    {
      quote: t("about.testimonials.testimonial1.quote"),
      author: t("about.testimonials.testimonial1.author"),
    },
    {
      quote: t("about.testimonials.testimonial2.quote"),
      author: t("about.testimonials.testimonial2.author"),
    },
    {
      quote: t("about.testimonials.testimonial3.quote"),
      author: t("about.testimonials.testimonial3.author"),
    },
  ];

  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className={`min-h-screen bg-gradient-to-b from-blue-50 to-white ${
        isRTL ? "rtl" : ""
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-blue-200 rounded-full blur opacity-75 animate-pulse"></div>
            <div className="relative flex items-center justify-center h-16 w-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-lg mx-auto">
              <GiWashingMachine className="text-white text-2xl" />
            </div>
          </div>
        </motion.div>

        <MotionH1
          variants={slideUp}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          {t("about.title")}
        </MotionH1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          {t("about.subtitle")}
        </motion.p>
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            variants={slideUp}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {t("about.missionTitle")}
            </h3>
            <p className="text-gray-600">{t("about.missionText")}</p>
          </motion.div>

          <motion.div
            variants={slideUp}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {t("about.visionTitle")}
            </h3>
            <p className="text-gray-600">{t("about.visionText")}</p>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={slideUp}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Values Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <MotionH1
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12"
          >
            {t("about.valuesTitle")}
          </MotionH1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="text-3xl mb-3">{value.icon}</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <MotionH1
              variants={slideUp}
              className="text-3xl font-bold text-gray-800 mb-6"
            >
              {t("about.historyTitle")}
            </MotionH1>
            <motion.p variants={slideUp} className="text-gray-600">
              {t("about.historyText")}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <MotionH1
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            {t("about.stats.title")}
          </MotionH1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <MotionH1
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12"
          >
            {t("about.team.title")}
          </MotionH1>
          <motion.p
            variants={slideUp}
            className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12"
          >
            {t("about.team.subtitle")}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                variants={slideUp}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800">
                    {t(`about.team.member${item}.name`)}
                  </h4>
                  <p className="text-blue-600 font-medium mb-3">
                    {t(`about.team.member${item}.position`)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {t(`about.team.member${item}.bio`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <MotionH1
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4"
          >
            {t("about.testimonials.title")}
          </MotionH1>
          <motion.p
            variants={slideUp}
            className="text-xl text-gray-600 text-center mb-12"
          >
            {t("about.testimonials.subtitle")}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <div className="text-gray-600 italic mb-4">
                  "{testimonial.quote}"
                </div>
                <div className="font-bold text-gray-800">
                  - {testimonial.author}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

// 3. Pricing Page
const PricingPage = () => {
  const { t } = useTranslation();

  const plans = [
    {
      name: t("pricing.plans.basic.name"),
      price: t("pricing.plans.basic.price"),
      description: t("pricing.plans.basic.description"),
      features: [
        t("pricing.plans.basic.features.0"),
        t("pricing.plans.basic.features.1"),
        t("pricing.plans.basic.features.2"),
      ],
      popular: false,
    },
    {
      name: t("pricing.plans.standard.name"),
      price: t("pricing.plans.standard.price"),
      description: t("pricing.plans.standard.description"),
      features: [
        t("pricing.plans.standard.features.0"),
        t("pricing.plans.standard.features.1"),
        t("pricing.plans.standard.features.2"),
        t("pricing.plans.standard.features.3"),
      ],
      popular: true,
    },
    {
      name: t("pricing.plans.premium.name"),
      price: t("pricing.plans.premium.price"),
      description: t("pricing.plans.premium.description"),
      features: [
        t("pricing.plans.premium.features.0"),
        t("pricing.plans.premium.features.1"),
        t("pricing.plans.premium.features.2"),
        t("pricing.plans.premium.features.3"),
        t("pricing.plans.premium.features.4"),
      ],
      popular: false,
    },
  ];

  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-200 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative flex items-center justify-center h-16 w-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-lg mx-auto">
                <GiWashingMachine className="text-white text-2xl" />
              </div>
            </div>
          </motion.div>

          <MotionH1
            variants={slideUp}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            {t("pricing.title")}
          </MotionH1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t("pricing.subtitle")}
          </motion.p>
        </div>

        {/* Pricing Plans */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={slideUp}
              whileHover={{ y: -10 }}
              className={`relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-blue-500 transform scale-105"
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                  {t("pricing.mostPopular")}
                </div>
              )}

              <div className={`p-8 ${plan.popular ? "bg-white" : "bg-white"}`}>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-blue-600">
                    {plan.price}
                  </span>
                  <span className="text-gray-500">
                    /{t("pricing.perMonth")}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {t("pricing.choosePlan")}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <MotionH1
            variants={slideUp}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            {t("pricing.faq.title")}
          </MotionH1>

          <motion.div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                variants={slideUp}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  {t(`pricing.faq.questions.${item - 1}.question`)}
                </h4>
                <p className="text-gray-600">
                  {t(`pricing.faq.questions.${item - 1}.answer`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </MotionDiv>
  );
};

// Add these translations to your i18n configuration
i18n.addResources("en", "translation", {
  about: {
    title: "About Our Dry Cleaning Service",
    subtitle: "Discover our commitment to quality and customer satisfaction",
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
      member1: {
        name: "John Smith",
        position: "Founder & CEO",
      },
      member2: {
        name: "Sarah Johnson",
        position: "Head of Operations",
      },
      member3: {
        name: "Michael Brown",
        position: "Customer Service",
      },
      member4: {
        name: "Emily Davis",
        position: "Quality Control",
      },
    },
  },
  contact: {
    title: "Contact Us",
    subtitle: "We'd love to hear from you! Get in touch with our team",
    form: {
      title: "Send us a message",
      name: "Your Name",
      namePlaceholder: "Enter your full name",
      email: "Email Address",
      emailPlaceholder: "Enter your email address",
      message: "Your Message",
      messagePlaceholder: "How can we help you?",
      submit: "Send Message",
    },
    info: {
      title: "Contact Information",
      addressTitle: "Our Location",
      address: "123 Clean Street, Suite 100, San Francisco, CA 94107",
      phoneTitle: "Phone Number",
      phone: "+1 (555) 123-4567",
      emailTitle: "Email Address",
      email: "hello@drycleanpro.com",
    },
    map: {
      title: "Find Us on Map",
      placeholder: "Map would appear here",
    },
  },
  pricing: {
    title: "Simple, Transparent Pricing",
    subtitle: "Choose the perfect plan for your laundry needs",
    mostPopular: "Most Popular",
    perMonth: "month",
    choosePlan: "Choose Plan",
    plans: {
      basic: {
        name: "Basic",
        price: "$19",
        description: "For individuals with occasional laundry needs",
        features: [
          "5 items per month",
          "Standard cleaning",
          "48-hour turnaround",
        ],
      },
      standard: {
        name: "Standard",
        price: "$39",
        description: "Perfect for regular users with weekly laundry",
        features: [
          "15 items per month",
          "Premium cleaning",
          "24-hour turnaround",
          "Free pickup & delivery",
        ],
      },
      premium: {
        name: "Premium",
        price: "$79",
        description: "For those who demand the very best service",
        features: [
          "Unlimited items",
          "Ultimate premium cleaning",
          "Same-day service",
          "Free pickup & delivery",
          "Priority customer support",
        ],
      },
    },
    faq: {
      title: "Frequently Asked Questions",
      questions: [
        {
          question: "What's included in the basic plan?",
          answer:
            "The basic plan includes 5 items per month with standard cleaning and 48-hour turnaround time.",
        },
        {
          question: "Can I change plans later?",
          answer:
            "Yes, you can upgrade or downgrade your plan at any time from your account settings.",
        },
        {
          question: "Is there a contract?",
          answer:
            "No, all our plans are month-to-month with no long-term contracts.",
        },
        {
          question: "How does pickup and delivery work?",
          answer:
            "We offer free pickup and delivery for Standard and Premium plans at your preferred time and location.",
        },
      ],
    },
  },
});

// Arabic translations
i18n.addResources("ar", "translation", {
  about: {
    title: "حول خدمة التنظيف الجاف لدينا",
    subtitle: "اكتشف التزامنا بالجودة ورضا العملاء",
    features: {
      quality: {
        title: "جودة ممتازة",
        description: "نستخدم فقط أفضل حلول التنظيف والتقنيات للعناية بملابسك.",
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
      member1: {
        name: "جون سميث",
        position: "المؤسس والرئيس التنفيذي",
      },
      member2: {
        name: "سارة جونسون",
        position: "رئيس العمليات",
      },
      member3: {
        name: "مايكل براون",
        position: "خدمة العملاء",
      },
      member4: {
        name: "إيميلي ديفيس",
        position: "مراقبة الجودة",
      },
    },
  },
  contact: {
    title: "اتصل بنا",
    subtitle: "نود أن نسمع منك! تواصل مع فريقنا",
    form: {
      title: "أرسل لنا رسالة",
      name: "اسمك",
      namePlaceholder: "أدخل اسمك الكامل",
      email: "عنوان البريد الإلكتروني",
      emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
      message: "رسالتك",
      messagePlaceholder: "كيف يمكننا مساعدتك؟",
      submit: "إرسال الرسالة",
    },
    info: {
      title: "معلومات الاتصال",
      addressTitle: "موقعنا",
      address: "123 شارع كلين، جناح 100، سان فرانسيسكو، كاليفورنيا 94107",
      phoneTitle: "رقم الهاتف",
      phone: "+1 (555) 123-4567",
      emailTitle: "عنوان البريد الإلكتروني",
      email: "hello@drycleanpro.com",
    },
    map: {
      title: "ابحث عنا على الخريطة",
      placeholder: "ستظهر الخريطة هنا",
    },
  },
  pricing: {
    title: "أسعار بسيطة وشفافة",
    subtitle: "اختر الخطة المثالية لاحتياجات غسيل الملابس الخاصة بك",
    mostPopular: "الأكثر شعبية",
    perMonth: "شهر",
    choosePlan: "اختر الخطة",
    plans: {
      basic: {
        name: "أساسي",
        price: "19$",
        description: "للأفراد ذوي احتياجات الغسيل العرضية",
        features: ["5 قطع في الشهر", "تنظيف قياسي", "وقت التسليم 48 ساعة"],
      },
      standard: {
        name: "قياسي",
        price: "39$",
        description: "مثالي للمستخدمين المنتظمين مع غسيل أسبوعي",
        features: [
          "15 قطعة في الشهر",
          "تنظيف ممتاز",
          "وقت التسليم 24 ساعة",
          "استلام وتوصيل مجاني",
        ],
      },
      premium: {
        name: "ممتاز",
        price: "79$",
        description: "لأولئك الذين يطالبون بأفضل خدمة",
        features: [
          "قطع غير محدودة",
          "تنظيف ممتاز فائق",
          "خدمة في نفس اليوم",
          "استلام وتوصيل مجاني",
          "دعم عملاء مميز",
        ],
      },
    },
    faq: {
      title: "أسئلة مكررة",
      questions: [
        {
          question: "ما المدرج في الخطة الأساسية؟",
          answer:
            "تتضمن الخطة الأساسية 5 قطع شهريًا مع تنظيف قياسي ووقت تسليم 48 ساعة.",
        },
        {
          question: "هل يمكنني تغيير الخطط لاحقًا؟",
          answer: "نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت من إعدادات حسابك.",
        },
        {
          question: "هل هناك عقد؟",
          answer: "لا، جميع خططنا شهرية بدون عقود طويلة الأجل.",
        },
        {
          question: "كيف يعمل الاستلام والتوصيل؟",
          answer:
            "نحن نقدم خدمة الاستلام والتوصيل المجانية للخطط القياسية والممتازة في الوقت والمكان الذي تفضله.",
        },
      ],
    },
  },
});

export default AboutPage;
