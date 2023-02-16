import React, { useState } from "react";
import "./BottomSheet.css"
import ArticleListItem from "./ArticleListItem"

// 바텀 시트는 module.css  작용이 어렵다...
function BottomSheet() {
  const [bottomSheetContainerState, setBottomSheetContainerState] = useState(null)
  const [bottomSheetState, setBottomSheetState] = useState(null)
  const dummy = [
    {post_id: 1, title : 'TITLEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 2, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 3, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 4, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 5, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 6, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
  ]


  return(
    <div>
      <button onClick={() => {
        setBottomSheetContainerState("active");
        setTimeout(() => {
          setBottomSheetState("semiActive");
        }, 200)
      }}>여기를 눌러!</button>
      <button onClick={() => {/*console.log('ㅇㅋ')*/}}>여기를 누르면 콘솔</button>
      <div id="bottomSheetContainer" className={bottomSheetContainerState}>
        <div id="bottomSheet" className={bottomSheetState}>
        {bottomSheetState === "semiActive" &&
          <button onClick={() => {
              setBottomSheetState("active")
            }}
          >더보기</button>    
    }
    {bottomSheetState === "active" &&
          <button onClick={() => {
              setBottomSheetState("semiActive")
            }}
          >덜보기</button>    
    }

          <button 
            //TODO:여기가 잘 작동 안함 => 클릭시에 리렌더링 되면서 state가 초기값인 null로 돌아가기 때문일듯
            onClick={() => {
              setBottomSheetContainerState(null)
              setTimeout(() => {
                setBottomSheetState(null)
              }, 400)
          }}>x</button>
          {dummy.map((articleListItem) => {
          return(
          <ArticleListItem articleListItem={articleListItem}/>
        )
        })}
        </div>

      </div>

    </div>

  )
}

export default BottomSheet