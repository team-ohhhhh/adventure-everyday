import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

import style from "./AdventureProgressBar.module.css";

const AdventureProgressBar = ({ clearRate }) => {
  return (
    <div className={style.container}>
      <ProgressBar
        completed={clearRate}
        height={"10"}
        labelAlignment="outside"
        labelColor="#39D8F6"
        bgColor="#39D8F6"
      />
    </div>
  );
};

export default AdventureProgressBar;
