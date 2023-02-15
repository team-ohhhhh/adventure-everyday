/* global kakao*/
import styles from "./AdventureDetailInfo.module.css";
import SmallArticleItem from "../SmallArticleItem";
import BigArticleItem from "../BigArticleItem";
import AdventureDetailMap from "./AdventureDetailMap";
import { useEffect, useMemo, useState } from "react";

function AdventureDetailInfo(props) {
  // map에서 체크포인트 눌렀을 때 받아올 체크포인트 정보 (제목, 설명, 글 목록)
  const [checkPointInfo, setCheckPointInfo] = useState({
    // // 할 일: 첫번째 체크포인트로 초기화시켜놓기
    // adventurePlaceContent: "",
    // adventurePlaceId: null,
    // adventurePlacePostPhotoUrl: "",
    // adventurePlacePostTitle: "",
    // adventurePlacePostW3w: "",
    // adventurePlaceTitle: "",
    // createTime: "",
    // subPostList: [],

    /* BigArticle에 맞춰서 변수 이름 바꾼 것 */

    postId: "", // 탐험 아이디 같음
    title: "", // 게시글 제목
    w3w: "", // 게시글 위치
    createTime: "", // 게시글 생성 시간
    photoUrl: "", // 게시글 이미지

    adventurePlaceTitle: "지도에 있는 좌표를 눌러보세요!",
    adventurePlaceContent: "체크포인트 정보가 표시됩니다.",

    subPostList: [],
  });

  // // props로 받아온 체크포인트 좌표들을 positions에 저장
  // let positions = [];
  // if (props.info.subAdventurePlaces) {
  //   // 체크포인트 좌표들 props에서 받아와 저장
  //   for (var i = 0; i < props.info.subAdventurePlaces.length; i++) {
  //     positions[i] = props.info.subAdventurePlaces[i].subCoordinate;
  //   }
  // }

  return (
    <div className={styles.detail}>
      <div className={styles.map}>
        <AdventureDetailMap
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
        {/* 체크포인트 누르기 전 보여줄 부분들 */}
        {!checkPointInfo.title && (
          <div className={styles.emptyInfo}>
            <img
              src="/images/emptyBanner.png"
              style={{ borderRadius: "0.6rem" }}
            ></img>
          </div>
        )}

        {/* 체크포인트 누르고 나서 보여줄 부분들 */}
        {checkPointInfo.title && (
          <div className={styles.cpArticle}>
            <BigArticleItem
              postId={checkPointInfo.postId}
              title={checkPointInfo.title}
              w3w={checkPointInfo.w3w}
              date={checkPointInfo.createTime}
              photo={
                checkPointInfo.photoUrl
                  ? checkPointInfo.photoUrl
                  : "/images/emptyBanner3.png"
              }
              isAdventure="true"
            />
          </div>
        )}
      </div>
      {checkPointInfo.title && props.info && (
        <div className={styles.checkPointArticles}>
          <div className={styles.articleInfo}>
            <div className={styles.cpSubTitle}>이 포인트에서 작성된 글들</div>
            <button className={styles.arrangeBtn}>정렬버튼</button>
          </div>
          <div className={styles.articles}>
            {/* 체크포인트 글 목록이 있으면 보여줄 컴포넌트 */}
            {checkPointInfo.subPostList.length > 0 &&
              checkPointInfo.subPostList.map((article) => {
                return <SmallArticleItem key={article} data={article} isAdventure="true" />;
              })}

            {/* 체크포인트 글 목록이 없으면 보여줄 컴포넌트 */}
            {checkPointInfo.subPostList.length == 0 && (
              <div className={styles.article}>아직은 글이 없어요!</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdventureDetailInfo;
