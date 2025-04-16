import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AppRouter from "./router";
import {
  isUserActive,
  resetInactivityTimer,
  scheduleTokenRefresh,
  startActivityListeners,
  stopTokenRefresh,
} from "./services/apiSlice";

const App = () => {
  const [refreshInterval, setRefreshInterval] = useState(null); // Manage interval in state

  useEffect(() => {
    console.log("🔄 useEffect initialized in App.jsx");

    const handleStorageChange = () => {
      try {
        console.log("🛠 Storage change detected... Checking user activity.");

        if (isUserActive()) {
          console.log(
            "✅ User is active. Checking if token refresh is needed..."
          );

          if (!refreshInterval) {
            console.log(
              "⏳ No existing schedule found. Scheduling token refresh..."
            );
            const interval = scheduleTokenRefresh(); // Start the scheduler
            setRefreshInterval(interval); // Save the interval ID in state

            resetInactivityTimer();
            startActivityListeners();
          } else {
            console.log("🔄 Token refresh already scheduled. No action taken.");
          }
        } else {
          console.log("⚠️ User is inactive. No token refresh.");
        }
      } catch (error) {
        console.error("❌ Error in handleStorageChange:", error);
      }
    };

    // Initial check when app loads
    console.log("🚀 Running initial storage check...");
    handleStorageChange();

    // Listen for custom storage change events
    const handleCustomStorageChange = () => {
      handleStorageChange();
    };

    window.addEventListener("customStorageChange", handleCustomStorageChange);

    return () => {
      console.log(
        "🛑 Cleanup: Removing event listeners and stopping token refresh."
      );
      window.removeEventListener(
        "customStorageChange",
        handleCustomStorageChange
      );

      // Clear the interval when the component unmounts
      if (refreshInterval) {
        stopTokenRefresh(); // Stop the token refresh scheduler
        setRefreshInterval(null); // Reset the interval state
      }
    };
  }, [refreshInterval]);

  // Handle cleanup on route change
  useEffect(() => {
    if (location.pathname === "/login") {
      console.log(
        "🛑 User is on /login. Stopping token refresh and clearing session storage."
      );

      // Stop the token refresh scheduler
      if (refreshInterval) {
        stopTokenRefresh();
        setRefreshInterval(null);
      }

      // Clear session storage
      sessionStorage.clear();
    }
  }, [location.pathname]);

  return (
    <HelmetProvider>
      <div className="w-screen bg-gray-50 font-Archivo">
        {/* Default head tags that apply to all pages */}
        <Helmet>
  {/* Primary Meta */}
  <title>OutsourceApply – Get Job-Ready & Land Remote Roles Faster</title>
  <meta 
    name="description" 
    content="We optimize your CV, craft employer-tailored cover letters, and pitch you directly to hiring managers. 87% interview success rate. Get started in 5 minutes." 
  />
  <meta 
    name="keywords" 
    content="professional CV writing service, cover letter service, job application help, ATS resume writer, employer outreach program" 
  />

  {/* Open Graph / Social */}
  <meta property="og:title" content="Get Interview-Ready in 72 Hours | OutsourceApply" />
  <meta property="og:description" content="We get you 3x more interviews with our proven CV-cover letter-outreach system. 14-day guarantee." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.outsourceapply.com/" />
  <meta property="og:image" content="https://www.outsourceapply.com/assets/images/seo/home-get-hired-1200x630.webp" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Smiling professional holding polished CV with OutsourceApply" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Stop Applying—Get Recruited | OutsourceApply" />
  <meta name="twitter:description" content="We handle CVs, cover letters, and employer outreach so you can focus on interviews." />
  <meta name="twitter:image" content="https://www.outsourceapply.com/assets/images/seo/twitter-home-1024x512.webp" />

  {/* Schema Markup */}
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "OutsourceApply",
        "image": "https://www.outsourceapply.com/assets/images/seo/service-showcase-800x450.webp",
        "description": "CV optimization, cover letter writing, and employer outreach services",
        "makesOffer": {
          "@type": "Offer",
          "name": "Interview Guarantee Package",
          "description": "Complete job application preparation with interview guarantee"
        }
      }
    `}
  </script>

  {/* Preload Critical Images */}
  <link rel="preload" as="image" href="/assets/images/hero-optimized.webp" imagesrcset="/assets/images/hero-800.webp 800w, /assets/images/hero-1200.webp 1200w" />
</Helmet>
        <Toaster position="top-right" />
        <AppRouter />
      </div>
    </HelmetProvider>
  );
};

export default App;
