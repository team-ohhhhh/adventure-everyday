import { createSlice } from "@reduxjs/toolkit";

// 저장 예시
// "userDetailRes": {
//   "userId": 6,
//   "email": "ssafy@ssafy.com",
//   "nickname": "tk",
//   "level": 0,
//   "exp": 0,
//   "introduce": "hihihihi",
//   "photoUrl": "https://s3.ap-northeast-2.amazonaws.com/bucket305/0cd864d3-c2fb-41a9-a6e5-9c295aa6031d.png"
// }

let userSlice = createSlice({
  name : 'USER',
  initialState : null,
  reducers : {
    saveUserInfo(state, a){
      return a.payload
    },
    deleteUserInfo(state){
      return null
    }
  }
})

export const { saveUserInfo, deleteUserInfo } = userSlice.actions

export default userSlice.reducer