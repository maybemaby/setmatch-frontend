import { Outlet } from "react-router-dom";
import "./globals.css";
import styles from "./AppShell.module.css";

function App() {
  return (
    <div className="App">
      <header className={styles.header}>
        <div>SetMatch</div>
        <nav className={`${styles.headerNav}`}>
          <a href="">Login</a>
          <a href="">Signup</a>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
