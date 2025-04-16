import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/Loader";
import "../styles/globals.css";

// Lazy-loaded components remain the same...
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/login"));
const Signup = lazy(() => import("../pages/auth/signin"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const AllRequests = lazy(() => import("../pages/AllRequests"));
const Profile = lazy(() => import("../pages/Profile"));
const ForgotPassword = lazy(() => import("../pages/auth/forgotPassword"));
const RecoveryEmail = lazy(() => import("../pages/auth/recoveryEmail"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const AllUsers = lazy(() => import("../pages/AllUsers/Index"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Pricing = lazy(() => import("../pages/Pricing"));
const AllStaff = lazy(() => import("../pages/AllStaff"));
const VerifyEmail = lazy(() => import("../pages/auth/VerifyEmail"));
const SuccessPage = lazy(() => import("../pages/auth/VerifyEmail/SuccessPage"));
const About = lazy(() => import("../pages/About"));
const JobsPage = lazy(() => import("../pages/Jobs"));
const SearchJobsPage = lazy(() => import("../pages/Jobs/test-2"));
const Activities = lazy(() => import("../pages/Activities"));
const PendingRequest = lazy(() => import("../pages/PendingRequest"));
const TermsOfUse = lazy(() => import("../pages/Terms and conditions"));
const PrivacyPolicy = lazy(() => import("../pages/Privacy"));
const Services = lazy(() => import("../pages/Services"));
const AdminRequest = lazy(() => import("../pages/AdminRequest"));

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInformation"));

  if (!userInfo) {
    return children; // Allow guests to access
  }

  if (allowedRoles.includes(userInfo.profile.role)) {
    return children;
  }

  // Redirect unauthorized roles
  switch (userInfo.profile.role) {
    case "staff":
    case "admin":
      return <Navigate to="/admin-dashboard" replace />;
    case "user":
    default:
      return <Navigate to="/dashboard" replace />;
  }
};

const PublicRoute = ({ children }) => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInformation"));

  // Block admin and staff from seeing public routes
  if (
    userInfo?.profile?.role === "admin" ||
    userInfo?.profile?.role === "staff"
  ) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

const GuestRoute = ({ children }) => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInformation"));

  if (userInfo) {
    switch (userInfo.profile.role) {
      case "staff":
      case "admin":
        return <Navigate to="/admin-dashboard" replace />;
      case "user":
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

const AppRouter = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public routes - only for guests, users, and super_admins */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/pricing"
          element={
            <PublicRoute>
              <Pricing />
            </PublicRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PublicRoute>
              <About />
            </PublicRoute>
          }
        />
        <Route
          path="/services"
          element={
            <PublicRoute>
              <Services />
            </PublicRoute>
          }
        />
        <Route
          path="/terms"
          element={
            <PublicRoute>
              <TermsOfUse />
            </PublicRoute>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PublicRoute>
              <PrivacyPolicy />
            </PublicRoute>
          }
        />
        <Route
          path="/alljobs"
          element={
            <PublicRoute>
              <JobsPage />
            </PublicRoute>
          }
        />
        <Route
          path="/alljobs/:jobTitle"
          element={
            <PublicRoute>
              <SearchJobsPage />
            </PublicRoute>
          }
        />

        {/* Auth routes - accessible to all but redirects logged-in users */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />
        <Route
          path="/recovery-mail"
          element={
            <GuestRoute>
              <RecoveryEmail />
            </GuestRoute>
          }
        />
        <Route
          path="/verify-mail"
          element={
            <GuestRoute>
              <VerifyEmail />
            </GuestRoute>
          }
        />
        <Route
          path="/success-page"
          element={
            <GuestRoute>
              <SuccessPage />
            </GuestRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />

        {/* Protected routes remain the same... */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              allowedRoles={["user", "staff", "admin", "super_admin"]}
            >
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-requests"
          element={
            <ProtectedRoute
              allowedRoles={["user", "staff", "admin", "super_admin"]}
            >
              <AllRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/:planType?"
          element={
            <ProtectedRoute allowedRoles={["user", "super_admin"]}>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* Protected routes for staff */}
        <Route
          path="/pending-requests"
          element={
            <ProtectedRoute allowedRoles={["staff", "admin", "super_admin"]}>
              <PendingRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activities"
          element={
            <ProtectedRoute allowedRoles={["staff", "admin", "super_admin"]}>
              <Activities />
            </ProtectedRoute>
          }
        />

        {/* Protected routes for admin */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["staff", "admin", "super_admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-users"
          element={
            <ProtectedRoute allowedRoles={["staff", "admin", "super_admin"]}>
              <AllUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-staff"
          element={
            <ProtectedRoute allowedRoles={["staff", "admin", "super_admin"]}>
              <AllStaff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ad-all-requests"
          element={
            <ProtectedRoute allowedRoles={["staff", "admin", "super_admin"]}>
              <AdminRequest />
            </ProtectedRoute>
          }
        />
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRouter;
