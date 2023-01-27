import AntennaBtn from "./AntennaBtn";
import AntennaList from "./AntennaList";
import "./Antenna.css";
import { useState } from "react";

function Antenna() {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className="aa">
      <AntennaBtn setIsOn={setIsOn}></AntennaBtn>

      {isOn && <AntennaList></AntennaList>}
    </div>
  );
}

export default Antenna;
