import React, { useState } from "react";
import SectionLabel from "../Profile/Personal/SectionLabel";
import PaymentPlanInfo from "./PaymentPlanInfo";
const PnB = () => {
  return (
    <div className="">
      <div className="bg-white p-6 flex mb-8">
        <div className="w-1/2">
          <SectionLabel
            title="Payment Plan Information"
            subtext="This is a subtext content and it shows information about the payment plan you have chosen"
          />
        </div>
        <div className="w-full">
            <PaymentPlanInfo />
        </div>
      </div>
    </div>
  );
};

export default PnB;
