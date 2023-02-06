import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import BigArticleItem from "./BigArticleItem";
import AdventureBanner from "./Adventure/AdventureBanner";

import style from "./HorizontalScroll.module.css";

// props로 contentType 지정해서 넘겨줄 것. adventure/article
function HorizontalScroll(props) {
  const dummy =[]
  const listItem = props.contentType;

  switch (listItem) {
    case "adventure":
      return (
        <div className={style.articleList}>
          <ScrollMenu>
            {dummy.map((articleListItem) => {
              return (
                <AdventureBanner
                key={articleListItem}
                articleListItem={articleListItem}
                />
                );
              })}
          </ScrollMenu>
        </div>
      );
      case "article":
      return (
        <div className={style.articleList}>
          <ScrollMenu>
            {props.articleList.map((data) => {
              return <BigArticleItem data={data} />;
            })}
          </ScrollMenu>
        </div>
      );
    default:
      return <div></div>;
  }
  // props.articleList.map(function(articleListItem){
  //   return (
  //     <ArticleListItem articleListItem={articleListItem}/>
  //   )
  // })
}

export default HorizontalScroll;
