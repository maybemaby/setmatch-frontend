import { AiOutlineStop } from "react-icons/ai";
import styles from "./Unauthenticated.module.css";

export const Unauthenticated = () => {
  return (
    <main className={styles.container}>
      <div>
        <AiOutlineStop size={60} color={"#d94343"} />
      </div>
      <h1 className={styles.title}>Cannot access resource</h1>
      <p>Please login first</p>
    </main>
  );
};
