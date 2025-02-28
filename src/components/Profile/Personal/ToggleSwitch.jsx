// src/components/ToggleSwitch.jsx
import React from "react";

const ToggleSwitch = ({ isChecked, onChange }) => {
  const handleToggle = () => {
    onChange(!isChecked); // Trigger the toggle state change
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={() => {}} // Prevent default behavior, as we handle it manually
      />
      <div
        onClick={handleToggle} // Add onClick to switch
        className={`relative w-11 h-6 rounded-full transition-colors 
          ${isChecked ? "bg-green-600" : "bg-gray-200"} 
          peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300`}
      >
        <span
          className={`absolute w-5 h-5 bg-white border border-gray-300 rounded-full transition-all 
            ${isChecked ? "translate-x-full" : ""}`}
          style={{ top: "2px", left: "2px", transform: isChecked ? "translateX(20px)" : "translateX(0)" }}
        ></span>
      </div>
    </label>
  );
};

export default ToggleSwitch;
