import React, { useState } from "react";
import { Upload, Button, Checkbox, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CompleteProfileModal from "./OtherModals/CompleteProfileModal";

const FileUpload = ({ formData, setFormData, profile }) => {
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const maxSizeMB = 3 * 1024 * 1024; // 3MB

  const beforeUpload = (file) => {
    console.log("[DEBUG] Validating file:", file);

    if (!allowedTypes.includes(file.type)) {
      message.error("Only PDF and DOCX files are allowed.");
      return Upload.LIST_IGNORE;
    }
    if (file.size > maxSizeMB) {
      message.error("File size must not exceed 3MB.");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(
          "[DEBUG] FileReader result:",
          reader.result.slice(0, 50) + "..."
        );
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        console.error("[ERROR] FileReader error:", error);
        reject(error);
      };
    });
  };

  const handleUpload = async ({ file }) => {
    try {
      console.log("[DEBUG] File being uploaded:", file);

      // Convert file to Base64
      const base64Data = await convertToBase64(file);
      console.log("[DEBUG] Base64 data:", base64Data.slice(0, 50) + "...");

      // Update formData with the Base64 file data
      setFormData((prev) => ({ ...prev, document: base64Data }));
      setFileList([file]);
      message.success("File uploaded successfully.");
    } catch (error) {
      console.error("[ERROR] Upload Error:", error);
      message.error("Error processing file.");
    }
  };

  const handleRemove = () => {
    setFileList([]);
    setFormData((prev) => ({ ...prev, document: null }));
  };

  const existingCv = profile?.otherProfileDetails[0]?.currentCv;

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setFormData((prev) => ({ ...prev, useExistingCv: isChecked }));

    if (isChecked && !existingCv) {
      setIsModalVisible(true);
    } else if (isChecked) {
      setFormData((prev) => ({ ...prev, document: existingCv }));
    }
  };

  const handleCompleteProfile = () => {
    setIsModalVisible(false);
    navigate("/profile");
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setFormData((prev) => ({ ...prev, useExistingCv: false }));
  };

  return (
    <div className="mb-4 w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Upload CV
      </label>

      {/* Conditionally render the Upload component */}
      {!formData.useExistingCv && (
        <Upload
          beforeUpload={beforeUpload}
          customRequest={handleUpload}
          fileList={fileList}
          showUploadList={{ showRemoveIcon: true }}
          accept=".pdf,.docx"
          maxCount={1}
          onRemove={handleRemove}
          className="!w-full"
        >
          {fileList.length === 0 && (
            <Button className="!w-full" icon={<UploadOutlined />}>
              Upload CV (PDF, DOCX)
            </Button>
          )}
        </Upload>
      )}

      {/* Conditionally render the checkbox based on whether a file is uploaded */}
      {fileList.length === 0 && (
        <div className="mt-2 flex items-center space-x-2">
          <Checkbox
            id="useExistingCv"
            checked={formData.useExistingCv}
            onChange={handleCheckboxChange}
          >
            Use Existing CV
          </Checkbox>
        </div>
      )}

      {formData.useExistingCv && existingCv && (
        <div className="mt-2 flex gap-4 align-bottom text-center">
          <p className="text-sm font-medium text- text-gray-700">Existing CV:</p>
          {existingCv.startsWith("data:application/pdf") ? (
            <button
              type="button"
              onClick={() => {
                const newWindow = window.open("", "_blank");
                newWindow.document.write(
                  `<iframe src="${existingCv}" width="100%" height="100%" style="border: none;"></iframe>`
                );
              }}
              className="text-blue-600 hover:underline hover:border-none"
            >
              View your most recent CV
            </button>
          ) : (
            <p className="text-red-500">No existing CV</p>
          )}
        </div>
      )}

      <CompleteProfileModal
        isVisible={isModalVisible}
        onCancel={handleModalClose}
        onCompleteProfile={handleCompleteProfile}
      />

      <p className="mt-1 text-sm text-gray-500">
        Your CV must be in <strong>PDF or DOCX format</strong>, and must not
        exceed <strong>3MB</strong>.
      </p>
    </div>
  );
};

export default FileUpload;