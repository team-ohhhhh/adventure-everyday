import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Hashicon } from "@emeraldpay/hashicon-react";
import style from "./TreasurePage.module.css"


function TreasurePage() {
  let { userId, nickname } = useParams();
  const URL = useSelector((state) => state.url)
  const TOKEN = useSelector((state) => state.token)
  
  const navigate = useNavigate()
  const [treasureList, setTreasureList] = useState([]) 
  useEffect(() =>{
    axios({
      url: URL + `/adventures/treasures/users/${userId}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
    })
    .then((res) => {
      setTreasureList(res.data.result.treasures)
    })
    .catch((err) => console.log(err))
  }, [])
  
  return(
    <div className="pageContainer" style={{display:"flex", flexDirection:"column", alignItems:"start", margin:"5vw"}} >

      <h1>{nickname}의 보물함!</h1>
      <div>보물을 클릭하면 해당 모험 상세페이지로 이동합니다~</div>
      {treasureList.length !== 0 ? 
      <div
        style={{
          width: "90vw",
          display: "grid",
          gridTemplateRows: "1fr ",
          gridTemplateColumns: "1fr 1fr 1fr",
          backgroundColor: "",
          marginLeft : "auto",
          marginRight : "auto",
        }}
      >
        {treasureList.map((treasure) => (
          <div
            key={treasure.adventureId} 
            style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-evenly",
            alignItems:"center",
            background: "#F6F9F8",
            margin : "2vw",
            borderRadius : "10px"
          }} onClick={() => {navigate(`/adventure/detail/${treasure.adventureId}}`)}}>
            <Hashicon value={treasure.adventureId + treasure.feat + treasure.adventureTitle} size={70} />
          <div style={{marginTop:"1vh"}}>{treasure.feat}</div>
          <div style={{marginTop:"0.5vh", marginBottom:"1vh", color:"grey"}}>{treasure.adventureTitle}</div>
        </div>
        ))}
      </div>
      :<div style={{fontSize:"large", marginTop:"5vh"}}> 보물이 없어요 ㅜㅠ</div>}
    </div>
  )
}

export default TreasurePage