import React from "react";// Create a CSS file for styling the tooltip

const CustomTooltip = ({ content, children }) => {
  return (
    <div className="tooltip-container">
      {children}
      <div className="tooltip-content">{content}</div>
    </div>
  );
};

export default CustomTooltip;
