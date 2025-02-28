import React from "react";
import { Spin, Flex } from "antd";

const DashboardCard = ({
  label,
  description,
  icon,
  value,
  link,
  descriptionColor,
  loading, // Add loading prop
}) => {
  return (
    <a href={link}>
      <div className="rounded-lg border card-svg bg-card bg-white text-card-foreground shadow-sm">
        <div className="p-6 flex flex-col items-start justify-between space-y-0">
          <div className="flex justify-between w-full">
            <label className="tracking-tight text-md font-medium text-gray-800">
              {label}
            </label>
            <div className="flex">{icon}</div>
          </div>
          <label
            className={`text-sm italic break-words ${
              descriptionColor || "text-gray-700"
            }`}
          >
            {description}
          </label>
        </div>

        <div className="p-6 pt-0 flex">
          {loading ? ( // Show Spin if loading is true
            <Flex align="center" justify="center" style={{ height: "100%" }}>
              <Spin size="medium" />
            </Flex>
          ) : (
            <div className="text-4xl font-medium mb-2 text-gray-900">{value}</div>
          )}
        </div>
      </div>
    </a>
  );
};

export default DashboardCard;