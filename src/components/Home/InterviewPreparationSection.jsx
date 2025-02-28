import React from 'react';
import InterviewImage from "../../assets/images/interview.jpeg"

const InterviewPreparationSection = () => {
    return (
        <section className="bg-gray-100 flex items-center p-8 lg:px-8">
            <div className="mx-auto max-w-screen-xl">
                <div className="gap-8 items-center mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16">
                    <img className="w-full rounded-2xl" src={InterviewImage} alt="dashboard image" />
                    <div className="mb-4 text-gray-900">
                        <h2 className="mb-4 text-2xl tracking-tight font-extrabold">
                            Step Into Your Next Interview Fully Prepared
                        </h2>
                        <p className="mb-4 font-normal text-md">
                            Stand out with beautifully designed resumes, cover letters, and follow-up emails. Our
                            easy-to-use editor makes it simple to craft professional documents that highlight your
                            unique strengths and qualifications, helping you leave a lasting impression when
                            opportunities arise.
                        </p>
                        <a href="register.html"
                            className="inline-flex items-center text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Get started
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InterviewPreparationSection;