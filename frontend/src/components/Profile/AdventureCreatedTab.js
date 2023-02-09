import React, { useState, useMemo } from 'react';
import AdventureBanner from './../Adventure/AdventureBanner';
import axios from 'axios';
import { useSelector } from "react-redux"
import style from './AdventureCreatedTab.module.css'
import AdventureEmpty from './AdventureEmpty';
import { useNavigate } from 'react-router-dom'


function AdventureOnProgressTab({userId, tab}) {
  const [adventureList, setAdventureList] = useState([])
  const URL = useSelector((state) => state.url)
  const TOKEN = useSelector((state) => state.token)

  const navigate = useNavigate()

  const orders = [
    { value: "createTimeDesc", name: "최신순" },
    { value: "userCountDesc", name: "참여자순" },
    { value: "difficultyAsc", name: "쉬운순" },
    { value: "difficultyDesc", name: "어려운순" },
  ];

  const [whichOrder, setWhichOrder] = useState("최신순")
    

  const handleSelect = (e) => {
    getAdventures(e.target.value)
  };

  const getAdventures = function(order) {
    axios({
      url: URL + `/adventures/clicks/adventure-creations/users/${userId}`,
      method : 'get',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      params: {
        order,
      }

    })
    .then((res) => {
      console.log(res)
      setAdventureList(res.data.result)
    })
    .catch((err) => console.log(err))
  }
 
  
  useMemo(() => {
    if (tab === 4) {
      getAdventures('createTimeDesc')
  }},[tab])


  return(
    <div className={style.container}>
      {/* 여기가 드롭박스 */}
      <div className={style.subContainer}>
          <div className={style.selectContainer}>
            <span style={{ backgroundColor: "white", borderRadius: "6px" }}>
              <select className={style.select} onChange={handleSelect}>
                {orders.map((order) => (
                  <option
                    className={style.option}
                    key={order.value}
                    value={order.value}
                  >
                    {order.name}
                  </option>
                ))}
              </select>
            </span>
          </div>
        </div>
        { adventureList.length !== 0 ? adventureList.map((adventureItem) => {
        return <AdventureBanner adventureItem={adventureItem} /*isInProgress={isInProgress}*//>
      })
    : <div onClick={() => {navigate("/adventure/create")}}><AdventureEmpty text={'탐험을 만들어보세요!'} /></div>
    }
    </div>
  )

}

export default AdventureOnProgressTab