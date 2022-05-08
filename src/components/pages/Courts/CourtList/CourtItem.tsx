import { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { UserContext } from "../../../UserProvider/UserProvider";
import { ICourt } from "../../../../types/ICourt";
import styles from "./CourtItem.module.css";

export const CourtItem = ({ court }: { court: ICourt }) => {
  const userContext = useContext(UserContext);

  return (
    <li className={styles.container}>
      <div className={styles.header}>{court.name}</div>
      <div>{court.address}</div>
      <div className={styles.footer}>
        {userContext?.user?.homeCourt?.id === court.id ? null : (
          <button className={styles.homeButton}>
            <AiOutlineHome size={20} /> Set as Home Court
          </button>
        )}
        <div className={styles.stats}>{court.favoriteCount} Favorites</div>
      </div>
    </li>
  );
};
