import React, { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import AdventureMap from "./AdventureMap";

import styles from "./Step2Content.module.css";
import styles2 from "../../pages/ArticleCreatePage.module.css";
import styles3 from "./CheckPointItem.module.css";
import { AiOutlineClose } from "react-icons/ai";
import "./DatepickerCustom.css";

const Step2Content = ({ checkpoints, adventure, setAdventure }) => {
  const navigate = useNavigate();

  const categories = [
    { value: "여행", name: "여행" },
    { value: "맛집", name: "맛집" },
    { value: "추억", name: "추억" },
    { value: "운동", name: "운동" },
    { value: "취미", name: "취미" },
  ];

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    // window.scrollTo(0, 0);
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

  const dateFormat = (obj) => {
    // 2023-02-03T07:26:56
    const date = new Date(obj);
    return format(date, "yyyy-MM-dd'T'HH:mm:ss");
  };

  const handleDate = (update) => {
    setDateRange(update);
    setAdventure((adventure) => ({
      ...adventure,
      startDate: dateFormat(startDate),
      endDate: dateFormat(endDate),
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

  const handleNext = () => {
    if (checkpoints.length < 2) {
      alert("체크포인트를 2개 이상 선택해주세요.");
    } else if (!adventure.RepresentativePostId) {
      alert("대표 이미지를 선택해 주세요.");
    } else {
      const done = checkpoints.every(
        (point) => point.adventurePlaceTitle && point.adventurePlaceContent
      );
      if (!done) {
        alert("체크포인트 이름과 내용을 빠짐없이 작성해 주세요.");
      } else if (!adventure.startDate || !adventure.endDate) {
        alert("탐험을 진행할 기간을 설정해 주세요.");
      } else if (!adventure.title || !adventure.title) {
        alert("탐험 소개를 작성해 주세요.");
      } else {
        navigate("/adventure/create/3");
      }
    }
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={styles.dateInput} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

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
          <div className={styles.selectContainer}>
            <span style={{ backgroundColor: "white", borderRadius: "6px" }}>
              <select className={styles.select} onChange={handleSelect}>
                {categories.map((category) => (
                  <option
                    className={styles.option}
                    key={category.value}
                    value={category.value}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </span>
          </div>
        </div>

        <div className={styles.subContainer}>
          <h2 className={styles.subHeader}>탐험 기간</h2>
          <div className={styles.dateContainer}>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={handleDate}
              withPortal
              customInput={<CustomInput />}
            />
          </div>
        </div>

        <div className={styles.subContainer}>
          <h2 className={styles.subHeader}>탐험 소개</h2>
          <input
            className={styles3.titleInput}
            style={{ marginTop: 0 }}
            type="text"
            name="title"
            placeholder="탐험의 제목을 입력하세요"
            value={adventure.title}
            onChange={handleInput}
          />
          <textarea
            className={styles3.contentInput}
            type="text"
            name="content"
            placeholder="탐험에 대한 설명을 입력하세요"
            value={adventure.content}
            onChange={handleInput}
          />
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
