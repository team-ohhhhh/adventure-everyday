import styles from "./AntennaBtn.module.css";
function AntennaBtn(props) {
  return (
    <>
      <button className={styles.AntennaBtn} onClick={props.onClick}>
        <img src="images/antennaBtn.png"></img>
      </button>
    </>
  );
}

export default AntennaBtn;
