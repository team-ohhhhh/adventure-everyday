import React, { useState, useEffect } from "react";

import axios from 'axios'
import { useSelector } from "react-redux"
import ProfileArticleMap from "./ProfileArticleMap"

function ArticleTab({ userId, articleList, setArticleList }) {
  const [state, setState] = useState({
    isSelected: false,
  })

  const URL = useSelector((state) => state.url)
  const TOKEN = useSelector((state) => state.token)

  

  useEffect(() => {
    axios({
      method: 'get',
      url : URL + `/posts/users/${userId}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
    .then((res) => {
      console.log(res)
      setArticleList(res.data.result)
    })
    .catch((err) => console.log(err))
  },[]) 

  
  return (
    <div >
      <ProfileArticleMap articleList={articleList}/>
        

    </div>
  )
}

export default ArticleTab