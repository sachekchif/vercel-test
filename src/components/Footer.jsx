import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from "../assets/images/oa_logo_wide.png";

const Footer = () => {
    return (
        <footer className="bg-white p-8">
            <div className="w-full max-w-screen-xl mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src={logoImage} className="h-8 mr-2" alt="Outsource Apply Logo" />
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                        <li>
                            <Link to="/about" className="hover:underline me-4 md:me-6">About</Link>
                        </li>
                        <li>
                            <Link to="/terms" className="hover:underline me-4 md:me-6">Terms & Conditions</Link>
                        </li>
                        <li>
                            <Link to="/services" className="hover:underline">Services</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center">&copy; 2024 <Link to="/" className="hover:underline">Outsource Apply</Link>. All Rights Reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;