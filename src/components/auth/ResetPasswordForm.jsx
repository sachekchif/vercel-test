import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Spacer from "../../utils/Spacer";
import CustomTooltip from "../CustomTooltip";
import CustomInput from "../CustomRequestInput";
import CustomButton from "../CustomButton";
import { useResetPasswordMutation } from "../../services/apiSlice";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

const ResetPasswordForm = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    token: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);

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
      setError(value !== formData.password ? "Passwords do not match " : "");
    }
  };

  const submitFormData = async (e) => {
    e.preventDefault();

    // Validate that passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords must match!");
      return;
    }

    // Validate that all fields are filled
    if (!formData.token || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      toast.error("All fields are required!");
      return;
    }

    // Validate password requirements
    if (!isPasswordValid(formData.password)) {
      toast.error("Password does not meet requirements.");
      return;
    }

    try {
      const response = await resetPassword({
        token: formData.token,
        email: formData.email,
        newPassword: formData.password,
      }).unwrap();

      if (response.statusCode === "00") {
        toast.success("Password reset successful! You can now login");
        console.log("Password reset successful:", response);
        setFormData({ token: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(response.statusMessage || "Password reset failed!");
      }
    } catch (err) {
      toast.error(
        err?.data?.message || "An error occurred during password reset."
      );
      console.error("Password reset failed:", err);
    }
  };

  return (
    <form onSubmit={submitFormData} autoComplete="off">
      <Toaster position="top-right" />
      <CustomInput
        type="text"
        name="token"
        label="Token from email"
        onChange={handleInputChange}
        value={formData.token}
        placeholder="Token"
      />
      <Spacer size="24px" />
      <CustomInput
        type="email"
        name="email"
        label="Email Address"
        onChange={handleInputChange}
        value={formData.email}
        placeholder="Enter email"
      />
      <Spacer size="24px" />
      {/* <CustomTooltip
        content={
          <div>
            <p>
              <strong>Password requirements:</strong>
            </p>
            <ul>
              {passwordRequirements.map(({ text }, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </div>
        }
      >
      </CustomTooltip> */}
        <CustomInput
          type="password"
          name="password"
          label="New Password"
          onChange={handleInputChange}
          value={formData.password}
          placeholder="Enter new password"
        />

      {/* Password Validation Messages */}
      {(isPasswordTouched && !isPasswordValid(formData.password)) ||
      !isConfirmPasswordTouched ? (
        <div className="text-sm text-gray-600 mt-1">
          <ul>
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

      <Spacer size="24px" />
      <CustomInput
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        onChange={handleInputChange}
        value={formData.confirmPassword}
        placeholder="Confirm new password"
        errorMessage={error}
      />
      <Spacer size="24px" />
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <CustomButton loading={isLoading} disabled={isLoading} type="submit">
        Reset Password
      </CustomButton>
    </form>
  );
};

export default ResetPasswordForm;