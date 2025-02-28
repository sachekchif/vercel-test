import React, { useState } from "react";

const Switch = ({ feature, isChecked, onChange }) => {
  const [checked, setChecked] = useState(isChecked); // Initialize with isChecked prop

  const handleToggle = () => {
    const newState = !checked;
    setChecked(newState);
    console.log(`${feature} is clicked`);
    onChange(newState); // Notify parent component of the new state
  };

  return (
    <label className="flex items-center justify-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={handleToggle}
      />
      <div
        className={`relative w-11 h-6 ${
          checked ? "bg-green-600" : "bg-gray-400"
        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
      ></div>
    </label>
  );
};

export default Switch;