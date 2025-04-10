import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { AppProvider, useAppContext } from "./context/AppContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Shared/Navbar";
import Loading from "./components/Shared/Loading";
import Auth from "./components/Shared/Auth";
import Services from "./components/Client/Services";
import OrderForm from "./components/Client/OrderForm";
import OrderHistory from "./components/Client/OrderHistory";

import Orders from "./components/Admin/Orders";
import Dashboard from "./components/Admin/Dashboard";
import Home from "./components/Client/Home";
import Footer from "./components/Shared/Footer";
import AboutPage from "./components/Shared/AboutPage";
import ContactPage from "./components/Shared/ContactPage ";
import PricingPage from "./components/Shared/PricingPage";
import ProfilePage from "./components/Client/ProfilePage";

// Enhanced ProtectedRoute with AuthContext
const ProtectedRoute = ({ children, roles = [] }) => {
  const { user: contextUser, loading: contextLoading } = useAppContext();
  const { user: authUser, profile, loading: authLoading } = useAuth();
  const location = useLocation();

  const loading = contextLoading || authLoading;
  const user = authUser || contextUser;

  if (loading) {
    
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  // Check role-based access if roles are specified
  if (roles.length > 0) {
    const userRole = profile?.role || contextUser?.role;
    if (!roles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return children ? children : <Outlet />;
};

// PublicOnlyRoute component for non-authenticated users
const PublicOnlyRoute = ({ children }) => {
  const { user: contextUser, loading: contextLoading } = useAppContext();
  const { user: authUser, loading: authLoading } = useAuth();
  const location = useLocation();

  const loading = contextLoading || authLoading;
  const user = authUser || contextUser;

  if (loading) {
    return <Loading />;
  }

  if (user) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return children ? children : <Outlet />;
};

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/services" element={<Services />} />

          {/* Auth routes (public only) */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/auth" element={<Auth />} />
          </Route>

          {/* Protected client routes */}
          <Route element={<ProtectedRoute roles={["client"]} />}>
            <Route path="/order" element={<OrderForm />} />
            <Route path="/history" element={<OrderHistory />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Admin-only routes */}
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
