import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/auth/login';
import "../styles/globals.css";
import Signup from '../pages/auth/signin';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/AdminDashboard';
import AllRequests from '../pages/AllRequests';
import Profile from '../pages/Profile';
import RecoveryPassword from '../pages/auth/ResetPassword';
import ForgotPForm from '../components/auth/ForgotPForm';
import ForgotPassword from '../pages/auth/forgotPassword';
import RecoveryEmail from '../pages/auth/recoveryEmail';
import ResetPassword from '../pages/auth/ResetPassword';
import AllUsers from '../pages/AllUsers/Index';
import Checkout from '../pages/Checkout';
import Pricing from '../pages/Pricing';
import AllStaff from '../pages/AllStaff';
import VerifyEmail from '../pages/auth/VerifyEmail';
import SuccessPage from '../pages/auth/VerifyEmail/SuccessPage';
import About from '../pages/About';
import JobsPage from '../pages/Jobs';
import SearchJobsPage from '../pages/Jobs/test-2';
import Activities from '../pages/Activities';
import PendingRequest from '../pages/PendingRequest';
import TermsOfUse from '../pages/Terms and conditions';
import PrivacyPolicy from '../pages/Privacy';
import Services from '../pages/Services';
import AdminRequest from '../pages/AdminRequest';
import NotFound from '../pages/NotFound';
// import About from '../pages/About/About';
// import Contact from '../pages/Contact/Contact';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/recovery-mail" element={<RecoveryEmail />} />
      <Route path="/verify-mail" element={<VerifyEmail />} />
      <Route path="/success-page" element={<SuccessPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/alljobs" element={<JobsPage />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/all-requests" element={<AllRequests />} />
      <Route path="/terms" element={<TermsOfUse />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/services" element={<Services />} />
      <Route path="/ad-all-requests" element={<AdminRequest />} />
      <Route path="/all-users" element={<AllUsers />} />
      <Route path="/all-staff" element={<AllStaff />} />
      <Route path="/checkout/:planType?" element={<Checkout />} />
      <Route path="/pending-requests" element={<PendingRequest />} />
      <Route path="/alljobs/:jobTitle" element={<SearchJobsPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
