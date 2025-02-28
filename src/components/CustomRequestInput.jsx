import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const CustomRequestInput = ({
  type = "text",
  label,
  value,
  placeholder,
  name,
  onChange,
  isRequired,
  startContent,
  defaultValue,
  classnames = "bg-none rounded-[6px] shadow-none hover:border-[#C3ADFF] focus:border-[#C3ADFF]",
  errorMessage,
  size = "lg",
  suffix,
  disabled,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  if (type === "password") {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={name}
            className="text-[#000] font-[500] text-[14px] mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {startContent && <div className="absolute left-2">{startContent}</div>}
          <input
            type={isVisible ? "text" : "password"}
            value={value}
            name={name}
            onChange={onChange}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={isRequired}
            className={`${classnames} bg-white border p-2 rounded w-full`}
          />
          <div className="absolute right-3 top-3">
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <IoEyeOutline className="text-foreground-500 text-lg" />
              ) : (
                <IoEyeOffOutline className="text-foreground-500 text-lg" />
              )}
            </button>
          </div>
        </div>
        {errorMessage && <p className="text-[#f90202] text-sm mt-1">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-[#000] font-[500] text-[14px] mb-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {startContent && <div className="absolute left-2">{startContent}</div>}
        <input
          type={type}
          value={value}
          name={name}
          disabled={disabled}
          onChange={onChange}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={isRequired}
          className={`${classnames} ${disabled ? "bg-gray-200" : "bg-white"} border p-2 pr-14 rounded w-full`}
        />
        {suffix && (
          <span className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500">
            {suffix}
          </span>
        )}
      </div>
      {errorMessage && <p className="text-[#f90202] text-sm mt-1">{errorMessage}</p>}
    </div>
  );
};

export default CustomRequestInput;