import styles from "./Loader.module.css";

export const Loader = ({
  message,
  size,
  horizontal = false,
}: {
  message: string;
  size: string;
  horizontal: boolean;
}) => {
  return (
    <div
      style={{ height: size, width: size }}
      className={`${styles.container} ${horizontal ? styles.horizontal : ""}`}
    >
      <div>{message}</div>
      <div
        className={`${styles.loader} ${horizontal ? styles.horizontal : ""}`}
      ></div>
    </div>
  );
};
