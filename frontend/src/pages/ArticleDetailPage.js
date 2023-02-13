import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import ArticleDetail from "./../components/Article/ArticleDetail";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import style from "./ArticleDetailPage.module.css";

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
        setArticle([res.data.result]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="pageContainer">
      <div className={style.topBar}>
        <AiOutlineLeft className={style.left} onClick={() => navigate(-1)} />
        <div>게시글</div>
        <AiOutlineRight className={style.right} />
      </div>

      {article.map((articleItem) => (
        <ArticleDetail article={articleItem} />
      ))}
    </div>
  );
}

export default ArticleDetailPage;
