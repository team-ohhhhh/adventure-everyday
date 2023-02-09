import React, { useState, useMemo } from 'react';
import AdventureBanner from './../Adventure/AdventureBanner';
import axios from 'axios';
import { useSelector } from "react-redux"
import style from './AdventureCompletedTab.module.css'
import AdventureEmpty from './AdventureEmpty';
import { useNavigate } from 'react-router-dom'
import TreasureDisplay from './TreasureDisplay'
import TreasureMore from './TreasureMore'


function AdventureOnProgressTab({userId, tab}) {
  const [adventureList, setAdventureList] = useState([])
  const [treasureList, setTreasureList] = useState([])
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
      url: URL + `/adventures/clicks/adventure-succeed/users/${userId}`,
      method : 'get',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      params: {
        order,
      }

    })
    .then((res) => {
      setAdventureList(res.data.result.adventureSucceeds)
      setTreasureList(res.data.result.treasures)
    })
    .catch((err) => console.log(err))
  }

  // 더보기 버튼 누르면 보물 선택 창으로 변신
  const [isOn, setIsOn] = useState(false)
  const toggle = function() {
    setIsOn(!isOn)
  }
 
  
  useMemo(() => {
    if (tab === 3) {
      getAdventures('createTimeDesc')
  }},[tab])


  return(
    <div>
      {isOn ? <TreasureMore adventureList={adventureList} getAdventures={getAdventures} toggle={toggle}/>
       : <div className={style.container}>
        <TreasureDisplay treasureList={treasureList} adventureList={adventureList}/>
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
          return <AdventureBanner  adventureItem={adventureItem} /*isInProgress={isInProgress}*//>
        })
      : <div onClick={() => {navigate('/adventure')}}><AdventureEmpty  text={'탐험을 완료해보세요!'}/></div>
      }
      </div>}
    </div>
  )

}

export default AdventureOnProgressTab