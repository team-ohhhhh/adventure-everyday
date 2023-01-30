import React from "react";
import styles from "./SelectAdvList.module.css";

const SelectAdvItem = (props) => {
  const advItem = props.advItem;

  return (
    <div
      className={
        styles.advItem + ` ${advItem.selected ? styles.selectedAdvItem : ""}`
      }
      onClick={() => {
        props.onSelect(advItem.id);
      }}
    >
      {advItem.adv} - {advItem.checkpoint}
    </div>
  );
};

export default SelectAdvItem;
