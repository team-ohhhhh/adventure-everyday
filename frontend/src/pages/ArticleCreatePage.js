import React, { useEffect, useState } from "react";
import axios from "axios";
import useGeolocation from "react-hook-geolocation";
import ArticleImageUploadForm from "../components/articleCreate/ArticleImageUploadForm";
import ArticleMap from "../components/articleCreate/ArticleMap";

const API_KEY = process.env.REACT_APP_REST_API_KEY;

const ArticleCreatePage = () => {
  const currentLocation = () => {};

  const geolocation = useGeolocation();

  const [imageFile, setImageFile] = useState({
    file: null,
    url: null,
    lat: geolocation.latitude,
    lng: geolocation.longitude,
  });

  const getLocation = () => {
    console.log(imageFile.lat);
    const lat = imageFile ? imageFile.lat : geolocation.latitude;
    const lng = imageFile ? imageFile.lng : geolocation.longitude;
    const msg = imageFile ? "사진 위치" : "현재 위치";
    return [lat, lng, msg];
  };

  const [lat, lng, msg] = getLocation();

  const address = () => {
    axios
      .get("https://dapi.kakao.com/v2/local/geo/coord2address.json", {
        params: { x: String(lat), y: String(lng), input_coord: "WGS84" },
        headers: {
          Authorization: `KakaoAK ${API_KEY}`,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <div>
        <h1>사진(선택)</h1>
        <ArticleImageUploadForm setImageFile={setImageFile} />
      </div>
      <div>
        <h1>장소</h1>
        <ArticleMap lat={lat} lng={lng} />
        <p>
          {msg} : {lat}, {lng}
        </p>
      </div>
    </>
  );
};

export default ArticleCreatePage;
