import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { UserContext } from "../../UserProvider/UserProvider";
import { Loader } from "../../Loader/Loader";
import styles from "./Profile.module.css";

export const Profile = () => {
  const userContext = useContext(UserContext);

  const courtLabel = userContext?.user?.homeCourt
    ? `${userContext.user.homeCourt.name} @ ${userContext.user.homeCourt.address}`
    : null;

  if (!userContext?.user) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader message="Loading..." size="100px" horizontal={false}></Loader>;
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.info}>
          <div className={styles.picture}></div>
          <div className={styles.rightProfile}>
            <h2 className={styles.name}>
              {userContext.user.firstName} {userContext.user.lastName}
            </h2>
            <h3 className={styles.rating}>
              {userContext.user.ntrpRating ? (
                <div>{userContext.user.ntrpRating.toPrecision(2)} Rating</div>
              ) : (
                <div>Unrated</div>
              )}
            </h3>
            <h4 className={styles.rating}>
              {"Member since: " +
                new Date(userContext.user.signupDate).toLocaleDateString()}
            </h4>
            <Link
              to="/profile/edit"
              className={`${styles.link} ${styles.edit}`}
            >
              <AiOutlineEdit size={18} />
              Edit Profile
            </Link>
          </div>
        </div>
        <div className={styles.about}>
          <strong style={{ textDecoration: "underline", fontSize: "1.05rem" }}>
            About
          </strong>
          <p className={styles.aboutBody}>
            {userContext.user?.about ?? "No info provided."}
          </p>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.profile}>
          <strong className={styles.header} style={{ margin: 0 }}>
            Home Court
          </strong>
          <p className={styles.subheader}>
            {courtLabel ?? "No home court set"}
          </p>
          <Link to="/courts" className={styles.link}>
            Set Home Court
          </Link>
        </div>
      </div>
    </main>
  );
};
