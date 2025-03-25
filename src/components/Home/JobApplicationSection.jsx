import React from "react";

const JobApplicationSection = () => {
  return (
    <section className="bg-white flex items-center p-8 py-24 w-full">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-14 mx-auto text-center">
          <h2 className="text-3xl text-center font-bold text-gray-900 leading-[3.25rem] mb-2">
            Let's get you hired!
          </h2>
          <p className="mx-auto text-center font-normal text-gray-500 lg:max-w-2xl max-w-xl lg:mx-auto mb-8">
            Your one-stop shop for all things job application. We will create your professional resumes,
            cover letters, and follow-up emails for each job we apply for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-8">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="group relative min-w-full h-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-4 xl:w-1/4 hover:bg-purple-700"
            >
              <div className="bg-white rounded-full flex justify-center items-center mb-12 w-14 h-14 dark:text-black">
                {card.icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
                {card.title}
              </h4>
              <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white max-w-xl pb-4">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const cardData = [
  {
    title: "Discover New Opportunities",
    description:
      "Explore a wide range of career options tailored to your skills and ambitions. Stay ahead of the curve with personalized job recommendations and timely alerts.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    title: "Get Invited to Apply to Jobs",
    description:
      "Increase your chances of landing interviews with targeted applications and networking strategies. Utilize our tools to optimize your job search, from crafting standout applications to leveraging connections within your industry.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    title: "Resume, Cover Letter Reviews",
    description:
      "Enhance your job application materials with expert feedback and personalized recommendations. Our professional review service helps you fine-tune your Resume and Cover Letter.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
    ),
  },
];

export default JobApplicationSection;
