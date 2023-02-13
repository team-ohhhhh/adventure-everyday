import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Tabs, { Tab } from "react-best-tabs";

import UserInfo from "./../components/profile/UserInfo";
import ArticleTab from "../components/profile/ArticleTab";
import AdventureOnProgressTab from "../components/profile/AdventureOnProgressTab";
import AdventureFinishedTab from "../components/profile/AdventureFinishedTab";
import AdventureCreatedTab from "../components/profile/AdventureCreatedTab";

import "./ProfilePage.css";
import variables from "../components/ProfileTab.scss"; // 필요
import { useSelector } from "react-redux";

function ProfilePage() {
  let { userId } = useParams();
  const MyId = useSelector((state) => state.user.userId);
  const isMe = userId == MyId; // 형 변환을 위해 == 사용

  const [tab, setTab] = useState(1);
  const [articleList, setArticleList] = useState([]);

  // 더보기 버튼 토글 + 페이지 터치시 닫히도록
  const [isOn, setIsOn] = useState(false);
  function toggle() {
    setIsOn((prev) => !prev);
  }
  function pageTouch() {
    if (isOn) {
      setIsOn(false);
    }
  }

  const userHeight = useMemo(() => {
    const viewHeight = document.documentElement.clientHeight;
    // console.log(viewHeight);
    return viewHeight - 301.69 - 34 - 71;
  }, []);

  return (
    <div id="profile" className="pageContainer" onClick={pageTouch}>
      <div id="userInfo">
        <UserInfo
          userId={userId}
          toggle={toggle}
          isOn={isOn}
          articleListLength={articleList.length}
        />
      </div>

      <div>
        <Tabs
          activeTab="1"
          className=""
          ulClassName=""
          activityClassName="activeTab"
          onClick={(event, tab) => setTab(tab)}
        >
          <Tab title="게시글">
            <ArticleTab
              tab={tab}
              userId={userId}
              articleList={articleList}
              setArticleList={setArticleList}
              userHeight={userHeight}
            />
          </Tab>
          <Tab title="탐험 중">
            <AdventureOnProgressTab tab={tab} userId={userId} isMe={isMe} />
          </Tab>
          <Tab title="완료한 탐험">
            <AdventureFinishedTab tab={tab} userId={userId} isMe={isMe} />
          </Tab>
          <Tab title="만든 탐험">
            <AdventureCreatedTab tab={tab} userId={userId} isMe={isMe} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default ProfilePage;
