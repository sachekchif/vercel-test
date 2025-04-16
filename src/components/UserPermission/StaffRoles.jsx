import React, { useState, useEffect } from "react";
import PermissionsTable from "./PermissionsTable";

const StaffRoles = ({ 
  permissions = {}, 
  role, 
  onPermissionChange, 
  onSaveChanges,
  loading
}) => {
  const [localPermissions, setLocalPermissions] = useState({...permissions});

  const features = [
    {
      feature: "Transaction Page",
      description: "This permission is for a user to view a Transaction Page",
      permissionKey: "canAccessTransactions",
    },
    {
      feature: "Delete User",
      description: "This permission is for a user to delete a User",
      permissionKey: "canDeleteUser",
    },
    {
      feature: "Block User",
      description: "This permission is for a user to block a User",
      permissionKey: "canBlockUser",
    },
    {
      feature: "Restore User",
      description: "This permission is for a user to restore a Blocked User",
      permissionKey: "canRestoreUser",
    },
    {
      feature: "Add Staff",
      description: "This permission is for a user to Add a Staff",
      permissionKey: "canAddStaff",
    },
    {
      feature: "Update Staff Role",
      description: "This permission is for a user to update a Staff's Role",
      permissionKey: "canUpdateStaffRole",
    },
    {
      feature: "Block Staff",
      description: "This permission is for a user to Block a Staff",
      permissionKey: "canBlockStaff",
    },
    {
      feature: "Restore Staff",
      description: "This permission is for a user to Restore a Blocked Staff",
      permissionKey: "canRestoreStaff",
    },
  ];

  // Sync local permissions when props change
  useEffect(() => {
    setLocalPermissions({...permissions});
  }, [permissions]);

  const handlePermissionToggle = (permissionKey) => {
    const newPermissions = {
      ...localPermissions,
      [permissionKey]: !localPermissions[permissionKey]
    };
    setLocalPermissions(newPermissions);
    onPermissionChange?.(permissionKey, newPermissions[permissionKey]);
  };

  const handleSave = () => {
    onSaveChanges?.(localPermissions);
  };

  return (
    <PermissionsTable
      features={features}
      localPermissions={localPermissions}
      handlePermissionToggle={handlePermissionToggle}
      loading={loading}
      handleSave={handleSave}
    />
  );
};

export default React.memo(StaffRoles);