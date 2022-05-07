import { useMsal } from "@azure/msal-react";
import { CgProfile } from "react-icons/cg";
import { b2cPolicies, loginRequest } from "../../config";
import styles from "./ProfileButton.module.css";

export const ProfileButton = () => {
  const { instance } = useMsal();

  const handleEdit = async () => {
    await instance.loginRedirect({
      authority: b2cPolicies.authorities.profileEdit.authority,
      scopes: loginRequest.scopes,
    });
  };
  return (
    <button className={styles.container} onClick={handleEdit}>
      <CgProfile size={35} color={"#62e62e"} />
    </button>
  );
};
