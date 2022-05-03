import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../config";
import styles from "./SignInButton.module.css";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <button className={styles.container} onClick={handleLogin}>
      Login
    </button>
  );
};
