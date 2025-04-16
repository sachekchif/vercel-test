import React from "react";
import logo from "../assets/images/favicon2.png";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-wrapper">
        {/* Inner pulse (contracting) */}
        <div className="loader-pulse-inner" />
        
        {/* Outer pulse (expanding) */}
        <div className="loader-pulse-outer" />
        
        {/* Logo */}
        <img 
          src={logo}
          alt="Loading"
          className="loader-logo"
        />
      </div>
    </div>
  );
};

export default Loader;