import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Activities = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send email to backend)
    console.log("Email submitted:", email);
    alert(`Thank you for subscribing! We'll notify you at ${email}.`);
    setEmail(""); // Clear the input after submission
  };
  return (
    <div>
        <Navbar />
        <Sidebar />
      <div
        className="w-full sm:ml-64 h-screen"
        style={{
          backgroundImage:
            "url('https://vojislavd.com/ta-template-demo/assets/img/coming-soon.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-between bg-black bg-opacity-70 py-8">
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Logo Section */}
            <div className="bg-white bg-opacity-10 px-4 py-2 rounded-xl flex items-center justify-center text-cyan-100 space-x-2 lg:space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 lg:h-8 xl:h-10 w-6 lg:w-8 xl:w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              <span className="text-xl lg:text-2xl xl:text-3xl font-bold">
                Template
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-6xl lg:text-7xl xl:text-8xl text-gray-200 tracking-wider font-bold font-serif mt-12 text-center">
              Coming Soon
            </h1>

            {/* Subscription Form */}
            <div className="flex flex-col items-center space-y-4 mt-24">
              <p className="text-gray-300 uppercase text-sm">
                Notify me when it's ready
              </p>
              <form
                onSubmit={handleSubmit}
                className="w-full flex items-center"
              >
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-72 p-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-tl rounded-bl text-sm"
                  placeholder="Email"
                  autoComplete="off"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 py-2 px-6 text-gray-100 border border-blue-600 rounded-tr rounded-br text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="w-full flex items-center justify-center">
            <ul className="flex items-center space-x-4">
              <li>
                <a href="#" title="Facebook">
                  <svg
                    className="w-6 lg:w-8 h-6 lg:h-8 hover:scale-110 transition duration-300"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 506.86 506.86"
                  >
                    <path
                      className="cls-1"
                      d="M506.86,253.43C506.86,113.46,393.39,0,253.43,0S0,113.46,0,253.43C0,379.92,92.68,484.77,213.83,503.78V326.69H149.48V253.43h64.35V197.6c0-63.52,37.84-98.6,95.72-98.6,27.73,0,56.73,5,56.73,5v62.36H334.33c-31.49,0-41.3,19.54-41.3,39.58v47.54h70.28l-11.23,73.26H293V503.78C414.18,484.77,506.86,379.92,506.86,253.43Z"
                    />
                    <path
                      className="cls-2"
                      d="M352.08,326.69l11.23-73.26H293V205.89c0-20,9.81-39.58,41.3-39.58h31.95V104s-29-5-56.73-5c-57.88,0-95.72,35.08-95.72,98.6v55.83H149.48v73.26h64.35V503.78a256.11,256.11,0,0,0,79.2,0V326.69Z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" title="Twitter">
                  <svg
                    className="w-6 lg:w-8 h-6 lg:h-8 hover:scale-110 transition duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 333333 333333"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path
                      d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm90493 110539c-6654 2976-13822 4953-21307 5835 7669-4593 13533-11870 16333-20535-7168 4239-15133 7348-23574 9011-6787-7211-16426-11694-27105-11694-20504 0-37104 16610-37104 37101 0 2893 320 5722 949 8450-30852-1564-58204-16333-76513-38806-3285 5666-5022 12109-5022 18661v4c0 12866 6532 24246 16500 30882-6083-180-11804-1876-16828-4626v464c0 17993 12789 33007 29783 36400-3113 845-6400 1313-9786 1313-2398 0-4709-247-7007-665 4746 14736 18448 25478 34673 25791-12722 9967-28700 15902-46120 15902-3006 0-5935-184-8860-534 16466 10565 35972 16684 56928 16684 68271 0 105636-56577 105636-105632 0-1630-36-3209-104-4806 7251-5187 13538-11733 18514-19185l17-17-3 2z"
                      fill="#e2e8f0"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" title="LinkedIn">
                  <svg
                    className="w-6 lg:w-8 h-6 lg:h-8 hover:scale-110 transition duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 333333 333333"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path
                      d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm-18220 138885h28897v14814l418 1c4024-7220 13865-14814 28538-14814 30514-1 36157 18989 36157 43691v50320l-30136 1v-44607c0-10634-221-24322-15670-24322-15691 0-18096 11575-18096 23548v45382h-30109v-94013zm-20892-26114c0 8650-7020 15670-15670 15670s-15672-7020-15672-15670 7022-15670 15672-15670 15670 7020 15670 15670zm-31342 26114h31342v94013H96213v-94013z"
                      fill="#e2e8f0"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
