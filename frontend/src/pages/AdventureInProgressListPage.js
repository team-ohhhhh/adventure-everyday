import { useParams } from "react-router";
import styles from "./AdventureInProgressListPage.module.css";
import React, { useState, useEffect } from 'react';
import AdventureInProgressListBanner from './../components/Adventure/AdventureInProgressListBanner';
import axios from 'axios';
import { useSelector } from "react-redux"

function AdventureInProgressListPage(){
  const [adventureInProgressList, setAdventureInProgressList] = useState([])
  const [subReadAdventureInProgressUsersClickResList, setSubReadAdventureInProgressUsersClickResList] = useState([])
  const URL = useSelector((state) => state.url)
  const TOKEN = useSelector((state) => state.token)
  const params = useParams(); // 특정 탐험 id가져오기
  useEffect(() => {
    axios({
      url: URL + `/adventures/${params.id}/users`,
      method : 'get',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },

    })
    .then((res) => {
      console.log(res.data.result)
      setAdventureInProgressList(res.data.result)
      setSubReadAdventureInProgressUsersClickResList(res.data.result.subReadAdventureInProgressUsersClickResList)

    })
    .catch((err) => console.log(err))
    
  },[])






    return(
    <div className="pageContainer">
        <div className={styles.title}>
          {adventureInProgressList &&(
            <h3 className={styles.titleFont}>{adventureInProgressList.adventureFeat}을 목표로<br/> 탐험하는 사람들</h3>
          )}
          
        </div>
        <div>
          {subReadAdventureInProgressUsersClickResList.length>0 && subReadAdventureInProgressUsersClickResList.map((adventureInProgressItem,index) => {
            return <AdventureInProgressListBanner key={index} adventureInProgressItem={adventureInProgressItem} /*isInProgress={isInProgress}*//>
         })}
        </div>
    </div>
    
    
    
    )

}

export default AdventureInProgressListPage;