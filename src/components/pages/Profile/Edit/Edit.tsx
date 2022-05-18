import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAccessToken } from "../../../../hooks/useAccessToken";
import { useUpdateUser } from "../../../../hooks/useUpdateUser";
import { Loader } from "../../../Loader/Loader";
import { UserContext } from "../../../UserProvider/UserProvider";
import styles from "./Edit.module.css";

interface EditUserForm {
  about?: string;
  ntrpRating?: number;
  ratingEstimated?: boolean;
}

export const Edit = () => {
  const [globalError, setGlobalError] = useState("");
  const navigate = useNavigate();
  const authToken = useAccessToken();
  const userContext = useContext(UserContext);
  const mutation = useUpdateUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EditUserForm>();

  const submitUpdate = async (data: EditUserForm) => {
    if (userContext?.user && authToken) {
      await mutation.mutateAsync({
        authToken: authToken,
        id: userContext?.user?.id,
        dto: {
          firstName: userContext?.user?.firstName,
          lastName: userContext?.user?.lastName,
          username: userContext?.user?.username,
          homeCourtId: userContext.user.homeCourt?.id,
          about: data.about,
          ntrpRating: data.ntrpRating === 0 ? undefined : data.ntrpRating,
          ratingEstimated: data.ratingEstimated,
        },
      });
    } else {
      setGlobalError("Couldn't authorize changes, try refreshing.");
    }
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate("/profile");
    }
  }, [mutation]);

  return (
    <main className={styles.page}>
      {globalError && <div className={styles.alert}>{globalError}</div>}
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className={styles.form} onSubmit={handleSubmit(submitUpdate)}>
        <h1 style={{ alignSelf: "center", fontSize: "1.1rem" }}>
          Edit Profile
        </h1>
        <fieldset className={styles.field}>
          <label htmlFor="about">About</label>
          <textarea
            className={styles.textLarge}
            id="about"
            {...register("about", {
              value: userContext?.user?.about,
              maxLength: 300,
            })}
          />
          {errors.about && <div>{errors.about.message}</div>}
        </fieldset>

        <fieldset className={styles.field}>
          <label htmlFor="rating">Ntrp Rating</label>
          <select
            className={styles.selector}
            id="rating"
            {...register("ntrpRating", {
              value: userContext?.user?.ntrpRating,
              valueAsNumber: true,
              min: 1.5,
              max: 7.0,
            })}
            defaultValue={userContext?.user?.ntrpRating}
          >
            <option value="0">Not set</option>
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
          {errors.ntrpRating && <div>{errors.ntrpRating.message}</div>}
        </fieldset>
        <fieldset>
          <input
            id="ratingestimated"
            type="checkbox"
            {...register("ratingEstimated", {
              value: userContext?.user?.ratingEstimated,
            })}
          />
          <label htmlFor="ratingEstimated">Rating Estimated</label>
        </fieldset>
        <div
          style={{
            display: "flex",
            gap: "10px",
            height: "fit-content",
            alignItems: "center",
          }}
        >
          <button className={styles.primaryBtn} type="submit">
            Finish
          </button>
          {mutation.isLoading && (
            <Loader message="Submitting..." size="25px" horizontal={true} />
          )}
        </div>
      </form>
    </main>
  );
};
