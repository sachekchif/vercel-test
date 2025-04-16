import { useEffect, useState } from "react";
import { Upload, Button, message } from "antd";
import { EyeFilled, UploadOutlined } from "@ant-design/icons";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";

const FormSection = ({ data, isEditing, onFormSave }) => {
  const navigate = useNavigate();
  const profile = data?.profile;
  const isNotUser = profile?.role !== "user";

  // State declarations
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    cvFile: null,
  });

  const [fileList, setFileList] = useState([]);

  // 1. Define all handler functions first
  const handleCvUpload = (file) => {
    const isPdfOrDoc = file.type === "application/pdf" || 
                      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (!isPdfOrDoc) {
      message.error("You can only upload PDF or DOC files!");
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("File must be smaller than 2MB!");
      return false;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64File = reader.result;
      setFileList([file]);
      const updatedData = { ...formData, cvFile: base64File };
      setFormData(updatedData);
      onFormSave(updatedData);
    };
    reader.onerror = () => {
      message.error("Failed to read file!");
    };

    return false;
  };

  const handleRemove = () => {
    setFileList([]);
    const updatedData = { ...formData, cvFile: null };
    setFormData(updatedData);
    onFormSave(updatedData);
  };

  const handleViewCv = () => {
    const cvUrl = data?.profile?.otherProfileDetails?.[0]?.currentCv;
    if (cvUrl) {
      const iframe = document.createElement("iframe");
      iframe.src = cvUrl;
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
  
      const newWindow = window.open("", "_blank");
      newWindow.document.body.appendChild(iframe);
      newWindow.document.body.style.margin = "0";
    } else {
      message.error("No CV found!");
    }
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onFormSave(updatedData);
  };

  // 2. Then define effects
  useEffect(() => {
    if (profile) {
      const updatedData = {
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        jobTitle: profile?.otherProfileDetails[0]?.jobTitle || "",
        email: profile.email || "",
        phoneNumber: profile.phone || "",
        dateOfBirth: profile?.otherProfileDetails[0]?.dateOfBirth || "",
        gender: profile?.otherProfileDetails[0]?.gender || "",
        cvFile: isNotUser ? null : (profile?.otherProfileDetails?.[0]?.currentCv || " "),
      };
      setFormData(updatedData);
      onFormSave(updatedData);
      setFileList([]);
    }
  }, [profile, onFormSave, isNotUser]);

  useEffect(() => {
    if (!isEditing) {
      setFileList([]);
      setFormData(prevData => ({ ...prevData, cvFile: null }));
    }
  }, [isEditing]);

  // 3. Finally, the JSX
  return (
    <form>
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
        <InputField
          label="Firstname"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          disabled={!isEditing}
        />
        <InputField
          label="Lastname"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          disabled={!isEditing}
        />
        <InputField
          label="Job Title"
          value={formData.jobTitle}
          onChange={(e) => handleChange("jobTitle", e.target.value)}
          disabled={!isEditing}
        />
        <InputField
          label="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          disabled={!isEditing}
        />
        <InputField
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          disabled={!isEditing}
        />
        <div className="flex flex-col mb-2">
          <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-900 block mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            className="rounded-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 p-2.5"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
            Gender
          </label>
          <select
            id="gender"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            disabled={!isEditing}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {!isNotUser && (
          <div className="flex flex-col mb-2">
            <label htmlFor="cvUpload" className="block mb-2 text-sm font-medium text-gray-900">
              {profile?.otherProfileDetails?.[0]?.currentCv ? "CV Actions" : "Upload CV (PDF/DOC)"}
            </label>
            <Upload
              beforeUpload={handleCvUpload}
              customRequest={customRequest}
              fileList={fileList}
              showUploadList={{ showRemoveIcon: isEditing }}
              accept=".pdf,.docx"
              maxCount={1}
              onRemove={handleRemove}
              className="!w-full"
              disabled={!isEditing}
            >
              {fileList.length === 0 && (
                <Button
                  className={`!w-full ${!isEditing ? "bg-gray-500 cursor-not-allowed" : ""}`}
                  icon={<UploadOutlined />}
                  disabled={!isEditing}
                >
                  {profile?.otherProfileDetails?.[0]?.currentCv ? "Upload/Update CV" : "Upload CV"}
                </Button>
              )}
            </Upload>
            {profile?.otherProfileDetails?.[0]?.currentCv && (
              <Button
                type="primary"
                icon={<EyeFilled />}
                onClick={handleViewCv}
                className="mt-2"
              >
                View Current CV
              </Button>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {profile?.otherProfileDetails?.[0]?.currentCv
                ? "You can upload a new CV or view your current CV."
                : "Your CV must be a PDF or DOC file and must not exceed 2MB."}
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default FormSection;