import React, { useState } from "react";
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
import { ArrowRightOutlined } from "@ant-design/icons";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload
    if (searchTerm.trim()) {
      navigate(`/jobs/${encodeURIComponent(searchTerm)}`);
    }
  };
  return (
    <div className=" w-full">
      <header className="z-[100] w-full top-0 lg:mx-auto font-satoshi fixed bg-white backdrop-filter backdrop-blur-md right-0 left-0">
        {/* <LandingPageHeader /> */}
        <Navbar className="bg-none py-4 lg:py-2" type="default" />
      </header>
      <div className="mt-16 bg-white flex items-center hero_bg fading_edge p-8 py-24 relative">
        {/* <Image src={LandingPageBg} alt="background" className="absolute" /> */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 pt-36 lg:pt-44 px-6 lg:px-16 text-center lg:text-left"> */}
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-4 flex justify-center items-center">
            <label className="bg-orange-100 text-orange-800 border border-red-500 text-sm font-medium px-4 py-2 rounded-full">
              Achieve Excellence
            </label>
          </div>

          <div>
            <div className="max-w-2xl mb-8 text-5xl font-bold tracking-tight leading-none text-center">
              <p className="font-DMSerifDisplay tracking-wide">
                Unlock your Potential: Find your Dream Job
              </p>
            </div>
            <p className=" mb-12 font-normal text-gray-900 lg:mb-8 font-Archivo text-md flex justify-center">
              <span className="font-normal max-w-2xl text-center mb-12">
                Unlock your potential with Outsource Apply submitting
                personalized job applications for you. Companies seek candidates
                like you, and we streamline the process. We tailor your CV for
                each application, craft compelling cover letters, and create
                follow-up emails. Spend your time preparing for interviews while
                we handle the rest.
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

              <div className="relative w-full">
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
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
          {/* <div className="flex space-x-4 justify-center lg:justify-start">
                  <Link href={REQUEST_DEMO_URL}>
                    <CustomButton className="before:ease relative h-[40px] overflow-hidden px-8 border-white bg-primaryColor text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-[40px] before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-primaryColor-500 hover:before:-translate-x-40">
                      Request a Demo
                    </CustomButton>
                  </Link>
                  <Link href={SIGN_UP_URL}>
                    <CustomButton className="bg-white border border-primaryColor  text-primaryColor h-[38px] px-8">
                      Get Started
                    </CustomButton>
                  </Link>
                </div> */}
        </div>
        <img
          src={Work}
          className="w-40 h-40 absolute landing-page-image"
          style={{ top: 200, left: 50 }}
          alt=""
        />

        <img
          src={DoubleArrow}
          className="w-40 h-40 absolute landing-page-image "
          style={{ top: 200, right: 50 }}
          alt=""
        />
        {/* <div>

                <Image
                  src={MainSideImage}
                  alt="reservations"
                  className="landing-page-image"
                />
              </div> */}
        {/* </div> */}
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
              <Link
                className="py-2 px-4 hover:!text-white rounded font-normal text-sm text-white bg-purple-700 flex gap-3"
              >
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
  );
};

export default Home;
