import React, { useState, useEffect } from "react";

import axios from 'axios'
import { useSelector } from "react-redux"
import ProfileArticleMap from "./ProfileArticleMap"

function ArticleTab({ userId }) {
  const [state, setState] = useState({
    isSelected: false,
  })

  const URL = useSelector((state) => state.url)
  const TOKEN = useSelector((state) => state.token)

  const [articleList, setArticleList] = useState([])

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
      {/*TODO: 여기에 게시글 지도 컴포넌트 넣자 */}
      <ProfileArticleMap articleList={articleList}/>
        

    </div>
  )
}

export default ArticleTab