import { ICourt } from "../../../../types/ICourt";
import { CourtItem } from "./CourtItem";
import styles from "./CourtList.module.css";

interface CourtListProps {
  courts: ICourt[];
}

export const CourtList = ({ courts }: CourtListProps) => {
  return <ul className={styles.container}>
    {courts.map((court, index) => {
      return <CourtItem court={court} key={index} />
    })}
  </ul>;
};
