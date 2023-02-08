/* global kakao*/
import styles from "./AdventureDetailInfo.module.css";
import SmallArticleItem from "../SmallArticleItem";
import BigArticleItem from "../BigArticleItem";
import AdventureDetailMap from "./AdventureDetailMap";
import { useEffect, useMemo, useState } from "react";

function AdventureDetailInfo(props) {
  const articlList = [1, 2, 3];
  console.log("AdventureDetailInfo");

  // map에서 체크포인트 눌렀을 때 받아올 체크포인트 정보 (제목, 설명, 글 목록)
  const [checkPointInfo, setCheckPointInfo] = useState({
    // // 할 일: 첫번째 체크포인트로 초기화시켜놓기
    // adventurePlaceContent: "체크포인트를 눌러보세요.",
    // adventurePlaceId: null,
    // adventurePlacePostPhotoUrl: "",
    // adventurePlacePostTitle: "체크포인트를 눌러보세요.",
    // adventurePlacePostW3w: "",
    // adventurePlaceTitle: "체크포인트를 눌러보세요.",
    // createTime: "",
    // subPostList: [],

    /* BigArticle에 맞춰서 변수 이름 바꾼 것 */

    postId: "", // 탐험 아이디 같음
    title: "", // 게시글 제목
    w3w: "", // 게시글 위치
    createTime: "", // 게시글 생성 시간
    photoUrl: "", // 게시글 이미지

    adventurePlaceTitle: "체크포인트 제목",
    adventurePlaceContent: "체크포인트 내용",

    subPostList: [],
  });

  // // big article용 객체
  // const [bigArticle, setBigArticle] = useState({
  //   postId: "1",
  //   title: "",
  //   w3w: "",
  //   createTime: "",
  //   photoUrl: "",
  // });

  // useEffect(() => {
  //   setBigArticle((...prev) => {
  //     prev.postId = checkPointInfo.adventurePlaceId;
  //     prev.title = checkPointInfo.adventurePlacePostTitle; // 게시글 제목
  //     prev.w3w = checkPointInfo.adventurePlacePostW3w; // 게시글 위치 정보
  //     prev.createTime = checkPointInfo.createTime; // 게시글 생성시간
  //     prev.photoUrl = checkPointInfo.adventurePlacePostPhotoUrl; // 게시글 이미지
  //   });
  //   console.log("자식에서 체크포인트 정보 넘어옴!");
  //   console.log(checkPointInfo);
  //   console.log(bigArticle);
  // }, [checkPointInfo]); // 자식 컴포넌트(맵)에서 체크포인트 정보 넘어오면 big Article내용 채워주기

  // props로 받아온 체크포인트 좌표들을 positions에 저장
  let positions = [];
  if (props.info.subAdventurePlaces) {
    // 체크포인트 좌표들 props에서 받아와 저장
    for (var i = 0; i < props.info.subAdventurePlaces.length; i++) {
      positions[i] = props.info.subAdventurePlaces[i].subCoordinate;
    }
  }

  return (
    <>
      <div className={styles.detail}>
        <div className={styles.map}>
          <AdventureDetailMap
            pos={positions}
            subAdventurePlaces={props.info.subAdventurePlaces}
            setCheckPointInfo={setCheckPointInfo}
          ></AdventureDetailMap>
        </div>
        <div className={styles.checkPoint}>
          <div className={styles.cpInfo}>
            <div className={styles.cpTitle}>
              {checkPointInfo.adventurePlaceTitle}
            </div>
            <div className={styles.cpDesc}>
              {checkPointInfo.adventurePlaceContent}
            </div>
          </div>

          <div className={styles.cpArticle}>
            <BigArticleItem data={checkPointInfo} />
          </div>
        </div>
        <div className={styles.checkPointArticles}>
          <div className={styles.articleInfo}>
            <div className={styles.cpSubTitle}>이 포인트에서 작성된 글들</div>
            <button className={styles.arrangeBtn}>정렬버튼</button>
          </div>
          <div className={styles.articles}>
            {checkPointInfo.subPostList.map((article) => {
              return <SmallArticleItem key={article} data={article} />;
            })}
            {/* 체크포인트 글 목록이 없으면 보여줄 컴포넌트 */}
            {!props.info.subAdventurePlaces && (
              <div className={styles.article}>아직은 글이 없어요!</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdventureDetailInfo;
