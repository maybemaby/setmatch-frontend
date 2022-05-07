import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { SignOutButton } from "./components/SignOut/SignOutButton";
import { SignInButton } from "./components/SignIn/SignInButton";
import { ProfileButton } from "./components/Profile/ProfileButton";
import "./globals.css";
import styles from "./AppShell.module.css";

function App() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY == 0) {
        setAtTop(true);
      } else setAtTop(false);
    });
  }, []);

  return (
    <div className="App">
      <header
        className={
          atTop ? `${styles.header}` : `${styles.header} ${styles.solid}`
        }
      >
        <Link to={"/"} style={{ textDecoration: "none", color: "unset" }}>
          <div className={styles.headerLogo}>SetMatch</div>
        </Link>
        <nav className={`${styles.headerNav}`}>
          <AuthenticatedTemplate>
            <SignOutButton />
            <ProfileButton />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <SignInButton />
            <a href="">Signup</a>
          </UnauthenticatedTemplate>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
