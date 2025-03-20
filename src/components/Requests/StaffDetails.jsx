import { Drawer, Skeleton } from "antd";
import { capitalizeText, getDate } from "../../utils/constants";

const StaffDetailDrawer = ({ isVisible, onClose, user, isLoading }) => {
  console.log("Account Details", user);
  const userData = user;

  return (
    <Drawer
      title="Staff Details"
      placement="right"
      onClose={onClose}
      open={isVisible}
      width={480}
    >
      {isLoading ? (
        // Skeleton Loader when data is fetching
        <div>
          <Skeleton active paragraph={{ rows: 2 }} />
          <Skeleton.Button active block style={{ marginTop: 10, height: 30 }} />
          <Skeleton paragraph={{ rows: 5 }} active style={{ marginTop: 20 }} />
        </div>
      ) : userData ? (
        // Render user details when data is available
        <div className="flex flex-col mb-12">
          <h2 className="text-2xl mb-2">{capitalizeText(userData?.firstName + " " + userData?.lastName)}</h2>
          <h4 className="text-md text-purple-700 font-medium mb-4">
            {capitalizeText(userData?.role)}
          </h4>
          <div className="flex leading-tight text-green-700 mb-4">
            <span className="bg-green-100 text-green-600 text-xs font-medium px-4 py-1 rounded-full border border-green-500">
              {capitalizeText(userData?.status)}
            </span>
          </div>

          {["email", "phone"].map((field) => (
            <div key={field} className="mb-4 max-w-2xl">
              <label className="block text-sm font-medium text-gray-500">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <p className="text-md font-medium text-gray-900">
                {userData[field]}
              </p>
            </div>
          ))}

          <div className="mb-4 max-w-2xl">
            <label className="block text-sm font-medium text-gray-500">
              Date Joined
            </label>
            <p className="text-md font-medium text-gray-900">
              {getDate(userData?.logdate)}
            </p>
          </div>

          {userData.jobUrl && (
            <div className="mb-8 max-w-2xl">
              <label className="block text-sm font-medium text-gray-500">
                Job URL
              </label>
              <a
                href={userData.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-md font-medium text-blue-700"
              >
                {userData.jobUrl}
              </a>
            </div>
          )}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </Drawer>
  );
};

export default StaffDetailDrawer;
