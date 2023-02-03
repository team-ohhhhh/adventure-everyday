import React from "react";
import UserInfo from "./../components/Profile/UserInfo";
import { useParams } from "react-router-dom";
import Tabs, { Tab } from "react-best-tabs";
import variables from "../components/ProfileTab.scss";
import styles from "./ProfilePage.module.css";
import AdventureOnProgressTab from './../components/Profile/AdventureOnProgressTab'
import AdventureCompletedTab from './../components/Profile/AdventureCompletedTab'
import AdventureCreatedTab from './../components/Profile/AdventureCreatedTab'

function ProfilePage() {
  let { userId } = useParams();
  

  variables.$noneActiveTextColor = "black";

  return (
    <div className="pageContainer">
      <div>
        <UserInfo userId={userId} />
      </div>
      <div>
        <Tabs
          activeTab="1"
          className=""
          ulClassName=""
          activityClassName="bg-success"
          onClick={(event, tab) => console.log(event, tab)}
        >
          <Tab title="게시글" className="mr-4">
            <div className={styles.tabWrapper}>게시글 컴포넌트</div>
          </Tab>
          <Tab title="탐험 중" className="mr-4">
            <AdventureOnProgressTab className={styles.tabWrapper} />
          </Tab>
          <Tab title="완료한 탐험" className="mr-4">
            <AdventureCompletedTab className={styles.tabWrapper}/>
          </Tab>
          <Tab title="만든 탐험" className="mr-4">
            <AdventureCreatedTab className={styles.tabWrapper}/>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default ProfilePage;
