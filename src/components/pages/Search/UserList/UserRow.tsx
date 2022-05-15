import { IUser } from "../../../../types/IUser";
import styles from "./UserList.module.css";

interface UserRowProps {
  user: IUser;
}

export const UserRow = ({ user }: UserRowProps) => {
  return (
    <li className={styles.row}>
      <div className={styles.profilePic}></div>
      <div className={styles.userDetails}>
        {user.firstName} {user.lastName}
      </div>
      <div className={styles.userExtra}>
        <div>NTRP Rating: {user.ntrpRating ?? "No rating"}</div>
        <div className={styles.homeCourt}>
          Home Court: {user.homeCourt?.name ?? "None"}
        </div>
      </div>
    </li>
  );
};
