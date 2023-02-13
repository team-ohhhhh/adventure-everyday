import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { deleteArticle } from "./../store/articleSlice";

import style from "./ArticleUpdatePage.module.css";
import style2 from "./ArticleCreatePage.module.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function ArticleUpdatePage() {
  let article = useSelector((state) => state.article);
  let URL = useSelector((state) => state.url);
  let TOKEN = useSelector((state) => state.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [isPublic, setIsPublic] = useState(!article.isPublic);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleCheck = (e) => {
    setIsPublic((prev) => !prev);
  };

  // 수정 요청
  const updateArticle = function () {
    axios({
      url: URL + `/posts/${article.postId}`,
      method: "put",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      data: {
        title,
        content,
        isPublic,
      },
    })
      .then(() => {
        navigate(`/article/${article.postId}`);
        dispatch(deleteArticle());
      })
      .catch((err) => console.log(err));
  };

  const w3w = (w3w) => {
    return w3w ? w3w.split(".").join(", ") : "";
  };

  return (
    <div className="pageContainer">
      <div className={style.topBar}>
        <AiOutlineLeft className={style.left} onClick={() => navigate(-1)} />
        <div>게시글 수정</div>
        <AiOutlineRight className={style.right} />
      </div>

      <div className={style.container}>
        <div className={style.subheader}>
          {w3w(article.w3w)}
          <span style={{ fontWeight: "400" }}>에서 작성된 글</span>
        </div>
        <div className={style.photoHolder}>
          <img
            className={style.photo}
            src={article.photoUrl}
            alt={article.title}
          ></img>
        </div>

        <div className={style.subheader}>게시글 수정</div>
        <div className={style.inputHolder}>
          <input
            onChange={onChangeTitle}
            className={style2.titleInput}
            style={{ marginTop: 0 }}
            defaultValue={title}
          ></input>
          <textarea
            onChange={onChangeContent}
            className={style2.contentInput}
            defaultValue={content}
          ></textarea>
        </div>
        <div className={style.checkBoxContainer}>
          <input
            type="checkbox"
            name="isPrivate"
            checked={isPublic}
            onChange={handleCheck}
            className={style.checkBox}
          />
          <div className={style.checkBoxLabel}>비공개</div>
        </div>

        <div className={style2.btnContainer} style={{ width: "100%" }}>
          <div className={style2.whiteBtn} onClick={() => navigate(-1)}>
            취소
          </div>
          <div className={style2.blueBtn} onClick={() => updateArticle()}>
            완료
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleUpdatePage;
