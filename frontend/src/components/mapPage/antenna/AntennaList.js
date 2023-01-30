import { useState } from "react";
import AntennaListItem from "./AntennaListItem";

import styles from "./AntennaList.module.css";

function AntennaList() {
  // 안테나 개수
  const antennaCount = useState(1);
  return (
    <div className={styles.container}>
      <div className={styles.countInfo}>내 안테나 {antennaCount} / 3개</div>
      <AntennaListItem pos="강아지, 과자, 스파게티"></AntennaListItem>
      <AntennaListItem pos="플젝, 벌써, 19일"></AntennaListItem>
    </div>
  );
}

export default AntennaList;
