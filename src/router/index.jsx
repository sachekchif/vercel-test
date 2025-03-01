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
import AdminRequest from '../pages/AdminRequest/text';
import JobsPage from '../pages/Jobs';
import SearchJobsPage from '../pages/Jobs/test-2';
// import About from '../pages/About/About';
// import Contact from '../pages/Contact/Contact';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/outsource-apply" element={<Home />} />
      <Route path="/outsource-apply/pricing" element={<Pricing />} />
      <Route path="/outsource-apply/about" element={<About />} />
      <Route path="/outsource-apply/login" element={<Login />} />
      <Route path="/outsource-apply/profile" element={<Profile />} />
      <Route path="/outsource-apply/forgot-password" element={<ForgotPassword />} />
      <Route path="/outsource-apply/recovery-mail" element={<RecoveryEmail />} />
      <Route path="/outsource-apply/verify-mail" element={<VerifyEmail />} />
      <Route path="/outsource-apply/success-page" element={<SuccessPage />} />
      <Route path="/outsource-apply/reset-password" element={<ResetPassword />} />
      <Route path="/outsource-apply/alljobs" element={<JobsPage />} />
      <Route path="/outsource-apply/sign-up" element={<Signup />} />
      <Route path="/outsource-apply/dashboard" element={<Dashboard />} />
      <Route path="/outsource-apply/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/outsource-apply/all-requests" element={<AllRequests />} />
      <Route path="/outsource-apply/ad-all-requests" element={<AdminRequest />} />
      <Route path="/outsource-apply/all-users" element={<AllUsers />} />
      <Route path="/outsource-apply/all-staff" element={<AllStaff />} />
      <Route path="/outsource-apply/checkout" element={<Checkout />} />
      <Route path="/outsource-apply/jobs/:jobTitle" element={<SearchJobsPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
