import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import Spacer from "../../utils/Spacer";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { useRegisterMutation } from "../../services/apiSlice";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleFilled,
  CheckCircleTwoTone,
  CloseCircleFilled,
} from "@ant-design/icons";
import { message } from "antd";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordTouched, setIsPasswordTouched] = useState(false); // Track if password field is touched
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false); // Track if confirm password field is touched
  const [register, { isLoading }] = useRegisterMutation();

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
      setIsPasswordTouched(true); // Mark password field as touched
    }

    if (name === "confirmPassword") {
      setIsConfirmPasswordTouched(true); // Mark confirm password field as touched
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
        setTimeout(() => {
          navigate("/outsource-apply/verify-mail");
        }, 1000);
      }
    } catch (err) {
      toast.error("Registration failed!");
      console.error("Registration failed:", err);
    }
  };

  return (
    <div>
      <form onSubmit={submitFormData} autoComplete="off">
        <Toaster position="top-right" />
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
      </form>
    </div>
  );
};

export default SignupForm;