import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const CustomInput = ({
  type = "text",
  label,
  value,
  placeholder,
  endContent,
  hidden,
  name,
  disabled,
  onChange,
  isRequired,
  startContent,
  defaultValue,
  classnames = "bg-none rounded-[6px] shadow-none hover:border-[#C3ADFF] focus:border-[#C3ADFF]",
  errorMessage,
  size = "lg",
  suffix,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const passwordType = isVisible ? "text" : "password";
  const passwordEndContent = (
    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
      {isVisible ? (
        <IoEyeOutline className="text-foreground-500 text-lg" />
      ) : (
        <IoEyeOffOutline className="text-foreground-500 text-lg" />
      )}
    </button>
  );

  if (type === "text" && suffix) {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={name} className="text-[#000] font-[500] text-[14px] mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {suffix}
            </span>
          )}
        </div>
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
      <div className="relative">
        {startContent && <div className="absolute left-2">{startContent}</div>}
        <input
          type={type === "password" ? passwordType : type}
          value={value}
          name={name}
          hidden={hidden}
          disabled={disabled}
          onChange={onChange}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={isRequired}
          className={`${classnames} ${disabled ? "bg-secondaryGrey" : "bg-white"} border p-2 rounded w-full`}
        />
        {type === "password" && <div className="absolute right-3 top-3">{passwordEndContent}</div>}
      </div>
      {errorMessage && <p className="text-[#f90202] text-sm mt-1">{errorMessage}</p>}
    </div>
  );
};

export default CustomInput;