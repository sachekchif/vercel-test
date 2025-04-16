import React from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons"; // Error icon

const CompleteProfileModal = ({ isVisible, onCancel, onCompleteProfile }) => {
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", color: "#ff4d4f" }}>
          <ExclamationCircleFilled
            style={{ fontSize: "20px", marginRight: "8px" }}
          />
          <span>Action Required</span>
        </div>
      }
      visible={isVisible}
      onCancel={onCancel}
      // footer={
      //   <div style={{ display: "flex", justifyContent: "center" }}>
      //     <Button
      //       key="complete"
      //       type="primary"
      //       danger // Use danger type for red button
      //       onClick={onCompleteProfile}
      //       style={{ borderRadius: "5px", fontWeight: "500" }}
      //     >
      //       Complete Profile
      //     </Button>
      //   </div>
      // }
      bodyStyle={{ padding: "16px", textAlign: "center" }}
      style={{ borderRadius: "8px", maxWidth: "400px" }} // Smaller modal
    >
      <div>
        <p style={{ fontSize: "16px", color: "#555", marginBottom: "16px" }}>
          You must complete your profile with your current CV and other details.
        </p>
        <p style={{ fontSize: "14px", color: "#777" }}>
          Click the button below to update your profile.
        </p>
      </div>
    </Modal>
  );
};

export default CompleteProfileModal;