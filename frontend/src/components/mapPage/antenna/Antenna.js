import AntennaBtn from "./AntennaBtn";
import AntennaList from "./AntennaList";
import styles from "./Antenna.module.css";
import { useState } from "react";

function Antenna() {
  const [isOn, setIsOn] = useState(false);
  function toggle() {
    setIsOn((prev) => !prev);
  }
  return (
    <div className={styles.container}>
      <AntennaBtn onClick={toggle}></AntennaBtn>

      {isOn && <AntennaList></AntennaList>}
    </div>
  );
}

export default Antenna;
