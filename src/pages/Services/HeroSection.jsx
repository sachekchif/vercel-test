import React from "react";
import Image1 from "../../assets/images/service1.jpeg";
import Image2 from "../../assets/images/service2.jpeg";
import Image3 from "../../assets/images/service3.jpeg";

const HeroSection = () => {
  return (
    <section className="bg-white lg:h-screen flex items-center hero_bg fading_edge p-8 py-24 relative">
      <div className="mx-auto max-w-screen-xl">
        <div className="gap-8 items-center mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-8">
          <div className="mb-8 text-gray-900">
            <div className="flex-col justify-start gap-4 flex">
              <div>
                <span className="bg-orange-100 text-orange-800 border border-red-500 text-sm font-medium px-4 py-2 rounded-full">
                  Services
                </span>
              </div>
              <div className="w-full flex-col gap-3 flex">
                <h2 className="text-indigo-700 text-4xl font-bold leading-normal max-w-md font-DMSerifDisplay-bold italic">
                  How we find your Ideal Jobs
                </h2>
                <p className="text-gray-700 text-base font-normal leading-relaxed mb-8">
                  Our platform uses your unique skills, experience, and career
                  goals to search for the perfect job opportunities. We’ll
                  handle the entire application process, from creating a
                  tailored resume and cover letter to submitting your
                  application and following up with the employer.
                </p>
                <p className="text-gray-700 text-base font-normal leading-relaxed mb-8">
                  With us, you save time and focus on preparing for interviews
                  while we ensure your profile stands out. Let us take the
                  hassle out of job hunting and get you closer to your dream
                  career.
                </p>
              </div>
              <div className="flex gap-4">
                <a
                  href="register.html"
                  className="inline-flex items-center bg-purple-700 text-white font-medium rounded-full text-sm px-8 py-2.5 text-center"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
          <div className="w-full h-full">
            <div className="sm:grid grid-cols-2 gap-4 absolute landing-page-image hidden">
              <img
                src={Image1}
                alt="Image 1"
                className="h-56 w-full object-cover rounded-tl-3xl"
              />
              <img
                src={Image2}
                alt="Image 2"
                className="h-56 w-full object-cover rounded-tr-3xl"
              />
              <img
                src={Image3}
                alt="Image 3"
                className="h-64 w-full col-span-2 object-cover rounded-b-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
