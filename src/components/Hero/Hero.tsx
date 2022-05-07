import styles from "./Hero.module.css";

interface HeroProps {
  url?: string;
}

export const Hero = ({ url }: HeroProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Find tennis partners in San Jose</h1>
      <h2 className={styles.subheader}>
        Always have someone to play with using our network
      </h2>
    </div>
  );
};
