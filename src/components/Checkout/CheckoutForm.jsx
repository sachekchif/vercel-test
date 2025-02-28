import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  useFetchPlansQuery,
  useSubscribeMutation,
} from "../../services/apiSlice";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch plans and subscription mutation moved to the top level
  const { data: plansData, error: plansError, isLoading: isPlansLoading } =
    useFetchPlansQuery();
  const [subscribe, { isLoading: isSubscribing, error: subscribeError }] =
    useSubscribeMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js hasn't loaded yet
    }

    setLoading(true);

    // Create PaymentMethod
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message || "An error occurred");
      setLoading(false);
      return;
    }

    console.log("PAYMENT METHOD", paymentMethod);

    // Select a basic plan
    const basicPlan = plansData?.data?.[0]; // Adjust based on your API response structure
    if (!basicPlan) {
      console.error("Basic plan not found");
      setErrorMessage("Unable to find a suitable plan.");
      setLoading(false);
      return;
    }

    try {
      // Prepare subscription data
      const subscriptionData = {
        cancelUrl: "http://cancel.com",
        successUrl: "http://success.comm", // Replace with actual success URL
        planNumber: basicPlan.planId, // Use the correct plan ID
        paymentMethodId: paymentMethod.id, // Replace with actual payment method ID
      };

      // Call the subscription mutation
      const response = await subscribe(subscriptionData).unwrap();
      console.log("Subscription successful:", response);

      setSuccessMessage("Subscription successfully created!");
    } catch (err) {
      console.error("Subscription failed:", err);
      setErrorMessage("Failed to process the subscription.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-base font-semibold text-start">
          Enter Card Details
        </h2>
        <div className="border p-3 rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || loading || isPlansLoading || isSubscribing}
          className={`py-2 px-4 w-full text-white font-medium rounded-md ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-700 hover:bg-indigo-500"
          }`}
        >
          {loading || isSubscribing ? "Processing..." : "Pay Now"}
        </button>
        {errorMessage && (
          <p className="text-red-500 text-center text-sm">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center text-sm">{successMessage}</p>
        )}
        {plansError && (
          <p className="text-red-500 text-center text-sm">
            Failed to load plans. Please try again later.
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
