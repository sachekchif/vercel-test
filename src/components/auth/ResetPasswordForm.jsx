import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Spacer from "../../utils/Spacer";
import CustomTooltip from "../CustomTooltip";
import CustomInput from "../CustomRequestInput";
import CustomButton from "../CustomButton";
import { useResetPasswordMutation } from "../../services/apiSlice";

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when the user modifies input
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

    try {
      const response = await resetPassword({
        token: formData.token,
        email: formData.email, // Corrected typo here
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
        type="email" // Corrected input type
        name="email"
        label="Email Address"
        onChange={handleInputChange}
        value={formData.email}
        placeholder="Enter email"
      />
      <Spacer size="24px" />
      <CustomTooltip
        content={
          <div>
            <p>
              <strong>Password requirements:</strong>
            </p>
            <ul>
              <li>One uppercase letter (A, B, C...)</li>
              <li>One lowercase letter (a, b, c...)</li>
              <li>One number (1, 2, 3...)</li>
              <li>One special character (!, @, #...)</li>
              <li>Minimum 8 characters</li>
            </ul>
          </div>
        }
      >
        <CustomInput
          type="password"
          name="password"
          label="New Password"
          onChange={handleInputChange}
          value={formData.password}
          placeholder="Enter new password"
        />
      </CustomTooltip>
      <Spacer size="24px" />
      <CustomInput
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        onChange={handleInputChange}
        value={formData.confirmPassword}
        placeholder="Confirm new password"
      />
      <Spacer size="24px" />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <CustomButton loading={isLoading} disabled={isLoading} type="submit">
        Reset Password
      </CustomButton>
    </form>
  );
};

export default ResetPasswordForm;
