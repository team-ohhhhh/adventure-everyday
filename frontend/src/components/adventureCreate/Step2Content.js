import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AdventureMap from "./AdventureMap";

import styles from "./Step2Content.module.css";
import styles2 from "../../pages/ArticleCreatePage.module.css";
import styles3 from "./Step1CheckPoint.module.css";
import { AiOutlineClose } from "react-icons/ai";

const Step2Content = ({ checkpoints, adventure, setAdventure }) => {
  const navigate = useNavigate();

  const categories = [
    { value: "여행", name: "여행" },
    { value: "맛집", name: "맛집" },
    { value: "추억", name: "추억" },
    { value: "운동", name: "운동" },
    { value: "취미", name: "취미" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInput = (e) => {
    setAdventure((adventure) => ({
      ...adventure,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (e) => {
    setAdventure((adventure) => ({
      ...adventure,
      category: e.target.value,
    }));
  };

  const handleQuit = () => {
    if (checkpoints.length > 0) {
      const answer = window.confirm(
        "작성 중인 내용은 저장되지 않습니다. 작성을 취소하고 나가시겠습니까?"
      );
      if (answer) {
        navigate(-2);
      }
    } else {
      navigate(-2);
    }
  };

  const handleNext = () => navigate("/adventure/create/3");

  return (
    <>
      <div className={styles2.closeContainer}>
        <AiOutlineClose onClick={handleQuit} size={35} />
      </div>

      <h1 className={styles2.header} style={{ marginTop: "1rem" }}>
        탐험 생성
      </h1>

      <div className={styles.infoContainer}>
        <div className={styles.subContainer}>
          <h2 className={styles.subHeader}>내 탐험지도</h2>
          <AdventureMap checkpoints={checkpoints} />
        </div>

        <div className={styles.subContainer}>
          <h2 className={styles.subHeader}>탐험 카테고리</h2>
          <select onChange={handleSelect}>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.subContainer}>
          <h2 className={styles.subHeader}>탐험 기간</h2>
          <DatePicker
            selectsRange={true}
            startDate={adventure.startDate}
            endDate={adventure.endDate}
            onChange={(update) => {
              setAdventure((adventure) => ({
                ...adventure,
                startDate: update[0],
                endDate: update[1],
              }));
            }}
            withPortal
          />
        </div>

        <div className={styles.subContainer}>
          <h2 className={styles.subHeader}>탐험 소개</h2>
          <input
            type="text"
            name="title"
            placeholder="탐험의 제목을 입력하세요"
            value={adventure.title}
            onChange={handleInput}
          />
          <br />
          <textarea
            type="text"
            name="content"
            placeholder="탐험에 대한 설명을 입력하세요"
            value={adventure.content}
            onChange={handleInput}
          />
          <br />
        </div>
      </div>

      <div className={styles2.btnContainer}>
        <div className={styles2.whiteBtn} onClick={() => navigate(-1)}>
          이전
        </div>
        <div className={styles2.blueBtn} onClick={handleNext}>
          다음
        </div>
      </div>
    </>
  );
};

export default Step2Content;
