import React from "react";
import { Link } from "react-router-dom";

const ArticleCreatePage = () => {
  return (
    <div>
      <p>어떤 글을 작성할까요?</p>
      <Link to="/create/photo">사진과 함께 작성</Link>
      <br />
      <Link to="/create/text">글만 작성</Link>
    </div>
  );
};

export default ArticleCreatePage;
