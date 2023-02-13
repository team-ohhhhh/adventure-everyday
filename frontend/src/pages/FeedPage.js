import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import ArticleDetail from "./../components/Article/ArticleDetail";

import styles from "./FeedPage.module.css";

const FeedPage = () => {
  let URL = useSelector((state) => state.url);
  let TOKEN = useSelector((state) => state.token);

  const [feed, setFeed] = useState([]);

  const getFeed = function () {
    axios({
      url: URL + "/posts/all",
      method: "get",
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setFeed(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className={`pageContainer ${styles.pageContainer}`}>
      <div className={styles.header}>피드</div>
      {feed.length > 0 ? (
        feed.map((article) => (
          <div className={styles.articleContainer} key={article.postId}>
            <ArticleDetail article={article} isFeed={true} />
          </div>
        ))
      ) : (
        <div>피드 내용이 없어요!</div>
      )}
    </div>
  );
};

export default FeedPage;
