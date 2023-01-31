import { useState } from "react";
import AntennaListItem from "./AntennaListItem";

import styles from "./AntennaList.module.css";

function AntennaList(props) {
  // 안테나 개수
  // const antennaCount = useState(1);
  const antennae = props.antennae
  return (
    <div className={styles.container}>
      <div className={styles.countInfo}>내 안테나 {antennae.length} / 3개</div>
      {antennae.map((antenna) => {
        return(
          <AntennaListItem antenna={antenna} setState={props.setState}></AntennaListItem>
        )
      })}
      
    </div>
  );
}

export default AntennaList;
