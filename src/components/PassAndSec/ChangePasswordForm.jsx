import React, { useState } from "react"; // Adjust the path if the file is in a different folder
import CustomInput from "../CustomRequestInput";
import { useChangePasswordMutation } from "../../services/apiSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ChangePasswordForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [changePassword, { isLoading }] = useChangePasswordMutation(); // ✅ Initialize hook at the top

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, confirmPassword, newPassword } = formData;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Clear any previous errors

    try {
      const response = await changePassword({ // ✅ Use `changePassword()`, NOT `useChangePasswordMutation()`
        oldPassword,
        newPassword: confirmPassword, // Sending only oldPassword and confirmPassword
      }).unwrap();

      console.log("Password changed successfully:", response);
      if (response.statusCode === "00") {
        toast.success("Password changed successfully");
        navigate("/profile")
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
        // onClose(); // Close the modal on success
      } else if (response.statusCode === "96") {
        const message =
          response?.data || response.statusMessage || "Unknown error.";
        toast.error(message);
      }

      // alert("Password changed successfully!");
    } catch (err) {
      console.error("Error changing password:", err);
      setError(err?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="col-span-2 flex flex-col justify-between">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
          <CustomInput
            type="password"
            label="Old Password"
            name="oldPassword"
            value={formData.oldPassword}
            placeholder="Enter your Current Password"
            onChange={handleChange}
            isRequired
          />

          <CustomInput
            type="password"
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            placeholder="Enter your New Password"
            onChange={handleChange}
            isRequired
          />

          <CustomInput
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm your New Password"
            onChange={handleChange}
            isRequired
          />
        </div>


        <div className="flex justify-start">
          <button
            disabled={isLoading}
            type="submit"
            className="text-white bg-purple-700 hover:bg-purple-600 font-medium rounded-lg text-sm px-16 py-2.5 text-center inline-flex items-center"
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
