// Shared/PermissionsTable.jsx
import React from "react";
import TableRow from "./TableRow";

const PermissionsTable = ({ 
  features, 
  localPermissions, 
  handlePermissionToggle,
  loading,
  handleSave
}) => {
  return (
    <div className="col-span-2 flex flex-col justify-between">
      <form className="w-full">
        <div className="grid sm:grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-sm text-gray-700 uppercase bg-gray-50">
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
                    isChecked={localPermissions[item.permissionKey] ?? false}
                    onChange={() => handlePermissionToggle(item.permissionKey)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-start">
          <button
            type="button"
            className={`text-white bg-purple-700 hover:bg-purple-600 font-medium rounded-lg text-sm px-16 py-2.5 text-center inline-flex items-center me-2 mb-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PermissionsTable;