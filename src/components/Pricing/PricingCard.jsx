import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useFetchPlansQuery,
  useSubscribeMutation,
} from "../../services/apiSlice";
import Swal from "sweetalert2";

const PricingCard = ({
  title,
  price,
  priceNote,
  description,
  features,
  buttonText,
  isPopular,
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

    if (isPopular) {
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
    } else {
      console.log("Not a popular plan");
      navigate("/checkout/free");
    }
  };

  return (
    <div
      className={`flex items-center flex-col p-8 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border shadow-md ${
        isPopular ? "border-purple-700 shadow-xl" : "border-gray-100"
      }`}
    >
      <div className="flex justify-center items-center mb-4">
        <h3 className="text-2xl font-semibold me-4">{title}</h3>
        {isPopular && (
          <h6 className="bg-purple-800 text-white text-xs font-medium me-2 px-4 py-1 rounded-full border border-purple-400">
            Popular <span className="ms-1">&#128293;</span>
          </h6>
        )}
      </div>

      <p className="font-light text-gray-500 sm:text-lg">{description}</p>

      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-4xl font-extrabold">{price}</span>
        {priceNote && (
          <span className="mr-2 text-md font-normal italic">{priceNote}</span>
        )}
      </div>

      <ul role="list" className="mb-12 space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <svg
              className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleButtonClick}
        disabled={isSubscribing}
        className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-1/2"
      >
        {isSubscribing ? "Subscribing..." : buttonText}
      </button>
      {subscribeError && (
        <p style={{ color: "red" }}>
          Error: {subscribeError.data?.message || subscribeError.message}
        </p>
      )}
    </div>
  );
};

export default PricingCard;
