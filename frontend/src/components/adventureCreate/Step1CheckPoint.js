import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdventureMap from "./AdventureMap";
import SelectedCheckPoint from "./SelectedCheckPoint";
import SelectPostModal from "./SelectPostModal";

import styles from "./Step1CheckPoint.module.css";

const Step1CheckPoint = ({
  checkPoints,
  setCheckPoints,
  advCheckPoints,
  setAdvCheckPoints,
}) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const count = useMemo(() => {
    // console.log(setCheckPoints);
    return checkPoints && checkPoints.length;
  }, [checkPoints]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };

  const selectPost = (post) => {
    // console.log("닫기!", post);
    const check = checkPoints.every((point) => {
      return point.postId !== post.postId;
    });
    if (check) {
      setCheckPoints((checkPoints) => [...checkPoints, post]);
      closeModal();
      const newCheckPoint = {
        title: "",
        content: "",
        coordinate: [post.lat, post.lng],
        postId: post.postId,
      };
      setAdvCheckPoints((advCheckPoints) => [...advCheckPoints, newCheckPoint]);
    } else {
      alert("이미 선택한 게시글입니다.");
    }
  };

  const unSelectPost = (post) => {
    const newCheckPoints = checkPoints.filter((point) => {
      return point.postId !== post.postId;
    });
    setCheckPoints(newCheckPoints);
    const newAdvCheckPoints = advCheckPoints.filter((point) => {
      return point.postId !== post.postId;
    });
    setAdvCheckPoints(newAdvCheckPoints);
  };

  return (
    <>
      <h1>탐험 생성</h1>

      <p>탐험으로 만들 내 글을 선택하세요!</p>
      <p>게시글은 최대 5개까지 선택할 수 있습니다.</p>

      <p>현재 체크포인트 개수 {count}/5</p>

      {checkPoints.map((point) => (
        <SelectedCheckPoint
          key={point.postId}
          point={point}
          unSelectPost={unSelectPost}
          setCheckPoints={setCheckPoints}
        />
      ))}

      <div className={styles.addBox} onClick={openModal}>
        체크포인트 추가
      </div>

      <AdventureMap checkPoints={checkPoints} />

      <div>이 탐험의 난이도</div>

      <button onClick={() => navigate(-1)}>취소</button>
      <button onClick={() => navigate("/adventure/create/2")}>다음</button>

      {showModal && (
        <SelectPostModal closeModal={closeModal} selectPost={selectPost} />
      )}
    </>
  );
};

export default Step1CheckPoint;
