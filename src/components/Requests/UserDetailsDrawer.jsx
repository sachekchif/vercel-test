import { Drawer, Skeleton } from "antd";
import {
  capitalizeText,
  getDate,
  getNestedPropertyOrNA,
} from "../../utils/constants";
import { FaDownload } from "react-icons/fa";

const UserDetailDrawer = ({ isVisible, onClose, user, isLoading }) => {
  console.log("Account Details", user);
  const userData = user?.data;
  const userObj = userData?.user;
  const profileObj = userData?.profile;

  return (
    <Drawer
      title="User Details"
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
          <h2 className="text-2xl mb-2">
            {capitalizeText(
              userObj?.firstName + " " + userData?.user?.lastName
            )}
          </h2>
          <h4 className="text-md text-purple-700 font-medium mb-4">
            {capitalizeText(getNestedPropertyOrNA(profileObj?.jobTitle))}
          </h4>
          <div className="flex leading-tight text-green-700 mb-4">
            <label
              className={
                userObj?.status === "REJECTED"
                  ? "bg-red-100 text-red-600 text-xs font-medium px-4 py-0.5 rounded-full border border-red-500"
                  : userObj?.status === "PENDING"
                  ? "bg-orange-100 text-red-500 text-xs font-medium px-4 py-0.5 rounded-full border border-red-400"
                  : userObj?.status === "active"
                  ? "bg-green-100 text-green-800 text-xs font-medium px-4 py-0.5 rounded-full border border-green-500"
                  : userObj?.status === "IN REVIEW"
                  ? "bg-blue-100 text-blue-600 text-xs font-medium px-4 py-0.5 rounded-full border border-blue-500"
                  : "bg-blue-100 text-blue-600 text-xs font-medium px-4 py-0.5 rounded-full border border-blue-500"
              }
            >
              {userObj?.status}
            </label>
          </div>

          {["email", "phone"].map((field) => (
            <div key={field} className="mb-4 max-w-2xl">
              <label className="block text-sm font-medium text-gray-500">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <p className="text-md font-medium text-gray-900">
                {userData?.user[field]}
              </p>
            </div>
          ))}

          <div className="mb-4 max-w-2xl">
            <label className="block text-sm font-medium text-gray-500">
              Date Joined
            </label>
            <p className="text-md font-medium text-gray-900">
              {getDate(userData?.user?.logdate)}
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

          {profileObj?.currentCv ? (
            <div className="mb-4 max-w-2xl">
              <label className="block text-sm font-medium text-gray-500">
                Original Resume (Sent by Customer)
              </label>
              <div className="flex items-center space-x-3 mt-1">
                <img
                  src={profileObj.currentCv}
                  alt="Resume"
                  className="w-10 h-10"
                />
                <p className="text-md font-medium text-gray-900">
                  {capitalizeText(
                    userObj?.firstName + " " + userData?.user?.lastName
                  )}
                  's CV
                </p>
              </div>
              <a
                href={profileObj.currentCv}
                download
                className="text-blue-700 flex items-center mt-1"
              >
                <FaDownload className="mr-1" /> Download
              </a>
            </div>
          ) : (
            <div className="mb-4 max-w-2xl">
              <label className="block text-sm font-medium text-gray-500">
                Original Resume (Sent by Customer)
              </label>
              <p className="text-md font-base text-gray-900">No user data available</p>
            </div>
          )}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </Drawer>
  );
};

export default UserDetailDrawer;
