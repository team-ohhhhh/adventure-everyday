import React, { useState, useEffect } from "react";
import axios from "axios";
import useGeolocation from "react-hook-geolocation";
import ArticleImageUploadForm from "../components/articleCreate/ArticleImageUploadForm";
import ArticleMap from "../components/articleCreate/ArticleMap";

const API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

const ArticleCreatePage = () => {
  const [article, setArticle] = useState({
    type: "text",
    image: null,
    lat: 37.50128745884959,
    lng: 127.03956225524968,
  });
  const [address, setAddress] = useState();

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
    </>
  );
};

export default ArticleCreatePage;
