import { useState } from "react";
import AntennaListItem from "./AntennaListItem";

import "./AntennaList.css";

function AntennaList() {
  // 안테나 개수
  const antennaCount = useState(1);
  return (
    <div className="container">
      <div className="countInfo">내 안테나 {antennaCount} / 3개</div>
      <AntennaListItem pos="aa"></AntennaListItem>
      <AntennaListItem pos="bb"></AntennaListItem>
    </div>
  );
}

export default AntennaList;
