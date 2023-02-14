import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdventureBanner from "../Adventure/AdventureBanner";
import AdventureEmpty from "./AdventureEmpty";

import style from "./AdventureOnProgressTab.module.css";

function AdventureFinishedTab({ userId, tab, isMe }) {
  const [adventureList, setAdventureList] = useState([]);
  const URL = useSelector((state) => state.url);
  const TOKEN = useSelector((state) => state.token);

  const navigate = useNavigate();

  const orders = [
    { value: "createTimeDesc", name: "최신순" },
    { value: "userCountDesc", name: "참여자순" },
    { value: "difficultyAsc", name: "쉬운순" },
    { value: "difficultyDesc", name: "어려운순" },
  ];

  const handleSelect = (e) => {
    getAdventures(e.target.value);
  };

  const getAdventures = function (order) {
    axios({
      url: URL + `/adventures/clicks/adventure-succeed/users/${userId}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        order,
      },
    })
      .then((res) => {
        // console.log(res);
        setAdventureList(res.data.result.adventureSucceeds);
      })
      .catch((err) => console.log(err));
  };

  useMemo(() => {
    if (tab === 3) {
      getAdventures("createTimeDesc");
    }
  }, [tab]);

  return (
    <div className={style.container}>
      {/* 드롭박스 */}
      <div className={style.selectContainer}>
        <select className={style.select} onChange={handleSelect}>
          {orders.map((order) => (
            <option
              // className={style.option}
              key={order.value}
              value={order.value}
            >
              {order.name}
            </option>
          ))}
        </select>
      </div>

      {/* 모험 목록 */}
      {adventureList.length > 0 ? (
        adventureList.map((adventureItem) => (
          <div
            className={style.adventureItem}
            key={`fi-${adventureItem.adventureId}`}
          >
            <AdventureBanner
              adventureItem={adventureItem} /*isInProgress={isInProgress}*/
            />
          </div>
        ))
      ) : (
        <div onClick={() => navigate("/adventure")}>
          <AdventureEmpty
            text={"탐험을 완료하고 보물을 수집하세요!"}
            isMe={isMe}
          />
        </div>
      )}
    </div>
  );
}

export default AdventureFinishedTab;
