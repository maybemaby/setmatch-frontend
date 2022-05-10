import { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { UserContext } from "../../../UserProvider/UserProvider";
import { useUpdateUser } from "../../../../hooks/useUpdateUser";
import { useAccessToken } from "../../../../hooks/useAccessToken";
import { ICourt } from "../../../../types/ICourt";
import styles from "./CourtItem.module.css";
import { PutUserDto } from "../../../../types/IUser";

export const CourtItem = ({ court }: { court: ICourt }) => {
  const userContext = useContext(UserContext);
  const mutation = useUpdateUser();
  const accessToken = useAccessToken();

  const handleSetCourt = () => {
    if (accessToken && userContext?.user) {
      const dto: PutUserDto = {
        firstName: userContext.user.firstName,
        lastName: userContext.user.lastName,
        username: userContext.user.username,
        about: userContext.user.about,
        ntrpRating: userContext.user.ntrpRating,
        ratingEstimated: userContext.user.ratingEstimated,
        homeCourtId: court.id,
      };
      mutation.mutate({ authToken: accessToken, id: userContext.user.id, dto });
    }
  };

  return (
    <li className={styles.container}>
      <div className={styles.header}>{court.name}</div>
      <div>{court.address}</div>
      <div className={styles.footer}>
        {userContext?.user?.homeCourt?.id === court.id ? null : (
          <button className={styles.homeButton} onClick={handleSetCourt}>
            <AiOutlineHome size={20} /> Set Home Court
          </button>
        )}
        <div className={styles.stats}>{court.favoriteCount} Favorites</div>
      </div>
    </li>
  );
};
