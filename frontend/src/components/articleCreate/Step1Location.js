import React from "react";
import { useNavigate } from "react-router-dom";
import ImageUploadForm from "./ImageUploadForm";
import ArticleMap from "./ArticleMap";
import SelectAdvList from "./SelectAdvList";

const Step1Location = ({
  article,
  setArticle,
  setStep,
  advList,
  setAdvList,
  address,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1>사진(선택)</h1>
        <ImageUploadForm article={article} setArticle={setArticle} />
      </div>
      <div>
        <h1>장소</h1>
        <ArticleMap lat={article.lat} lng={article.lng} />
        <p>{address}</p>
      </div>
      {advList && (
        <div>
          <h2>집중집중!!! 탐험이 있어요~</h2>
          <SelectAdvList
            setArticle={setArticle}
            advList={advList}
            setAdvList={setAdvList}
          />
        </div>
      )}
      <button onClick={() => navigate(-1)}>취소</button>
      <button onClick={() => setStep((step) => step + 1)}>다음</button>
    </>
  );
};

export default Step1Location;
