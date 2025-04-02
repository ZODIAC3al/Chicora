import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Shared/Navbar";
import Loading from "./components/Shared/Loading";
import Auth from "./components/Shared/Auth";
import Services from "./components/Client/Services";
import OrderForm from "./components/Client/OrderForm";
import OrderHistory from "./components/Client/OrderHistory";
import Dashboard from "./components/Admin/Dashboard";
import Orders from "./components/Admin/Orders";
import Home from "./components/Client/Home";
import Footer from "./components/Shared/Footer";
import AboutPage from "./components/Shared/AboutPage.JSX";
import ContactPage from "./components/Shared/ContactPage ";
import PricingPage from "./components/Shared/PricingPage";

const App = () => {
  return (
    <Router>
      <AppProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/services" element={<Services />} />

              <Route path="/order" element={<OrderForm />} />
              <Route path="/history" element={<OrderHistory />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/pricing" element={<PricingPage />} />

              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/orders" element={<Orders />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AppProvider>
    </Router>
  );
};

// Enhanced ProtectedRoute component
// const ProtectedRoute = ({ role }) => {
//   const { user, loading } = useAppContext();

//   if (loading) {
//     return <Loading />;
//   }

//   if (!user) {
//     return <Navigate to="/auth" replace state={{ from: location }} />;
//   }

//   if (role && user.role !== role) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

export default App;
