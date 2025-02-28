// src/components/SectionLabel.js
import React from "react";

const SectionLabel = ({ title, subtext }) => (
  <div className="col-span-1 flex flex-col overflow-x-auto mb-4">
    <label className="font-semibold text-lg mb-2">{title}</label>
    {subtext && <label className="font-normal text-sm text-gray-500 mb-4">{subtext}</label>}
  </div>
);

export default SectionLabel;