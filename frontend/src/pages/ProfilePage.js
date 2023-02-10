import { useState } from "react";
import UserInfo from "./../components/Profile/UserInfo";
import { useParams } from "react-router-dom";
import Tabs, { Tab } from "react-best-tabs";
import variables from "../components/ProfileTab.scss";
import styles from "./ProfilePage.module.css";
import ArticleTab from './../components/Profile/ArticleTab'
import AdventureOnProgressTab from './../components/Profile/AdventureOnProgressTab'
import AdventureCreatedTab from './../components/Profile/AdventureCreatedTab'

function ProfilePage() {
  let { userId } = useParams();

  const [tab, setTab] = useState(1);
  

  variables.$noneActiveTextColor = "black";

  const [articleList, setArticleList] = useState([])

  // 더보기 버튼 토글 + 페이지 터치시 닫히도록
  const [isOn, setIsOn]  = useState(false)
  function toggle() {
    setIsOn((prev) => !prev)
  }
  function pageTouch() {
    if (isOn) {
      setIsOn(false)
    }
  }

  return (
    <div className="pageContainer" onClick={pageTouch}>
      <div>
        <UserInfo userId={userId} toggle={toggle} isOn={isOn} articleListLength={articleList.length}/>
      </div>
      <div>
        <Tabs
          activeTab="1"
          className=""
          ulClassName=""
          activityClassName="bg-success"
          onClick={(event, tab) => setTab(tab)}
        >
          <Tab title="게시글" className="mr-3">
            <ArticleTab className={styles.tabWrapper} tab={tab} userId={userId} articleList={articleList} setArticleList={setArticleList}/>
          </Tab>
          <Tab title="탐험 중" className="mr-3">
            <AdventureOnProgressTab className={styles.tabWrapper} tab={tab} userId={userId}/>
          </Tab>
          <Tab title="만든 탐험" className="mr-3">
            <AdventureCreatedTab className={styles.tabWrapper} tab={tab} userId={userId}/>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default ProfilePage;
