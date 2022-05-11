import { useIsAuthenticated } from "@azure/msal-react";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

export const Hero = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Find tennis partners in San Jose</h1>
      <h2 className={styles.subheader}>
        Always have someone to play with using our network
      </h2>
      {isAuthenticated && (
        <Link to="/search" className={styles.button}>
          Start searching
        </Link>
      )}
    </div>
  );
};
