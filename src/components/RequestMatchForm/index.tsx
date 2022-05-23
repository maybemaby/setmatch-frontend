import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./RequestForm.module.css";

export interface RequestFormData {
  scheduledDate: Date;
  courtName: string;
}

export const RequestMatchForm = ({
  submitHandler,
}: {
  submitHandler: SubmitHandler<RequestFormData>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestFormData>();

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={styles.container} onSubmit={handleSubmit(submitHandler)}>
      <fieldset className={styles.fieldsetCol}>
        <label htmlFor="courtName">Court</label>
        <input
          className={styles.search}
          id="courtName"
          type="search"
          {...register("courtName", {
            required: "Must provide a court to play at.",
          })}
        />
        {errors.courtName && (
          <div className={styles.errors}>{errors.courtName.message}</div>
        )}
      </fieldset>
      <fieldset className={styles.fieldsetCol}>
        <label htmlFor="scheduledDate">Scheduled Time</label>
        <input
          className={styles.datePicker}
          type="datetime-local"
          {...register("scheduledDate", {
            required: "Must provide a date to play.",
            valueAsDate: true,
            validate: {
              minDate: (value) =>
                value > new Date() ? true : "Date must be later than now.",
            },
          })}
        />
        {errors.scheduledDate && (
          <div className={styles.errors}>{errors.scheduledDate.message}</div>
        )}
      </fieldset>
      <button className={styles.submit} type="submit">
        Request the match
      </button>
    </form>
  );
};
