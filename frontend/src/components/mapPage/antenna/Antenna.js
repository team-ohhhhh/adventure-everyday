import AntennaBtn from "./AntennaBtn";
import AntennaList from "./AntennaList";
import styles from "./Antenna.module.css";
import { useState } from "react";

function Antenna(props) {
  const antennae = props.antennae
  
  return (
    <span className={styles.container}>
      <AntennaBtn onClick={props.toggle}></AntennaBtn>

      {props.isOn && <AntennaList antennae={antennae} setState={props.setState} toggle={props.toggle}></AntennaList>}
    </span>
  );
}

export default Antenna;
