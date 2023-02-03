import React from 'react';

function SimpleUserBanner(props) {
  console.log(props.data)
  return(
    <div>
      url
      {props.data.photoUrl}
      nickname
      {props.data.nickname}
      level
      {props.data.level}
    </div>
  )
}
export default SimpleUserBanner