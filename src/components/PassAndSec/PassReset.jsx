import React, { useState } from "react";
import SectionLabel from "../Profile/Personal/SectionLabel";
import ChangePasswordForm from "./ChangePasswordForm";

const PassReset = () => {
  return (
    <div className="">
      <div className="bg-white p-6 flex mb-8">
        <div className="w-1/2 pr-2">
          <SectionLabel
            title="Change Login Password"
            subtext="This is a subtext content and it shows general settings for your A2C Information"
          />
        </div>
        <div className="w-full">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default PassReset;
