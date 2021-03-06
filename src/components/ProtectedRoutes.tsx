import { Outlet } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { InteractionStatus } from "@azure/msal-browser";
import { Unauthenticated } from "./Unauthenticated/Unauthenticated";

export const ProtectedRoutes = () => {
  const authenticated = useIsAuthenticated();
  const { instance, inProgress } = useMsal();

  useEffect(() => {
    if (!authenticated && inProgress === InteractionStatus.None) {
      void instance.loginRedirect();
    }
  }, []);

  if (authenticated && inProgress === InteractionStatus.None) {
    return <Outlet />;
  } else if (!authenticated && inProgress === InteractionStatus.None) {
    return <Unauthenticated />;
  } else {
    return <div style={{ minHeight: "100vh" }}>Loading...</div>;
  }
};
