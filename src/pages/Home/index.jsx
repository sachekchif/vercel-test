import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Work from "../../assets/images/work.svg";
import DoubleArrow from "../../assets/images/double-arrow.svg";
import JobApplicationSection from "../../components/Home/JobApplicationSection";
import InterviewPreparationSection from "../../components/Home/InterviewPreparationSection";
import FAQSection from "../../components/Home/FAQSection";
import NewsletterSubscription from "../../components/Home/NewsLetterSubscription";
import Footer from "../../components/Footer";
import JobListings from "../../components/Home/JobListings";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRightOutlined,
  CloseOutlined,
  GoogleCircleFilled,
} from "@ant-design/icons";
import { Spin, message } from "antd";
import Google from "../../assets/images/google-icon-logo-svgrepo-com.svg"

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const navigate = useNavigate();

  // Check for token and refresh_token in the URL when the component mounts
  useEffect(() => {
    // Check if userInformation already exists in sessionStorage
    const userInformation = sessionStorage.getItem("userInformation");

    if (userInformation) {
      // User is already authenticated, skip the authentication flow
      return;
    }

    // Proceed with authentication if userInformation is not present
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get("token");

    // Extract token only up to the "?" character
    if (token && token.includes("?")) {
      token = token.split("?")[0]; // Take the part before "?"
    }

    // Manually extract refresh_token from the URL
    const url = window.location.href;
    const refreshTokenMatch = url.match(/refresh_token=([^&]+)/);

    let refreshToken = null;
    if (refreshTokenMatch) {
      refreshToken = refreshTokenMatch[1];
    }

    console.log("rrr", token);
    console.log("lll", refreshToken);
    if (token && refreshToken) {
      setIsModalVisible(true); // Show the notification
      fetchProfileData(token, refreshToken); // Fetch profile data
    }
  }, []);

  const fetchProfileData = async (token, refreshToken) => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(
        "https://backend-46kr.onrender.com/auth/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();
      console.log("Profile Data:", data);

      if (data.statusCode === "00") {
        // Add tokens to the user information object
        const userInformation = {
          ...data, // Include the profile data
          access_token: token, // Add access_token
          refresh_token: refreshToken, // Add refresh_token
        };

        // Save tokens and user information to sessionStorage
        sessionStorage.setItem("access_token", token);
        sessionStorage.setItem("refresh_token", refreshToken);
        sessionStorage.setItem(
          "userInformation",
          JSON.stringify(userInformation)
        );

        // Display success message
        setApiResponse({
          status: "success",
          message: "Authenticated and synced data!",
        });
        message.success("Authenticated and synced data!");

        setTimeout(() => {
          setIsModalVisible(false);

          // Retrieve the selectedJob object from localStorage
          const storedJob = localStorage.getItem("selectedJob");
          if (storedJob) {
            const parsedJob = JSON.parse(storedJob);

            // Check if the redirectUrl exists
            if (parsedJob.redirectUrl) {
              // Redirect the user to the stored URL
              window.location.href = parsedJob.redirectUrl;
            } else {
              // If no redirectUrl is found, simply refresh the page
              window.location.reload();
            }
          } else {
            // If no selectedJob is found, simply refresh the page
            window.location.reload();
          }
        }, 2000);
      } else {
        throw new Error(data.statusMessage || "Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setApiResponse({ status: "error", message: error.message });
      message.error("Failed to sync data. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload
    if (searchTerm.trim()) {
      navigate(`/alljobs/${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="w-full">
      {/* Fixed Notification for Token Processing */}
      {isModalVisible && (
        <div
          className="fixed top-5 right-5 bg-white shadow-lg rounded-lg  w-72"
          style={{ zIndex: 1000 }}
        >
          <div className="flex p-4 border-b-2 border-gray-200 justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={Google} alt="google" className="h-4 w-4 mr-2"/>
              <span className="font-medium text-gray-700">
                Sign in to your account
              </span>
            </div>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalVisible(false)} // Close the notification
            >
              <CloseOutlined />
            </button>
          </div>

          <div className="mt-3 text-sm p-4">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Spin size="small"/>;
                <span>Syncing...</span>
              </div>
            ) : apiResponse ? (
              <span
                className={
                  apiResponse.status === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {apiResponse.message}
              </span>
            ) : (
              <span>Processing...</span>
            )}
          </div>
        </div>
      )}

      {/* Rest of the Home component */}
      <header className="z-[100] w-full top-0 lg:mx-auto font-satoshi fixed bg-white backdrop-filter backdrop-blur-md right-0 left-0">
        <Navbar className="bg-none py-4 lg:py-2" type="default" />
      </header>

      <div
        id="main-content"
        className="h-full bg-white mb-5 relative"
        style={{ top: "65px" }}
      >
        <div className="bg-white lg:h-screen flex items-center hero_bg fading_edge p-8 py-24">
        <div className="mx-auto max-w-screen-xl">
            <div className="mb-4 flex justify-center items-center">
              <label className="bg-orange-100 text-orange-800 border border-red-500 text-sm font-medium px-4 py-2 rounded-full">
                Achieve Excellence
              </label>
            </div>

            <div className="text-black">
              <div class="max-w-2xl mb-8 text-5xl font-bold tracking-tight leading-none text-center">
                <p class="font-DMSerifDisplay-bold tracking-wide">
                  Unlock your Potential: Find your Dream Job
                </p>
              </div>
              <p className="mb-12 font-normal text-black lg:mb-8 font-Archivo text-md flex justify-center">
                <span className="font-normal max-w-2xl text-center mb-12 text-black">
                  Unlock your potential with Outsource Apply submitting
                  personalized job applications for you. Companies seek
                  candidates like you, and we streamline the process. We tailor
                  your CV for each application, craft compelling cover letters,
                  and create follow-up emails. Spend your time preparing for
                  interviews while we handle the rest.
                </span>
              </p>
            </div>

            <form
              onSubmit={handleSearch}
              className="flex justify-center items-center"
            >
              <div className="w-full max-w-xl">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>

                <div className="relative w-full border-gray focus:ring-0 focus:border-none hover:border-none">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-t"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>

                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Find a Job Title e.g Data Analyst"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-purple-700 hover:bg-purple-600 font-medium rounded-lg text-sm px-4 py-3"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

          <img
            src={Work}
            className="w-40 h-40 absolute landing-page-image hidden md:block"
            style={{ top: 200, left: 50 }}
            alt=""
          />

          <img
            src={DoubleArrow}
            className="w-40 h-40 absolute landing-page-image hidden md:block"
            style={{ top: 200, right: 50 }}
            alt=""
          />
        </div>
     

      <section className="bg-white p-8">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex justify-between flex-wrap mb-4">
            <div className="section-header-text">
              <h2 className="text-2xl font-bold tracking-tight leading-tight text-gray-900">
                Featured Jobs
              </h2>

              <div className="max-w-md mb-8">
                <p className="text-gray-500 dark:text-gray-400">
                  A selection of jobs designed to inspire your next move.
                </p>
              </div>
            </div>

            <div className="section-cta">
              <Link to="/alljobs" className="py-2 px-4 hover:!text-white rounded font-normal text-sm text-white bg-purple-700 flex gap-3">
                See all Jobs
                <ArrowRightOutlined />
              </Link>
            </div>
          </div>

          <JobListings />
        </div>
      </section>

      <JobApplicationSection />
      <InterviewPreparationSection />
      <FAQSection />
      <NewsletterSubscription />
      <Footer />
      </div>
    </div>
  );
};

export default Home;
