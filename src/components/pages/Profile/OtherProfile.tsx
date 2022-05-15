import { useParams } from "react-router-dom";
import { useAccessToken } from "../../../hooks/useAccessToken";
import { useUser } from "../../../hooks/useUser";
import { Loader } from "../../Loader/Loader";
import styles from "./Profile.module.css";

export const OtherProfile = () => {
  const { userId } = useParams();
  const authToken = useAccessToken();
  const { data, isLoading, isError } = useUser(authToken, userId ?? "");

  return (
    <main className={styles.container}>
      {isLoading && (
        <div className="centered">
          <Loader size="100px" message="Loading..." />
        </div>
      )}

      {isError && <div className="centered">Error retrieving profile</div>}

      <div className={styles.profile}>
        <div className={styles.info}>
          <div className={styles.picture}></div>
          <div className={styles.profileRight}>
            <h2 className={styles.name}>
              {data?.firstName} {data?.lastName}
            </h2>
            <h3 className={styles.rating}>
              {data?.ntrpRating ? (
                <div>{data.ntrpRating.toPrecision(2)} Rating</div>
              ) : (
                <div>Unrated</div>
              )}
            </h3>
            <button className={styles.matchRequest}>Request Match</button>
          </div>
        </div>
        <div className={styles.about}>
          <strong style={{ textDecoration: "underline", fontSize: "1.05rem" }}>
            About
          </strong>
          <p className={styles.aboutBody}>
            {data?.about ?? "No info provided."}
          </p>
        </div>
      </div>
    </main>
  );
};
