import { RiMoreFill } from  "react-icons/ri"
import ArticleMoreList from "./ArticleMoreList"
import style from './ArticleMoreButton.module.css'


function ArticleMoreButton(props) {
  
  return (
    <div className={style.buttonContainer}>
      <RiMoreFill onClick={props.toggle}/>
      {props.isOn && <ArticleMoreList isMe={props.isMe} article={props.article}/>} 
    </div>
    )

}

export default ArticleMoreButton