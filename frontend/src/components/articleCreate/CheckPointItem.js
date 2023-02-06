import React from "react";

import styles from "./CheckPointItem.module.css";

const CheckPointItem = ({ checkpoint, onSelect }) => {
  return (
    <div>
      <div
        className={`${styles.advItem} ${
          checkpoint.isSelected ? styles.selected : ""
        }`}
        onClick={() => {
          onSelect(checkpoint.isSelected, checkpoint.id);
        }}
      >
        {checkpoint.adv} - {checkpoint.checkpoint}
      </div>
    </div>
  );
};

export default CheckPointItem;
