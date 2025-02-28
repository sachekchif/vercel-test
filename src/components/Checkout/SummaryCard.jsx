import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import stripePromise from "./stripePromise";
import { Elements } from "@stripe/react-stripe-js";
import CustomLoadingButton from "../CustomLoadingButton";
import { useNavigate } from "react-router-dom";
import {
  useFetchPlansQuery,
  useSubscribeMutation,
} from "../../services/apiSlice";

const SummaryCard = ({
  title,
  items,
  termsText,
  termsLink,
  buttonText,
  buttonAction,
}) => {
  const navigate = useNavigate();
  const userInformation = sessionStorage.getItem("userInformation");

  // Fetch plans data
  const { data: plansData, error, isLoading } = useFetchPlansQuery();
  console.log("Fetched plans:", plansData);

  // Mutation for subscribing
  const [subscribe, { isLoading: isSubscribing, error: subscribeError }] =
    useSubscribeMutation();

  // Extract the plan ID based on the index or condition
  const premiumPlan = plansData?.data[1]; // Adjust the condition as per plan structure
  console.log("Selected plan:", premiumPlan);
  const totalItem = items.find((item) => item.label === "Total");
  const totalValue = totalItem
    ? parseFloat(totalItem.value.replace("£", ""))
    : 0;

  // const [isLoading, setIsLoading] = useState(false);
  const handleButtonClick = async () => {
    if (!userInformation) {
      // Show SweetAlert2 modal if user is not logged in
      Swal.fire({
        title: "You're not signed in!",
        text: "To continue, please log in or sign up.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Get Started",
        confirmButtonColor: "#6B46C1", // Purple (matching your theme)
        cancelButtonColor: "#34D399", // Green (for sign up)
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else {
          navigate("/sign-up");
        }
      });

      return;
    }

    if (premiumPlan) {
      try {
        // Prepare subscription data
        const subscriptionData = {
          cancelUrl: "http://localhost:5173/pricing",
          successUrl: "http://localhost:5173/", // Replace with actual success URL
          planNumber: premiumPlan?.planId,
          paymentMethodId: "",
        };

        // Call the subscription mutation
        const response = await subscribe(subscriptionData).unwrap();
        console.log("Subscription successful:", response);

        const pageUrl = response?.data?.payment_url;

        if (pageUrl) {
          window.open(pageUrl, "_blank");
        } else {
          console.error("Payment URL not found in response");
        }
      } catch (err) {
        console.error("Subscription failed:", err);
      }
    } else {
      console.error("Premium plan not found");
    }
  };

  return (
    <div className="lg:basis-1/3 w-full content-top">
      <div className="relative overflow-hidden flex flex-col border border-gray-300 rounded-md mb-12">
        {/* Title */}
        <div className="p-6">
          <label className="font-bold text-xl mb-8">{title}</label>

          {/* List of Items */}
          <div className="flex flex-col mb-4 border-b border-gray-400">
            <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
              {items.map((item) => (
                <dl
                  key={item.label}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <dt
                    className={`text-base ${
                      item.isTotal
                        ? "font-bold text-gray-900 dark:text-white"
                        : "font-normal text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {item.label}
                  </dt>
                  <dd
                    className={`text-base ${
                      item.isTotal
                        ? "font-bold text-gray-900 dark:text-white"
                        : "font-medium text-gray-900 dark:text-white"
                    }`}
                  >
                    {item.value}
                  </dd>
                </dl>
              ))}
            </div>
          </div>

          {/* Terms and Conditions */}
          <label className="mb-8 text-sm">
            {termsText}{" "}
            <a
              href={termsLink}
              className="bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
            .
          </label>
        </div>

        {/* Conditional Rendering for Payment */}
        <div className="mb-6 border-t border-gray-300 p-6 pb-0">
          {totalValue === 0 ? (
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          ) : (
            <div className="text-gray-900 flex justify-center w-full">
              <CustomLoadingButton
                onClick={handleButtonClick}
                isLoading={isSubscribing}
              >
                {buttonText}
              </CustomLoadingButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
