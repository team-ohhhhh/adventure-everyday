import React, { useState, useEffect } from 'react';
import AdventureBanner from './../Adventure/AdventureBanner';
import axios from 'axios';
import { useSelector } from "react-redux"


function AdventureCreatedTab() {
  const [adventureList, setAdventureList] = useState([])
  const URL = useSelector((state) => state.url)

 
  
  // useEffect(() => {
  //   axios({
  //     url: URL + '/adventures/adventure-in-progress',
  //     method : 'get',

  //   })
  //   .then((res) => {

  //   })
  // },[])


  return(
    <div>
      {adventureList.map((adventureItem) => {
        return <AdventureBanner adventureItem={adventureItem}/>
      })}
    </div>
  )

}

export default AdventureCreatedTab