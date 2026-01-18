import { motion } from "framer-motion";
import { useProfile } from "./useProfile";
import ProfileHeader from "./components/ProfileHeader";
import ProfileSidebar from "./components/ProfileSidebar";
import PersonalInfoTab from "./components/PersonalInfoTab";
import OrderHistoryTab from "./components/OrderHistoryTab"; // Assumed existing based on previous pattern
import PreferencesTab from "./components/PreferencesTab";

const ProfilePage = () => {
  const { state, actions, t } = useProfile();
  const {
    profile,
    user,
    formData,
    activeTab,
    editMode,
    isLoggingOut,
    filteredOrders,
    statusFilter,
    searchQuery,
    expandedOrderId,
    currentLanguage,
    isRTL,
    appLoading,
  } = state;

  if (!profile || appLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8 ${isRTL ? "text-right" : "text-left"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto">
        <ProfileHeader
          user={user}
          profile={profile}
          formData={formData}
          t={t}
          currentLanguage={currentLanguage}
          toggleLanguage={actions.toggleLanguage}
          handleLogout={actions.handleLogout}
          isLoggingOut={isLoggingOut}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="lg:col-span-1">
            <ProfileSidebar
              profile={profile}
              user={user}
              activeTab={activeTab}
              setActiveTab={actions.setActiveTab}
              t={t}
              isRTL={isRTL}
              formData={formData}
            />
          </div>

          <motion.div className="lg:col-span-3">
            {activeTab === "profile" && (
              <PersonalInfoTab
                formData={formData}
                handleChange={actions.handleChange}
                editMode={editMode}
                setEditMode={actions.setEditMode}
                handleSave={actions.handleSaveProfile}
                t={t}
              />
            )}

            {activeTab === "orders" && (
              <OrderHistoryTab
                orders={filteredOrders}
                searchQuery={searchQuery}
                setSearchQuery={actions.setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={actions.setStatusFilter}
                expandedOrderId={expandedOrderId}
                setExpandedOrderId={actions.setExpandedOrderId}
                t={t}
                isRTL={isRTL}
                currentLanguage={currentLanguage}
              />
            )}

            {activeTab === "preferences" && (
              <PreferencesTab
                formData={formData}
                handleChange={actions.handleChange}
                t={t}
              />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
