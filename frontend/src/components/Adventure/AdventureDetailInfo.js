/* global kakao*/
import styles from "./AdventureDetailInfo.module.css";
import SmallArticleItem from "../SmallArticleItem";
import BigArticleItem from "../BigArticleItem";
import AdventureDetailMap from "./AdventureDetailMap";
import { useMemo } from "react";

function AdventureInfo() {
  const articlList = [1, 2, 3];

  const positions = [
    { lat: 33.44975, lng: 126.56967 },
    { lat: 33.450579, lng: 126.56956 },
    { lat: 33.4506468, lng: 126.5707 },
  ];

  const bounds = useMemo(() => {
    // bounds에 북동쪽 좌표 정보와 남서쪽 좌표정보 저장
    const bounds = new kakao.maps.LatLngBounds();

    // 마커를 돌며 bounds 범위 정해주기
    positions.forEach((point) => {
      bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
    });
    return bounds;
  });

  return (
    <>
      <div className={styles.detail}>
        <div className={styles.map}>
          <AdventureDetailMap></AdventureDetailMap>
        </div>
        <div className={styles.checkPoint}>
          <div className={styles.cpInfo}>
            <div className={styles.cpTitle}>걷기 좋은 코스</div>
            <div className={styles.cpDesc}>
              꽃이랑 풀이 많아서 사진찍기 참 좋아요!
            </div>
          </div>
          <div className={styles.cpArticle}>
            <BigArticleItem />
          </div>
        </div>
        <div className={styles.checkPointArticles}>
          <div className={styles.articleInfo}>
            <div className={styles.cpSubTitle}>이 포인트에서 작성된 글들</div>
            <button className={styles.arrangeBtn}>정렬버튼</button>
          </div>
          <div className={styles.articles}>
            {articlList.map((article) => {
              return <SmallArticleItem data={article} />;
            })}
            <div className={styles.article}>게시글 2</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdventureInfo;
