import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  useFetchPlansQuery,
  useSubscribeMutation,
} from "../../services/apiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirectData, setRedirectData] = useState(null);

  // Fetch plans and subscription mutation
  const { data: plansData, error: plansError, isLoading: isPlansLoading } =
    useFetchPlansQuery();
  const [subscribe, { isLoading: isSubscribing }] = useSubscribeMutation();

  // Check for redirect data on mount
  useEffect(() => {
    const storedRedirect = localStorage.getItem('subscriptionRedirect');
    if (storedRedirect) {
      setRedirectData(JSON.parse(storedRedirect));
    }
  }, []);

  const fetchProfile = async (accessToken) => {
    try {
      const response = await fetch(
        "https://backend-46kr.onrender.com/auth/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  };

  const updateUserSession = async () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInformation"));
    if (!userInfo) {
      throw new Error("No user session found");
    }

    const profileResponse = await fetchProfile(userInfo.access_token);
    if (!profileResponse) {
      throw new Error("Failed to fetch profile");
    }

    // Update session storage with new profile data
    sessionStorage.setItem(
      "userInformation",
      JSON.stringify({
        ...userInfo,
        profile: profileResponse.profile,
      })
    );

    toast.success("Profile updated successfully");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message || "Payment method creation failed");
      }

      const basicPlan = plansData?.data?.[0];
      if (!basicPlan) {
        throw new Error("Unable to find a suitable plan.");
      }

      const subscriptionData = {
        cancelUrl: window.location.href,
        successUrl: window.location.href,
        planNumber: basicPlan.planId,
        paymentMethodId: paymentMethod.id,
      };

      const response = await subscribe(subscriptionData).unwrap();
      console.log("Subscription successful:", response);

      // Update user profile while keeping payment button in loading state
      await updateUserSession();

      toast.success("Subscription successfully created!");

      // Handle redirect
      if (redirectData) {
        const url = new URL(window.location.origin + redirectData.pathname);
        url.search = new URLSearchParams({
          modal: 'applyForMe',
          jobId: redirectData.jobDetails.jobId,
          title: redirectData.jobDetails.title.replace(/ /g, '-'),
          company: redirectData.jobDetails.company.replace(/ /g, '-')
        }).toString();

        localStorage.removeItem('subscriptionRedirect');
        localStorage.removeItem('selectedJob');
        window.location.href = url.toString();
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage(err.data?.message || err.message || "Payment failed");
      toast.error(err.data?.message || err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
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
            loading || isSubscribing
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-700 hover:bg-indigo-500"
          }`}
        >
          {loading || isSubscribing ? "Processing..." : "Pay Now"}
        </button>
        {errorMessage && (
          <p className="text-red-500 text-center text-sm">{errorMessage}</p>
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