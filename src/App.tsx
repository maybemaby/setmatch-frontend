import { Outlet } from "react-router-dom";
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
  return (
    <div className="App">
      <header className={styles.header}>
        <div>SetMatch</div>
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
