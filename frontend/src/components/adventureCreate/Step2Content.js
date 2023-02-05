import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AdventureMap from "./AdventureMap";

const Step2Content = ({ checkPoints, adv, setAdv }) => {
  const navigate = useNavigate();

  const categories = [
    { value: "맛집", name: "맛집" },
    { value: "취미", name: "취미" },
    { value: "등산", name: "등산" },
  ];

  // const [dateRange, setDateRange] = useState([null, null]);
  // const [startDate, endDate] = dateRange;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInput = (e) => {
    setAdv((adv) => ({
      ...adv,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (e) => {
    setAdv((adv) => ({
      ...adv,
      category: e.target.value,
    }));
  };

  return (
    <div>
      <h1>탐험 생성</h1>

      <h2>내 탐험지도</h2>
      <AdventureMap checkPoints={checkPoints} />
      <h2>탐험 카테고리</h2>
      <select onChange={handleSelect}>
        {categories.map((category) => {
          return <option value={category.value}>{category.name}</option>;
        })}
      </select>

      <h2>탐험 기간</h2>
      <DatePicker
        selectsRange={true}
        startDate={adv.startDate}
        endDate={adv.endDate}
        onChange={(update) => {
          setAdv((adv) => ({
            ...adv,
            startDate: update[0],
            endDate: update[1],
          }));
        }}
        withPortal
      />

      <h2>탐험 소개</h2>
      <input
        type="text"
        name="title"
        placeholder="탐험의 제목을 입력하세요"
        value={adv.title}
        onChange={handleInput}
      />
      <br />
      <textarea
        type="text"
        name="content"
        placeholder="탐험에 대한 설명을 입력하세요"
        value={adv.content}
        onChange={handleInput}
      />
      <br />

      <button onClick={() => navigate(-1)}>이전</button>
      <button onClick={() => navigate("/adventure/create/3")}>다음</button>
    </div>
  );
};

export default Step2Content;
