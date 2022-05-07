import { Feature } from "./Feature";
import styles from "./FeatureList.module.css";

interface FeatureListProps {
  children?: React.ReactNode;
}

export const FeatureList = ({ children }: FeatureListProps) => {
  return <div className={styles.container}>{children}</div>;
};

FeatureList.Feature = Feature;
