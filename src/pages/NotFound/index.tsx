import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 h-20 text-gray-700"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 14h-2v-2h2Zm0-4h-2V7h2Z" />
      </svg>
      <h1 className="mt-6 text-3xl font-bold text-gray-800 md:text-4xl">
        Error 404 <br /> It looks like something went wrong.
      </h1>
      <p className="mt-4 text-lg text-gray-500 md:max-w-sm">
        Don’t worry, our team is already on it. Please try refreshing the page or come back later.
      </p>
      <Link to="/" className="mt-8 px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-900">
        Back Home
      </Link>
    </div>
  );
};

export default NotFound;
