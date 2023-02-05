/* global kakao*/
import styles from "./AdventureDetailInfo.module.css";
import SmallArticleItem from "../SmallArticleItem";
import BigArticleItem from "../BigArticleItem";
import AdventureDetailMap from "./AdventureDetailMap";
import { useMemo } from "react";

function AdventureInfo(props) {
  const articlList = [1, 2, 3];

  // // props로 넘어오는 데이터 미리보기
  // const dummy2 = {
  //   adventureId: 1,
  //   checkPoints: [
  //     {
  //       checkPointId: 1,
  //       coordinate: [37.5666805, 126.9784147], // 체크포인트 위치
  //       title: "check point title 1", // 체크포인트 소개
  //       content: "check point content", // 체크포인트 상세소개

  //       // 탐험 생성자의 게시글 정보
  //       postId: 1,
  //       articlePhoto: "/images.jpg",
  //       articleTitle: "article Title",
  //       articlePos: "강아지, 고양이, 고릴라",
  //       articleDate: "2023-02-04",

  //       // 탐험 생성자 제외 나머지 사람들의 게시글 정보
  //       articles: [
  //         {
  //           postId: 2,
  //           articlePhoto: "/images.jpg",
  //           articleTitle: "헤헤",
  //           articleNickname: "nickName",
  //           articleDate: "2023-02-05",
  //         },
  //         {
  //           postId: 3,
  //           articlePhoto: "/images.jpg",
  //           articleTitle: "히히",
  //           articleNickname: "nickName",
  //           articleDate: "2023-02-05",
  //         },
  //       ],
  //     },
  //   ],
  // };

  const positions = [
    { lat: 33.44975, lng: 126.56967 },
    // { lat: 33.450579, lng: 126.56956 },
    // { lat: 33.4506468, lng: 126.5707 },
  ];

  const bounds = useMemo(() => {
    // bounds에 북동쪽 좌표 정보와 남서쪽 좌표정보 저장
    const bounds = new kakao.maps.LatLngBounds();

    // // 체크포인트 좌표들 props에서 받아와 저장
    // for (
    //   var i = 0;
    //   i < props.info.adventureDetail.subAdventurePlaces.length;
    //   i++
    // ) {
    //   positions[i].lat =
    //     props.info.adventureDetail.subAdventurePlaces[i].subCoordinate[0];
    //   positions[i].lng =
    //     props.info.adventureDetail.subAdventurePlaces[i].subCoordinate[1];
    // }

    // 체크포인트 좌표 확인
    for (var i = 0; i < positions.length; i++) {
      console.log("pos" + positions[i].lat, positions[i].lng);
    }

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
              return <SmallArticleItem key={article} data={article} />;
            })}
            <div className={styles.article}>게시글 2</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdventureInfo;
