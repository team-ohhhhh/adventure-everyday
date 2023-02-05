import { useParams } from "react-router";
import AdventureInfo from "../components/Adventure/AdventureInfo";
import AdventureDetailInfo from "../components/Adventure/AdventureDetailInfo";
import AdventureDetailReview from "../components/Adventure/AdventureDetailReview";
import styles from "./AdventureDetailPage.module.css";
import Tabs, { Tab } from "react-best-tabs";
import tabs from "../components/AdventureDetailTab.module.scss";
import { useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function AdventureDetailPage() {
  let { id } = useParams();

  let TOKEN = useSelector((state) => state.token);

  const params = useParams(); // 특정 탐험 id가져오기
  console.log(params.id);
  let URL = useSelector((state) => state.url);
  // const ReadAdventureDetail = function () {
  //   axios({
  //     url: URL + `/adventures/${params.id}`,
  //     headers: {
  //       Authorization: `Bearer ${TOKEN}`,
  //     },
  //     method: "get",
  //   }).then((response) => {
  //     console.log(response.data);
  //   });
  // };

  // useMemo(() => {
  //   ReadAdventureDetail();
  // }, []);

  // 더미데이터로 테스트 // axios 총 몇번 요청?

  // ad info로 넘길 데이터 (1. 하얀 부분 데이터)
  const dummy = {
    adventureId: 1,
    userId: "silverain_9",
    advetureMakerTier: 2,
    category: "맛집",
    featTitle: "걷기왕",
    featContent: null, // 칭호 설명용으로 넣은 것이지만 사실 모험이름이라 쓸 일 없을듯
    title: "adventure1",
    content: "아주 맛있는 맛집 모음이에요",
    difficulty: "/images/diff_normal.png",
    photoUrl: "/images/alien.jpg",
    startDate: "2023-01-24",
    endDate: "2023-02-03",
    avgReviewRate: 4.5,
  };

  // ad detail info로 넘길 데이터 (2. 체크포인트 관련 데이터)
  const dummy2 = {
    adventureId: 1,
    checkPoints: [
      {
        checkPointId: 1,
        coordinate: [37.5666805, 126.9784147], // 체크포인트 위치
        title: "check point title 1", // 체크포인트 소개
        content: "check point content", // 체크포인트 상세소개

        // 탐험 생성자의 게시글 정보
        postId: 1,
        articlePhoto: "/images.jpg",
        articleTitle: "article Title",
        articlePos: "강아지, 고양이, 고릴라",
        articleDate: "2023-02-04",

        // 탐험 생성자 제외 나머지 사람들의 게시글 정보
        articles: [
          {
            postId: 2,
            articlePhoto: "/images.jpg",
            articleTitle: "헤헤",
            articleNickname: "nickName",
            articleDate: "2023-02-05",
          },
          {
            postId: 3,
            articlePhoto: "/images.jpg",
            articleTitle: "히히",
            articleNickname: "nickName",
            articleDate: "2023-02-05",
          },
        ],
      },
    ],
  };

  // ad detail review로 넘길 데이터

  return (
    <div className="pageContainer">
      <div className={styles.wrapper}>
        <div className={styles.white}>
          <AdventureInfo
            className={styles.info}
            key={dummy.adventureId}
            info={dummy}
          ></AdventureInfo>
        </div>

        <div className={styles.purple}>
          <div className={styles.tab}>
            <Tabs
              activeTab="1"
              className={[styles.tab]} // tabs.rb-tabs
              ulClassName=""
              activityClassName="bg-success"
              onClick={(event, tab) => console.log(event, tab)}
            >
              <Tab title="탐험 지도" className="mr-2">
                <AdventureDetailInfo
                  key={dummy.adventureId}
                  info={dummy2}
                ></AdventureDetailInfo>
              </Tab>
              <Tab title="탐험 후기" className="mr-2">
                <AdventureDetailReview></AdventureDetailReview>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdventureDetailPage;
