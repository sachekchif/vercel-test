// SharedComponent.js
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const SharedComponent = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar Section */}
      <Sidebar />

      <Navbar />
      <div className="px-8 py-8 sm:ml-64 bg-gray-50 w-full h-full">{children}</div>
    </div>
  );
};

export default SharedComponent;
