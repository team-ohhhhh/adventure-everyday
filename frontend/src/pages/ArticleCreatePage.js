import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
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
    adventureIdTitle: "",
    adventurePlaceId: null,
    adventurePlaceIdTitle: "",
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

  const url = useSelector((state) => state.url);
  const token = useSelector((state) => state.token);

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
    axios
      .get(url + "/adventures/adventure-in-progress/check", {
        params: {
          lat: article.lng,
          lng: article.lat,
          area: 0.1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.result);
        setCheckPointList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article.lat, article.lng]);

  return (
    <div className={styles.pageContainer}>
      <Routes>
        <Route
          path=""
          element={
            <Step1Location
              article={article}
              setArticle={setArticle}
              checkPointList={checkPointList}
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
        <Route path="3" element={<Step3Done styles={styles} />} />
      </Routes>
    </div>
  );
};

export default ArticleCreatePage;
