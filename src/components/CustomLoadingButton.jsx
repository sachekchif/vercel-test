import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const CustomLoadingButton = ({ onClick, isLoading, children, className, ...props }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`py-2 px-16 rounded text-sm text-white transition-colors flex items-center justify-center ${
        isLoading ? "bg-gray-300 border-gray-500 text-gray-500 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-600"
      } ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center text-gray-500 gap-2">
          <Spin indicator={<LoadingOutlined twoToneColor="#6b7280" spin />} size="small" /> Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomLoadingButton;
