import { useMsal } from "@azure/msal-react";
import styles from "./SignOutButton.module.css";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleSignOut = async () => {
    await instance.logoutRedirect();
  };

  return (
    <button className={styles.container} onClick={handleSignOut}>
      Logout
    </button>
  );
};
