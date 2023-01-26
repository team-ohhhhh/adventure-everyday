import React, { useState } from "react";
import ArticleImageUploadForm from "../../components/article/ArticleImageUploadForm";
import ArticleMap from "../../components/article/ArticleMap";

const ArticleCreatePage = () => {
  const [imageFile, setImageFile] = useState();

  return (
    <>
      <div>
        <h1>사진을 선택해주세요</h1>
        <ArticleImageUploadForm setImageFile={setImageFile} />
      </div>
      <div>
        <h2>선택된 장소</h2>
        <p>사진의 장소가 표시됩니다</p>
        <ArticleMap
          latitude={imageFile?.latitude}
          longitude={imageFile?.longitude}
        />
      </div>
    </>
  );
};

export default ArticleCreatePage;
