import React, { useState, useEffect } from 'react';
import AdventureBanner from './../Adventure/AdventureBanner';
import axios from 'axios';
import { useSelector } from "react-redux"


function AdventureOnProgressTab({userId}) {
  const [adventureList, setAdventureList] = useState([])
  const URL = useSelector((state) => state.url)
  const TOKEN = useSelector((state) => state.token)

 
  
  useEffect(() => {
    axios({
      url: URL + `/adventures/clicks/adventure-in-progress/users/${userId}`,
      method : 'get',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },

    })
    .then((res) => {
      setAdventureList(res.data.result)
    })
    .catch((err) => console.log(err))
  },[])


  return(
    <div>
      {adventureList.map((adventureItem) => {
        return <AdventureBanner adventureItem={adventureItem} /*isInProgress={isInProgress}*//>
      })}
    </div>
  )

}

export default AdventureOnProgressTab