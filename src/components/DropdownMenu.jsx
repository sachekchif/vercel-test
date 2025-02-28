import React from 'react';
import CustomButton from './CustomButton';

const DropdownMenu = () => {
  const menuItems = [
    { label: "All", color: "bg-blue-500" },
    { label: "Approved", color: "bg-green-500" },
    { label: "Rejected", color: "bg-red-500" },
    { label: "Pending", color: "bg-yellow-500" },
    { label: "In Review", color: "bg-purple-500" },
    { label: "Reviewed", color: "bg-teal-500" },
  ];

  const handleMenuItemClick = (itemLabel) => {
    console.log(`Selected: ${itemLabel}`);
  };

  return (
    <div id="dropdownRadio" className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow">
      <ul className="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownRadioButton">
        {menuItems.map((item, index) => (
          <li key={index}>
            <div className="flex items-center p-2 rounded hover:bg-gray-100">
              <CustomButton
                backgroundColor={item.color}
                className="w-full text-sm font-medium text-gray-900 rounded"
                title={`Filter by ${item.label}`}
                onClick={() => handleMenuItemClick(item.label)}
              >
                {item.label}
              </CustomButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
