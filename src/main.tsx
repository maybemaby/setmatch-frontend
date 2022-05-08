import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AuthenticationResult,
  EventType,
  PublicClientApplication,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import { Home } from "./components/pages/Home/Home";
import { Courts } from "./components/pages/Courts/Courts";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { postUser } from "./handlers/users";
import { msalConfig } from "./config";
import "./index.css";
import { IClaims } from "./types/IClaims";
import { UserProvider } from "./components/UserProvider/UserProvider";

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback(async (event) => {
  switch (event.eventType) {
    case EventType.LOGIN_SUCCESS:
      const auth = event.payload as AuthenticationResult;
      if ((auth.idTokenClaims as IClaims).newUser) {
        await postUser(auth.accessToken);
      }
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
        <UserProvider>
          <Routes>
            <Route element={<App />}>
              <Route index={true} element={<Home />}></Route>
              <Route element={<ProtectedRoutes />}>
                <Route path="/courts" element={<Courts />}></Route>
              </Route>
            </Route>
          </Routes>
        </UserProvider>
      </MsalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
