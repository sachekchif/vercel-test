import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import TestimonialCarousel from "../../../components/auth/Testimonial";
import CustomButton from "../../../components/CustomButton";
import sentMail from "../../../assets/images/succes-ani.gif";

const SuccessPage = () => {
  return (
    <main className="flex min-h-screen bg-white text-black w-full">
      <div className="hidden lg:block lg:fixed inset-y-0 left-0 w-3/5">
        <TestimonialCarousel />
      </div>

      <div className="w-full lg:w-full lg:ml-[60%]">
        <div className="flex flex-col justify-start px-6 pt-8">
          <div className="md:p-4 sm:p-4 space-y-8">
            <div className="flex text-gray-700 mb-5">
              {/* <a href="/">
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
              </a> */}
            </div>
          </div>

          <div className="flex-1 flex lg:items-center items-start xl:pb-6 justify-center px-8 lg:px-4">
            <div className="w-full">
              <forn>
                <div className="mb-8">
                  <h2 className="text-2xl font-medium text-center">
                    Welcome to Outsource Apply
                  </h2>
                </div>

                <div className="flex items-center justify-center mb-8">
                  <img src={sentMail} alt="" className="form-logo rounded-xl" />
                </div>

                <div className="flex items-center justify-center mb-4">
                  <div className="mb-8 max-w-md">
                    <h2 className="text-sm font-medium text-center">
                      

Your email has been successfully verified! Your account is now fully activated. You can proceed to log in and start using Outsource Apply.
                    </h2>
                  </div>
                </div>

                <Link to="/login">
                  <CustomButton>Proceed to Login</CustomButton>
                </Link>
              </forn>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SuccessPage;
