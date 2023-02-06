import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import useGeolocation from "react-hook-geolocation";

import Step1Location from "../components/articleCreate/Step1Location";
import Step2Content from "../components/articleCreate/Step2Content";
import Step3Done from "../components/articleCreate/Step3Done";

import styles from "./ArticleCreatePage.module.css";

const API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

const ArticleCreatePage = () => {
  const [article, setArticle] = useState({
    isText: true,
    photo: null,
    preview: null,
    lat: 37.50128745884959, // 기본 위도
    lng: 127.03956225524968, // 기본 경도
    address: null,
    title: "",
    content: "",
    isPublic: true,
    isCheckPoint: false,
    adventureId: null,
    adventurePlaceId: null,
  });

  const [checkPointList, setCheckPointList] = useState([]);

  // 현재 위치 또는 게시글 타입 변화 시 위경도 데이터 업데이트
  const geolocation = useGeolocation();
  useEffect(() => {
    if (article.isText && geolocation.latitude) {
      setArticle((article) => ({
        ...article,
        lat: geolocation.latitude,
        lng: geolocation.longitude,
      }));
    }
  }, [geolocation.latitude, geolocation.longitude, article.isText]);

  // 위경도 데이터 변화 시
  useEffect(() => {
    // 1. 좌표 -> 주소 변환
    axios
      .get("https://dapi.kakao.com/v2/local/geo/coord2address.json", {
        params: {
          x: String(article.lng),
          y: String(article.lat),
          input_coord: "WGS84",
        },
        headers: {
          Authorization: `KakaoAK ${API_KEY}`,
        },
      })
      .then((res) => {
        const data = res.data.documents;
        if (data && data.length) {
          setArticle((article) => ({
            ...article,
            address: data[0].address.address_name,
          }));
        }
      });

    // 2. 탐험 리스트 조회 api 호출
    setCheckPointList([
      {
        id: 1,
        adv: "추억이 가득 쌓이는 탐험",
        checkpoint: "깃기 생가",
        isSelected: false,
      },
      {
        id: 2,
        adv: "방방곡곡 맛집 탐방",
        checkpoint: "대우부대찌개",
        isSelected: false,
      },
    ]);
  }, [article.lat, article.lng]);

  return (
    <div className={`pageContainer ${styles.pageContainer}`}>
      <Routes>
        <Route
          path=""
          element={
            <Step1Location
              article={article}
              setArticle={setArticle}
              checkPointList={checkPointList}
              setCheckPointList={setCheckPointList}
              styles={styles}
            />
          }
        />
        <Route
          path="2"
          element={
            <Step2Content
              article={article}
              setArticle={setArticle}
              checkPointList={checkPointList}
              styles={styles}
            />
          }
        />
        <Route path="3" element={<Step3Done />} />
      </Routes>
    </div>
  );
};

export default ArticleCreatePage;
