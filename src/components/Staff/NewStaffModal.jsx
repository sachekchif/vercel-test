import React, { useState } from "react";
import Modal from "react-modal";
import CustomInput from "../CustomRequestInput";
import Spacer from "../../utils/Spacer";
import { toast } from "sonner";
import { useCreateStaffRequestMutation } from "../../services/apiSlice";

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

const NewStaffModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "", // Include password field
    staffEmail: "",
    username: "",
    role: "",
  });

  const [createStaffRequest, { isLoading }] = useCreateStaffRequestMutation();

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
      firstName: formData.firstName,
      lastName: formData.lastName,
      //   password: " ",
      phone: formData.phone,
      staffEmail: finalUsername,
      username: formData.staffEmail,
      role: formData.role,
    };

    console.log("Submitting payload:", JSON.stringify(payload));
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      // password: "",
      staffEmail: "",
      username: "",
      role: "",
    });

    try {
      const response = await createStaffRequest(payload).unwrap();
      if (response.statusCode === "00") {
        toast.success("Request successfully created.");
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
          <form className="max-w-lg" onSubmit={handleSubmit}>
            <CustomInput
              label="Firstname"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter Firstname"
            />
            <Spacer size="24px" />

            <CustomInput
              label="Lastname"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter Lastname"
            />
            <Spacer size="24px" />

            <CustomInput
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter an email address"
            />
            <Spacer size="24px" />

            <CustomInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
            />
            <Spacer size="24px" />

            <CustomInput
              type="text"
              label="Staff Email Address"
              name="staffEmail"
              value={formData.staffEmail}
              onChange={handleInputChange}
              placeholder="Enter your Staff Email Address"
              suffix="@outsourceapply.com"
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
              type="tel"
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter a Phone Number"
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
          <button
            type="submit"
            className="py-2 px-16 rounded text-sm text-white bg-purple-700 hover:bg-purple-600"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Submitting..." : "Create Staff"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewStaffModal;
