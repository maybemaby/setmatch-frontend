import { useParams, Link } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { useAccessToken } from "../../../hooks/useAccessToken";
import { useUser } from "../../../hooks/useUser";
import { Loader } from "../../Loader/Loader";
import styles from "./Profile.module.css";
import { useCallback, useState } from "react";
import { Modal } from "../../Modal/Modal";
import { RequestMatchForm } from "../../RequestMatchForm";

export const OtherProfile = () => {
  const { userId } = useParams();
  const authToken = useAccessToken();
  const { data, isLoading, isError } = useUser(authToken, userId ?? "");
  const [isOpen, setIsOpen] = useState(false);

  const handleModalToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <main className={styles.container}>
      <Modal isOpen={isOpen} changeState={handleModalToggle}>
        <div style={{ fontSize: "1.1rem" }}>
          Match Details
          <RequestMatchForm afterSuccess={() => setIsOpen(false)} />
        </div>
      </Modal>
      {isLoading && (
        <div className="centered">
          <Loader size="100px" message="Loading..." horizontal={false} />
        </div>
      )}

      {isError && <div className="centered">Error retrieving profile</div>}
      <Link to="/search" className={styles.backButton}>
        <BsChevronLeft size={15} />
        Back to list
      </Link>
      <div className={styles.profile}>
        <div className={styles.info}>
          <div className={styles.picture}></div>
          <div className={styles.rightProfile}>
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
            <button onClick={handleModalToggle} className={styles.matchRequest}>
              Request Match
            </button>
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
