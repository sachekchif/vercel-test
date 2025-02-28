import React, { useEffect, useState } from "react";
import SectionLabel from "../Profile/Personal/SectionLabel";
import SuperAdminRoles from "./SuperAdminRoles";
import StaffRoles from "./StaffRoles";
import { useGetStaffByRoleMutation } from "../../services/apiSlice";
import { message } from "antd";

const SuperAP = () => {
  // Retrieve user information safely
  const userInformation = JSON.parse(sessionStorage.getItem("userInformation")) || {};
  const initialPermissions = userInformation?.profile?.permissions || {};
  const role = initialPermissions?.role || "guest"; // Default role

  // State for permissions
  const [permissions, setPermissions] = useState();

  // Determine title and subtext
  const roleInfo = {
    admin: { title: "Staff Role", subtext: "Responsibilities that a staff carries" },
    super_admin: { title: "Admin Role", subtext: "Responsibilities that an admin carries" },
  };
  const { title, subtext } = roleInfo[role] || { title: "Roles", subtext: "Responsibilities for the role" };

  // API hook for fetching staff by role
  const [getStaffByRole, { data: staffData, isLoading, error }] = useGetStaffByRoleMutation();

  // Fetch staff data when the component mounts or role changes
  useEffect(() => {
    if (role === "admin") {
      getStaffByRole({ role: "staff" });
    }
  }, [role, getStaffByRole]);

  // Handle API response
  useEffect(() => {
    if (staffData) {
      if (staffData?.statusCode !== "00") {
        message.error(staffData.data?.statusMessage || "Failed to fetch staff data.");
      } else {
        setPermissions(staffData?.data);
      }
    }
  }, [staffData]);

  // Handle permission changes
  const handlePermissionChange = (permissionKey, newState) => {
    setPermissions((prev) => ({
      ...prev,
      [permissionKey]: newState,
    }));
  };

  // Handle save changes
  const handleSaveChanges = () => {
    const payload = {
      role: role === "admin" ? "staff" : role,
      ...permissions,
    };
    console.log("Payload:", payload);
  };

  return (
    <div className="bg-white p-6 flex mb-8">
      <div className="w-1/2">
        <SectionLabel title={title} subtext={subtext} />
      </div>
      <div className="w-full">
        {role === "admin" && permissions && (
          <StaffRoles
            permissions={permissions}
            role={role}
            onPermissionChange={handlePermissionChange}
            onSaveChanges={handleSaveChanges}
          />
        )}
        {role === "super_admin" && <SuperAdminRoles />}
        {isLoading && <p>Loading staff data...</p>}
        {error && <p className="text-red-500">Error fetching data</p>}
      </div>
    </div>
  );
};

export default SuperAP;
