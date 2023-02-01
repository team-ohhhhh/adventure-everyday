import { useState } from "react";
import AntennaListItem from "./AntennaListItem";

import styles from "./AntennaList.module.css";

function AntennaList(props) {
  // 안테나 개수
  // const antennaCount = useState(1);
  return (
    <div className={styles.container}>
      <div className={styles.countInfo}>내 안테나 {props.antennae && props.antennae.length} / 3개</div>
      {props.antennae.map((antenna) => {
        return(
          <AntennaListItem antenna={antenna} setState={props.setState}></AntennaListItem>
        )
      })}
      
    </div>
  );
}

export default AntennaList;
