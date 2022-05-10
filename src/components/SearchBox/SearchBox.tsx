import React from "react";
import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  placeholder?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchBox = ({
  placeholder,
  value,
  onChange,
  onKeyDown,
}: SearchBoxProps) => {
  return (
    <input
      className={styles.container}
      type="search"
      placeholder={placeholder ?? "Search"}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    ></input>
  );
};
