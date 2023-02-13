import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import style from "./NavBar.module.css";

const NavBar = () => {
  const USER = useSelector((state) => state.user);

  const navigate = useNavigate();

  const defaultStyle = { color: "black", fontWeight: "normal" };
  const [feedTab, setFeedTab] = useState(defaultStyle);
  const [mapTab, setMapTab] = useState(defaultStyle);
  const [adventureTab, setAdventureTab] = useState(defaultStyle);
  const [profileTab, setProfileTab] = useState(defaultStyle);

  const setAllBlack = function () {
    setFeedTab(defaultStyle);
    setMapTab(defaultStyle);
    setAdventureTab(defaultStyle);
    setProfileTab(defaultStyle);
  };

  return (
    <nav className={style.wrapper}>
      <div className={style.container}>
        <div
          className={style.tab}
          style={{
            color: `${feedTab.color}`,
            fontWeight: `${feedTab.fontWeight}`,
          }}
          onClick={() => {
            navigate("/feed");
            setAllBlack();
            setFeedTab({ color: "#1C0B69", fontWeight: "bold" });
          }}
        >
          피드
        </div>
        <div
          className={style.tab}
          style={{
            color: `${mapTab.color}`,
            fontWeight: `${mapTab.fontWeight}`,
          }}
          onClick={() => {
            navigate("/map");
            setAllBlack();
            setMapTab({ color: "#1C0B69", fontWeight: "bold" });
          }}
        >
          지도
        </div>
        <div className={style.tab}>
          {/* 센터 맞추려고 공백 넣은 것 */}
          &nbsp;&nbsp;&nbsp;
        </div>
        <div className={style.writeButtonContainer}>
          <div
            className={style.writeButton}
            onClick={() => {
              navigate("/write");
              setAllBlack();
            }}
          >
            <img
              className={style.writeImg}
              src="/images/writeBtn.png"
              alt="writeBtn"
            />
          </div>
        </div>
        <div
          className={style.tab}
          style={{
            color: `${adventureTab.color}`,
            fontWeight: `${adventureTab.fontWeight}`,
          }}
          onClick={() => {
            navigate("/adventure");
            setAllBlack();
            setAdventureTab({ color: "#1C0B69", fontWeight: "bold" });
          }}
        >
          탐험
        </div>
        <div
          className={style.tab}
          style={{
            color: `${profileTab.color}`,
            fontWeight: `${profileTab.fontWeight}`,
          }}
          onClick={() => {
            navigate(`/profile/${USER.userId}`);
            setAllBlack();
            setProfileTab({ color: "#1C0B69", fontWeight: "bold" });
          }}
        >
          프로필
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
