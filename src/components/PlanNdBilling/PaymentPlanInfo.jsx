import React, { useState, useEffect } from "react";
import { Modal, Button, Tag } from "antd";
import { toast } from "sonner"; // Import Sonner for toast notifications
import { useLazyCancelSubscriptionQuery } from "../../services/apiSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const PaymentPlanInfo = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [price, setPrice] = useState(25); // Default price
  const [triggerCancelSubscription, { data, error, isLoading }] = useLazyCancelSubscriptionQuery();
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch user information from session storage
    const userInfo = JSON.parse(sessionStorage.getItem("userInformation"));

    if (userInfo?.profile?.subscription === "free") {
      setPrice(0); // Update price for free subscription
    } else {
      setPrice(25); // Update price for paid subscription
    }
  }, []);

  const showModal = () => setIsModalVisible(true);

  const handleOk = async () => {
    try {
      await triggerCancelSubscription(); // Trigger the lazy query

      if (data?.statusCode === "00") {
        toast.success("Subscription canceled successfully!");
        setIsModalVisible(false);
      } else if (data?.statusCode === "96") {
        toast.error(data?.statusMessage || "An error occurred while canceling the subscription.");
      } else {
        toast.error("Unexpected error occurred.");
      }
    } catch (err) {
      console.error("Error canceling subscription:", err);
      toast.error("Failed to cancel the subscription. Please try again later.");
    }
  };

  const handleCancel = () => setIsModalVisible(false);

  const handleUpgrade = () => {
    navigate("/checkout/premium"); // Navigate to the pricing or checkout page
  };

  return (
    <div className="col-span-2 flex flex-col justify-between">
      {/* Form for displaying the payment information */}
      <form className="w-full">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="flex">
              <label className="text-xl font-medium">&#163;</label>
              <label className="text-5xl font-bold">{price}</label>
            </div>
            <div>
              <Tag color={price === 0 ? "blue" : "green"}>
                {price === 0 ? "Free" : "Premium"}
              </Tag>
            </div>
          </div>
        </div>

        {/* Conditionally render buttons based on subscription type */}
        {price === 0 ? ( // If subscription is free, show Upgrade to Premium button
          <div className="flex justify-start">
            <Button
              type="primary"
              onClick={handleUpgrade}
              className="bg-green-600 hover:!bg-green-500 font-medium rounded-lg text-sm px-16 py-2.5"
            >
              Upgrade to Premium
            </Button>
          </div>
        ) : ( // If subscription is paid, show Cancel Subscription button
          <div className="flex justify-start">
            <Button
              type="primary"
              onClick={showModal}
              className="bg-purple-700 hover:!bg-purple-600 font-medium rounded-lg text-sm px-16 py-2.5"
            >
              Cancel Subscription
            </Button>
          </div>
        )}
      </form>

      {/* Modal for cancel confirmation */}
      <Modal
        title="Cancel Subscription"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="animate-zoomIn"
        centered
      >
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mx-auto mb-4 text-gray-400 w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>

          <h3 className="mb-5 text-lg font-normal text-gray-800">
            Are you sure you want to cancel your subscription with Outsource Apply?
          </h3>

          <Button
            type="primary"
            danger
            onClick={handleOk}
            className="me-3"
            loading={isLoading} // Show loading indicator while processing
          >
            Yes, I'm sure
          </Button>

          <Button onClick={handleCancel}>No, cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentPlanInfo;