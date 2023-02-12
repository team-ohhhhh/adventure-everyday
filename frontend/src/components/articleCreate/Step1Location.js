import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGeolocation from "react-hook-geolocation";

import ImageUploadForm from "./ImageUploadForm";
import ArticleMap from "./ArticleMap";
import CheckPointList from "./CheckPointList";

import { AiOutlineClose } from "react-icons/ai";

const Step1Location = ({ article, setArticle, checkPointList, styles }) => {
  // console.log(checkPointList);
  const navigate = useNavigate();
  const geolocation = useGeolocation();

  const [isAdvSelected, setIsAdvSelected] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuit = () => {
    if (!(article.photo || article.title || article.content)) {
      navigate("/map");
    } else {
      const answer = window.confirm(
        "작성 중인 내용은 저장되지 않습니다. 작성을 취소하고 나가시겠습니까?"
      );
      if (answer) {
        navigate("/map");
      }
    }
  };

  const handleNext = () => {
    if (article.isText && !geolocation.latitude) {
      alert(
        "위치 정보가 확인되지 않습니다. 위치 접근을 허용한 뒤 잠시 기다려주세요. 또는 위치 데이터가 존재하는 사진을 업로드하여 게시글 작성 바랍니다."
      );
      return;
    } else if (checkPointList.length > 0 && !isAdvSelected) {
      alert("탐험을 선택해주세요.");
      return;
    }
    navigate("/write/2");
  };

  return (
    <>
      <div className={styles.closeContainer}>
        <AiOutlineClose onClick={handleQuit} size={35} />
      </div>

      <div>
        <h1 className={styles.header} style={{ marginTop: "1rem" }}>
          사진을
          <br />
          선택해주세요<span style={{ fontSize: "1rem" }}> (선택)</span>
        </h1>
        <ImageUploadForm article={article} setArticle={setArticle} />
      </div>

      <div>
        <h1 className={styles.header}>장소</h1>
        <ArticleMap lat={article.lat} lng={article.lng} />
        <div className={styles.textContainer}>{article.address}</div>
        {checkPointList.length > 0 && (
          <div className={styles.alertContainer}>
            앗! 이 위치에서 작성 가능한 탐험이 있어요!
          </div>
        )}
      </div>

      {checkPointList.length > 0 && (
        <div>
          <h1 className={styles.header}>탐험 선택</h1>
          <CheckPointList
            article={article}
            setArticle={setArticle}
            checkPointList={checkPointList}
            styles={styles}
            isAdvSelected={isAdvSelected}
            setIsAdvSelected={setIsAdvSelected}
          />
        </div>
      )}

      <div className={styles.btnContainer}>
        <div></div>
        <div className={styles.blueBtn} onClick={handleNext}>
          다음
        </div>
      </div>
    </>
  );
};

export default Step1Location;
