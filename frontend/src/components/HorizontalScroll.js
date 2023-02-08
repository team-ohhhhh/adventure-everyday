import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import BigArticleItem from "./BigArticleItem";
import AdventureBanner from "./Adventure/AdventureBanner";

import style from "./HorizontalScroll.module.css";

// props로 contentType 지정해서 넘겨줄 것. adventure/article
function HorizontalScroll(props) {
  // 내 주변 탐험 데이터 리스트: props.nearList

  const listItem = props.contentType;
  const nearList = props.nearList;
  const isAdTab = props.isAdTab;
  switch (listItem) {
    case "adventure":
      return (
        <div className={style.articleList}>
          <ScrollMenu>
            {nearList &&
              nearList.map((articleListItem) => {
                return (
                  <AdventureBanner
                    key={articleListItem}
                    adventureItem={articleListItem}
                    isAdTab={isAdTab}
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
