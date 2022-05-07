import type { IconType } from "react-icons";
import styles from "./Feature.module.css";

interface FeatureProps {
  description: string;
  Icon: IconType;
}

export const Feature = ({ description, Icon }: FeatureProps) => {
  return (
    <div className={styles.container}>
      <Icon size={60} />
      <p>{description}</p>
    </div>
  );
};
