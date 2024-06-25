/* eslint-disable no-unused-vars */
import styles from "./Button.module.css";
function Button({ children, onClick, type }) {
  return (
    <div className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default Button;
