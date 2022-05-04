import { Outlet } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest, b2cPolicies } from "../config";

export const ProtectedRoutes = () => {
  const authenticated = useIsAuthenticated();
  const { instance, inProgress } = useMsal();

  useEffect(() => {
    if (!authenticated && inProgress === InteractionStatus.None) {
      instance.loginRedirect();
    }
  }, []);

  if (authenticated && inProgress === InteractionStatus.None) {
    return <Outlet />;
  } else {
    return <div>Loading...</div>;
  }
};
