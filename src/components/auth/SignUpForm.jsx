import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import Spacer from "../../utils/Spacer";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { useRegisterMutation } from "../../services/apiSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { message, Spin } from "antd";
import { GoogleOutlined, LoadingOutlined } from "@ant-design/icons";

const SignupForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Initialize formData with localStorage data (if it exists)
  const savedFormData = JSON.parse(localStorage.getItem("signupFormData")) || {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };

  const [formData, setFormData] = useState(savedFormData);
  const [isTermsAccepted, setIsTermsAccepted] = useState(
    JSON.parse(localStorage.getItem("signupTermsAccepted")) || false
  );
  const [error, setError] = useState("");
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Retrieve the redirect URL from query parameters
  const redirectUrl = searchParams.get("redirect") || "/";

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("signupFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("signupTermsAccepted", JSON.stringify(isTermsAccepted));
  }, [isTermsAccepted]);

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

  const passwordRequirements = [
    { regex: /[A-Z]/, text: "One uppercase letter (A, B, C...)" },
    { regex: /[a-z]/, text: "One lowercase letter (a, b, c...)" },
    { regex: /[0-9]/, text: "One number (1, 2, 3...)" },
    { regex: /[\W_]/, text: "One special character (!, @, #...)" },
    { regex: /.{8,}/, text: "Minimum 8 characters" },
  ];

  const isPasswordValid = (password) => {
    return passwordRequirements.every((req) => req.regex.test(password));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setIsPasswordTouched(true);
    }

    if (name === "confirmPassword") {
      setIsConfirmPasswordTouched(true);
      setError(value !== formData.password ? "Passwords do not match." : "");
    }
  };

  const handleTermsChange = () => {
    setIsTermsAccepted((prev) => !prev);
  };

  const submitFormData = async (e) => {
    e.preventDefault();

    if (!isTermsAccepted) {
      toast.error("You must agree to the Terms and Conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords must match!");
      return;
    }

    if (!isPasswordValid(formData.password)) {
      toast.error("Password does not meet requirements.");
      return;
    }

    const { confirmPassword, phoneNumber, ...dataToSubmit } = formData;

    try {
      const response = await register(dataToSubmit).unwrap();
      if (response.statusCode === "96") {
        message.error(response.data || response?.statusMessage);
      } else {
        message.success("Registration successful!");
        // Clear saved form data from localStorage on successful submission
        localStorage.removeItem("signupFormData");
        localStorage.removeItem("signupTermsAccepted");
        setTimeout(() => {
          navigate("/verify-mail");
        }, 1000);
      }
    } catch (err) {
      toast.error("Registration failed!");
      console.error("Registration failed:", err);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoggingIn(true);
    window.location.href = `https://backend-46kr.onrender.com/auth/google`;
  };

  return (
    <div>
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
        <CustomInput
          type="text"
          name="firstName"
          label="First Name"
          onChange={handleInputChange}
          value={formData.firstName}
          placeholder="First name"
        />
        <Spacer y={6} />
        <CustomInput
          type="text"
          name="lastName"
          label="Last Name"
          onChange={handleInputChange}
          value={formData.lastName}
          placeholder="Last name"
        />
        <Spacer y={6} />
        <CustomInput
          type="text"
          name="email"
          label="Email Address"
          onChange={handleInputChange}
          value={formData.email}
          placeholder="Enter email"
        />
        <Spacer y={6} />

        <CustomInput
          type="password"
          name="password"
          label="Password"
          onChange={handleInputChange}
          value={formData.password}
          placeholder="Enter password"
        />

        {/* Password Validation Messages */}
        {(isPasswordTouched && !isPasswordValid(formData.password)) ||
        !isConfirmPasswordTouched ? (
          <div className="text-sm text-gray-600 mt-1">
            <ul className=" ">
              {passwordRequirements.map(({ regex, text }, index) => (
                <li
                  key={index}
                  className={
                    regex.test(formData.password)
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {regex.test(formData.password) ? (
                    <CheckCircleFilled twoToneColor="#52c41a" />
                  ) : (
                    <CloseCircleFilled twoToneColor="#ff0000" />
                  )}{" "}
                  {text}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Spacer y={6} />
        <CustomInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          onChange={handleInputChange}
          value={formData.confirmPassword}
          placeholder="Re-enter password"
          errorMessage={error}
        />
        <Spacer y={6} />
        <CustomInput
          type="text"
          name="phone"
          label="Phone Number"
          onChange={handleInputChange}
          value={formData.phone}
          placeholder="Enter phone number"
        />

        <Spacer y={6} />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={isTermsAccepted}
            onChange={handleTermsChange}
            className="w-4 h-4"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the{" "}
            <a href="/terms" className="text-blue-500 underline">
              Terms and Conditions
            </a>
          </label>
        </div>
        <Spacer y={6} />
        <CustomButton type="submit" loading={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </CustomButton>

        {/* Google Sign-In Button */}
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
              <GoogleOutlined />
              <span className="text-gray-700 font-medium">
                Sign Up with Google
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;