import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Checkbox, Form, message, Spin } from "antd";
import { useUpdateRequestMutation } from "../../services/apiSlice";
import CustomUpload from "../CustomUpload";
import CustomRequestInput from "../CustomRequestInput";
import CustomLoadingButton from "../CustomLoadingButton";
import { capitalizeText } from "../../utils/constants";

const EditRequestModal = ({ isOpen, onClose, profile, isLoading }) => {
  const [form] = Form.useForm();
  const [uploadedFiles, setUploadedFiles] = useState({
    updatedCv: null,
    coverLetter: null,
    followUpMail: null,
  });

  console.log("tt", profile);
  
  const [updateRequest, { isLoading: requestLoading, data: requesttData }] =
    useUpdateRequestMutation(); // Mutation hook
  const userData = profile?.data;
  const user = userData?.user;

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        jobTitle: userData?.jobTitle || "",
        jobUrl: userData?.jobUrl || "",
        additionalNotes: userData?.additionalNotes || "",
        useExistingCv: userData?.requestDocuments[0]?.docRef || false,
        needsCoverLetter: userData?.needsCoverLetter || false,
        needsFollowUpMail: userData?.needsFollowUpMail || false,
      });
      if (userData?.requestDocuments[0]?.docRef) {
        setUploadedFiles((prev) => ({
          ...prev,
          updatedCv: {
            data: userData?.requestDocuments[0]?.docRef,
            name: "Updated CV",
          },
        }));
      }
    }
  }, [userData, user, form, profile, isOpen]);

  // Update state when a file is selected
  const handleFileSelect = (fileKey, base64Data, fileName) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [fileKey]: { data: base64Data, name: fileName },
    }));
  };

  const handleSubmit = async (values) => {
    const { updatedCv, coverLetter, followUpMail } = uploadedFiles;

    if (!updatedCv) {
      message.error("Please upload a CV before submitting.");
      return;
    }

    const requestData = {
      requestId: userData?.id || "generated-id",
      docRef: updatedCv?.data, // Attach base64 data
      coverLetterRef: coverLetter ? coverLetter.data : null, // Attach base64 data if available
      // followUpMailData: followUpMail ? followUpMail.data : null, // Attach base64 data if available
    };

    console.log("Submitting job request:", requestData); // Debugging log

    try {
      const response = await updateRequest(requestData).unwrap();

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

  const handleModalClose = () => {
    form.resetFields(); // Reset form fields
    setUploadedFiles({
      updatedCv: null,
      coverLetter: null,
      followUpMail: null,
    }); // Clear uploaded files
    onClose(); // Call the original onClose function
  };

  return (
    <Modal
      title={`Edit ${capitalizeText(user?.firstName) || "User"}'s Request`}
      open={isOpen}
      onCancel={handleModalClose}
      footer={null}
      width={600}
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <Spin size="large" />
        </div>
      ) : (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="First Name" name="firstName">
            <CustomRequestInput disabled={!!user?.firstName} />
          </Form.Item>

          <Form.Item label="Last Name" name="lastName">
            <CustomRequestInput disabled={!!user?.lastName} />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <CustomRequestInput disabled={!!user?.email} />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone">
            <CustomRequestInput type="tel" disabled={!!user?.phone} />
          </Form.Item>

          <Form.Item label="Job Title" name="jobTitle">
            <CustomRequestInput
              placeholder="Enter job title"
              disabled={!!userData?.jobTitle}
            />
          </Form.Item>

          <Form.Item label="Job URL" name="jobUrl">
            <CustomRequestInput
              placeholder="Enter job URL"
              disabled={!!userData?.jobUrl}
            />
          </Form.Item>

          <Form.Item label="Additional Notes" name="additionalNotes">
            <Input.TextArea
              rows={4}
              placeholder="Additional notes"
              disabled={!!userData?.additionalNotes}
            />
          </Form.Item>

          <Form.Item name="useExistingCv" valuePropName="checked">
            <Checkbox checked={!!userData?.useExistingCv} disabled>
              Use Existing CV
            </Checkbox>
          </Form.Item>

          {!!userData?.requestDocuments[0]?.useExistingCv && (
            <Form.Item label="Upload Updated CV">
              <CustomUpload
                fileType="Updated CV"
                onFileSelect={(data, fileName) =>
                  handleFileSelect("updatedCv", data, fileName)
                }
              />
            </Form.Item>
          )}

          <Form.Item name="needsCoverLetter" valuePropName="checked">
            <Checkbox checked={!!userData?.needsCoverLetter} disabled>
              Needs Cover Letter
            </Checkbox>
          </Form.Item>

          {userData?.needsCoverLetter && (
            <Form.Item label="Upload Cover Letter">
              <CustomUpload
                fileType="Cover Letter"
                onFileSelect={(data, fileName) =>
                  handleFileSelect("coverLetter", data, fileName)
                }
              />
            </Form.Item>
          )}

          <Form.Item name="needsFollowUpMail" valuePropName="checked">
            <Checkbox checked={!!userData?.needsFollowUpMail} disabled>
              Needs Follow-Up Mail
            </Checkbox>
          </Form.Item>

          {userData?.needsFollowUpMail && (
            <Form.Item label="Upload Follow-Up Mail">
              <CustomUpload
                fileType="Follow-Up Mail"
                onFileSelect={(data, fileName) =>
                  handleFileSelect("followUpMail", data, fileName)
                }
              />
            </Form.Item>
          )}

          <div
            className="flex justify-center p-4 border-t"
            style={{
              position: "sticky",
              bottom: 0,
              backgroundColor: "#fff",
              boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CustomLoadingButton
              onClick={handleSubmit}
              isLoading={requestLoading}
            >
              Submit Updated Request
            </CustomLoadingButton>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default EditRequestModal;
