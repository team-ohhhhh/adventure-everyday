import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import ReplyList from "./ReplyList";

import style from "./Comment.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiMoreFill } from "react-icons/ri";

function Comment({
  comment,
  getComments,
  moreButtonOpen,
  setMoreButtonOpen,
  whichButton,
  setWhichButton,
  replyMoreButtonOpen,
  setReplyMoreButtonOpen,
  whichReplyButton,
  setWhichReplyButton,
}) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyList, setReplyList] = useState([]);

  let USER = useSelector((state) => state.user);
  let URL = useSelector((state) => state.url);
  let TOKEN = useSelector((state) => state.token);

  useEffect(() => {
    console.log(comment)
    window.scrollTo(0, 0);
  }, []);

  // 대댓글 창 열기
  const toggle = function () {
    setIsReplyOpen((prev) => !prev);
  };

  // 대댓글 가져오기
  const getReply = function () {
    axios({
      url: URL + `/posts/comments/${comment.commentId}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        setReplyList(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  // 좋아요 / 안좋아요
  const likeComment = function () {
    axios({
      url: URL + `/posts/${comment.commentId}/comment-like`,
      method: "post",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((res) => {
      getComments();
    });
  };

  const unlikeComment = function () {
    axios({
      url: URL + `/posts/${comment.commentId}/comment-like`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((res) => {
      getComments();
    });
  };

  const deleteComment = function () {
    axios({
      url: URL + `/posts/comments/${comment.commentId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        getComments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 삭제전 알려주기용 state
  const [wouldYouDelete, setWouldYouDelete] = useState(false);

  // 수정 화면용 state
  const [wouldYouUpdate, setWouldYouUpdate] = useState(false);
  const [newComment, setNewComment] = useState(comment.commentContent);
  const onChange = function (e) {
    setNewComment(e.target.value);
  };
  const updateComment = function () {
    axios({
      url: URL + `/posts/comments/${comment.commentId}`,
      method: "put",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      data: {
        content: newComment,
      },
    })
      .then((res) => {
        getComments();
        setWouldYouUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //시간 계산
  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  //api에 있는 detailPost.createdAt를 바꿔주는 것
  const nowDate = detailDate(new Date(comment.createdTime));

  return (
    <div className={style.comment}>
      {wouldYouDelete ? (
        <div className={style.comment_content}>
          <div className={style.wouldYouDelete}>
            <div>삭제하시겠습니까?</div>
            <div className={style.buttonHolder}>
              <button
                className={style.yesDelete}
                onClick={() => deleteComment()}
              >
                삭제
              </button>
              <button
                className={style.noDelete}
                onClick={() => setWouldYouDelete(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.content}>
          <img
            className={style.profile}
            src={
              comment.userDetailRes.photoUrl
                ? comment.userDetailRes.photoUrl
                : "/images/defaultProfile.jpg"
            }
            alt={"profile"}
          />
          <div className={style.contentContainer}>
            <div className={style.infoContainer}>
              <div className={style.nicknameContainer}>
                <div className={style.username}>
                  {comment.userDetailRes.nickname}
                </div>
                <div className={style.date}>{nowDate}</div>
              </div>
              {comment.userDetailRes.userId === USER.userId &&
                (wouldYouUpdate ? (
                  <div
                    style={{
                      marginLeft: "auto",
                      marginRight: "3%",
                      fontSize: "20",
                    }}
                  >
                    <span onClick={() => updateComment()}>수정</span>
                    <span
                      onClick={() => setWouldYouUpdate(false)}
                      style={{ marginLeft: "2vw" }}
                    >
                      취소
                    </span>
                  </div>
                ) : moreButtonOpen && whichButton === comment.commentId ? (
                  <div
                    style={{
                      marginLeft: "auto",
                      marginRight: "3%",
                      fontSize: "20",
                    }}
                  >
                    <span onClick={() => setWouldYouUpdate(true)}> 수정 </span>
                    <span onClick={() => setWouldYouDelete(true)}>
                      {" "}
                      삭제{" "}
                    </span>{" "}
                  </div>
                ) : (
                  <RiMoreFill
                    style={{
                      marginLeft: "auto",
                      marginRight: "3%",
                      fontSize: "20",
                    }}
                    onClick={() => {
                      setMoreButtonOpen(true);
                      setWhichButton(comment.commentId);
                    }}
                  />
                ))}
            </div>

            <div className={style.text}>
              {wouldYouUpdate ? (
                <input
                  className={style.modify}
                  onChange={onChange}
                  defaultValue={comment.commentContent}
                />
              ) : (
                <div>{comment.commentContent}</div>
              )}
            </div>

            <div className={style.actionContainer}>
              {comment.userIdxList.find((idx) => idx === USER.userId) ? (
                <div
                  className={style.iconContainer}
                  onClick={() => unlikeComment()}
                >
                  <AiFillHeart className={style.icon} size={19} />
                  {comment.userIdxList.length}
                </div>
              ) : (
                <div
                  className={style.iconContainer}
                  onClick={() => likeComment()}
                >
                  <AiOutlineHeart className={style.icon} size={19} />{" "}
                  {comment.userIdxList.length}
                </div>
              )}
              <FaRegComment
                style={{ marginRight: "0.2rem" }}
                size={16}
                onClick={() => {
                  toggle();
                  getReply();
                }}
              />
              {comment.subCommentDtoList.length}
            </div>
          </div>
        </div>
      )}
      {isReplyOpen && (
        <div>
          <ReplyList
            commentId={comment.commentId}
            replyList={replyList}
            getReply={getReply}
            replyMoreButtonOpen={replyMoreButtonOpen}
            setReplyMoreButtonOpen={setReplyMoreButtonOpen}
            whichReplyButton={whichReplyButton}
            setWhichReplyButton={setWhichReplyButton}
          />
        </div>
      )}
    </div>
  );
}

export default Comment;
