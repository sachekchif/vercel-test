const ServicesSection = () => {
    return (
      <div className="">
        <section className="py-12 bg-white sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center mb-12">
                    <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">Services we Offer
                    </h2>
                    <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8 max-w-2xl text-center">
                        Explore the comprehensive range of services we offer to help you excel in your career journey.
                        From personalized career coaching to professional resume writing and job application assistance,
                        we’re here to provide the guidance and resources you need to achieve your career aspirations.
                    </p>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center">

                    <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                            stroke="currentColor" className="mx-auto w-10 h-10 text-purple-700 mb-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <h3 className="mb-4 text-xl font-bold text-gray-900 ">Streamlined Job Search</h3>
                        <p className="mb-4 text-sm text-gray-600 ">
                            Find your dream job faster with our tailored search tools. Save time and focus on the
                            opportunities that matter most.
                        </p>
                    </div>



                    <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                            stroke="currentColor" className="mx-auto w-10 h-10 text-purple-700 mb-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>


                        <h3 className="mb-4 text-xl font-bold text-gray-900 ">Create Professional Documents</h3>
                        <p className="mb-4 text-sm text-gray-600 ">
                            Build resumes and cover letters that stand out. Use templates and expert tips to craft
                            documents that impress.
                        </p>
                    </div>



                    <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                            stroke="currentColor" className="mx-auto w-10 h-10 text-purple-700 mb-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>

                        <h3 className="mb-4 text-xl font-bold text-gray-900 ">Customized Recommendations</h3>
                        <p className="mb-4 text-sm text-gray-600 ">
                            Receive job suggestions tailored to your skills. Let us connect you with opportunities that
                            match your career goals.
                        </p>
                    </div>


                    <div className="md:p-8 lg:p-14 md:border-t md:border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                            stroke="currentColor" className="mx-auto w-10 h-10 text-purple-700 mb-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>

                        <h3 className="mb-4 text-xl font-bold text-gray-900 ">Free Resume Assessments</h3>
                        <p className="mb-4 text-sm text-gray-600">
                            Get instant feedback on how to improve your resume. Understand what recruiters are looking
                            for and make your resume shine.
                        </p>
                    </div>


                    <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                            stroke="currentColor" className="mx-auto w-10 h-10 text-purple-700 mb-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                        </svg>


                        <h3 className="mb-4 text-xl font-bold text-gray-900 ">Personalized Job Match</h3>
                        <p className="mb-4  text-sm text-gray-600">
                            See how well you fit each job before you apply. Our scoring system helps you focus on roles
                            where you’ll thrive.
                        </p>

                    </div>


                    <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                            stroke="currentColor" className="mx-auto w-10 h-10 text-purple-700 mb-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <h3 className="mb-4 text-xl font-bold text-gray-900">Round-the-Clock Support</h3>
                        <p className="mb-4 text-gray-600 text-sm">
                            Access assistance anytime, anywhere. Whether it's a question or guidance, we’re here to
                            support you every step of the way.
                        </p>

                    </div>

                </div>
            </div>
        </section>

        <section className="py-10 bg-purple-100 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">How does it work?
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                        Discover how our seamless process takes the stress out of job hunting. From account creation to securing interviews, we handle everything to set you up for success.
                    </p>
                </div>

                <div className="relative mt-12 lg:mt-20">
                    <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28 w-full">
                        <img className="w-full"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                            alt="" />
                    </div>

                    <div className="relative grid grid-cols-1 text-center gap-12 md:grid-cols-3">
                        <div>
                            <div
                                className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-100 border border-purple-700 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700"> 1 </span>
                            </div>

                            <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Create a free
                                account</h3>
                            <p className="mt-4 text-base text-gray-600">
                                Join our platform in just a few simple steps. Gain access to personalized job opportunities and career tools designed to help you succeed.
                            </p>
                        </div>

                        <div>
                            <div
                                className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-100 border border-purple-700 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700"> 2 </span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Document Review</h3>
                            <p className="mt-4 text-base text-gray-600">
                                Ensure your documents make a lasting impression. Our experts will polish your CV, tailor your cover letter, and craft professional follow-up emails to boost your chances.
                            </p>
                        </div>

                        <div>
                            <div
                                className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-100 border border-purple-700 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700"> 3 </span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Secure Interview
                            </h3>
                            <p className="mt-4 text-base text-gray-600">
                                Take the next step toward your dream job. With optimized applications and expert guidance, we help you stand out and secure interview opportunities with top employers.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
      </div>
    );
  };
  
  export default ServicesSection;
  