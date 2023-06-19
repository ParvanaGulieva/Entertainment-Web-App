import React from "react";
import styles from "./Input.module.css";
const Input = ({ name, error, register, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      <div
        className={
          error
            ? ` ${styles.inputGroup} ${styles.invalid}  `
            : styles.inputGroup
        }
      >
        <input {...props} name={name} {...register(name)} />
      </div>
      {error && <p className={styles.message}>{error.message}</p>}
    </div>
  );
};

export default Input;
