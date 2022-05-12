import { UserRow } from "./UserRow";
import { IUser } from "../../../../types/IUser";
import styles from "./UserList.module.css";

interface UserListProps {
  users: IUser[];
}

export const UserList = ({ users }: UserListProps) => {
  return (
    <ul className={styles.container}>
      {users.map((user, index) => (
        <UserRow user={user} key={index} />
      ))}
    </ul>
  );
};
