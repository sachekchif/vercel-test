import React, { useState } from "react";
import { Upload, Button, Checkbox, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FileUpload = ({ formData, setFormData, profile }) => {
  const [fileList, setFileList] = useState([]);

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
  ];
  const maxSizeMB = 1 * 1024 * 1024; // 3MB

  const beforeUpload = (file) => {
    if (!allowedTypes.includes(file.type)) {
      message.error("Only PDF and DOCX files are allowed.");
      return Upload.LIST_IGNORE;
    }
    if (file.size > maxSizeMB) {
      message.error("File size must not exceed 1MB.");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async ({ file }) => {
    try {
      const base64Data = await convertToBase64(file);

      // Send to backend
      await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ document: base64Data }),
      });

      setFormData((prev) => ({ ...prev, document: base64Data }));
      setFileList([file]); // Store only one file
      message.success("File uploaded successfully.");
    } catch (error) {
      message.error("Error processing file.");
      console.error("Upload Error:", error);
    }
  };

  const handleRemove = () => {
    setFileList([]);
    setFormData((prev) => ({ ...prev, document: null }));
  };

  return (
    <div className="mb-4 w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Upload CV
      </label>

      <Upload
        beforeUpload={beforeUpload}
        customRequest={handleUpload}
        fileList={fileList}
        showUploadList={{ showRemoveIcon: true }}
        accept=".pdf,.docx"
        maxCount={1} // Allows only one file
        onRemove={handleRemove}
        className="!w-full"
      >
        {fileList.length === 0 && (
          <Button className="!w-full" icon={<UploadOutlined />}>Upload CV (PDF, DOCX)</Button>
        )}
      </Upload>

      
      {profile?.otherProfileDetails[0]?.currentCv ? (
        <div className="mt-2 flex items-center space-x-2">
        <Checkbox
          id="useExistingCv"
          checked={formData.useExistingCv}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              useExistingCv: e.target.checked,
            }))
          }
        >
          Use Existing CV
        </Checkbox>
      </div>
      ) : (
        <p className="text-purple-400"> {" "}</p>
      )}

      {formData.useExistingCv && (
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-700">Existing CV:</p>

          {profile?.otherProfileDetails[0]?.currentCv ? (
            profile?.otherProfileDetails[0]?.currentCv.startsWith(
              "data:application/pdf"
            ) ? (
              <a
                href={profile?.otherProfileDetails[0]?.currentCv}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Open Existing CV in New Tab
              </a>
            ) : (
              <p className="text-red-500">No existing image</p>
            )
          ) : (
            <p className="text-purple-400">No existing CV found.</p>
          )}
        </div>
      )}

      <p className="mt-1 text-sm text-gray-500">
        Your CV must be in **PDF or DOCX format**, and must not exceed **3MB**.
      </p>
    </div>
  );
};

export default FileUpload;
