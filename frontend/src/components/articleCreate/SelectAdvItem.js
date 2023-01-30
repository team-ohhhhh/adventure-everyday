import React from "react";
import styles from "./SelectAdvList.module.css";

const SelectAdvItem = ({ advItem, onSelect }) => {
  const handleSelect = () => {
    onSelect(advItem.isSelected, advItem.id);
  };

  return (
    <div>
      <div
        className={`${styles.advItem} ${
          advItem.isSelected ? styles.selected : ""
        }`}
        onClick={handleSelect}
      >
        {advItem.adv} - {advItem.checkpoint}
      </div>
      {/* {advItem.isSelected ? "O" : "X"} ( */}
      {/* {`${styles.advItem} ${advItem.isSelected ? styles.selected : ""}`}) */}
    </div>
  );
};

export default SelectAdvItem;
