import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CustomUpload = ({ onFileSelect, fileType }) => {
  const [fileList, setFileList] = useState([]);

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
  ];
  const maxSizeMB = 1 * 1024 * 1024; // 1MB

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

      // Pass the converted file to the parent component
      onFileSelect(base64Data);

      setFileList([file]); // Store only one file
      message.success(`${fileType} uploaded successfully.`);
    } catch (error) {
      message.error("Error processing file.");
      console.error("Upload Error:", error);
    }
  };

  const handleRemove = () => {
    setFileList([]);
    onFileSelect(null); // Clear file in parent component
  };

  return (
    <Upload
      beforeUpload={beforeUpload}
      customRequest={handleUpload}
      fileList={fileList}
      showUploadList={{
        showRemoveIcon: true,
      }}
      onRemove={handleRemove}
    >
      <Button icon={<UploadOutlined />}>Upload {fileType} (PDF/DOCX)</Button>
    </Upload>
  );
};

export default CustomUpload;
