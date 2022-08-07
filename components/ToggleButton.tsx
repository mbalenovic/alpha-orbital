import styles from "../styles/ToggleButton.module.css";

interface IProps {
  handleClick: () => void;
}

const ToggleButton = ({ handleClick }: IProps) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" onClick={handleClick} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default ToggleButton;
