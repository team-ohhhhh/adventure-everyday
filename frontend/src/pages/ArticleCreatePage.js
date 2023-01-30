import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useGeolocation from "react-hook-geolocation";
import ArticleImageUploadForm from "../components/articleCreate/ArticleImageUploadForm";
import ArticleMap from "../components/articleCreate/ArticleMap";
import SelectAdvList from "../components/articleCreate/SelectAdvList";

const API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

const ArticleCreatePage = () => {
  // 게시글 작성 단계
  // 1 : 장소 선택, 2 : 내용 입력
  const [step, setStep] = useState(1);

  const [article, setArticle] = useState({
    type: "text",
    image: null,
    lat: 37.50128745884959,
    lng: 127.03956225524968,
    isAdv: false,
    advId: null,
  });
  const [address, setAddress] = useState();
  const [advList, setAdvList] = useState();

  const geolocation = useGeolocation();

  const navigate = useNavigate();

  // 현재 위치 또는 게시글 타입이 변화 시 article에 현재 위치 데이터 반영
  useEffect(() => {
    if (article.type === "text" && geolocation.latitude) {
      setArticle((article) => ({
        ...article,
        lat: geolocation.latitude,
        lng: geolocation.longitude,
      }));
    }
  }, [geolocation.latitude, geolocation.longitude, article.type]);

  // 위경도 변화 시
  // 1. 좌표->주소 변환 api 호출
  // 2. 탐험 리스트 조회 api 호출
  useEffect(() => {
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

  return (
    <>
      <div>
        <h1>사진(선택)</h1>
        <ArticleImageUploadForm setArticle={setArticle} />
      </div>
      <div>
        <h1>장소</h1>
        <ArticleMap lat={article.lat} lng={article.lng} />
        <p>{address}</p>
      </div>
      <div>
        {advList ? (
          <div>
            <h2>집중집중!!! 탐험이 있어요~</h2>
            <SelectAdvList
              advList={advList}
              setAdvList={setAdvList}
              setArticle={setArticle}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <button onClick={() => navigate(-1)}>취소</button>
      <button>다음</button>
    </>
  );
};

export default ArticleCreatePage;
