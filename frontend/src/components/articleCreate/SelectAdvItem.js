import React from "react";
import styles from "./SelectAdvList.module.css";

const SelectAdvItem = ({ advItem, onSelect }) => {
  return (
    <div>
      <div
        className={`${styles.advItem} ${
          advItem.isSelected ? styles.selected : ""
        }`}
        onClick={() => {
          onSelect(advItem.isSelected, advItem.id);
        }}
      >
        {advItem.adv} - {advItem.checkpoint}
      </div>
    </div>
  );
};

export default SelectAdvItem;
