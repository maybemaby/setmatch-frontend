import { Outlet } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { SignInButton } from "./components/SignIn/SignInButton";
import "./globals.css";
import styles from "./AppShell.module.css";

function App() {
  return (
    <div className="App">
      <header className={styles.header}>
        <div>SetMatch</div>
        <nav className={`${styles.headerNav}`}>
          <AuthenticatedTemplate>
            <a href="">Logout</a>
            <a href="">Profile</a>
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
