import AntennaBtn from "./AntennaBtn";
import AntennaList from "./AntennaList";
import styles from "./Antenna.module.css";
import { useState } from "react";

function Antenna(props) {
  const [isOn, setIsOn] = useState(false);

  const antennae = props.antennae

  function toggle() {
    setIsOn((prev) => !prev);
  }
  return (
    <div className={styles.container}>
      <AntennaBtn onClick={toggle}></AntennaBtn>

      {isOn && <AntennaList antennae={antennae} setState={props.setState}></AntennaList>}
    </div>
  );
}

export default Antenna;
