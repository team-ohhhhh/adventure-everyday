import React, { useState, useEffect } from "react";
import SmallArticleItem from "./SmallArticleItem";
import AdventureBanner from "./Adventure/AdventureBanner";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import style from "./HorizontalScroll.module.css";

// props로 contentType 지정해서 넘겨줄 것. adventure/article
function HorizontalScroll(props) {
  // 탐험 더미 데이터 (특정 탐험 조회 기준 데이터)
  const adDummy = [
    {
      adventureId: 1,
      userId: "silverain_9",
      category: "맛집",
      featTitle: "걷기왕",
      featContent: null, // 칭호 설명용으로 넣은 것이지만 사실 모험이름이라 쓸 일 없을듯
      title: "전국 5대 맛집 탐험",
      content: "아주 맛있는 맛집 모음이에요",
      difficulty: "/images/diff_normal.png",
      photoUrl: "/images/alien.jpg",
      startDate: "2023-01-24",
      endDate: "2023-02-03",
      avgReviewRate: null,
    },
    {
      adventureId: 2,
      userId: "silverain_9",
      category: "맛집",
      featTitle: "걷기왕",
      featContent: null,
      title: "전국 5대 맛집 탐험",
      content: "아주 맛있는 맛집 모음이에요",
      difficulty: 3,
      photoUrl: null,
      startDate: "2023-01-24",
      endDate: "2023-02-03",
      avgReviewRate: null,
    },
    {
      adventureId: 3,
      userId: "silverain_9",
      category: "맛집",
      featTitle: "걷기왕",
      featContent: null,
      title: "전국 5대 맛집 탐험",
      content: "아주 맛있는 맛집 모음이에요",
      difficulty: 3,
      photoUrl: null,
      startDate: "2023-01-24",
      endDate: "2023-02-03",
      avgReviewRate: null,
    },
    {
      adventureId: 4,
      userId: "silverain_9",
      category: "맛집",
      featTitle: "걷기왕",
      featContent: null,
      title: "전국 5대 맛집 탐험",
      content: "아주 맛있는 맛집 모음이에요",
      difficulty: 3,
      photoUrl: null,
      startDate: "2023-01-24",
      endDate: "2023-02-03",
      avgReviewRate: null,
    },
    {
      adventureId: 5,
      userId: "silverain_9",
      category: "맛집",
      featTitle: "걷기왕",
      featContent: null,
      title: "전국 5대 맛집 탐험",
      content: "아주 맛있는 맛집 모음이에요",
      difficulty: 3,
      photoUrl: null,
      startDate: "2023-01-24",
      endDate: "2023-02-03",
      avgReviewRate: null,
    },
    {
      adventureId: 6,
      userId: "silverain_9",
      category: "맛집",
      featTitle: "걷기왕",
      featContent: null,
      title: "전국 5대 맛집 탐험",
      content: "아주 맛있는 맛집 모음이에요",
      difficulty: 3,
      photoUrl: null,
      startDate: "2023-01-24",
      endDate: "2023-02-03",
      avgReviewRate: null,
    },
  ];

  const listItem = props.contentType;

  switch (listItem) {
    case "adventure":
      return (
        <div className={style.articleList}>
          <ScrollMenu>
            {adDummy.map((articleListItem) => {
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
            {adDummy.map((data) => {
              return <SmallArticleItem data={data} />;
            })}
          </ScrollMenu>
        </div>
      );
  }
  // props.articleList.map(function(articleListItem){
  //   return (
  //     <ArticleListItem articleListItem={articleListItem}/>
  //   )
  // })
}

export default HorizontalScroll;
