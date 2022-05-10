import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import styles from "./ProfileButton.module.css";

export const ProfileButton = () => {
  return (
    <Link to="/profile" className={styles.container}>
      <CgProfile size={35} color={"#62e62e"} />
    </Link>
  );
};
