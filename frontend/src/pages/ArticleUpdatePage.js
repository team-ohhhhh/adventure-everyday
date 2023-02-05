import { useDispatch, useSelector } from "react-redux"
import style from './ArticleUpdatePage.module.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { deleteArticle } from "./../store/articleSlice";
import axios from "axios"

// {
//   "resultCode": "SUCCESS",
//   "result": {
//     "postId": 1,
//     "title": "title",
//     "content": "content",
//     "lng": 127.039577,
//     "lat": 37.50128,
//     "nearestPlace": "서울특별시",
//     "w3w": "나가는.오리다.그물",
//     "isPublic": true,
//     "createTime": "2023-02-03T07:26:56",
//     "photoUrl": null,
//     "isAntenna": 0,
//     "isChallenge": 0,
//     "isFollowing": 0,
//     "userDetailRes": {
//       "userId": 4,
//       "email": "ssafy13@ssafy.com",
//       "nickname": "귀여운 고양이",
//       "level": 0,
//       "exp": 0,
//       "introduce": "hihihihi",
//       "photoUrl": "https://s3.ap-northeast-2.amazonaws.com/bucket305/fc2ad64b-7f38-4e40-8188-01710141432f.jpg"
//     }
//   }
// }

function ArticleUpdatePage() {
  let article = useSelector((state) => state.article)
  let URL = useSelector((state) => state.url)
  let TOKEN = useSelector((state) => state.token)

  const navigate = useNavigate()
  const dispatch = useDispatch()



  const [title, setTitle] = useState((article.title))
  const [content, setContent] = useState((article.content))
  const [isPublic, setIsPublic] =useState((!article.isPublic))

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const onChangeContent = (e) => {
    setContent(e.target.value)

  }
  

  const handleCheck = (e) => {
    setIsPublic((prev) => !prev);
  };

  // 수정 요청
  const updateArticle = function() {
    axios({
      url: URL + `/posts/${article.postId}`,
      method:'put',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      data: {
        title,
        content,
        isPublic
      }

    })
    .then((res) => {
      navigate(`/article/${article.postId}`)
      dispatch(deleteArticle())
  })
    .catch((err) => console.log(err))
  }


  return (
    <div className="pageContainer">
      <div className={style.container}>
        <div className={style.photoHeader}><span style={{fontWeight:"600"}}>{article.w3w}</span> 에서 작성된 글</div>
        <div className={style.photoHolder}>
          <img className={style.photo} src={article.photoUrl}></img>
        </div>

        <div className={style.titleLabel}>게시글 수정</div>
        <div className={style.inputHolder}>
          <input onChange={onChangeTitle} className={style.title} defaultValue={title}></input>
          <textarea onChange={onChangeContent} className={style.content} defaultValue={content}></textarea>
        </div>
        <div>
          <input
            type="checkbox"
            name="isPrivate"
            checked={isPublic}
            onChange={handleCheck}
            className={style.checkBox}
          /><span>비공개</span>
        </div>
        <div className={style.buttonHolder}>
          <div>
            <button className={style.back } onClick={() => {navigate(-1)}}>취소</button>
          </div>
          <div>
            <button className={style.update} onClick={() => {updateArticle()}}>수정</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleUpdatePage