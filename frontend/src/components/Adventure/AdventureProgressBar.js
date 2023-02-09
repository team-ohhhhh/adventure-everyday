import React from "react";
import style from "./AdventureProgressBar.module.scss";
import ProgressBar from "@ramonak/react-progress-bar";

const AdventureProgressBar = ({clearRate}) => {
  return <ProgressBar 
  completed={clearRate} 
  // className="wrapper"
  // barContainerClassName="container"
  // completedClassName="barCompleted"
  // labelClassName="label"
  labelAlignment="outside"
  labelColor="#39D8F6"
  bgColor="#39D8F6"
  />;
};

export default AdventureProgressBar;
