import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Step1CheckPoint from "../components/adventureCreate/Step1CheckPoint";
import Step2Content from "../components/adventureCreate/Step2Content";
import Step3Badge from "../components/adventureCreate/Step3Badge";
import Step4Done from "../components/adventureCreate/Step4Done";

import styles from "./ArticleCreatePage.module.css";

const AdventureCreatePage = () => {
  const [adventure, setAdventure] = useState({
    category: "여행",
    feat: "",
    title: "",
    content: "",
    difficulty: null,
    exp: null,
    startDate: null,
    endDate: null,
    RepresentativePostId: null,
    createAdventurePlaceReqs: [],
  });
  const [checkpoints, setCheckpoints] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className={styles.pageContainer}>
      <Routes>
        <Route
          path=""
          element={
            <Step1CheckPoint
              myPosts={myPosts}
              setMyPosts={setMyPosts}
              checkpoints={checkpoints}
              setCheckpoints={setCheckpoints}
              adventure={adventure}
              setAdventure={setAdventure}
            />
          }
        />
        <Route
          path="2"
          element={
            <Step2Content
              checkpoints={checkpoints}
              adventure={adventure}
              setAdventure={setAdventure}
              startDate={startDate}
              endDate={endDate}
              setDateRange={setDateRange}
            />
          }
        />
        <Route
          path="3"
          element={
            <Step3Badge
              adventure={adventure}
              setAdventure={setAdventure}
              checkpoints={checkpoints}
            />
          }
        />
        <Route path="4" element={<Step4Done />} />
      </Routes>
    </div>
  );
};

export default AdventureCreatePage;
