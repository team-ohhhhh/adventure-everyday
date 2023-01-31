import styles from "./AntennaListItem.module.css";

function AntennaListItem(props) {
  return <div className={styles.item}>{props.pos}</div>;
}

export default AntennaListItem;
