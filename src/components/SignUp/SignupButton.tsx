import { useMsal } from "@azure/msal-react";
import { loginRequest, b2cPolicies } from "../../config";
import styles from "./Signup.module.css";

export const SignUpButton = () => {
  const { instance } = useMsal();

  const handleClick = async () => {
    await instance.loginRedirect({
      authority: b2cPolicies.authorities.signUp.authority,
      scopes: loginRequest.scopes,
    });
  };
  return (
    <button onClick={handleClick} className={styles.container}>
      Sign Up
    </button>
  );
};
