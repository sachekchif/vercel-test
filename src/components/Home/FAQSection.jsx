import React from 'react';

const FAQSection = () => {
    return (
        <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-center dark:text-black">Frequently Asked Questions (FAQ)</h2>
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600 mb-12">
                        Outsource Apply is an e-learning platform where individuals, companies, and schools can access
                        high-quality educational courses designed to improve skills, knowledge, and career growth.
                        Whether you're a student, a professional, or an organization, we provide tailored learning
                        experiences for everyone.
                    </p>
                    <div className="space-y-4">
                        {[{
                            question: "What if I need more than 50 job applications per month?",
                            answer: "You can reach out to our support team to discuss customized solutions for your needs."
                        }, {
                            question: "How do you match me with relevant job openings?",
                            answer: "Our team uses advanced algorithms and expert analysis to identify the best job openings for your skills and experience."
                        }, {
                            question: "Can I use my own CV and cover letter?",
                            answer: "Yes, but our experts can also review and enhance them for maximum impact."
                        }, {
                            question: "How do you ensure data privacy and security?",
                            answer: "We use state-of-the-art encryption and adhere to strict data protection policies to safeguard your information."
                        }].map((item, index) => (
                            <details key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <summary className="flex items-center justify-between p-5 font-medium text-gray-500 cursor-pointer hover:bg-gray-100">
                                    {item.question}
                                    <svg className="w-4 h-4 transition-transform transform rotate-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </summary>
                                <div className="p-5 text-gray-500 border-t border-gray-200">
                                    {item.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;