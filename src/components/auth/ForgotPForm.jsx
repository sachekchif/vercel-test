import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import CustomInput from "../CustomRequestInput";
import Spacer from "../../utils/Spacer";
import CustomButton from "../CustomButton";
import { useForgotPasswordMutation } from "../../services/apiSlice";

const ForgotPForm = () => {
  const [forgotPassword, { isLoading, isSuccess, isError, error }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const submitRecovery = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword(email).unwrap();

      if (response.statusCode === "00") {
        toast.success("Recovery email sent successfully!", {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="green"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12 0a12 12 0 1 0 12 12A12.014 12.014 0 0 0 12 0zm-1.2 17.4L5.4 12l1.2-1.2 4.2 4.2 6.6-6.6 1.2 1.2z" />
            </svg>
          ),
        });

        setTimeout(() => {
          navigate("/reset-password");
        }, 1500);

      } else if (response.statusCode === "96" || response.statusCode === "99") {
        toast.error(response.statusMessage || "Recovery failed!");
      }
    } catch (err) {
      toast.error(err?.data?.message || "An error occurred during recovery.");
      console.error("Recovery failed:", err);
    }
  };

  return (
    <form onSubmit={submitRecovery} autoComplete="off">
      <Toaster position="top-right" />
      <CustomInput
        type="text"
        name="email"
        label="Email Address"
        onChange={handleInputChange}
        value={email}
        placeholder="Enter your email"
      />
      <Spacer size="24px" />
      <CustomButton loading={isLoading} disabled={isLoading} type="submit">
        Send Recovery Email
      </CustomButton>
    </form>
  );
};

export default ForgotPForm;
