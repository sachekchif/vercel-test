import React, { useState, useEffect } from "react";
import { Modal, Button, Tag } from "antd";
import { toast } from "sonner";
import { useLazyCancelSubscriptionQuery } from "../../services/apiSlice";
import { useNavigate } from "react-router-dom";

const PaymentPlanInfo = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({
    type: "free",
    price: 0,
    requestsLeft: 0
  });
  const [triggerCancelSubscription, { data, error, isLoading }] = useLazyCancelSubscriptionQuery();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user information from session storage
    const userInfo = JSON.parse(sessionStorage.getItem("userInformation"));
    const subscription = userInfo?.profile?.subscription || "free";
    const requestsLeft = userInfo?.numberOfRequests || 0;

    let price = 0;
    if (subscription === "premium") {
      price = 25;
    } else if (subscription === "basic") {
      price = 0;
    }

    setSubscriptionData({
      type: subscription,
      price,
      requestsLeft
    });
  }, []);

  const showModal = () => setIsModalVisible(true);

  const handleOk = async () => {
    try {
      await triggerCancelSubscription();

      if (data?.statusCode === "00") {
        toast.success("Subscription canceled successfully!");
        // Update local session data
        const userInfo = JSON.parse(sessionStorage.getItem("userInformation"));
        sessionStorage.setItem(
          "userInformation",
          JSON.stringify({
            ...userInfo,
            profile: {
              ...userInfo.profile,
              subscription: "free"
            }
          })
        );
        setIsModalVisible(false);
        setSubscriptionData(prev => ({ ...prev, type: "free", price: 0 }));
      } else if (data?.statusCode === "96") {
        toast.error(data?.statusMessage || "Error canceling subscription");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to cancel subscription");
    }
  };

  const handleCancel = () => setIsModalVisible(false);

  const handleUpgrade = () => {
    navigate("/checkout/premium");
  };

  const getTagColor = () => {
    switch(subscriptionData.type) {
      case "premium": return "green";
      case "basic": return "blue";
      default: return "gray";
    }
  };

  const getTagText = () => {
    switch(subscriptionData.type) {
      case "premium": return "Premium";
      case "Basic": return `Basic (${subscriptionData.requestsLeft} requests done)`;
      default: return "Free";
    }
  };

  return (
    <div className="col-span-2 flex flex-col justify-between">
      <form className="w-full">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="flex">
              <label className="text-xl font-medium">&#163;</label>
              <label className="text-5xl font-bold">{subscriptionData.price}</label>
            </div>
            <div>
              <Tag color={getTagColor()}>
                {getTagText()}
              </Tag>
            </div>
          </div>
        </div>

        {subscriptionData.type === "premium" ? (
          <div className="flex justify-start">
            <Button
              type="primary"
              onClick={showModal}
              className="bg-purple-700 hover:!bg-purple-600 font-medium rounded-lg text-sm px-16 py-2.5"
            >
              Cancel Subscription
            </Button>
          </div>
        ) : (
          <div className="flex justify-start">
            <Button
              type="primary"
              onClick={handleUpgrade}
              className="bg-purple-700 hover:!bg-purple-600 font-medium rounded-lg text-sm px-16 py-2.5"
            >
              {subscriptionData.type === "basic" ? "Upgrade to Premium" : "Get Premium"}
            </Button>
          </div>
        )}
      </form>

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
            Are you sure you want to cancel your Premium subscription?
          </h3>

          <Button
            type="primary"
            danger
            onClick={handleOk}
            className="me-3"
            loading={isLoading}
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