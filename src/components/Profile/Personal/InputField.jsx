import React from "react";

const InputField = ({ label, value, onChange, type = "text", icon = null, disabled = false }) => (
  <div className="flex flex-col mb-2">
    <label className="text-sm font-medium text-gray-900 block mb-2">{label}</label>
    <div className="flex">
      {icon && (
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
          {icon}
        </span>
      )}
      <input
        type={type}
        className={`${
          icon ? "rounded-none rounded-e-lg" : "rounded-lg"
        } bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  </div>
);

export default InputField;
