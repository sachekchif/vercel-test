import React, { Suspense } from "react";
import { Link } from "react-router-dom"; 
import Spacer from "../../../utils/Spacer";
import TestimonialCarousel from "../../../components/auth/Testimonial";
import ResetPasswordForm from "../../../components/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <main className="flex min-h-screen bg-white text-black w-full">
      <div className="hidden lg:block lg:fixed inset-y-0 left-0 w-3/5">
        <TestimonialCarousel />
      </div>

      <div className="w-full lg:w-full lg:ml-[60%]">
        <div className="flex flex-col justify-start px-6 pt-8">
          <div className="md:p-4 sm:p-4 space-y-8">
            <div className="flex text-gray-700 mb-5">
              
            </div>
          </div>

          <div className="flex-1 flex lg:items-center items-start xl:pb-6 justify-center px-8 lg:px-4">
            <div className="w-full">
              <div className="mb-10">
                <h2 className="text-2xl font-medium">Reset Your Password</h2>
                <h6 className="font-normal text-gray-500">
                  Check you mailbox for a unique token, input it along side you new password
                </h6>
              </div>
              <Spacer size="50px" />
              <ResetPasswordForm />
              <Spacer size="28px" />
              <p className="text-center mt-8 text-sm text-grey600">
                Didn't get the mail?{" "}
                <Link
                  to="/forgot-password"
                  className="text-purple-600 font-medium"
                >
                  Try again
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
