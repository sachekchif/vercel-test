import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TestimonialCarousel from "../../../components/auth/Testimonial";
import CustomButton from "../../../components/CustomButton";
import sentMail from "../../../assets/images/email_sentt.gif";
import { useResendEmailMutation } from "../../../services/apiSlice";
import { message } from "antd";

const VerifyEmail = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [resendEmail] = useResendEmailMutation(); // Resend email mutation

  useEffect(() => {
    // Check if there's a timer in localStorage
    const storedTime = localStorage.getItem("countdownTimer");
    if (storedTime) {
      setTimeLeft(parseInt(storedTime, 10));
    } else {
      localStorage.setItem("countdownTimer", "300"); // 5 minutes in seconds
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setIsButtonDisabled(false);
          localStorage.removeItem("countdownTimer");
          return 0;
        }
        const newTime = prevTime - 1;
        localStorage.setItem("countdownTimer", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleResendEmail = async () => {
    try {
      const response = await resendEmail({
        email: loginFormData.email, // Replace `loginFormData.email` with the actual email
      }).unwrap();

      if (response.statusCode === "00") {
        message.success("Verification email resent! Please check your mailbox.");
        // Reset the timer
        setTimeLeft(300);
        setIsButtonDisabled(true);
        localStorage.setItem("countdownTimer", "300");
      } else {
        message.error(response.statusMessage || "Failed to resend email.");
      }
    } catch (err) {
      message.error(
        err?.data?.message || "An error occurred while resending the email."
      );
    }
  };

  return (
    <main className="flex min-h-screen bg-white text-black w-full">
      <div className="hidden lg:block lg:fixed inset-y-0 left-0 w-3/5">
        <TestimonialCarousel />
      </div>

      <div className="w-full lg:w-full lg:ml-[60%]">
        <div className="flex flex-col justify-start px-6 pt-8">
          <div className="md:p-4 sm:p-4 space-y-8">
            <div className="flex text-gray-700 mb-5">
              <Link to="/sign-up">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="flex-1 flex lg:items-center items-start xl:pb-6 justify-center px-8 lg:px-4">
            <div className="w-full">
              <form>
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
                      You’ve successfully signed up! Please check your email
                      (including the spam folder, just in case) for a
                      confirmation link to verify your account.
                    </h2>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <CustomButton
                    disabled={isButtonDisabled}
                    onClick={handleResendEmail}
                  >
                    {isButtonDisabled
                      ? `Resend Email in ${formatTime(timeLeft)}`
                      : "Resend Email"}
                  </CustomButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyEmail;