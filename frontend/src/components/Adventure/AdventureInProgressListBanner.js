import style from "./AdventureInProgressListBanner.module.css";
import { Route, Routes, useNavigate } from "react-router";
import AdventureDetailPage from "../../pages/AdventurePage";
import AdventureProgressBar from "./AdventureProgressBar";
import ParticipantsCircle from "./ParticipantsCircle";
import React from "react";

import ProgressBar from "@ramonak/react-progress-bar";

function AdventureInProgressListBanner({ adventureInProgressItem }) {
  const navigate = useNavigate();
  // console.log(adventureInProgressItem);
  return (
    <div className={style.main}>
      {adventureInProgressItem && (
        <div className={style.banner}>
          <div className={style.maker}>
            <div className={style.makerProfileContainer}>
              <img
                className={style.makerProfile}
                src={adventureInProgressItem.userDetailRes.photoUrl}
                alt={"profile"}
              />
            </div>
            <div className={style.makerNameAndTierContainer}>
              {/* <span>탐험가</span> */}
              <div className={style.makerNameAndTier}>
                <span className={style.makerName}>
                  {adventureInProgressItem.userDetailRes.nickname}
                </span>
                {/* {adventureInProgressItem.userDetailRes.nickname} */}
                <img
                  className={style.userLevel}
                  src={
                    "/images/lv" +
                    adventureInProgressItem.userDetailRes.level +
                    ".png"
                  }
                  alt={"user_level"}
                />
              </div>
              <span style={{ width: "100%" }}>
                <AdventureProgressBar
                  clearRate={adventureInProgressItem.clearRate}
                />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdventureInProgressListBanner;
