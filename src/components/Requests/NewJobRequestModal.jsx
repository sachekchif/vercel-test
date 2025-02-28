import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import CustomInput from "../CustomRequestInput";
import Spacer from "../../utils/Spacer";
import { toast } from "sonner";
import { useCreateRequestMutation } from "../../services/apiSlice";
import { Button, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FileUpload from "../FileUpload";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "90%",
    maxWidth: "600px",
    maxHeight: "90%",
    borderRadius: "10px",
    padding: 0,
    inset: "unset",
  },
};

Modal.setAppElement("#root");

const NewJobRequestModal = ({ isOpen, onClose, profile, job }) => {
  const navigate = useNavigate();
  // console.log("New Job Request", job);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    companyName: "",
    jobUrl: "",
    additionalNotes: "",
    document: null,
  });

  // console.log(profile);

  const [createRequest, { isLoading, isSuccess, isError, error }] =
    useCreateRequestMutation();

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        jobTitle: job?.cleaned_job_title || "",
        jobUrl: job?.incoming_click_url || "",
        companyName: job?.company || "",
        additionalNotes: "",
        document: null,
        useExistingCv: false,
        needsCoverLetter: false,
        needsFollowUpMail: false,
      });
    }
  }, [profile, job]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("click");

    // Check subscription
    if (profile?.subscription === "free") {
      console.log("subs", profile.subscription);
      navigate("/checkout");
      return; // Exit the function
    }

    // const payload = {
    //   jobTitle: formData.jobTitle,
    //   jobUrl: formData.jobUrl,
    //   additionalNotes: formData.additionalNotes,
    //   docRef: formData.document,
    //   useExistingCv: formData.useExistingCv,
    //   needsCoverLetter: formData.needsCoverLetter,
    //   needsFollowUpMail: formData.needsFollowUpMail,
    // };

    const payload = {
      jobTitle: formData.jobTitle,
      jobUrl: formData.jobUrl,
      additionalNotes: formData.additionalNotes,
      docRef: formData.document,
      companyName: formData.companyName,
      useExistingCv: formData.useExistingCv,
      needsCoverLetter: formData.needsCoverLetter,
      needsFollowUpMail: formData.needsFollowUpMail,
    };
    console.log("payload", payload);
    

    // try {
    //   const response = await createRequest(payload).unwrap();
    //   if (response?.data?.statusCode === "00") {
    //     message.error("File size must not exceed 1MB.");
    //     navigate("/all-requests")
    //     onClose(); // Close the modal on success
    //   } else if (response.statusCode === "96") {
    //     const message =
    //       response?.data || response.statusMessage || "Unknown error.";
    //     toast.error(message);
    //   }
    // } catch (err) {
    //   toast.error("An error occurred while creating the request.");
    // }
  
  };

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      width: "90%",
      maxWidth: "600px",
      maxHeight: "90%",
      borderRadius: "10px",
      padding: 0,
      inset: "unset",
    },
  };

  const modalHeaderStyle = {
    position: "sticky",
    top: 0,
    zIndex: 1, // Ensures it stays above the rest of the content
    backgroundColor: "#fff", // You can set the background color to match your design
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional shadow for separation
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <div className="bg-white rounded-lg shadow max-h-full flex flex-col">
        {/* Modal header */}
        <div
          className="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 className="text-xl font-medium text-gray-900">New Job Request</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Scrollable form body */}
        <div
          className="p-6 overflow-y-auto flex-grow"
          style={{ maxHeight: "70vh" }}
        >
          <form className="max-w-full" onSubmit={handleSubmit}>
            <CustomInput
              label="Firstname"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={profile?.firstName}
            />
            <Spacer size="24px" />
            <CustomInput
              label="Lastname"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={profile?.lastName}
            />
            <Spacer size="24px" />
            <CustomInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={profile?.email}
            />
            <Spacer size="24px" />
            <CustomInput
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={profile?.phone}
            />
            <Spacer size="24px" />
            <CustomInput
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              placeholder="Enter a Job Title for this role. E.g. UI/UX Designer"
              onChange={handleInputChange}
              disabled={job?.cleaned_job_title}
            />
            <Spacer size="24px" />

            <CustomInput
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              placeholder="Enter the your employer's company name"
              onChange={handleInputChange}
              disabled={job?.company}
            />
            <Spacer size="24px" />

            <CustomInput
              label="Job URL"
              name="jobUrl"
              value={formData.jobUrl}
              placeholder="Enter URL that links to the job you want"
              onChange={handleInputChange}
              disabled={job?.incoming_click_url}
            />
            <Spacer size="24px" />

            <div className="mb-4">
            <FileUpload formData={formData} setFormData={setFormData} profile={profile} />
            </div>
            <Spacer size="24px" />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="needsCoverLetter"
                name="needsCoverLetter"
                checked={formData.needsCoverLetter}
                onChange={handleCheckboxChange}
                className="w-5 h-5"
              />
              <label htmlFor="needsCoverLetter">Needs Cover Letter</label>
            </div>
            <Spacer size="16px" />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="needsFollowUpMail"
                name="needsFollowUpMail"
                checked={formData.needsFollowUpMail}
                onChange={handleCheckboxChange}
                className="w-5 h-5"
              />
              <label htmlFor="needsFollowUpMail">Needs Follow-Up Mail</label>
            </div>
            <Spacer size="24px" />

            <label
              htmlFor="additionalNotes"
              className="text-[#000] font-[500] text-[14px] mb-1"
            >
              Additional Notes
            </label>
            <TextArea
              name="additionalNotes" // Add this line
              value={formData.additionalNotes}
              onChange={handleInputChange}
              placeholder="Additional Note"
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </form>
        </div>

        {/* Modal footer */}
        <div
          className="flex justify-center p-4 border-t"
          style={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "#fff",
            boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <button
            type="submit"
            onClick={handleSubmit}
            className="py-2 px-16 rounded text-sm text-white bg-purple-700 hover:bg-purple-600"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewJobRequestModal;
