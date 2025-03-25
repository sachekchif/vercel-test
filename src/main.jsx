// Override console methods in production
if (process.env.NODE_ENV === "production") {
  console.log = () => {}; // Disable logs
  console.warn = () => {}; // Disable warnings
  // console.error is left intact for critical errors
}
import '@fontsource/dm-serif-display'; // Default weight (400)
import '@fontsource/archivo'; // Default weight (400)
import '@fontsource/archivo/400.css'; // Specific weight (400)
import '@fontsource/archivo/500.css'; // Specific weight (500)
import '@fontsource/archivo/600.css'; // Specific weight (600)
import '@fontsource/archivo/700.css'; // Specific weight (700)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./services/store.jsx";

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);