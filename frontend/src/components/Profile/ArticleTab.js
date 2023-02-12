import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import UserPostMap from "./UserPostMap";

function ArticleTab({ userId, articleList, setArticleList, userHeight }) {
  const URL = useSelector((state) => state.url);
  const TOKEN = useSelector((state) => state.token);

  useEffect(() => {
    axios({
      method: "get",
      url: URL + `/posts/users/${userId}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        // console.log(res);
        setArticleList(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <UserPostMap myPosts={articleList} userHeight={userHeight} />
    </>
  );
}

export default ArticleTab;
