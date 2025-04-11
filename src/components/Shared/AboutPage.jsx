import { MotionDiv, fadeIn, slideUp, MotionH1 } from "../../context/AppContext";
import { useTranslation } from "react-i18next";
import { GiWashingMachine } from "react-icons/gi";
import { motion, useAnimation } from "framer-motion";
import i18n from "../../i18n";
import { useEffect } from "react";

const AboutPage = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Egyptian-themed data
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
    { value: "15+", label: t("about.stats.years") },
    { value: "25K+", label: t("about.stats.customers") },
    { value: "8", label: t("about.stats.locations") },
    { value: "100K+", label: t("about.stats.items") },
  ];

  const testimonials = [
    {
      quote: t("about.testimonials.testimonial1.quote"),
      author: t("about.testimonials.testimonial1.author"),
      role: t("about.testimonials.testimonial1.role"),
    },
    {
      quote: t("about.testimonials.testimonial2.quote"),
      author: t("about.testimonials.testimonial2.author"),
      role: t("about.testimonials.testimonial2.role"),
    },
    {
      quote: t("about.testimonials.testimonial3.quote"),
      author: t("about.testimonials.testimonial3.author"),
      role: t("about.testimonials.testimonial3.role"),
    },
  ];

  // Animated SVG Background Component
  const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <svg
        className="absolute w-full h-full opacity-10"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
          d="M0 400 Q 300 100 600 400 T 1200 400"
          stroke="#3B82F6"
          strokeWidth="2"
          fill="none"
        />
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          cx="200"
          cy="200"
          r="30"
          fill="#3B82F6"
          fillOpacity="0.2"
        />
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          cx="1000"
          cy="600"
          r="40"
          fill="#3B82F6"
          fillOpacity="0.2"
        />
        <motion.rect
          initial={{ rotate: 0 }}
          animate={{ rotate: 45 }}
          transition={{
            duration: 2,
            delay: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          x="800"
          y="100"
          width="50"
          height="50"
          fill="#3B82F6"
          fillOpacity="0.2"
        />
      </svg>
    </div>
  );

  // Floating Bubbles Animation
  const FloatingBubbles = () => {
    const bubbles = Array.from({ length: 15 }).map((_, i) => {
      const size = Math.random() * 20 + 10;
      const posX = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 10;

      return (
        <motion.div
          key={i}
          initial={{ y: 800, opacity: 0 }}
          animate={{ y: -100, opacity: [0, 0.5, 0] }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${posX}%`,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            backgroundColor: "#3B82F6",
            opacity: 0.3,
          }}
        />
      );
    });

    return (
      <div className="absolute inset-0 overflow-hidden -z-10">{bubbles}</div>
    );
  };

  return (
    <MotionDiv
      initial="hidden"
      animate={controls}
      variants={fadeIn}
      className={`min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden relative ${
        isRTL ? "rtl" : ""
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <AnimatedBackground />
      <FloatingBubbles />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            type: "spring",
            damping: 10,
            stiffness: 100,
          }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute -inset-1 bg-blue-200 rounded-full blur opacity-75"
            ></motion.div>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="relative flex items-center justify-center h-16 w-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-lg mx-auto"
            >
              <GiWashingMachine className="text-white text-2xl" />
            </motion.div>
          </div>
        </motion.div>

        <MotionH1
          variants={slideUp}
          className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
        >
          {t("about.title")}
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-blue-600"
          >
            .
          </motion.span>
        </MotionH1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          {t("about.subtitle")}
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ delay: 0.6 }}
          className="h-1 bg-blue-500 mx-auto mt-8 rounded-full"
        />
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-xl border border-blue-100 hover:border-blue-200 transition-all"
          >
            <div className="flex items-center mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl mr-4"
              >
                🎯
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800">
                {t("about.missionTitle")}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {t("about.missionText")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-xl border border-blue-100 hover:border-blue-200 transition-all"
          >
            <div className="flex items-center mb-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-3xl mr-4"
              >
                👁️
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800">
                {t("about.visionTitle")}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {t("about.visionText")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <MotionH1
          variants={slideUp}
          className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12"
        >
          {t("about.features.title")}
        </MotionH1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)",
              }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 text-9xl opacity-10">
                {feature.icon}
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-4xl mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            viewBox="0 0 1200 800"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M0 400 Q 300 200 600 400 T 1200 400"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <MotionH1
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          >
            {t("about.valuesTitle")}
          </MotionH1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md text-center backdrop-blur-sm hover:bg-opacity-100 transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className="text-3xl mb-3"
                >
                  {value.icon}
                </motion.div>
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
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-50"></div>
          <div className="relative p-8 md:p-12">
            <MotionH1
              variants={slideUp}
              className="text-3xl font-bold text-gray-800 mb-6"
            >
              {t("about.historyTitle")}
            </MotionH1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-600 leading-relaxed"
            >
              {t("about.historyText")}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-1 bg-blue-500 mt-8 origin-left"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-900 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg
            viewBox="0 0 1200 800"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
              d="M0 400 Q 300 600 600 400 T 1200 400"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-4xl md:text-5xl font-bold mb-2 text-blue-200"
                >
                  {stat.value}
                </motion.div>
                <div className="text-lg text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <MotionH1
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6"
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (item - 1) * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 relative overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.8 }}
                    className="absolute inset-0 bg-blue-900 flex items-center justify-center text-white font-bold text-lg opacity-0 transition-opacity duration-300"
                  >
                    {t(`about.team.member${item}.bio`).substring(0, 50)}...
                  </motion.div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {t(`about.team.member${item}.name`)}
                  </h4>
                  <p className="text-blue-600 font-medium mb-3">
                    {t(`about.team.member${item}.position`)}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {t(`about.team.member${item}.bio`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            viewBox="0 0 1200 800"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
              d="M0 400 Q 300 200 600 400 T 1200 400"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg relative"
              >
                <div className="absolute top-0 left-0 text-6xl text-blue-100 font-serif transform -translate-y-6">
                  "
                </div>
                <div className="text-gray-600 italic mb-6 relative z-10">
                  {testimonial.quote}
                </div>
                <div className="font-bold text-gray-800">
                  - {testimonial.author}
                </div>
                {testimonial.role && (
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

// Update your i18n resources with Egyptian data
i18n.addResources("en", "translation", {
  about: {
    title: "Nile Dry Cleaners - Premium Care for Your Garments",
    subtitle:
      "Cairo's trusted dry cleaning service since 2008 - Combining traditional methods with modern technology",
    missionTitle: "Our Mission",
    missionText:
      "To provide exceptional garment care services to the people of Cairo while maintaining the highest standards of quality and environmental responsibility.",
    visionTitle: "Our Vision",
    visionText:
      "To become Egypt's leading dry cleaning chain, setting new standards in garment care and customer service across the Nile Delta region.",
    featuresTitle: "Why Choose Nile Dry Cleaners?",
    features: {
      quality: {
        title: "Egyptian Cotton Quality",
        description:
          "We treat your garments with the same care as premium Egyptian cotton, using techniques perfected over decades.",
      },
      eco: {
        title: "Nile-Friendly",
        description:
          "Our eco-conscious processes protect the Nile's delicate ecosystem while delivering spotless results.",
      },
      delivery: {
        title: "Cairo-Wide Delivery",
        description:
          "Free pickup and delivery across Greater Cairo, with same-day service in Zamalek and Garden City.",
      },
    },
    valuesTitle: "Our Egyptian Values",
    values: {
      quality: "Excellence (Itqan)",
      qualityDesc:
        "We take pride in our work, just as ancient Egyptian artisans took pride in their crafts.",
      integrity: "Honesty (Amana)",
      integrityDesc:
        "We treat every customer's garments as if they were our own, with complete transparency.",
      innovation: "Innovation (Ibda)",
      innovationDesc:
        "Combining traditional Egyptian fabric care with modern technology.",
      sustainability: "Sustainability (Istidama)",
      sustainabilityDesc:
        "Protecting Egypt's environment for future generations.",
      customerFocus: "Hospitality (Karama)",
      customerFocusDesc:
        "Treating every customer with the warmth and respect of Egyptian hospitality.",
    },
    historyTitle: "Our Story Along the Nile",
    historyText:
      "Founded in 2008 in downtown Cairo, Nile Dry Cleaners started as a small family business. Over the years, we've grown to serve customers across Egypt's capital while maintaining our commitment to quality and community. Today, with 8 locations from Maadi to Heliopolis, we continue to build on our reputation as Cairo's most trusted dry cleaner.",
    stats: {
      title: "Serving Egypt With Pride",
      years: "Years in Business",
      customers: "Satisfied Customers",
      locations: "Locations Across Cairo",
      items: "Items Cleaned Annually",
    },
    team: {
      title: "Meet Our Cairo Team",
      subtitle: "Dedicated professionals serving Egypt's capital",
      member1: {
        name: "Ahmed El-Sayed",
        position: "Founder & CEO",
        bio: "With over 20 years in the garment care industry, Ahmed established Nile Dry Cleaners to bring international standards to Egypt.",
      },
      member2: {
        name: "Fatima Mahmoud",
        position: "Quality Control",
        bio: "Fatima ensures every garment meets our exacting standards before returning to customers.",
      },
      member3: {
        name: "Youssef Hassan",
        position: "Customer Service",
        bio: "Youssef and his team provide the warm Egyptian hospitality we're known for.",
      },
      member4: {
        name: "Layla Abdelrahman",
        position: "Sustainability Officer",
        bio: "Layla oversees our eco-friendly initiatives to protect the Nile environment.",
      },
    },
    testimonials: {
      title: "What Our Customers Say",
      subtitle: "Hear from satisfied clients across Greater Cairo",
      testimonial1: {
        quote:
          "Nile Dry Cleaners saved my favorite galabeya after a wedding disaster. Their stain removal is magical!",
        author: "Mona Khalil",
        role: "Zamalek Resident",
      },
      testimonial2: {
        quote:
          "As a business professional, I trust them with my suits. Always perfect, always on time.",
        author: "Omar Farouk",
        role: "Maadi Customer",
      },
      testimonial3: {
        quote:
          "Their pickup service is a lifesaver for busy moms like me. Quality service with Egyptian warmth.",
        author: "Nadia Ibrahim",
        role: "Heliopolis Customer",
      },
    },
  },
});

i18n.addResources("ar", "translation", {
  about: {
    title: "نايل دراي كلين - العناية الفاخرة بملابسك",
    subtitle:
      "خدمة التنظيف الجاف الموثوقة في القاهرة منذ 2008 - نجمع بين الطرق التقليدية والتكنولوجيا الحديثة",
    missionTitle: "مهمتنا",
    missionText:
      "توفير خدمات استثنائية للعناية بالملابس لشعب القاهرة مع الحفاظ على أعلى معايير الجودة والمسؤولية البيئية.",
    visionTitle: "رؤيتنا",
    visionText:
      "أن نصبح سلسلة التنظيف الجاف الرائدة في مصر، ونضع معايير جديدة في العناية بالملابس وخدمة العملاء في جميع أنحاء منطقة دلتا النيل.",
    featuresTitle: "لماذا تختار نايل دراي كلين؟",
    features: {
      quality: {
        title: "جودة القطن المصري",
        description:
          "نعامل ملابسك بنفس العناية التي نعامل بها القطن المصري الفاخر، باستخدام تقنيات تم تحسينها على مدى عقود.",
      },
      eco: {
        title: "صديق للنيل",
        description:
          "عملياتنا الصديقة للبيئة تحمي النظام البيئي الحساس للنيل مع تقديم نتائج نظيفة.",
      },
      delivery: {
        title: "توصيل في جميع أنحاء القاهرة",
        description:
          "استلام وتوصيل مجاني في جميع أنحاء القاهرة الكبرى، مع خدمة في نفس اليوم في الزمالك وجاردن سيتي.",
      },
    },
    valuesTitle: "قيمنا المصرية",
    values: {
      quality: "الإتقان",
      qualityDesc: "نفتخر بعملنا، كما افتخر الحرفيون المصريون القدماء بحرفهم.",
      integrity: "الأمانة",
      integrityDesc: "نعامل ملابس كل عميل كما لو كانت ملكنا، بشفافية كاملة.",
      innovation: "الابتكار",
      innovationDesc:
        "الجمع بين العناية التقليدية بالأقمشة المصرية والتكنولوجيا الحديثة.",
      sustainability: "الاستدامة",
      sustainabilityDesc: "حماية البيئة المصرية للأجيال القادمة.",
      customerFocus: "الكرم",
      customerFocusDesc: "معاملة كل عميل بدفء واحترام الضيافة المصرية.",
    },
    historyTitle: "قصتنا على ضفاف النيل",
    historyText:
      "تأسست نايل دراي كلين عام 2008 في وسط القاهرة كشركة عائلية صغيرة. على مر السنين، نما عملنا لخدمة العملاء في جميع أنحاء عاصمة مصر مع الحفاظ على التزامنا بالجودة والمجتمع. اليوم، مع 8 فروع من المعادي إلى مصر الجديدة، نواصل بناء سمعتنا كأكثر محلات التنظيف الجاف ثقة في القاهرة.",
    stats: {
      title: "نخدم مصر بفخر",
      years: "سنوات في العمل",
      customers: "عميل راضٍ",
      locations: "فرع في أنحاء القاهرة",
      items: "قطعة يتم تنظيفها سنوياً",
    },
    team: {
      title: "تعرف على فريقنا في القاهرة",
      subtitle: "محترفون مخلصون يخدمون عاصمة مصر",
      member1: {
        name: "أحمد السيد",
        position: "المؤسس والرئيس التنفيذي",
        bio: "مع أكثر من 20 عامًا في صناعة العناية بالملابس، أسس أحمد نايل دراي كلين لجلب المعايير الدولية إلى مصر.",
      },
      member2: {
        name: "فاطمة محمود",
        position: "مراقبة الجودة",
        bio: "تتأكد فاطمة من أن كل قطعة ملابس تفي بمعاييرنا الدقيقة قبل إعادتها إلى العملاء.",
      },
      member3: {
        name: "يوسف حسن",
        position: "خدمة العملاء",
        bio: "يوسف وفريقه يقدمون الدفء والضيافة المصرية التي تشتهر بها شركتنا.",
      },
      member4: {
        name: "ليلى عبد الرحمن",
        position: "مسؤولة الاستدامة",
        bio: "ليلى تشرف على مبادراتنا الصديقة للبيئة لحماية بيئة النيل.",
      },
    },
    testimonials: {
      title: "ما يقوله عملاؤنا",
      subtitle: "استمع إلى آراء العملاء الراضين من جميع أنحاء القاهرة الكبرى",
      testimonial1: {
        quote:
          "نايل دراي كلين أنقذت غلابيتي المفضلة بعد كارثة حفل زفاف. إزالة البقع لديهم سحرية!",
        author: "منى خليل",
        role: "مقيمة في الزمالك",
      },
      testimonial2: {
        quote:
          "كشخص محترف، أثق بهم في تنظيف بدلاتي. دائمًا مثالية، دائمًا في الوقت المحدد.",
        author: "عمر فاروق",
        role: "عميل من المعادي",
      },
      testimonial3: {
        quote:
          "خدمة الاستلام الخاصة بهم منقذة للحياة للأمهات المشغولات مثلي. خدمة عالية الجودة مع دفء مصري.",
        author: "نادية إبراهيم",
        role: "عميلة من مصر الجديدة",
      },
    },
  },
});

export default AboutPage;
