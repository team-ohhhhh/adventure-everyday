import React, { useState } from "react";
import style from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const USER = useSelector((state) => state.user);
  const [feedTab, setFeedTab] = useState("black");
  const [mapTab, setMapTab] = useState("black");
  const [adventureTab, setAdventureTab] = useState("black");
  const [profileTab, setProfileTab] = useState("black");

  const navigate = useNavigate();

  const setAllBlack = function () {
    setFeedTab("black");
    setMapTab("black");
    setAdventureTab("black");
    setProfileTab("black");
  };

  return (
    <nav className={style.wrapper}>
      <div className={style.container}>
        <div
          className={style.tab}
          style={{ color: `${feedTab}` }}
          onClick={() => {
            navigate("/feed");
            setAllBlack();
            setFeedTab("#1C0B69");
          }}
        >
          피드
        </div>
        <div
          className={style.tab}
          style={{ color: `${mapTab}` }}
          onClick={() => {
            navigate("/map");
            setAllBlack();
            setMapTab("#1C0B69");
          }}
        >
          지도
        </div>
        <div className={style.tab} style={{ color: `${mapTab}` }}>
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
          style={{ color: `${adventureTab}` }}
          onClick={() => {
            navigate("/adventure");
            setAllBlack();
            setAdventureTab("#1C0B69");
          }}
        >
          탐험
        </div>
        <div
          className={style.tab}
          style={{ color: `${profileTab}` }}
          onClick={() => {
            //TODO: variable routing으로 자기유저pk 넣어주기 (redux에 저장해두고 쓰기, 로그인시에 받아오기)
            navigate(`/profile/${USER.userId}`);
            setAllBlack();
            setProfileTab("#1C0B69");
          }}
        >
          프로필
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
