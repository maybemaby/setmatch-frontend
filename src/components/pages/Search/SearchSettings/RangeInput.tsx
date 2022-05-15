import { useFormContext } from "react-hook-form";
import { UserSearchFilter } from "../../../../types/UserSearchFilter";
import styles from "./SearchSettings.module.css";

export const RangeInput = () => {
  const { register, watch, getValues } = useFormContext<UserSearchFilter>();
  const useNtrp = watch("useNtrp", true);

  const handleMinValidate = (value: number) => {
    return value <= (getValues().maxNtrp ?? Infinity);
  };

  const handleMaxValidate = (value: number) =>
    value >= (getValues().minNtrp ?? 0);

  return (
    <div className={styles.rangeInputContainer}>
      <div className={styles.ranges}>
        <fieldset>
          <label htmlFor="minNtrp">Lowest Rating</label>
          <select
            className={styles.rangeField}
            {...register("minNtrp", {
              disabled: useNtrp,
              valueAsNumber: true,
              min: 1.5,
              max: 6.5,
              validate: (value) => handleMinValidate(value ?? 1.5),
            })}
          >
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
          </select>
        </fieldset>
        -
        <fieldset>
          <label htmlFor="maxNtrp">Highest Rating</label>
          <select
            className={styles.rangeField}
            defaultValue={"7.0"}
            {...register("maxNtrp", {
              disabled: useNtrp,
              valueAsNumber: true,
              min: 2.0,
              max: 7.0,
              validate: (value) => handleMaxValidate(value ?? 7),
            })}
          >
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
        </fieldset>
      </div>
      <div>
        <input
          className={styles.checkbox}
          type="checkbox"
          defaultChecked={true}
          {...register("useNtrp")}
        />
        <label htmlFor="useNtrp">Allow Unrated</label>
      </div>
    </div>
  );
};
