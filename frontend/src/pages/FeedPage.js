import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios'
import ArticleDetail from './../components/Article/ArticleDetail'
import { useNavigate } from 'react-router-dom'


const FeedPage = () => {
  let URL = useSelector((state) => state.url)
  let TOKEN = useSelector((state) => state.token)
  const navigate = useNavigate()
  

  const [feed, setFeed] = useState([])
  const getFeed = function() {
    axios({
      url : URL + "/posts/all",
      method: 'get',
      headers : {
        Authorization: 'Bearer ' + TOKEN
      }
    })
    .then((res) => {
      setFeed(res.data.result)
      console.log(res.data.result)
    })
    .catch((err) => {
      console.log(err)
    })
  } 

  useEffect(() => {
    getFeed()
  }, [])
  return (
    <div className="pageContainer">
      <h1>FEED</h1>
      {feed.map((article) => {
        return (
        <div style={{borderTop:"1px solid grey"}}>
          <ArticleDetail article={article} isFeed={true} />
        </div>)
      })}
    </div>
  );
};

export default FeedPage;
