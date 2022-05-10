import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { loginRequest } from "../config";

export const useAccessToken = () => {
  const { instance, accounts } = useMsal();
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    instance.setActiveAccount(accounts[0]);
    const account = instance.getActiveAccount();
    if (account !== null) {
      instance
        .acquireTokenSilent(loginRequest)
        .then((res) => {
          setAuthToken(res.accessToken);
        })
        .catch((err) => {
          console.error(err);
          setAuthToken(null);
        });
    }
  }, [accounts]);

  return authToken;
};
