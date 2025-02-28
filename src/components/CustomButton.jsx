import React from "react";

const CustomButton = ({
  children,
  disabled,
  loading,
  onClick,
  title,
  disableRipple = false,
  type = "submit",
  backgroundColor = "bg-purple-700", // Default color
  radius = "rounded-lg",
  className = "text-white font-bold text-md px-4 py-2 w-full",
  icon, // For adding icon to the button
  isDropdownButton = false, // If button is part of the dropdown
}) => {
  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label="submit button"
      className={`${backgroundColor} ${radius} ${className} disabled:bg-gray-500 disabled:cursor-not-allowed relative flex items-center justify-center`}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center">
          {icon && <span className="flex items-center mx-1">{icon}</span>}
          {children}
        </div>
      )}
    </button>
  );
};

export default CustomButton;
