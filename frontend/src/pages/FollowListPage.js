import {useState, useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useSelector } from "react-redux"
import SimpleUserBanner from "./../components/Profile/SimpleUserBanner";


function FollowListPage() {
  let { userId, relationType } = useParams();
  const URL = useSelector((state) => state.url)
  const TOKEN = useSelector((state) => state.token)

  const [userList, setUserList] = useState([])

  const navigate = useNavigate()

  const getFollowers = function() {
    axios({
      url: URL + `/users/followings/${userId}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
    })
    .then((res) => {
      setUserList(res.data.result)
    })
    .catch((err) => {console.log(err)});
  }

  const getFollowings = function() {
    axios({
      url: URL + `/users/followers/${userId}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
    })
    .then((res) => {
      setUserList(res.data.result)
    })
    .catch((err) => {console.log(err)});
  }


  useEffect(() => {
    if ( relationType === 'followers') {
      getFollowers()
    } else if ( relationType === 'followings') {
      getFollowings()
    } else {
      navigate(`/profile/${userId}`)
    } // 뒤에 인자를 이상한걸로 들어와서 조회하려고 할때는 그냥 프로필로 보내버리기
  })
  

  return(
    <div className="pageContainer">
      { userList.length !== 0
      ? userList.map((user) => {
          return <SimpleUserBanner data={user}/>
        })
      : <div>목록이 없습니다...</div>
      }
    </div>
  )
}

export default FollowListPage