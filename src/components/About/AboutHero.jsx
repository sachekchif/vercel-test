import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import bongis from "../../assets/images/bongis.png";
import teamImage from "../../assets/images/team_meeting.jpeg";
import ourMission from "../../assets/images/our_mission.jpeg"

const AboutHero = () => {
  return (
    <>
      <section className="bg-white lg:h-screen flex items-center p-8 py-24 mt-16 mb-24">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-between mb-12">
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col flex-wrap">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex -space-x-4 rtl:space-x-reverse">
                      <img
                        className="w-10 h-10 border-2 border-white rounded-full"
                        src={bongis}
                        alt="Profile 1"
                      />
                      <img
                        className="w-10 h-10 border-2 border-white rounded-full"
                        src={bongis}
                        alt="Profile 2"
                      />
                      <img
                        className="w-10 h-10 border-2 border-white rounded-full"
                        src={bongis}
                        alt="Profile 3"
                      />
                      <img
                        className="w-10 h-10 border-2 border-white rounded-full"
                        src={bongis}
                        alt="Profile 4"
                      />
                    </div>
                    <span className="bg-orange-100 text-orange-800 border border-red-500 text-sm font-medium px-4 py-1 rounded-full">
                      Join 2,049 people
                    </span>
                  </div>
                  <div className="flex items-start mb-4">
                    <h2 className="text-3xl font-bold max-w-7xl leading-snug dark:text-black">
                      Resumes That Shine, Applications That Stand Out
                    </h2>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-md font-normal max-w-5xl mb-8 dark:text-black">
                    We are a team of passionate professionals dedicated to
                    helping you achieve your career goals. Our platform provides
                    the tools and resources you need to create professional job
                    application materials, and we’ll even apply to jobs on your
                    behalf so you can focus on preparing for your interviews and
                    looking your best.
                  </p>
                  <div className="flex gap-4">
                    <Link to="/register">
                      <Button
                        type="primary"
                        shape="round"
                        size="large"
                        className="bg-purple-700"
                      >
                        Get started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <img
                src={teamImage}
                className="w-full h-96 object-cover rounded-2xl"
                alt="Team Meeting"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 flex items-center p-8 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex items-center justify-center gap-16 w-full">
            <img
              className="w-1/2 rounded-2xl mb-4"
              src={ourMission}
              alt="dashboard image"
            />
            <div className="w-1/2 mb-4 text-gray-900">
              <h2 className="mb-4 text-2xl tracking-tight font-extrabold">
                Our Mission
              </h2>
              <p className="mb-4 font-normal text-md max-w-ldg">
                Our mission is to empower job seekers by managing the
                complexities of the job application process, making it seamless
                and stress-free. From crafting professional, standout resumes
                and personalized cover letters to identifying and applying for
                the best-suited job opportunities, we handle every detail with
                precision and care.
              </p>
              <p className="mb-12 font-normal text-md">
                We believe that everyone deserves access to fulfilling and
                meaningful work, regardless of their background or career stage.
                Our commitment is to provide the tools, support, and expertise
                needed to bridge the gap between your aspirations and
                opportunities. By simplifying the journey, we aim to help you
                navigate the job market with ease.
              </p>
              <div className="flex gap-4">
                <Link to="/register">
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    className="bg-purple-700"
                  >
                    Get started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-purple-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
        <div className="mb-14 flex items-center justify-center">
          <h2 className="text-3xl font-bold mb-4 max-w-md lg:max-w-3xl text-white">
            Unwavering in our commitment to Excellence
          </h2>
        </div>

        <dl className="grid max-w-screen-md gap-8 mx-auto grid-cols-3 md:grid-cols-3 secondary_text">
          {[
            { value: "203k+", label: "New Jobs" },
            { value: "130k+", label: "Candidates" },
            { value: "4M+", label: "Resumes" },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl text-amber-300 md:text-4xl font-extrabold">{stat.value}</dt>
              <dd className="text-amber-300">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
    <section className="py-12 bg-gray-100 sm:py-16 lg:py-20">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">

                    <div className="mx-auto max-w-screen-sm text-center mb-8">
                        <h2 className="text-xl font-bold leading-tight text-gray-900 sm:text-xl xl:text-3xl mb-4">
                            Testimonials</h2>
                        <p className="font-light max-w-xl text-md text-gray-900 ">
                            Meet the brilliant minds driving the vision of Outsource Apply — a team dedicated to
                            revolutionizing the job application process. With expertise, passion,
                            and a commitment to excellence, we work to empower our users to achieve their career
                            aspirations
                            effortlessly.
                        </p>
                    </div>


                    <div className="relative mt-10 md:mt-24 md:order-2">
                        <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
                            <div className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                                style={{background: "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"}}>
                            </div>
                        </div>

                        <div className="relative grid  grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">

                            <div className="flex flex-col overflow-hidden shadow-xl rounded-xl">
                                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>

                                        <blockquote className="flex-1 mt-8">
                                            <p className="text-lg leading-relaxed text-gray-900 ">
                                                “This platform has completely transformed my job search experience! The
                                                resume assessment feature gave me actionable feedback, and within weeks,
                                                I landed interviews with top companies. Highly recommend it to anyone
                                                looking to stand out!”</p>
                                        </blockquote>
                                    </div>

                                    <div className="flex items-center mt-8">
                                        <img className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                                            src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png"
                                            alt="" />
                                        <div className="ml-4">
                                            <p className="text-base font-bold text-gray-900 ">Leslie Alexander</p>
                                            <p className="mt-0.5 text-sm  text-gray-600">Freelance React Developer
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col overflow-hidden shadow-xl rounded-xl">
                                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>

                                        <blockquote className="flex-1 mt-8">
                                            <p className="text-lg leading-relaxed text-gray-900 ">
                                                “The personalized job recommendations saved me so much time. I found a
                                                position that perfectly matched my skills, and the follow-up email
                                                templates made the entire process seamless. This is a game-changer for
                                                job seekers.”
                                            </p>
                                        </blockquote>
                                    </div>

                                    <div className="flex items-center mt-8">
                                        <img className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                                            src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png"
                                            alt="" />
                                        <div className="ml-4">
                                            <p className="text-base font-bold text-gray-900 ">Jacob Jones</p>
                                            <p className="mt-0.5 text-sm  text-gray-600">Digital Marketer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col overflow-hidden shadow-xl rounded-xl">
                                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>

                                        <blockquote className="flex-1 mt-8">
                                            <p className="text-lg leading-relaxed text-gray-900 ">“As someone new to the job
                                                market, I was overwhelmed by the process. This site provided me with the
                                                tools and guidance I needed, from creating my first professional resume
                                                to acing my interview. I couldn't have done it without their support!”
                                            </p>
                                        </blockquote>
                                    </div>

                                    <div className="flex items-center mt-8">
                                        <img className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                                            src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png"
                                            alt="" />
                                        <div className="ml-4">
                                            <p className="text-base font-bold text-gray-900 ">Jenny Wilson</p>
                                            <p className="mt-0.5 text-sm  text-gray-600">Graphic Designer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-black">Our Team</h2>
                    <p className="font-light lg:mb-16 max-w-xl text-md text-gray-500 ">
                        Meet the brilliant minds driving the vision of Outsource Apply — a team dedicated to
                        revolutionizing the job application process. With expertise, passion,
                        and a commitment to excellence, we work to empower our users to achieve their career aspirations
                        effortlessly.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-4 lg:mb-16">

                    <div className="flex flex-col bg-gray-50 border border-gray-100 p-4 rounded-lg">
                        <div className="mb-4">
                            <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                alt="Bonnie Avatar"/>
                        </div>

                        <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
                            Victor Onuorah
                        </h3>
                        <span className="text-gray-500 dark:text-gray-400">Co-Founder/CEO</span>
                    </div>



                    <div className="flex flex-col bg-gray-50 border border-gray-100 p-4 rounded-lg">
                        <div className="mb-4">
                            <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                                alt="Bonnie Avatar"/>
                        </div>

                        <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
                            Joseph Utulu
                        </h3>
                        <span className="text-gray-500 dark:text-gray-400">Co-Founder/CEO</span>
                    </div>



                    <div className="flex flex-col bg-gray-50 border border-gray-100 p-4 rounded-lg">
                        <div className="mb-4">
                            <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                                alt="Bonnie Avatar"/>
                        </div>

                        <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
                            Diana Chalokwu
                        </h3>
                        <span className="text-gray-500 dark:text-gray-400">Head of Product</span>
                    </div>

                </div>
            </div>
        </section>
    </>
  );
};

export default AboutHero;
