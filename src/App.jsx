import { useEffect, useState } from "react";
import { Toaster } from "sonner";
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
          console.log("✅ User is active. Checking if token refresh is needed...");

          if (!refreshInterval) {
            console.log("⏳ No existing schedule found. Scheduling token refresh...");
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
      console.log("🛑 Cleanup: Removing event listeners and stopping token refresh.");
      window.removeEventListener("customStorageChange", handleCustomStorageChange);

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
      console.log("🛑 User is on /login. Stopping token refresh and clearing session storage.");

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
    <>
      <div className="w-screen bg-gray-50 font-Archivo">
      <Toaster position="top-right" />
        <AppRouter />
      </div>
    </>
  );
}

export default App;
