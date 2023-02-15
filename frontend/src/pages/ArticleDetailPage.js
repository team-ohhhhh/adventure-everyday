import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import ArticleDetail from "./../components/Article/ArticleDetail";
import CommentPage from "./CommentPage";

import style from "./ArticleDetailPage.module.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function ArticleDetailPage() {
  let URL = useSelector((state) => state.url);
  let TOKEN = useSelector((state) => state.token);

  let { articleId } = useParams();

  const navigate = useNavigate();

  const [article, setArticle] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios({
      url: URL + `/posts/${articleId}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        // console.log(res.data.result);
        setArticle([res.data.result]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="pageContainer" style={{ marginBottom: "5rem" }}>
      <div className={style.topBar}>
        <AiOutlineLeft
          className={style.left}
          onClick={() =>
            navigate(-1, {
              state: { lat: article[0].lat, lng: article[0].lng },
            })
          }
        />
        <div>게시글</div>
        <AiOutlineRight className={style.right} />
      </div>

      {article.map((articleItem) => (
        <ArticleDetail key={articleItem.postId} article={articleItem} />
      ))}

      <CommentPage isDetailPage={true} />
    </div>
  );
}

export default ArticleDetailPage;
