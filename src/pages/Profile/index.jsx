import React, { useState } from "react";
import SharedComponent from "../../components/SharedComponent";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import TabList from "../../components/Profile/TabList";
import TabContent from "../../components/Profile/TabContent";
import Personal from "../../components/Profile/Personal";
import {
  BillingIcon,
  getJsonItemFromSessionStorage,
  PasswordIcon,
  PermissionIcon,
  PersonalIcon,
} from "../../utils/constants";
import UserPermisson from "../../components/UserPermission/UserPermission";
import PlanAndBilling from "../../components/PlanNdBilling/PlanAndBilling";
import PassAndSec from "../../components/PassAndSec/PassAndSec";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const userInformation = getJsonItemFromSessionStorage("userInformation");
  const userRole = userInformation?.profile?.role || ""; // Assuming userInformation contains a `role` property

  // Tab Data
  const tabs = [
    {
      id: "personal",
      label: "Personal",
      icon: <PersonalIcon />,
      content: <Personal />,
    },
    ...(userRole === "user"
      ? [
          {
            id: "billing",
            label: "Plan & Billing",
            icon: <BillingIcon />,
            content: <PlanAndBilling />,
          },
        ]
      : []),
    ...(userRole === "admin" || userRole === "super admin"
      ? [
          {
            id: "permissions",
            label: "User Permissions",
            icon: <PermissionIcon />,
            content: <UserPermisson />,
          },
        ]
      : []),
    {
      id: "security",
      label: "Password & Security",
      icon: <PasswordIcon />,
      content: <PassAndSec />,
    },
  ];

  return (
    <SharedComponent>
      <div className="rounded-lg mt-14 mb-12">
        <ProfileHeader />
        <TabList tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
        <div className="bg-gray-50 w-full">
          <TabContent tabs={tabs} activeTab={activeTab} />
        </div>
      </div>
    </SharedComponent>
  );
};

export default Profile;
