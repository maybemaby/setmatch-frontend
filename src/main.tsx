import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import { Home } from "./components/pages/Home/Home";
import { msalConfig } from "./config";
import "./index.css";

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event) => {
  switch (event.eventType) {
    case EventType.ACCOUNT_ADDED:
      console.log(event.payload);
      break;
    case EventType.ACCOUNT_REMOVED:
      console.log(event.payload);
      break;
    default:
      console.log(event);
      break;
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <Routes>
          <Route element={<App />}>
            <Route index={true} element={<Home />}></Route>
          </Route>
        </Routes>
      </MsalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
