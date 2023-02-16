import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveArticle } from "./../../store/articleSlice";

import style from "./ArticleMoreList.module.css";

function ArticleMoreList({ isMe, article, setModalIsOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toUpdate = function () {
    dispatch(saveArticle(article));
    navigate("update");
  };

  if (isMe) {
    return (
      <div className={style.MoreList}>
        <div className={style.MoreListItem} onClick={() => toUpdate()}>
          수정
        </div>
        <div
          className={style.MoreListItem}
          onClick={() => setModalIsOpen(true)}
          style={{ color: "red" }}
        >
          삭제
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.MoreList}>
        <div
          className={style.MoreListItem}
          style={{ color: "red" }}
          // onClick={() => console.log("신고")}
        >
          신고
        </div>
      </div>
    );
  }
}

export default ArticleMoreList;
