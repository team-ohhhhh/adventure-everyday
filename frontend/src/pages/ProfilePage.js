import React, {} from 'react'
import UserInfo from './../components/Profile/UserInfo'
import { useParams } from 'react-router-dom'

function ProfilePage() {
  let { userId } = useParams()

  return (
    <div style={{ minHeight:'100vh' }}>
      <div>
        <UserInfo userId={userId}/>
      </div>
      <div>
        {/* 탭 자리 */}
      </div>
    </div>
  )
}

export default ProfilePage
