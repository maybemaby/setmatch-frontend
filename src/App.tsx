import { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { SignOutButton } from "./components/SignOut/SignOutButton";
import { SignInButton } from "./components/SignIn/SignInButton";
import { SignUpButton } from "./components/SignUp/SignupButton";
import { ProfileButton } from "./components/Profile/ProfileButton";
import { Footer } from "./components/Footer/Footer";
import { UserContext } from "./components/UserProvider/UserProvider";
import "./globals.css";
import styles from "./AppShell.module.css";

function App() {
  const [atTop, setAtTop] = useState(true);
  const userContext = useContext(UserContext);

  const { instance } = useMsal();

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
            <SignUpButton />
          </UnauthenticatedTemplate>
        </nav>
      </header>
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
