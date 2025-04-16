import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CustomInput from "../CustomRequestInput";
import Spacer from "../../utils/Spacer";
import { toast } from "sonner";
import { useUpdateStaffMutation } from "../../services/apiSlice";
import CustomLoadingButton from "../CustomLoadingButton";
import { Select } from "antd"; // Import Ant Design Select

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
  const userInformation = JSON.parse(sessionStorage.getItem("userInformation")) || {};
  const currentUserRole = userInformation?.profile?.role || "";

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

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalUsername = formData.staffEmail.includes("@outsourceapply.com")
      ? formData.staffEmail
      : `${formData.staffEmail}@outsourceapply.com`;

    const payload = {
      email: formData.email,
      phone: formData.phone,
      staffEmail: formData.staffEmail,
      role: formData.role,
    };

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

  const isRoleDisabled = staffInfo?.role === "super_admin" && currentUserRole !== "super_admin";

  const getRoleOptions = () => {
    switch(currentUserRole) {
      case "super_admin":
        return [
          { value: "super_admin", label: "Super Admin" },
          { value: "admin", label: "Admin" },
          { value: "staff", label: "Staff" }
        ];
      case "admin":
        return [
          { value: "admin", label: "Admin" },
          { value: "staff", label: "Staff" }
        ];
      default:
        return [];
    }
  };

  const roleOptions = getRoleOptions();

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col dark:text-black">
        <div className="flex items-center justify-between p-4 md:p-5 border-b">
          <h3 className="text-xl font-medium text-gray-900">
            Edit Staff Information
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

        <div className="modal-body overflow-y-auto max-h-96 p-6">
          <form className="max-w-full" onSubmit={handleSubmit}>
            <CustomInput
              label="Firstname"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter Firstname"
              disabled={formData.firstName}
            />
            <Spacer size="24px" />

            <CustomInput
              label="Lastname"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter Lastname"
              disabled={formData.lastName}
            />
            <Spacer size="24px" />

            <CustomInput
              type="text"
              label="Staff Email Address"
              name="staffEmail"
              value={formData.staffEmail}
              onChange={handleInputChange}
              placeholder="Enter your Staff Email Address"
              disabled={formData.staffEmail}
            />
            <Spacer size="24px" />

            <CustomInput
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter a Phone Number"
              disabled={formData.phone}
            />
            <Spacer size="24px" />

            <div className="mb-8 max-w-md">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Staff Role
              </label>
              <Select
                placeholder="Select a role"
                value={formData.role || undefined}
                onChange={handleRoleChange}
                options={roleOptions}
                disabled={isRoleDisabled}
                className="w-full"
              />
              {isRoleDisabled && (
                <p className="text-xs text-gray-500 mt-1">
                  Only a Super Admin can modify this role.
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="flex justify-center p-4">
          <CustomLoadingButton isLoading={isLoading} onClick={handleSubmit}>
            Update Staff Information
          </CustomLoadingButton>
        </div>
      </div>
    </Modal>
  );
};

export default EditStaffModal;