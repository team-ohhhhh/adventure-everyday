import styles from "./AntennaListItem.module.css";

function AntennaListItem(props) {
  const antenna = props.antenna
  const setState = props.setState
  return (<div 
    onClick={()=>{setState((prev) => ({
      ...prev,
      center : {
        lat : antenna.lat,
        lng : antenna.lng
      },
      isAroundClicked : true,
      isCircle: true,
      isAntenna: props.antenna.antennaId,
      isCur: false,
    }))}}

  className={styles.item}
  >{antenna.w3w}</div>)
}

export default AntennaListItem;
