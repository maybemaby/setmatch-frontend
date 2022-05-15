import { IUser } from "../../../../types/IUser";
import { Link } from "react-router-dom";
import styles from "./UserList.module.css";

interface UserRowProps {
  user: IUser;
}

export const UserRow = ({ user }: UserRowProps) => {
  return (
    <li className={styles.row}>
      <Link to={`/profiles/${user.id}`}>
        <div className={styles.profilePic}></div>
      </Link>
      <div className={styles.userDetails}>
        <Link to={`/profiles/${user.id}`} className={styles.userLink}>
          {user.firstName} {user.lastName}
        </Link>
      </div>
      <div className={styles.userExtra}>
        <div>{user.ntrpRating?.toPrecision(2) ?? "No"} Rating</div>
        <div className={styles.homeCourt}>{user.homeCourt?.name ?? "None"}</div>
      </div>
    </li>
  );
};
