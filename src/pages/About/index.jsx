import React from "react";
import Navbar from "../../components/Navbar";
import Work from "../../assets/images/work.svg";
import DoubleArrow from "../../assets/images/double-arrow.svg";
import JobApplicationSection from "../../components/Home/JobApplicationSection";
import InterviewPreparationSection from "../../components/Home/InterviewPreparationSection";
import FAQSection from "../../components/Home/FAQSection";
import NewsletterSubscription from "../../components/Home/NewsLetterSubscription";
import Footer from "../../components/Footer";
import AboutHero from "../../components/About/AboutHero";

const About = () => {
  return (
    <div className=" w-full bg-white">
      <header className="z-[100] w-full top-0 lg:mx-auto font-satoshi fixed bg-white backdrop-filter backdrop-blur-md right-0 left-0">
        {/* <LandingPageHeader /> */}
        <Navbar className="bg-none py-4 lg:py-2" type="default" />
      </header>

      <div className="h-full bg-white mb-5 relative" style={{ top: "65px" }}>
        <AboutHero />
      </div>

      
      <FAQSection />
      <NewsletterSubscription />
      <Footer />
    </div>
  );
};

export default About;
