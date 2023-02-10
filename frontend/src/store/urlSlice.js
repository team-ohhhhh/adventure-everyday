import { createSlice } from "@reduxjs/toolkit";

const urlSlice = createSlice({
  name : 'URL',
  // initialState : 'https://i8a305.p.ssafy.io/api/v1',
  initialState : 'http://localhost:8080/api/v1',
  reducers : {}
})

export default urlSlice.reducer;
