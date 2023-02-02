import { createSlice } from "@reduxjs/toolkit";


let tokenSlice = createSlice({
  name : 'TOKEN',
  initialState : null,
  reducers : {
    saveToken(state, a){
      return a.payload
    },
    deleteToken(state){
      return ''
    }
  }
})

export const { saveToken, deleteToken } = tokenSlice.actions

export default tokenSlice.reducer