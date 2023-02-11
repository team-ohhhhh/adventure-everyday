import styles from "./AntennaListItem.module.css";

function AntennaListItem(props) {
  const antenna = props.antenna
  const setState = props.setState
  return (<div 
    onClick={()=>{
      setState((prev) => ({
      ...prev,
      center : {
        lat : antenna.lat,
        lng : antenna.lng
      },
      isAround : false,
      isCircle: true,
      isAntenna: props.antenna.antennaId,
      isCur: false,
    }))

    //TODO: 안테나 목록에서 안테나 주소 하나 클릭시, 목록을 닫아야할까 말까
    props.toggle()
  }}

  className={styles.item}
  >{antenna.w3w}</div>)
}

export default AntennaListItem;
