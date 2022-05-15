import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AuthenticationResult,
  EventType,
  PublicClientApplication,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import { Home } from "./components/pages/Home/Home";
import { Courts } from "./components/pages/Courts/Courts";
import { SearchPage } from "./components/pages/Search/SearchPage";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { postUser } from "./handlers/users";
import { msalConfig } from "./config";
import "./index.css";
import { IClaims } from "./types/IClaims";
import { UserProvider } from "./components/UserProvider/UserProvider";
import { PageProvider } from "./components/PageNavigator/usePageProvider";
import { Profile } from "./components/pages/Profile/Profile";
import { OtherProfile } from "./components/pages/Profile/OtherProfile";

const msalInstance = new PublicClientApplication(msalConfig);
const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
msalInstance.addEventCallback(async (event) => {
  switch (event.eventType) {
    case EventType.LOGIN_SUCCESS: {
      const auth = event.payload as AuthenticationResult;
      if ((auth.idTokenClaims as IClaims).newUser) {
        await postUser(auth.accessToken);
      }
      break;
    }
    default:
      console.log(event);
      break;
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <PageProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<App />}>
                  <Route index={true} element={<Home />}></Route>
                  <Route element={<ProtectedRoutes />}>
                    <Route path="/courts" element={<Courts />}></Route>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profiles/:userId" element={<OtherProfile />} />
                    <Route path="/search" element={<SearchPage />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </PageProvider>
        </UserProvider>
      </QueryClientProvider>
    </MsalProvider>
  </React.StrictMode>
);
