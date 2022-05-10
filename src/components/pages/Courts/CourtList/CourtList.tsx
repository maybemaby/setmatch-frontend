import { ICourt } from "../../../../types/ICourt";
import { CourtItem } from "./CourtItem";
import styles from "./CourtList.module.css";

interface CourtListProps {
  courts: ICourt[];
}

export const CourtList = ({ courts }: CourtListProps) => {
  if (courts.length === 0) {
    return (
      <div style={{ height: "50vh", marginTop: "50px", fontSize: "1.2rem" }}>
        No Results
      </div>
    );
  }
  return (
    <ul className={styles.container}>
      {courts.map((court, index) => {
        return <CourtItem court={court} key={index} />;
      })}
    </ul>
  );
};
