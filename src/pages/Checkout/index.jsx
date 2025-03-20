import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { Breadcrumb } from "antd";
import { CheckoutIcon, HomeIcon } from "../../utils/constants";
import Navbar from "../../components/Navbar";
import SmallPlanCard from "../../components/Checkout/SmallPlanCard";
import PaymentOptionCard from "../../components/Checkout/PaymentOptionCard";
import SummaryCard from "../../components/Checkout/SummaryCard";

const Checkout = () => {
  const { planType } = useParams(); // Get the planType parameter from the URL
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedOption, setSelectedOption] = useState("credit-card");

  // Set the selected plan based on the URL parameter
  useEffect(() => {
    if (planType === "free") {
      setSelectedPlan("hosting-small"); // Set to the free plan's value
    } else if (planType === "premium") {
      setSelectedPlan("hosting-big"); // Set to the premium plan's value
    }
  }, [planType]);

  const plans = [
    {
      id: "hosting-small",
      name: "hosting",
      value: "hosting-small",
      title: "Free Package",
      features: [
        "A Trial package valid for 7 days",
        "Maximum of 5 job applications",
      ],
      price: 0.0,
    },
    {
      id: "hosting-big",
      name: "hosting",
      value: "hosting-big",
      title: "Premium Package",
      features: [
        "Minimum of 50 job applications per month",
        "Unique and Professionally tailored CV, Cover Letter for each application",
      ],
      price: 25.0,
    },
  ];

  const paymentOptions = [
    {
      id: "credit-card",
      name: "payment-method",
      value: "credit-card",
      title: "Credit Card",
      description: "Pay with your credit card",
    },
  ];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    console.log(`Selected Payment Option: ${e.target.value}`);
  };

  const handlePlanChange = (e) => {
    const selectedPlanValue = e.target.value;
    const selectedPlanObj = plans.find(
      (plan) => plan.value === selectedPlanValue
    );
    setSelectedPlan(selectedPlanValue);

    if (selectedPlanObj) {
      console.log(`Selected Plan: ${selectedPlanObj.title}`);
    }
  };

  const calculateSummaryItems = () => {
    const selectedPlanObj = plans.find((plan) => plan.value === selectedPlan);
    const price = selectedPlanObj ? selectedPlanObj.price : 0.0;
    const tax = price > 0 ? 0.5 : 0.0;
    const total = price + tax;

    return [
      { label: "Subtotal", value: `£${price.toFixed(2)}` },
      { label: "Tax", value: `£${tax.toFixed(2)}` },
      { label: "Total", value: `£${total.toFixed(2)}`, isTotal: true },
    ];
  };

  const handlePayment = () => {
    console.log("Proceed to payment");
  };

  return (
    <div
      id="main-content"
      className="h-full bg-white mb-5 relative"
      style={{ top: "65px" }}
    >
      <Navbar />
      <section className="bg-white p-8 mb-4">
        <div className="mx-auto max-w-screen-xl"></div>
        <Breadcrumb
          items={[
            {
              href: "/",
              title: (
                <div className="flex">
                  <div className="content-center">
                    <HomeIcon />
                  </div>
                  <span>Home</span>
                </div>
              ),
            },
            {
              href: "/Checkout",
              title: (
                <div className="flex">
                  <span>Checkout</span>
                </div>
              ),
            },
          ]}
        />
      </section>
      <section className="bg-white px-8 mb-4">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col">
            <label className="text-2xl font-semibold">Checkout</label>
            <label className="text-sm max-w-md">
              Enter your Account information and complete the transaction to
              purchase your course.
            </label>
          </div>
        </div>
      </section>
      <section className="bg-white p-8 mb-4">
        <div className="mx-auto max-w-screen-xl">
          <div className="w-full flex flex-col lg:flex-row gap-8">
            <div className="lg:basis-2/3 w-full">
              <div className="max-w-4xl">
                <div className="flex flex-col mb-8">
                  <h3 className="block text-md font-semibold text-gray-900">
                    Select a Pricing package
                  </h3>
                  <label className="text-sm text-gray-700">
                    Your 7-day free trial ends on{" "}
                    <span className="text-gray-900 font-bold">
                      14th December 2024
                    </span>
                    . After that, your card will be charged{" "}
                    <span className="text-gray-900 font-bold">£25 </span>unless
                    you cancel before the trial ends.
                  </label>
                </div>

                <ul className="grid max-w-4xl gap-6 md:grid-cols-2 mb-8">
                  {plans.map((plan) => (
                    <SmallPlanCard
                      key={plan.id}
                      id={plan.id}
                      name={plan.name}
                      value={plan.value}
                      title={plan.title}
                      features={plan.features}
                      selected={selectedPlan === plan.value}
                      onChange={handlePlanChange}
                      disabled={planType === "free" && plan.value !== "hosting-small"} // Disable premium plan on /checkout/free
                    />
                  ))}
                </ul>

                <form className="max-w-2xl mb-12">
                  <h3 className="block mb-4 text-md font-medium text-gray-900">
                    Payment Options
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {paymentOptions.map((option) => (
                        <PaymentOptionCard
                          key={option.id}
                          id={option.id}
                          name={option.name}
                          value={option.value}
                          title={option.title}
                          description={option.description}
                          checked={selectedOption === option.value}
                          onChange={handleOptionChange}
                        />
                      ))}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <SummaryCard
              title="Summary"
              items={calculateSummaryItems()}
              termsText="By completing your purchase you agree to these"
              termsLink="#"
              buttonText={`Pay ${
                calculateSummaryItems().find((item) => item.label === "Total")
                  ?.value
              }`}
              buttonAction={handlePayment}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;