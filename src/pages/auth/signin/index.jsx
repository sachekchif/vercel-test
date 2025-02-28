import React from "react";
import TestimonialCarousel from "../../../components/auth/Testimonial";
import SignupForm from "../../../components/auth/SignUpForm";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <main className="flex min-h-screen bg-white text-black">
      <div className="hidden lg:block lg:fixed inset-y-0 left-0 w-3/5">
        <TestimonialCarousel />
      </div>

      <div className="w-full lg:w-full lg:ml-[60%]">
        <div className="flex flex-col justify-start px-8 pt-8 pt:mt-0">
          <div className="flex text-gray-700 mb-5">
            <Link to={"/"} className="w-10 h-10">
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

          <div className="flex-1 flex lg:items-center items-start xl:pb-6 justify-center ">
            <div className="w-full">
              <div className="mb-10">
                <div className="mb-12">
                  <h2 className="text-2xl font-medium">
                    Create your Outsource Apply Account
                  </h2>
                  <h6 className="font-normal text-gray-500">
                    Ensure you provide the accurate details while filling this
                    form
                  </h6>
                </div>
                <div className="my-10" />
                <SignupForm />

                <p className="text-center mt-8 text-sm text-grey600">
                  Already have an account?{" "}
                  <a href="/login" className="text-purple-600 font-medium">
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
