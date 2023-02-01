import React from "react";

import UserPostMap from "./UserPostMap";

import styles from "./SelectPostModal.module.css";

const SelectPostModal = ({ closeModal }) => {
  return (
    <div className={styles.modalWrap}>
      <button onClick={closeModal}>close</button>
      select post
      <UserPostMap />
    </div>
  );
};

export default SelectPostModal;
