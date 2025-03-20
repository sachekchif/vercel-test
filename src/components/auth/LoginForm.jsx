import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import CustomInput from "../CustomInput";
import Spacer from "../../utils/Spacer";
import CustomButton from "../CustomButton";
import {
  scheduleTokenRefresh,
  useLoginMutation,
  useResendEmailMutation,
} from "../../services/apiSlice";
import { setTokenCookie } from "../../utils/constants";
import { message, Spin } from "antd";
import { GoogleOutlined, LoadingOutlined } from "@ant-design/icons";
import Google from "../../assets/images/google-icon-logo-svgrepo-com.svg"

const LoginForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [login, { isLoading }] = useLoginMutation();
  const [resendEmail] = useResendEmailMutation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [isProcessingToken, setIsProcessingToken] = useState(false); // Loading state for token processing

  // Retrieve the redirect URL from query parameters
  const redirectUrl = searchParams.get("redirect") || "/";

  useEffect(() => {
    // Retrieve job details from localStorage
    const jobDetails = localStorage.getItem("selectedJob");
    if (jobDetails) {
      setSelectedJob(JSON.parse(jobDetails));
    }
  }, []);

  useEffect(() => {
    if (selectedJob) {
      message.success(
        `Welcome! Continue applying for ${selectedJob.title} at ${selectedJob.company}.`
      );
    }
  }, [selectedJob]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResendEmail = async () => {
    try {
      const response = await resendEmail({
        email: loginFormData.email,
      }).unwrap();

      if (response.statusCode === "00") {
        toast.success("Verification email resent! Please check your mailbox.");
      } else {
        toast.error(response.statusMessage || "Failed to resend email.");
      }
    } catch (err) {
      toast.error(
        err?.data?.message || "An error occurred while resending the email."
      );
    }
  };

  const submitFormData = async (e) => {
    e.preventDefault();

    try {
      const response = await login(loginFormData).unwrap();

      if (response.statusCode === "00") {
        message.success("Welcome!, login successful.");
        sessionStorage.setItem("isScheduled", "true");
        scheduleTokenRefresh();
        sessionStorage.setItem("access_token", response.access_token);
        sessionStorage.setItem("refresh_token", response.refresh_token);
        setTokenCookie("token", response.access_token);
        sessionStorage.setItem("userInformation", JSON.stringify(response));

        const userRole = response.profile?.role;
        if (userRole === "staff" || userRole === "admin" || userRole === "super_admin") {
          navigate("/admin-dashboard"); // Redirect to admin dashboard
        } else {
          setTimeout(() => {
            navigate(redirectUrl); // Redirect to the stored URL or default route
          }, 1000);// Redirect to the stored URL or default route
        }
        // Redirect logic
       

        // Clear localStorage after successful login
        // localStorage.removeItem("selectedJob");
      } else if (response.statusCode === "96") {
        toast.error(response.data || response.statusMessage || "Login failed!");
      } else if (response.statusCode === "99") {
        toast.custom(
          (t) => (
            <div className="mb-2 bg-white border shadow-lg rounded-xl px-6 py-4">
              <span className="font-bold text-base">
                Please check your mailbox to verify your Email Address.
              </span>
              <div className="mt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={handleResendEmail}
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Resend Email
                </button>
                <button
                  type="button"
                  onClick={() => toast.dismiss(t.id)}
                  className="px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ),
          { duration: 120000 }
        );
      }
    } catch (err) {
      toast.error(err?.data?.message || "An error occurred during login.");
    }
  };

  const handleGoogleLogin = () => {
    setIsLoggingIn(true); // Start loading
    window.location.href = `https://backend-46kr.onrender.com/auth/google`;
  };

  return (
    <form onSubmit={submitFormData} autoComplete="off">
      <Toaster position="top-right" />
      {selectedJob && (
        <div className="mb-4">
          <p className="text-lg font-semibold">
            Welcome! Continue applying for{" "}
            <span className="text-purple-700">{selectedJob.title}</span> at{" "}
            <span className="text-purple-700">{selectedJob.company}</span>.
          </p>
        </div>
      )}
      {isProcessingToken ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" className="text-purple-700" />
        </div>
      ) : (
        <>
          <CustomInput
            type="text"
            name="email"
            label="Email Address"
            onChange={handleInputChange}
            value={loginFormData.email}
            placeholder="Enter email"
          />
          <Spacer size="24px" />
          <CustomInput
            type="password"
            name="password"
            label="Password"
            onChange={handleInputChange}
            value={loginFormData.password}
            placeholder="Enter password"
          />
          <Spacer size="16px" />
          <div className="flex items-center justify-end">
            <Link to={"/forgot-password"} className="text-primaryColor text-sm">
              Forget Password?
            </Link>
          </div>
          <Spacer size="28px" />
          <CustomButton loading={isLoading} disabled={isLoading} type="submit">
            Login
          </CustomButton>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className={`w-full p-2 border border-gray-300 rounded-lg mt-4 flex items-center justify-center gap-2 ${
              isLoggingIn
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            {isLoggingIn ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />}
              />
            ) : (
              <>
                <img src={Google} alt="google" className="h-4 w-4 mr-2"/>
                <span className="text-gray-700 font-medium">
                  Sign in with Google
                </span>
              </>
            )}
          </button>
        </>
      )}
    </form>
  );
};

export default LoginForm;
