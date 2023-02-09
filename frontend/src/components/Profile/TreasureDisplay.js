import { Hashicon } from "@emeraldpay/hashicon-react";
import style from './TreasureDisplay.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const TreasureDisplay = function({treasureList, toggle}) {
  



  return (
    <div className={style.bigContainer}>
      <div className={style.header}>
        <div>~~~님의 탐험 보물</div>
        <div><button onClick={() => {toggle()}} className={style.button}>더보기</button></div>
      </div>
      <div className={style.container}>
        {[0, 0, 0].length ? [0,0,0].map(() => {
          return(<div>
            {/* <Hashicon value={treasure.feat + treasure.adentureTitle + treasure.adventureId} size={100} /> */}
            <Hashicon value={'14'} size={80} />
            <div style={{color:"black"}}>{'걷기왕'}</div>
            <div style={{color:"grey"}}>title 입니다!!!</div>
          </div>)
        })
        : <div className={style.noTreasure}>보물이 없어요ㅠㅠ</div>
      }
      </div>
    </div>
  )
}



export default TreasureDisplay