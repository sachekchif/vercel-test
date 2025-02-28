// src/components/AccountManagement.jsx
import React, { useState } from "react";
import SectionCard from "./SectionCard";
import ToggleSwitch from "./ToggleSwitch";
import { useLazyDeactivateProfileQuery } from "../../../services/apiSlice";
import CustomLoadingButton from "../../CustomLoadingButton";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const AccountManagement = () => {
  const navigate = useNavigate();
  const [isDeactivated, setIsDeactivated] = useState(false);
  const [deactivateProfile, { data, error, isLoading }] =
    useLazyDeactivateProfileQuery();

  const handleDeleteAccount = () => {
    console.log("Delete Account button clicked");
  };

  const handleSaveChanges = () => {
    deactivateProfile();
    console.log("Save Changes button clicked", data);
    if (data?.statusCode === "00") {
      message.success("Account deactivated successfully");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      sessionStorage.removeItem("userInformation");
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
    }

  };

  const handleToggle = (checked) => {
    setIsDeactivated(checked);
    console.log(checked ? "on" : "off");
  };

  const sections = [
    {
      title: "Deactivate your Account",
      description:
        "Temporarily deactivate your account and stop all platform activities. You can always come back here to reverse the action.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mb-12 px-4 py-8 bg-gray-100 rounded-lg">
      {/* Intro Section */}
      <div className="col-span-1 flex flex-col overflow-x-auto mb-4">
        <label className="font-semibold text-lg mb-2">Account Management</label>
        <label className="font-normal text-sm text-gray-500 mb-4">
          This is a subtext content and it shows content about activating and
          deactivating your account.
        </label>
      </div>

      {/* Dynamic Sections */}
      <div className="col-span-2">
        {sections.map((section, index) => (
          <div key={index} className="flex mb-8">
            <SectionCard
              title={section.title}
              description={section.description}
              buttonText={section.buttonText}
              buttonStyle={section.buttonStyle}
              onButtonClick={section.onButtonClick}
            />
            {section.title === "Deactivate your Account" && (
              <ToggleSwitch isChecked={isDeactivated} onChange={handleToggle} />
            )}
          </div>
        ))}

        {/* Save Changes Button */}
        <div className="flex justify-start">
          <CustomLoadingButton
            isLoading={isLoading}
            onClick={handleSaveChanges}
          >
            Save changes
          </CustomLoadingButton>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
