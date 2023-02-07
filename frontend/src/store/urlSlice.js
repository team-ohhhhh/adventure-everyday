import { createSlice } from "@reduxjs/toolkit";


const urlSlice = createSlice({
  name : 'URL',
  initialState : 'http://i8a305.p.ssafy.io:8080/api/v1',
  reducers : {}
})

export default urlSlice.reducer