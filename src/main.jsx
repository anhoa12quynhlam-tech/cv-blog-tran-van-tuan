import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from "react-router-dom";

import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.jsx";
import "./index.css";

// Replace with your actual Clerk publishable key from https://dashboard.clerk.com
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Clerk Publishable Key. Add VITE_CLERK_PUBLISHABLE_KEY to your .env file.",
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <HashRouter>
        <App />
      </HashRouter>
    </ClerkProvider>
  </React.StrictMode>,
);
