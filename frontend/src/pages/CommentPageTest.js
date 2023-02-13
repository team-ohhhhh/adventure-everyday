 import axios from 'axios'
 import { useEffect, useState } from 'react'
 import { useSelector } from 'react-redux'
 import { useParams } from 'react-router-dom'
 import Comment from '../components/Article/Comment/Comment'
 import InputForm from '../components/Article/Comment/InputForm'
 import styles from "./CommentPageTest.module.css"; 
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faEllipsisH, faMessage } from "@fortawesome/free-solid-svg-icons";
 function CommentPageTest() {


  return (
    <div className={styles.comments_container}>
       <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "5%" }}>
        <FontAwesomeIcon icon="fa-solid fa-message" />
            <FontAwesomeIcon icon={faMessage} style={{ marginLeft: "10px"}} />
            <span style={{marginLeft:"2%", marginBottom:"5%" }}>10 comments</span>
          </div>
      <div className={styles.comment}>
        <div className={styles.comment_content}>
          <div className={styles.profile}>
            <img src="/images/lv1.png" alt="Profile picture" className={styles.profile_picture}/>
            <h4 className={styles.username}>Username</h4>
            <FontAwesomeIcon icon={faEllipsisH} style={{ marginLeft: "auto", marginRight:"3%", fontSize:"20" }} /> 
          </div>
          <div className={styles.text}>Comment text goes here</div>
            <div style={{ display: "flex", justifyContent: "flex-start",  marginTop: "5%" }}>
              <FontAwesomeIcon icon={faHeart} style={{ marginLeft: "19.5%" }} />
              <FontAwesomeIcon icon={faComment} style={{ marginLeft: "5%", marginRight: "2%" }} /><span>댓글 달기</span>
          </div>
        </div>
      </div>
  
</div>
  )

 }

 export default CommentPageTest