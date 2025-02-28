// src/components/SectionCard.jsx
import React from "react";

const SectionCard = ({ title, description, buttonText, buttonLink, buttonStyle, onButtonClick }) => {
  return (
    <div className="flex flex-col mb-8">
      <label className="font-semibold text-gray-900 mb-4">{title}</label>
      <p className="text-sm font-normal text-gray-500 mb-4">{description}</p>
      {buttonText && (
        <div className="flex justify-start">
          <button
            onClick={onButtonClick}
            className={`font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 mb-2 ${buttonStyle}`}
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionCard;
