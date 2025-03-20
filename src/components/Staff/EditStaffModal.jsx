import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CustomInput from "../CustomRequestInput";
import Spacer from "../../utils/Spacer";
import { toast } from "sonner";
import { useUpdateStaffMutation } from "../../services/apiSlice"
import CustomLoadingButton from "../CustomLoadingButton";

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
    display: "flex",
    flexDirection: "column",
  },
};

Modal.setAppElement("#root");

const EditStaffModal = ({ isOpen, onClose, staffInfo }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    staffEmail: "",
    username: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    if (staffInfo) {
      setFormData({
        firstName: staffInfo.firstName || "",
        lastName: staffInfo.lastName || "",
        email: staffInfo.email || "",
        staffEmail: staffInfo.staffEmail || "",
        username: staffInfo.username || "",
        phone: staffInfo.phone || "",
        role: staffInfo.role || "",
      });
    }
  }, [staffInfo]);

  const [updateStaffRequest, { isLoading }] = useUpdateStaffMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure username has the required suffix
    const finalUsername = formData.staffEmail.includes("@outsourceapply.com")
      ? formData.staffEmail
      : `${formData.staffEmail}@outsourceapply.com`;

    // Prepare the payload with only the required fields
    const payload = {
      email: formData.email,
      phone: formData.phone,
      staffEmail: formData.staffEmail,
      role: formData.role,
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await updateStaffRequest(payload).unwrap();
      if (response.statusCode === "00") {
        toast.success("Staff successfully updated.");
        onClose();
      } else {
        toast.error(response?.data || "An error occurred.");
      }
    } catch (err) {
      toast.error("An error occurred while creating the request.");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b">
          <h3 className="text-xl font-medium text-gray-900">
            New Staff Request
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
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

        {/* Modal body */}
        <div className="modal-body overflow-y-auto max-h-96 p-6">
          <form className="max-w-full" onSubmit={handleSubmit}>
            <CustomInput
              label="Firstname"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter Firstname"
              // disabled={formData.firstName}
            />
            <Spacer size="24px" />

            <CustomInput
              label="Lastname"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter Lastname"
              // disabled={formData.lastName}
            />
            <Spacer size="24px" />

            {/* <CustomInput
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter an email address"
              disabled={formData.email}
            />
            <Spacer size="24px" /> */}

            {/* <CustomInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              disabled={formData.username}
            />
            <Spacer size="24px" /> */}

            <CustomInput
              type="text"
              label="Staff Email Address"
              name="staffEmail"
              value={formData.staffEmail}
              onChange={handleInputChange}
              placeholder="Enter your Staff Email Address"
              // disabled={formData.staffEmail}
            />
            <Spacer size="24px" />

            {/* <CustomInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter a password"
            /> */}
            {/* <Spacer size="24px" /> */}

            <CustomInput
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter a Phone Number"
              // disabled={formData.phone}
            />
            <Spacer size="24px" />

            <div className="mb-8 max-w-md">
              <label
                htmlFor="staff_role"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Staff Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Choose a Role</option>
                {/* <option value="">Choose a Role</option> */}
                <option value="super_admin">Super-Admin</option>{" "}
                {/* Full name */}
                <option value="admin">Admin</option> {/* Full name */}
                <option value="staff">Staff</option>
              </select>
            </div>
          </form>
        </div>

        {/* Modal footer */}
        <div className="flex justify-center p-4">
          {/* <button
            type="submit"
            className="py-2 px-16 rounded text-sm text-white bg-purple-700 hover:bg-purple-600"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Submitting..." : "Update Staff"}
          </button> */}
          <CustomLoadingButton isLoading={isLoading} onClick={handleSubmit}>
            Update Staff Information
          </CustomLoadingButton>
        </div>
      </div>
    </Modal>
  );
};

export default EditStaffModal;
