import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Comment from "../components/Article/Comment/Comment";
import InputForm from "../components/Article/Comment/InputForm";

import styles from "./CommentPage.module.css";
import styles2 from "./ArticleDetailPage.module.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

function CommentPage({ isDetailPage }) {
  let URL = useSelector((state) => state.url);
  let TOKEN = useSelector((state) => state.token);

  let { articleId } = useParams();

  const navigate = useNavigate();

  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (!isDetailPage) {
      window.scrollTo(0, 0);
    }
  }, []);

  const getComments = function () {
    axios({
      url: URL + `/posts/${articleId}/comments`,
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        setCommentList(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  // 댓글 작성용
  const [commentInput, setCommentInput] = useState("");
  const postComment = function () {
    axios({
      url: URL + `/posts/${articleId}/comments`,
      method: "post",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      data: {
        content: commentInput,
      },
    })
      .then((res) => {
        getComments();
        setCommentInput("");
      })
      // .then(() => console.log("빈칸 되어라"))
      .catch((err) => console.log(err));
  };

  // 수정삭제 버튼 토글용 버튼 제어
  const [moreButtonOpen, setMoreButtonOpen] = useState(false);
  const [whichButton, setWhichButton] = useState(null);
  const [replyMoreButtonOpen, setReplyMoreButtonOpen] = useState(false);
  const [whichReplyButton, setWhichReplyButton] = useState(null);

  const closeMoreButton = function () {
    if (moreButtonOpen) {
      setMoreButtonOpen(false);
      setWhichButton(null);
    }
  };

  const closeReplyMoreButton = function () {
    if (replyMoreButtonOpen) {
      setReplyMoreButtonOpen(false);
      setWhichReplyButton(null);
    }
  };

  useEffect(() => {
    getComments();
  }, [moreButtonOpen, whichButton]);

  return (
    <div
      className="pageContainer"
      style={{
        backgroundColor: "#f2f2f2",
        paddingBottom: "5rem",
        height: isDetailPage ? "inherit" : "100vh",
      }}
      onClick={() => {
        closeMoreButton();
        closeReplyMoreButton();
      }}
    >
      {!isDetailPage && (
        <div className={styles2.topBar} style={{ marginBottom: 0 }}>
          <AiOutlineLeft
            className={styles2.left}
            onClick={() => navigate(-1)}
          />
          <div className={styles.comments_count}>
            <div>댓글</div>
            <div className={styles.count}>{commentList.length}</div>
          </div>
          <AiOutlineRight className={styles2.right} />
        </div>
      )}

      <div id="comment" className={styles.comments_container}>
        <div>
          {commentList.map((comment) => {
            return (
              <Comment
                key={comment.commentId}
                comment={comment}
                getComments={getComments}
                //코멘트 용
                moreButtonOpen={moreButtonOpen}
                setMoreButtonOpen={setMoreButtonOpen}
                whichButton={whichButton}
                setWhichButton={setWhichButton}
                // 리플라이 용
                replyMoreButtonOpen={replyMoreButtonOpen}
                setReplyMoreButtonOpen={setReplyMoreButtonOpen}
                whichReplyButton={whichReplyButton}
                setWhichReplyButton={setWhichReplyButton}
              />
            );
          })}
        </div>

        <div className={styles.whiteLine}></div>

        <InputForm
          setCommentInput={setCommentInput}
          commentInput={commentInput}
          postComment={postComment}
        />
      </div>
    </div>
  );
}

export default CommentPage;
