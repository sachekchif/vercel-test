import React from "react";
import CustomButton from "../CustomButton";
import sentMail from "../../assets/images/email_sentt.gif";
import { Link } from "react-router-dom";

const EmailSent = () => {
  return (
    <forn>
      <div className="mb-8">
        <h2 className="text-2xl font-medium text-center">
          Email Sent successfully
        </h2>
      </div>

      <div className="flex items-center justify-center mb-8">
        <img src={sentMail} alt="" className="form-logo rounded-xl" />
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="mb-8 max-w-md">
          <h2 className="text-sm font-medium text-center">
            We’ve sent you an email with instructions to reset your password.
            Please check your inbox (and spam folder, just in case) for a link
            to complete the process.
          </h2>
        </div>
      </div>

      <CustomButton>
        <Link to="/login">
          Proceed to Login
        </Link>
      </CustomButton>
    </forn>
  );
};

export default EmailSent;
