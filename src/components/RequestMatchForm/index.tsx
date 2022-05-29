import React, { useState, useContext, useEffect } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-select";
import type { SingleValue } from "react-select";
import { useCourts } from "../../hooks/useCourts";
import { UserContext } from "../UserProvider/UserProvider";
import styles from "./RequestForm.module.css";
import { useAccessToken } from "../../hooks/useAccessToken";
import { useRequestManager } from "../../hooks/useRequestManager";
import { ICourt } from "../../types/ICourt";
import { Loader } from "../Loader/Loader";

export interface RequestFormData {
  scheduledDate: Date;
  courtName: string;
  message: string;
}

export const RequestMatchForm = ({
  submitHandler,
  afterSuccess,
}: {
  submitHandler?: SubmitHandler<RequestFormData>;
  afterSuccess?: () => void;
}) => {
  const params = useParams();
  const userContext = useContext(UserContext);
  const authToken = useAccessToken();
  const { postMutation } = useRequestManager({
    userId: userContext?.user?.id,
    authToken: authToken ?? undefined,
    post: {
      onSuccess: afterSuccess,
    },
  });
  const [chosenCourt, setChosenCourt] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RequestFormData>();
  const { data, isLoading } = useCourts(authToken, undefined, undefined, 100);

  const submitForm: SubmitHandler<RequestFormData> = async (data, e) => {
    console.log(data);
    const receiver = params.userId;
    const sender = userContext?.user?.id;
    if (chosenCourt && receiver && sender) {
      await postMutation.mutateAsync({
        dto: {
          courtId: chosenCourt,
          message: data.message,
          senderId: sender,
          receiverId: receiver,
          scheduledDate: data.scheduledDate,
        },
        authToken: authToken ?? undefined,
      });
    }
  };

  const handleChooseCourt = (court: SingleValue<ICourt>) => {
    if (court) {
      setChosenCourt(court.id);
    }
  };

  return (
    <form
      className={styles.container}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(submitForm)}
    >
      <fieldset className={`${styles.fieldsetCol} ${styles.dropdownContainer}`}>
        <label htmlFor="courtName">Court</label>
        <Controller
          name="courtName"
          control={control}
          rules={{ required: "Must provide a court" }}
          render={({ field }) => (
            <Select
              options={data}
              getOptionLabel={(court: ICourt) => court.name}
              getOptionValue={(court: ICourt) => court.id}
              isLoading={isLoading}
              isSearchable={true}
              onChange={(value) => {
                field.onChange(value?.name);
                handleChooseCourt(value);
              }}
              placeholder="Search by name"
            />
          )}
        ></Controller>
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
      <fieldset className={styles.fieldsetCol}>
        <label htmlFor="message">Message</label>
        <textarea
          className={styles.messageBox}
          id="message"
          placeholder="Send a greeting!"
          {...register("message", {
            maxLength: 300,
          })}
        ></textarea>
        {errors.message && (
          <div className={styles.errors}>{errors.message.message}</div>
        )}
      </fieldset>
      <button className={styles.submit} type="submit">
        Request the match
      </button>
      <div>
        {postMutation.isLoading && (
          <Loader
            horizontal={true}
            size={"20px"}
            message={"Sending request..."}
          />
        )}
      </div>
      {postMutation.isError && (
        <div className={styles.errors}>
          Encountered an error submitting request
        </div>
      )}
    </form>
  );
};
