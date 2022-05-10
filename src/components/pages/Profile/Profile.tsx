import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserProvider/UserProvider";
import { Loader } from "../../Loader/Loader";
import styles from "./Profile.module.css";

export const Profile = () => {
  const userContext = useContext(UserContext);
  const [rating, setRating] = useState(userContext?.user?.ntrpRating);

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
        <Loader message="Loading..." size="100px"></Loader>;
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.picture}></div>
        <h2 className={styles.name}>
          {userContext.user.firstName} {userContext.user.lastName}
          <br />
          <span style={{ fontSize: "1.2rem" }}>
            {"Member Since: " +
              new Date(userContext.user.signupDate).toLocaleDateString()}
          </span>
        </h2>
      </div>
      <div className={styles.details}>
        <p className={styles.header}>About</p>
        <textarea
          className={styles.about}
          name="about"
          id="about-text"
          placeholder={
            userContext.user.about ??
            "Update your about section to let people know about yourself!"
          }
          maxLength={300}
        ></textarea>
        <div className={styles.topDetails}>
          <div
            className={styles.details}
            style={{ marginTop: "10px", width: "fit-content" }}
          >
            <label htmlFor="ntrpRating" style={{ fontSize: "1.1rem" }}>
              NTRP Rating
            </label>
            <select
              name="ntrpRating"
              id="ntrpRating"
              className={styles.rating}
              defaultValue={rating?.toPrecision(1).toString() ?? "1.5"}
            >
              <option value="none">None</option>
              <option value="1.5">1.5</option>
              <option value="2.0">2.0</option>
              <option value="2.5">2.5</option>
              <option value="3.0">3.0</option>
              <option value="3.5">3.5</option>
              <option value="4.0">4.0</option>
              <option value="4.5">4.5</option>
              <option value="5.0">5.0</option>
              <option value="5.5">5.5</option>
              <option value="6.0">6.0</option>
              <option value="6.5">6.5</option>
              <option value="7.0">7.0</option>
            </select>
            <div
              style={{
                fontSize: "1.1rem",
                marginBottom: "10px",
                display: "flex",
                gap: "5px",
              }}
            >
              <label htmlFor="estimated">Estimated</label>
              <input type="checkbox" name="estimated" id="estimated" />
            </div>
          </div>
          <div className={styles.homeCourt}>
            <strong className={styles.header} style={{ margin: 0 }}>
              Home Court
            </strong>
            <p>{courtLabel ?? "No home court set"}</p>
            <Link to="/courts" className={styles.link}>
              Set Home Court
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
