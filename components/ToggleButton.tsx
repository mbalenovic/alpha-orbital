import styles from "../styles/ToggleButton.module.css";

const ToggleButton = () => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default ToggleButton;
