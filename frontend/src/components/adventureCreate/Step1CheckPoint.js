import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdventureMap from "./AdventureMap";
import SelectedCheckPoint from "./SelectedCheckPoint";
import SelectPostModal from "./SelectPostModal";

import styles from "./Step1CheckPoint.module.css";

const Step1CheckPoint = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
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
    // console.log(setCheckPoints);
    return checkPoints && checkPoints.length;
  }, [checkPoints]);

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <p>탐험으로 만들 내 글을 선택하세요!</p>
      <p>게시글은 최대 5개까지 선택할 수 있습니다.</p>

      <p>현재 체크포인트 개수 {count}/5</p>

      {checkPoints.map((point) => (
        <SelectedCheckPoint key={point.postId} point={point} />
      ))}

      <div className={styles.addBox} onClick={openModal}>
        체크포인트 추가
      </div>

      <AdventureMap checkPoints={checkPoints} />

      <button onClick={() => navigate(-1)}>취소</button>
      <button onClick={() => navigate("/adventure/create/2")}>다음</button>

      {showModal && <SelectPostModal closeModal={closeModal} />}
    </>
  );
};

export default Step1CheckPoint;
