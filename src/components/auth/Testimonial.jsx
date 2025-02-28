import React, { useState, useEffect } from "react";

import bongisImg from "../../assets/images/bottle.png"; // Adjust the relative path
import jideImg from "../../assets/images/jide.jpeg";   // Adjust the relative path

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 0,
      heading: "Outsource Apply unlocked my Potential",
      text: "The simplicity of the lectures from the contents in Outsource Apply made learning easier for me, and I just continued learning more and more!",
      name: "Enoobong George",
      role: "Senior UI/UX Designer @Apple",
      image: bongisImg,
    },
    {
      id: 1,
      heading: "I learned a complex topic in 3 weeks!",
      text: "There's this difficult topic I've been struggling to learn from other places, but Outsource Apply's videos helped simplify the daunting task, and I learned it in under 3 weeks!",
      name: "Olajide Punk Palmer",
      role: "Senior Backend Engineer @Nottingham Forest",
      image: jideImg,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slides every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen">
      <div className="hidden h-full lg:flex text-white purple_svg justify-center items-center">
        <div className="relative w-full h-full object-cover">
          {/* Carousel Wrapper */}
          <div className="relative h-screen object-cover overflow-hidden rounded-xl">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-700 transform ${
                  index === currentIndex
                    ? "translate-x-0 opacity-100 z-20"
                    : index < currentIndex
                    ? "-translate-x-full opacity-0 z-10"
                    : "translate-x-full opacity-0 z-10"
                }`}
              >
                <div className="absolute block w-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 lg:border-r rounded-xl backdrop-blur-lg bg-white/30 border-2 border-white/20 shadow-lg">
                    <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500">
                      <h2 className="text-xl font-semibold text-white">
                        {testimonial.heading}
                      </h2>
                      <p className="my-4 text-white">{testimonial.text}</p>
                    </blockquote>
                    <figcaption className="flex justify-center items-center space-x-3 text-white">
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <div className="space-y-0.5 font-medium text-left">
                        <div>{testimonial.name}</div>
                        <div className="text-sm font-light">{testimonial.role}</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Indicators */}
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                className={`w-3 h-3 rounded-full hover:bg-white ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-current={index === currentIndex}
                aria-label={`Slide ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          {/* Slider Controls */}
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none hover:!border-none"
            onClick={handlePrevious}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>

          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none hover:!border-none"
            onClick={handleNext}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none hover:!border-none">
              <svg
                className="w-4 h-4 text-white rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 9l4-4L1 1"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
