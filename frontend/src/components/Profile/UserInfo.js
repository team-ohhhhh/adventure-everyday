import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import MoreButton from "./MoreButton";

import style from "./UserInfo.module.css";
import { BiSearchAlt2, BiPencil } from "react-icons/bi";
import { RxCheck, RxCross2 } from "react-icons/rx";

function UserInfo(props) {
  const URL = useSelector((state) => state.url);
  const TOKEN = useSelector((state) => state.token);
  const MyId = useSelector((state) => state.user.userId);

  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  let navigate = useNavigate();
  let { userId } = useParams();

  const getFollowers = function () {
    axios({
      url: URL + `/users/followings/${userId}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        setFollowers(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFollowings = function () {
    axios({
      url: URL + `/users/followers/${userId}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        setFollowings(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const follow = function () {
    axios({
      url: URL + "/users/followings",
      method: "post",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      data: {
        followingId: userId,
      },
    })
      .then((res) => {
        // console.log(res);
        // 이후 팔로잉/팔로워 목록 업데이트
        getFollowers();
      })
      .catch((err) => console.log(err));
  };

  const unfollow = function () {
    const relationId = followers.find(
      (user) => user.userDetailRes.userId === MyId
    ).followId; //TODO: 여기 변수명 수정

    axios({
      url: URL + `/users/followers/${relationId}`, //TODO: 관계번호로 해야함...
      method: "delete",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        // console.log(res);
        // 이후 팔로잉/팔로워 목록 업데이트
        getFollowers();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios({
      url: URL + `/users/${userId}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        // console.log(res.data.result);
        setUser(res.data.result);
      })
      .then(() => {
        getFollowers(userId);
        getFollowings(userId);
      })
      .catch((err) => {
        //TODO: BODY에서 errorCode 찾아서 404페이지로 보내기
        console.log(err);
      });
  }, [userId]);

  // 유저 사진 수정
  const imgRef = useRef();
  const changePhoto = function () {
    const file = imgRef.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);
      axios
        .put(URL + "/users/photo", formData, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          setUser(res.data.result); // 반환값을 그대로 반영
        })
        .catch((err) => console.log(err));
    }
  };

  // 자기소개 수정
  const [introduceModify, setIntroduceModify] = useState(false);
  const [newIntroduce, setNewIntroduce] = useState(user.introduce);
  const onChange = (e) => {
    if (e.target.value && e.target.value.length > 29) {
      alert("소개글은 30자 이내로 작성해주세요.");
    } else {
      setNewIntroduce(e.target.value);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      changeIntroduce();
    }
  };

  const changeIntroduce = function () {
    axios({
      url: URL + "/users/profile",
      method: "put",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      data: {
        introduce: newIntroduce,
      },
    })
      .then((res) => {
        setUser(res.data.result);
      })
      .then(() => setIntroduceModify(false))
      .catch((err) => {
        console.log(err);
      });
  };

  const isMe = user.userId === MyId;

  return (
    <div className={style.userInfo}>
      <div className={style.nicknameAndSearch}>
        <div className={style.nicknameAndTier}>
          <div className={style.nickname}>{user.nickname}</div>
          <img
            className={style.tier}
            src={`/images/lv${user.level}.png`}
            alt="levelImage"
          />
        </div>

        <div className={style.searchAndMore}>
          <BiSearchAlt2
            size={25}
            className={style.searchBtn}
            onClick={() => navigate("/search/user")}
          />
          {/* TODO: 팝업창 띄우기 부터 시작 */}
          <MoreButton isOn={props.isOn} toggle={props.toggle} isMe={isMe} />
        </div>
      </div>

      <div className={style.introduceAndModify}>
        {!introduceModify ? (
          <>
            <div className={style.introduce}>{user.introduce}</div>
            {user.userId === MyId && (
              <BiPencil
                className={style.modifyBtn}
                onClick={() => setIntroduceModify(true)}
              />
            )}
          </>
        ) : (
          <>
            <input
              className={style.modifyInput}
              onChange={onChange}
              onKeyDown={onKeyDown}
              defaultValue={user.introduce}
            />
            <RxCheck
              className={style.modifyBtn}
              onClick={() => changeIntroduce()}
            />
            <RxCross2
              className={style.modifyBtn}
              onClick={() => setIntroduceModify(false)}
            />
          </>
        )}
      </div>

      <div className={style.photoAndFollowInfo}>
        <div className={style.photoAndChangeButton}>
          <div className={style.photoContainer}>
            <img
              className={style.photo}
              src={user.photoUrl ? user.photoUrl : "/defaultProfile.jpg"}
              alt="profileImage"
            />
          </div>
          {user.userId === MyId && (
            <label htmlFor="photoChange">
              <div className={style.changePhotoButton}>+</div>
            </label>
          )}
          <input
            id="photoChange"
            type="file"
            accept={"image/*"}
            onChange={changePhoto}
            ref={imgRef}
            style={{ display: "none" }}
          />
        </div>

        <div className={style.followInfo}>
          <div className={style.followInfoPart}>
            <div className={style.followName}>{props.articleListLength}</div>
            <div>posts</div>
          </div>
          <div
            className={style.followInfoPart}
            onClick={() => navigate(`/profile/${userId}/followers`)}
          >
            <div className={style.followName}>{followers.length}</div>
            <div>followers</div>
          </div>
          <div
            className={style.followInfoPart}
            onClick={() => navigate(`/profile/${userId}/followings`)}
          >
            <div className={style.followName}>{followings.length}</div>
            <div>following</div>
          </div>
        </div>
      </div>

      <div className={style.buttonContainer}>
        {user.userId !== MyId ? (
          <>
            {followers.find((user) => user.userDetailRes.userId === MyId) ? (
              <div
                onClick={() => unfollow()}
                className={`${style.blueBtn} ${style.whiteBtn}`}
              >
                팔로잉
              </div>
            ) : (
              <div onClick={() => follow()} className={style.blueBtn}>
                팔로우
              </div>
            )}
          </>
        ) : (
          <div></div>
        )}

        <div
          className={style.blueBtn}
          onClick={() =>
            navigate(`/profile/${userId}/treasure/${user.nickname}`)
          }
        >
          보물함
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
