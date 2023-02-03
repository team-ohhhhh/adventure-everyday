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
  const ReadAdventureDetail = function () {
    axios({
      url: URL + `/adventures/${params.id}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      method: "get",
    }).then((response) => {
      console.log(response.data);
    });
  };

  useMemo(() => {
    ReadAdventureDetail();
  }, []);

  return (
    <div className="pageContainer">
      <div className={styles.wrapper}>
        <div className={styles.white}>
          <AdventureInfo className={styles.info}></AdventureInfo>
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
                <AdventureDetailInfo></AdventureDetailInfo>
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
