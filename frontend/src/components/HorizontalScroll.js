import React, { useState,useEffect } from "react";
import ArticleListItem from "./ArticleListItem"
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import "./HorizontalScroll.css"


function HorizontalScroll() {
  
  const dummy = [
    {post_id: 1, title : 'TITLEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 2, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 3, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 4, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 5, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 6, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
  ]
  
  return (

    <div className="articleList">
      <ScrollMenu >
        {dummy.map((articleListItem) => {
          return(
          <ArticleListItem articleListItem={articleListItem}/>
        )
        })
      }
      </ScrollMenu>
    </div>
      

  )
  // props.articleList.map(function(articleListItem){
  //   return (
  //     <ArticleListItem articleListItem={articleListItem}/>
  //   )
  // })
}



export default HorizontalScroll