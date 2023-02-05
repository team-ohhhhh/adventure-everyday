import { useParams } from "react-router";
import AdventureInfo from "../components/Adventure/AdventureInfo";
import AdventureDetailInfo from "../components/Adventure/AdventureDetailInfo";
import AdventureDetailReview from "../components/Adventure/AdventureDetailReview";
import styles from "./AdventureDetailPage.module.css";
import Tabs, { Tab } from "react-best-tabs";
import tabs from "../components/AdventureDetailTab.module.scss";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function AdventureDetailPage() {
  const params = useParams(); // 특정 탐험 id가져오기

  let TOKEN = useSelector((state) => state.token);
  let URL = useSelector((state) => state.url);

  let [adventureDetail, setAdventureDetail] = useState({});

  function ReadAdventureDetail() {
    axios({
      url: URL + `/adventures/${params.id}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      method: "get",
    }).then((response) => {
      setAdventureDetail(response.data.result);
      console.log("axios 성공");
      console.log(response.data.result);
    });
  }
  // 탐험 상세 정보 받아오기
  useEffect(() => {
    ReadAdventureDetail();
  }, []);

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
            key={adventureDetail.adventureId}
            info={adventureDetail}
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
                  key={adventureDetail.adventureId}
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
