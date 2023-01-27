import React, { useState } from "react";
import ArticleImageUploadForm from "../components/articleCreate/ArticleImageUploadForm";
import ArticleMap from "../components/articleCreate/ArticleMap";
import useGeolocation from "react-hook-geolocation";

const ArticleCreatePage = () => {
  const [imageFile, setImageFile] = useState();
  const geolocation = useGeolocation();

  return (
    <>
      <div>
        <h1>사진을 선택해주세요</h1>
        <ArticleImageUploadForm setImageFile={setImageFile} />
      </div>
      <div>
        <h2>선택된 장소</h2>
        <p>사진의 장소가 표시됩니다</p>
        {imageFile ? (
          <ArticleMap lat={imageFile.lat} lng={imageFile.lng} />
        ) : (
          <ArticleMap lat={geolocation.latitude} lng={geolocation.longitude} />
        )}
      </div>
    </>
  );
};

export default ArticleCreatePage;
