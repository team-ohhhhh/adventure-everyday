import React from "react";
import style from "./BigArticleItem.module.css";

function BigArticleItem(props) {
  //변수 꺼내쓰기
  const postId = props.data.postId;
  const title = props.data.title;
  // const content = props.data.content;
  const w3w = props.data.w3w;
  const date = props.data.createdTime.substr(0, 10);
  const photo = props.data.postUrl;
  // const userDetailRes = props.data.userDetailRes;

  // // dummy data
  // const postId = 1
  // const photo = "/images.jpg"
  // const title = "title"
  // const nickName = "nickName"
  // const tier = 1
  // const date = 'yy.mm.dd'
  // const w3w = '보라돌이, 뚜비, 나나'

  return (
    <div
      key={postId}
      className={style.articleListItem}
      onClick={() => {
        // console.log("클릭", postId);
        props.onPostClick(props.data);
      }}
    >
      <div
        className={style.photo}
        style={{ backgroundImage: `url(${photo})` }}
      ></div>

      <div className={style.titleAndW3w}>
        <div className={style.title}>{title}</div>
        <div className={style.w3w}>{w3w}</div>
      </div>
      <div className={style.date}>{date}</div>
    </div>
  );
}

export default BigArticleItem;
