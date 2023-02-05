import React, { useState } from "react";

import BigArticleItem from "../BigArticleItem";

import styles from "./SelectedCheckPoint.module.css";

const SelectedCheckPoint = ({ point, unSelectPost, setAdvCheckPoints }) => {
  const [checkPointInfo, setCheckPointInfo] = useState({
    title: "",
    content: "",
    coordinate: [point.lat, point.lng],
    postId: point.postId,
  });

  const handleInput = (e) => {
    setCheckPointInfo((checkPointInfo) => ({
      ...checkPointInfo,
      [e.target.name]: e.target.value,
    }));
    setAdvCheckPoints((advCheckPoints) => {
      return advCheckPoints.map((advCheckPoint) => {
        if (advCheckPoint.postId === checkPointInfo.postId) {
          return checkPointInfo;
        } else {
          return advCheckPoint;
        }
      });
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <input
          type="text"
          name="title"
          placeholder="체크포인트 이름을 설정해주세요"
          value={checkPointInfo.title}
          onChange={handleInput}
        />
        <button onClick={() => unSelectPost(point)}>삭제</button>
      </div>
      <div>
        대표
        <input
          type="checkbox"
          name="isRep"
          checked={point.isRep}
          // onChange={handleCheck}
        />
        <BigArticleItem data={point} />
      </div>
      <textarea
        type="text"
        name="content"
        placeholder="체크포인트 내용을 입력해주세요"
        value={checkPointInfo.content}
        onChange={handleInput}
      />
    </div>
  );
};

export default SelectedCheckPoint;
