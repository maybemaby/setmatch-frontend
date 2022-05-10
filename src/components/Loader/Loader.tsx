import styles from "./Loader.module.css";

export const Loader = ({
  message,
  size,
}: {
  message: string;
  size: string;
}) => {
  return (
    <div style={{ height: size, width: size }}>
      <div>{message}</div>
      <div className={styles.loader}></div>
    </div>
  );
};
