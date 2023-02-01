import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdventureMap from "./AdventureMap";

import styles from "./Step1CheckPoint.module.css";

const Step1CheckPoint = () => {
  const navigate = useNavigate();

  const [checkPoints, setCheckPoints] = useState([
    {
      title: "title1",
      content: "강남구청역",
      lat: 37.517186,
      lng: 127.04128,
      postId: 1,
    },
    {
      title: "title2",
      content: "멀티캠퍼스",
      lat: 37.50128745884959,
      lng: 127.03956225524968,
      postId: 2,
    },
    {
      title: "title3",
      content: "건대입구역",
      lat: 37.540693,
      lng: 127.07023,
      postId: 3,
    },
  ]);

  const count = useMemo(() => {
    return checkPoints && checkPoints.length;
  }, [checkPoints]);

  return (
    <div>
      <p>탐험으로 만들 내 글을 선택하세요!</p>
      <p>게시글은 최대 5개까지 선택할 수 있습니다.</p>

      <p>현재 체크포인트 개수 {count}/5</p>

      <div className={styles.addBox}>체크포인트 추가</div>

      <AdventureMap checkPoints={checkPoints} />

      <button onClick={() => navigate(-1)}>취소</button>
      <button onClick={() => navigate("/adventure/create/2")}>다음</button>
    </div>
  );
};

export default Step1CheckPoint;
