import { MotionDiv, fadeIn } from "../../../context/AppContext";
import { useServices } from "./useServices";

// Sub Components
import ServicesHeader from "./components/ServicesHeader";
import ServicesGrid from "./components/ServicesGrid"; // <--- Imported here
import EmptyState from "./components/EmptyState";
import LoadingView from "./components/LoadingView";

const Services = () => {
  const { state, actions, t } = useServices();
  const { filteredServices, searchTerm, loading, user, isRTL } = state;

  if (loading) {
    return <LoadingView t={t} />;
  }

  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container mx-auto px-4 py-12"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <ServicesHeader
        t={t}
        searchTerm={searchTerm}
        setSearchTerm={actions.setSearchTerm}
        isRTL={isRTL}
      />

      {filteredServices.length > 0 ? (
        <ServicesGrid
          services={filteredServices}
          user={user}
          t={t}
          isRTL={isRTL}
        />
      ) : (
        <EmptyState t={t} onReset={() => actions.setSearchTerm("")} />
      )}
    </MotionDiv>
  );
};

export default Services;
