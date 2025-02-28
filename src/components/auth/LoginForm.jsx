import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { message } from "antd";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [resendEmail] = useResendEmailMutation();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

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
      console.error("Resend email failed:", err);
    }
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    console.log("login");

    try {
      const response = await login(loginFormData).unwrap();

      if (response.statusCode === "00") {
        message.success("Welcome!, login successful.");
        sessionStorage.setItem("isScheduled", "true"); // ✅ Set schedule flag
        scheduleTokenRefresh(); // ✅ Start token refresh

        sessionStorage.setItem("access_token", response.access_token);
        sessionStorage.setItem("refresh_token", response.refresh_token);
        setTokenCookie("token", response.access_token);
        sessionStorage.setItem("userInformation", JSON.stringify(response));

        if (response?.profile?.role === "user") {
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else if (
          ["staff", "admin", "super_admin"].includes(response.profile.role)
        ) {
          navigate("/admin-dashboard");
        } else {
          toast.error("Invalid role. Please contact support.");
        }
      } else if (response.statusCode === "96") {
        const errorMessage =
          response.data || response.statusMessage || "Login failed!";
        toast.error(errorMessage);
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
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                >
                  Resend Email
                </button>
                <button
                  type="button"
                  onClick={() => toast.dismiss(t.id)}
                  className="px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ),
          { duration: 120000 } // Toast stays for 2 minutes
        );
      }
    } catch (err) {
      toast.error(err?.data?.message || "An error occurred during login.");
      console.error("Login failed:", err);
    }
  };

  return (
    <form onSubmit={submitFormData} autoComplete="off">
      <Toaster position="top-right" />
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
    </form>
  );
};

export default LoginForm;
