import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import ArticleMoreButton from "./ArticleMoreButton";

import style from "./ArticleDetail.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GrFlag } from "react-icons/gr";
import { GoRadioTower } from "react-icons/go";
import { MdPersonOutline } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";

function ArticleDetail({ article, isFeed }) {
  let URL = useSelector((state) => state.url);
  let TOKEN = useSelector((state) => state.token);
  let USER = useSelector((state) => state.user);

  const navigate = useNavigate();

  // 해당 게시글의 좋아요 수 및 좋아요 여부 알아오기
  const [likes, setLikes] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const getLikes = function () {
    axios({
      url: URL + `/posts/${article.postId}/post-like`,
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        setLikes(res.data.result.cnt);
        setIsLike(res.data.result.isLike);
      })
      .catch((err) => console.log(err));
  };

  // 해당 게시글의 댓글 및 댓글 수 조회
  const [comments, setComments] = useState([]);
  const getComments = function () {
    axios({
      url: URL + `/posts/${article.postId}/comments`,
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        setComments(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  // 페이지 로드되었을 때 axios되도록 useEffect
  useEffect(() => {
    getComments();
    getLikes();
    if (article.userDetailRes.userId === USER.userId) {
      setIsMe(true);
    } else {
      setIsMe(false);
    }
  }, []);

  // ... 버튼 토글용 + 내 글인지 야부
  const [isOn, setIsOn] = useState(false);
  function toggle() {
    setIsOn((prev) => !prev);
  }
  const [isMe, setIsMe] = useState(false);

  // 좋아요
  const doLike = function () {
    axios({
      url: URL + `/posts/${article.postId}/post-like`,
      method: "post",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then(() => {
        getLikes();
      })
      .catch((err) => console.log(err));
  };

  // 좋아요 취소
  const unDoLike = function () {
    axios({
      url: URL + `/posts/${article.postId}/post-like`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then(() => {
        getLikes();
      })
      .catch((err) => console.log(err));
  };

  // 피드에서는 상세보기로 이동 가능
  const goToDetail = function () {
    if (isFeed) {
      navigate(`/article/${article.postId}`);
    }
  };

  const w3w = (w3w) => {
    return w3w ? w3w.split(".").join(", ") : "";
  };

  const date = (a) => {
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

  return (
    <>
      <div className={style.infoContainer}>
        <div className={style.userContainer}>
          <div
            className={style.profileContainer}
            onClick={() => navigate(`/profile/${article.userDetailRes.userId}`)}
          >
            <img
              className={style.profileImg}
              src={
                article.userDetailRes.photoUrl
                  ? article.userDetailRes.photoUrl
                  : "/images/defaultProfile.jpg"
              }
              alt={"profile"}
            />
          </div>

          <div className={style.nicknameContainer}>
            <div
              className={style.nickname}
              onClick={() =>
                navigate(`/profile/${article.userDetailRes.userId}`)
              }
            >
              {article.userDetailRes.nickname}
            </div>
            <div
              className={style.w3w}
              onClick={() =>
                navigate("/", {
                  state: { lat: article.lat, lng: article.lng },
                })
              }
            >
              {w3w(article.w3w)}
            </div>
          </div>
        </div>

        <div className={style.iconContainer}>
          {article.isChallenge !== 0 && (
            <GrFlag
              size={22}
              className={style.icon}
              style={{ marginRight: "0.3rem" }}
              onClick={() =>
                navigate(`/adventure/detail/${article.isChallenge}`)
              }
            />
          )}
          {article.isAntenna !== 0 && (
            <GoRadioTower
              size={23}
              className={style.icon}
              onClick={() =>
                navigate("/", {
                  state: { lat: article.lat, lng: article.lng },
                })
              }
            />
          )}
          {article.isFollowing !== !0 && (
            <MdPersonOutline
              size={28}
              className={style.icon}
              onClick={() =>
                navigate(`/profile/${article.userDetailRes.userId}`)
              }
            />
          )}
          {!isFeed && (
            <div className={style.icon}>
              <ArticleMoreButton
                article={article}
                toggle={toggle}
                isOn={isOn}
                isMe={isMe}
              />
            </div>
          )}
        </div>
      </div>

      <div
        onClick={() => {
          if (isOn) setIsOn(false);
          goToDetail();
        }}
      >
        {article.photoUrl && (
          <img
            className={style.photo}
            src={article.photoUrl}
            alt={article.title}
          />
        )}
        <div className={style.contentContainer}>
          <div className={style.title}>{article.title}</div>
          <div className={style.content}>{article.content}</div>
          <div className={style.date}>
            {date(new Date(article.createTime))}
            {!article.isPublic && <span> · 비공개</span>}{" "}
          </div>
        </div>
      </div>

      <div className={style.actionContainer}>
        <div className={style.like}>
          {isLike ? (
            <AiFillHeart size={24} onClick={() => unDoLike()} />
          ) : (
            <AiOutlineHeart size={24} onClick={() => doLike()} />
          )}
          <div className={style.num}>{likes}</div>
        </div>
        <div
          className={style.comment}
          onClick={() => navigate(`/article/${article.postId}/comments`)}
        >
          <FaRegComment size={20} style={{ marginRight: "2px" }} />
          <div className={style.num}>{comments.length}</div>
        </div>
      </div>
    </>
  );
}

export default ArticleDetail;
