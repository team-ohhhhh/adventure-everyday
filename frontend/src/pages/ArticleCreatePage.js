import React, { useState, useEffect } from "react";
import useGeolocation from "react-hook-geolocation";
import axios from "axios";

import Step1Location from "../components/articleCreate/Step1Location";
import Step2Content from "../components/articleCreate/Step2Content";
import Step3Done from "../components/articleCreate/Step3Done";

const API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

const ArticleCreatePage = () => {
  // 게시글 작성 단계
  // 1 : 장소 선택, 2 : 내용 입력, 3 : 완료
  const [step, setStep] = useState(1);

  // 게시글 내용
  const [article, setArticle] = useState({
    type: "text",
    image: { name: null, preview: null, data: null },
    lat: 37.50128745884959,
    lng: 127.03956225524968,
    isAdv: false,
    advId: null,
    title: "",
    content: "",
    isPrivate: false,
  });

  // 화면에 보여줄 주소
  const [address, setAddress] = useState();

  // 후보 탐험 목록
  const [advList, setAdvList] = useState();

  // 현재 위치 또는 게시글 타입 변화 시 위경도 데이터 업데이트
  const geolocation = useGeolocation();
  useEffect(() => {
    if (article.type === "text" && geolocation.latitude) {
      setArticle((article) => ({
        ...article,
        lat: geolocation.latitude,
        lng: geolocation.longitude,
      }));
    }
  }, [geolocation.latitude, geolocation.longitude, article.type]);

  // 위경도 데이터 변화 시
  // 1. 좌표->주소 변환 api 호출
  // 2. 탐험 리스트 조회 api 호출
  useEffect(() => {
    console.log("axios");
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
          setAddress(data[0].address.address_name);
        }
      });

    // 탐험 요청 (백엔드 완성 시 업데이트 예정)
    setAdvList([
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

  switch (step) {
    case 1:
      return (
        <Step1Location
          setStep={setStep}
          article={article}
          setArticle={setArticle}
          advList={advList}
          setAdvList={setAdvList}
          address={address}
        />
      );
    case 2:
      return (
        <Step2Content
          article={article}
          setArticle={setArticle}
          setStep={setStep}
          address={address}
          advList={advList}
        />
      );
    case 3:
      return <Step3Done setStep={setStep} />;
    default:
      return <></>;
  }
};

export default ArticleCreatePage;
