import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "./HeroSection";
import ServicesSection from "./Services";
import FAQSection from "../../components/Home/FAQSection";
import SignupForm from "../../components/auth/SignUpForm";
import NewsletterSubscription from "../../components/Home/NewsLetterSubscription";

const Services = () => {
  return (
    <>
    <Navbar />
      <div
        id="main-content"
        className="h-full bg-white mb-5 relative"
        style={{ top: "65px" }}
      >
        {/* Hero Section */}
        <HeroSection />
        <ServicesSection />
        <FAQSection />
        <NewsletterSubscription />

        
        <Footer />
      </div>
    </>
  );
};

export default Services;
