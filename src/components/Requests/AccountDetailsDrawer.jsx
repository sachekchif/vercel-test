import { Drawer, Skeleton } from "antd";
import { FaDownload } from "react-icons/fa";

const AccountDetailsDrawer = ({ isVisible, onClose, user, isLoading }) => {
  console.log("Account Details", user);
  const userData = user?.data;

  return (
    <Drawer
      title="Application Details"
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
          <h2 className="text-2xl mb-2">{userData.jobTitle}</h2>
          <h4 className="text-md text-purple-700 font-medium mb-4">
            {userData.companyName}
          </h4>
          <div className="flex leading-tight text-green-700 mb-8">
            <span className="bg-orange-100 text-red-600 text-xs font-medium px-4 py-1 rounded-full border border-red-500">
              {userData.status}
            </span>
          </div>

          {["firstName", "lastName", "email", "phone"].map((field) => (
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
              Aditional Notes
            </label>
            <p className="text-md font-medium h-full break-words text-gray-900">
              {userData?.additionalNotes}
            </p>
          </div>

          {userData?.requestDocuments[0]?.docRef && (
            <div className="mb-4 max-w-2xl">
              <label className="block text-sm font-medium text-gray-500">
                Original Resume (Sent by Customer)
              </label>
              <div className="flex items-center space-x-3 mt-1">
                <img
                  src={userData?.requestDocuments[0]?.docRef}
                  alt="Resume"
                  className="w-10 h-10"
                />
                <p className="text-md font-medium text-gray-900">
                  {userData?.user?.firstName} {userData?.user?.lastName} CV
                </p>
              </div>
              <a
                href={userData?.requestDocuments[0]?.docRef}
                download
                className="text-blue-700 flex items-center mt-1"
              >
                <FaDownload className="mr-1" /> Download
              </a>
            </div>
          )}

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

          {userData.updatedResume?.url && (
            <div className="mb-4 max-w-2xl">
              <label className="block text-sm font-medium text-gray-500">
                Updated Resume (Sent by Outsource Apply)
              </label>
              <div className="flex items-center space-x-3 mt-1">
                <img
                  src="/resume-icon.png"
                  alt="Resume"
                  className="w-10 h-10"
                />
                <p className="text-md font-medium text-gray-900">
                  {userData.updatedResume.name || "Unnamed Resume"}
                </p>
              </div>
              <a
                href={userData.updatedResume.url}
                download
                className="text-blue-700 flex items-center mt-1"
              >
                <FaDownload className="mr-1" /> Download
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

export default AccountDetailsDrawer;
