import React from "react";
import { useNavigate } from "react-router-dom";

import ImageUploadForm from "./ImageUploadForm";
import ArticleMap from "./ArticleMap";
import CheckPointList from "./CheckPointList";

const Step1Location = ({
  article,
  setArticle,
  checkPointList,
  setCheckPointList,
  styles,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1>사진을 선택해주세요(선택)</h1>
        <ImageUploadForm article={article} setArticle={setArticle} />
      </div>

      <div>
        <h1>장소</h1>
        <ArticleMap lat={article.lat} lng={article.lng} />
        <p>{article.address}</p>
        {checkPointList && <p>앗! 이 위치에서 작성 가능한 모험이 있어요!</p>}
      </div>

      {checkPointList && (
        <div>
          <CheckPointList
            setArticle={setArticle}
            checkPointList={checkPointList}
            setCheckPointList={setCheckPointList}
          />
        </div>
      )}

      <div>
        <button onClick={() => navigate(-1)}>취소</button>
        <button onClick={() => navigate("/write/2")}>다음</button>
      </div>
    </>
  );
};

export default Step1Location;
