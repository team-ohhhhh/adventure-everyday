import React from "react";
import { useEffect, useRef, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
// import "./BottomSheet.css";
import AdventureBanner from "./../Adventure/AdventureBanner"

const Oba = () => {
  const [open, setOpen] = useState(true);
  const focusRef = useRef();

  const dummy = [
    {post_id: 1, title : 'TITLEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 2, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 3, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 4, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 5, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
    {post_id: 6, title : 'TITLE', nickName: 'NICKNAME', date: 'DATE.MM.DD'},
  ]

  useEffect(() => {
    // Setting focus is to aid keyboard and screen reader nav when activating this iframe
    focusRef.current.focus();
  }, []);

  return (
    <p>
      obas
      <button onClick={() => setOpen(open => !open)} ref={focusRef}>
        {open ? "Close" : "Open"}
      </button>
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        blocking={false}
        header={
          <div>여기다가 넣으면 되겠다 이제</div>
        }
        // 첫번쨰가 1차 높이, 두번째가 최대 높이
        snapPoints={({ maxHeight }) => [maxHeight / 4, maxHeight]}
      >
        <div className="forScrollBar">
          {dummy.map((articleListItem) => {
                return(
                <AdventureBanner articleListItem={articleListItem}/>
              )})}
        </div>
      </BottomSheet>
    </p>
  );
};

export default Oba;

