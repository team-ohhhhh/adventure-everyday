import styles from "./AdventureInProgressListPage.module.css";
import React, { useState, useEffect, useMemo } from 'react';
import AdventureInProgressListBanner from './../components/Adventure/AdventureInProgressListBanner';
import axios from 'axios';
import { useSelector } from "react-redux"

function AdventureInProgressListPage(adventureId){
  const [adventureInProgressList, setAdventureInProgressList] = useState([])
  const URL = useSelector((state) => state.url)
  const TOKEN = useSelector((state) => state.token)

  useEffect(() => {
    axios({
      // url: URL + `/adventures/adventure-in-progress/${adventureId}`,
      url: URL + `/adventures/2/users`,
      method : 'get',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiaWF0IjoxNjc1OTE4ODE1LCJleHAiOjE2NzYyNzg4MTV9.HuOT2--yduwJm03PAT7ZEvrErnp6h6q59pgoNY_hxDQ`
        // Authorization: `Bearer ${TOKEN}`
      },

    })
    .then((res) => {
      setAdventureInProgressList(res.data.result)

    })
    // .then(console.log(adventureInProgressList[0].adventureFeat))
    .catch((err) => console.log(err))
    
  },[])






    return(
    <div className="pageContainer">
        <div className={styles.title}>
          {adventureInProgressList.length > 0 &&(
            <h3 className={styles.titleFont}>{adventureInProgressList[0].adventureFeat}을 목표로<br/> 탐험하는 사람들</h3>
          )}
          
        </div>
        <div>
          {adventureInProgressList.map((adventureInProgressItem,index) => {
            return <AdventureInProgressListBanner key={index} adventureInProgressItem={adventureInProgressItem} /*isInProgress={isInProgress}*//>
         })}
        </div>
    </div>
    
    
    
    )

}

export default AdventureInProgressListPage;