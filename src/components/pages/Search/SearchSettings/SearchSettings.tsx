import { SubmitHandler, useFormContext } from "react-hook-form";
import { UserSearchFilter } from "../../../../types/UserSearchFilter";
import { RangeInput } from "./RangeInput";
import styles from "./SearchSettings.module.css";

export const SearchSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<UserSearchFilter>();

  const submitForm: SubmitHandler<UserSearchFilter> = (
    data: UserSearchFilter,
    e?: React.BaseSyntheticEvent<object, HTMLFormElement, HTMLFormElement>
  ): void => {
    e?.preventDefault();
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={styles.container} onSubmit={handleSubmit(submitForm)}>
      <strong className={styles.heading}>Filters</strong>
      <RangeInput />
      <div className={styles.match}>
        <input
          className={`${styles.checkbox} ${styles.checkboxmatch}`}
          type="checkbox"
          {...register("matchingHomeCourt")}
        />
        <label htmlFor="matchingHomeCourt">Match your home court</label>
      </div>
      {(errors.minNtrp || errors.maxNtrp) && (
        <div className={styles.errors}>Invalid NTRP range</div>
      )}
      <button className={styles.submit} type="submit">
        Apply filters
      </button>
    </form>
  );
};
