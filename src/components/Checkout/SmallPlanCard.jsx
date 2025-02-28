import React from "react";

const SmallPlanCard = ({ id, name, value, title, features, selected, onChange }) => {
  return (
    <li>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className="hidden peer"
        required
        checked={selected}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="inline-flex items-center justify-between w-full p-5 text-gray-800 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-purple-500 peer-checked:border-purple-600 peer-checked:bg-purple-700 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="block">
          <div className="w-full text-lg font-semibold mb-4">{title}</div>
          <ul className="w-full text-sm">
            {features.map((feature, index) => (
              <li key={index}>- {feature}</li>
            ))}
          </ul>
        </div>
      </label>
    </li>
  );
};

export default SmallPlanCard;
