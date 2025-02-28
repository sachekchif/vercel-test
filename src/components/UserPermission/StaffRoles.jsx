import React from "react";
import TableRow from "./TableRow";

const StaffRoles = ({ permissions = {}, role, onPermissionChange, onSaveChanges }) => {
  console.log("permissions: ", permissions);
  
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

  return (
    <div className="col-span-2 flex flex-col justify-between">
      <form className="w-full">
        <div className="grid sm:grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Page / Feature</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Turn On / Off</th>
                </tr>
              </thead>
              <tbody>
                {features.map((item) => (
                  <TableRow
                    key={item.permissionKey}
                    feature={item.feature}
                    description={item.description}
                    isChecked={permissions?.[item.permissionKey] ?? false} // Ensure boolean value
                    onChange={() => onPermissionChange(item.permissionKey, !permissions[item.permissionKey])} // Handle toggle
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-start">
          <button
            type="button"
            className="text-white bg-purple-700 hover:bg-purple-600 font-medium rounded-lg text-sm px-16 py-2.5 text-center inline-flex items-center me-2 mb-2"
            onClick={() => onSaveChanges(permissions)}
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffRoles;
