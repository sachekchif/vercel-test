import { useState, useEffect } from "react";
import { Drawer, Skeleton, Modal, Input, Button as AntButton, message } from "antd";
import { FaDownload } from "react-icons/fa";
import { capitalizeText, DocIcon } from "../../utils/constants";
import { useUpdateRequesttoCompleteMutation } from "../../services/apiSlice";

const AccountDetailsDrawer = ({ isVisible, onClose, user }) => {
  const userInformation =
    JSON.parse(sessionStorage.getItem("userInformation")) || {};
  const role = userInformation?.profile?.role || {};
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false); // Track reject modal visibility
  const [rejectReason, setRejectReason] = useState(""); // Track reject reason input

  const [useUpdateRequestMutation, { isLoading: requestLoading, data: requesttData }] =
  useUpdateRequesttoCompleteMutation(); 

  // Effect to handle the 5-second timer
  useEffect(() => {
    let timer;

    if (isVisible) {
      // When the drawer opens, set loading to true
      setIsLoading(true);

      // Simulate a minimum loading time of 5 seconds
      timer = setTimeout(() => {
        setIsLoading(false); // Stop loading after 5 seconds
      }, 3000); // 5 seconds
    }

    // Clear the timer when the drawer is closed or the component unmounts
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible]); // Run this effect when `isVisible` changes

  // Effect to handle data arrival
  useEffect(() => {
    if (user?.data) {
      // When user data is available, set loading to false
      setIsLoading(false);
    }
  }, [user]); // Run this effect when `user` changes

  const userData = user?.data;
  const isError = user?.statusCode !== "00";
  const shouldShowData = !isLoading && userData && !isError;

  // Check if the user is an admin or super_admin
  const isAdmin = role === "admin" || role === "super_admin";

  // Check if the status is "REVIEWED"
  const isReviewed = userData?.status === "reviewed";

  // Handle reject button click
  const handleRejectClick = () => {
    setIsRejectModalVisible(true); // Show the reject modal
  };

  // Handle reject reason submission
  const handleRejectSubmit = () => {
    console.log("Reject Reason:", rejectReason); // Log the reject reason (you can send it to the backend here)
    setIsRejectModalVisible(false); // Close the modal
    setRejectReason(""); // Clear the input
  };

  const handleSubmit = async (values) => {


    const requestData = {
      requestId: userData?.id || "generated-id",
    };

    console.log("Submitting job request:", requestData); // Debugging log

    try {
      const response = await useUpdateRequestMutation(requestData).unwrap();

      if (response.statusCode === "00") {
        message.success("Request updated successfully!");
        form.resetFields(); // Reset form fields
        setUploadedFiles({
          updatedCv: null,
          coverLetter: null,
          followUpMail: null,
        });
        onClose(); // Close modal on success
      } else {
        message.error(
          response.message || "Failed to update request fill out all fields."
        );
      }
    } catch (error) {
      message.error(error.data?.message || "An unexpected error occurred.");
      console.error("Error updating request:", error);
    }
  };

  return (
    <Drawer
      title="Application Details"
      placement="right"
      onClose={onClose}
      open={isVisible}
      width={480}
    >
      {isLoading ? (
        // Skeleton Loader when data is fetching or during the 5-second timer
        <div>
          <Skeleton active paragraph={{ rows: 2 }} />
          <Skeleton.Button active block style={{ marginTop: 10, height: 30 }} />
          <Skeleton paragraph={{ rows: 5 }} active style={{ marginTop: 20 }} />
        </div>
      ) : isError || !userData ? (
        // Display "No data available" if status is not "00" or userData is missing
        <p>No data available</p>
      ) : (
        // Render user details when data is available
        <div className="flex flex-col mb-12">
          <h2 className="text-2xl mb-2">{userData.jobTitle}</h2>
          <h4 className="text-md text-purple-700 font-medium mb-4">
            {capitalizeText(userData.companyName)}
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
              Additional Notes
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
                <DocIcon />
                <p className="text-md font-medium text-gray-900">
                  {userData?.user?.firstName} {userData?.user?.lastName}'s CV
                </p>
              </div>
              <a
                href={userData?.requestDocuments[0]?.docRef}
                download="Customer's CV.pdf"
                className="text-blue-700 flex items-center mt-1"
              >
                <FaDownload className="mr-1" /> Download
              </a>
            </div>
          )}

          {userData.requestDocuments[0]?.reviewedDocRef && (
            <div className="mb-4 max-w-2xl">
              <label className="block text-sm font-medium text-gray-500">
                Updated Resume (Sent by Outsource Apply)
              </label>
              <div className="flex items-center space-x-3 mt-1">
                <DocIcon />
                <p className="text-md font-medium text-gray-900">
                  {`${userData?.user?.firstName} ${userData?.user?.lastName}'s CV` ||
                    "Unnamed Resume"}
                </p>
              </div>
              <a
                href={userData?.requestDocuments[0]?.reviewedDocRef}
                download="Customer's Updated CV.pdf"
                className="text-blue-700 flex items-center mt-1"
              >
                <FaDownload className="mr-1" /> Download
              </a>
            </div>
          )}

          {userData.requestDocuments[0]?.coverLetterRef && (
            <div className="mb-4 max-w-2xl">
              <label className="block text-sm font-medium text-gray-500">
                Cover Letter (Sent by Outsource Apply)
              </label>
              <div className="flex items-center space-x-3 mt-1">
                <DocIcon />
                <p className="text-md font-medium text-gray-900">
                  {`${userData?.user?.firstName} ${userData?.user?.lastName}'s Cover Letter` ||
                    "Unnamed Resume"}
                </p>
              </div>
              <a
                href={userData?.requestDocuments[0]?.coverLetterRef}
                download="Customer's Cover letter.pdf"
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

          {/* Conditionally render Approve and Reject buttons for admins when status is "REVIEWED" */}
          {isAdmin && isReviewed && (
            <div className="flex items-center justify-center">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white bg-green-700 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                >
                  Approve
                </button>

                <button
                  type="button"
                  onClick={handleRejectClick}
                  className="text-white bg-red-700 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                >
                  Reject
                </button>
              </div>
            </div>
          )}

          {/* Reject Reason Modal */}
          <Modal
            title="Enter Reject Reason"
            visible={isRejectModalVisible}
            onCancel={() => setIsRejectModalVisible(false)}
            footer={[
              <AntButton
                key="cancel"
                onClick={() => setIsRejectModalVisible(false)}
              >
                Cancel
              </AntButton>,
              <AntButton
                key="submit"
                type="primary"
                onClick={handleRejectSubmit}
              >
                Submit
              </AntButton>,
            ]}
          >
            <Input
              placeholder="Enter the reason for rejection"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </Modal>
        </div>
      )}
    </Drawer>
  );
};

export default AccountDetailsDrawer;