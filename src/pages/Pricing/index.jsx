import React from "react";
import Navbar from "../../components/Navbar";
import PricingSection from "../../components/Pricing/PricingSection";

const Pricing = () => {
  return (
    <div>
      <Navbar />
      <section className="bg-white pt-40 flex items-center hero_bg fading_edge p-8 py-24">
        <div className="mx-auto max-w-screen-xl">
          <div className="max-w-2xl mb-8 text-5xl font-bold tracking-tight leading-none text-center">
            <p className="font-DMSerifDisplay tracking-wide">
              Choose your Payment plan
            </p>
          </div>

          <p className="font-normal text-gray-900 font-Archivo text-md flex justify-center">
            <span className="font-normal max-w-2xl text-center">
              Our pricing plans are designed to meet your needs, offering
              transparent and affordable options with no hidden fees. Choose the
              plan that fits your goals and unlock access to the tools you need
              to succeed.
            </span>
          </p>
        </div>
      </section>

      <PricingSection />
    </div>
  );
};

export default Pricing;
