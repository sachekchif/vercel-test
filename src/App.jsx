import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppRouter from "./router";
import { Toaster } from "sonner";
import { isUserActive, resetInactivityTimer, scheduleTokenRefresh, startActivityListeners } from "./services/apiSlice";

function App() {
  useEffect(() => {
    console.log("🔄 useEffect initialized in App.jsx");

    const handleStorageChange = () => {
        console.log("🛠 Storage change detected... Checking user activity.");
        
        if (isUserActive()) {
            console.log("✅ User is active. Checking if token refresh is needed...");
            
            const isScheduled = sessionStorage.getItem("isScheduled");

            if (!isScheduled) {
                console.log("⏳ No existing schedule found. Scheduling token refresh...");
                scheduleTokenRefresh();
                resetInactivityTimer();
                startActivityListeners();

                // Mark schedule as active
                sessionStorage.setItem("isScheduled", "true");
            } else {
                console.log("🔄 Token refresh already scheduled. No action taken.");
            }
        } else {
            console.log("⚠️ User is inactive. No token refresh.");
        }
    };

    window.addEventListener("storage", handleStorageChange);

    // Initial check when app loads
    console.log("🚀 Running initial storage check...");
    handleStorageChange();

    return () => {
        console.log("🛑 Cleanup: Removing storage event listener.");
        window.removeEventListener("storage", handleStorageChange);
    };
}, []);


  return (
    <>
      <div className="w-screen bg-gray-50">
      <Toaster position="top-right" />
        <AppRouter />
      </div>
    </>
  );
}

export default App;
