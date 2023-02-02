import { configureStore, createSlice } from "@reduxjs/toolkit";

let URL = createSlice({
  name: "URL",
  initialState: "http://i8a305.p.ssafy.io:8080",
});

let TOKEN = createSlice({
  name: "TOKEN",
  initialState: null,
});

export default configureStore({
  reducer: {
    URL: URL.reducer,
    TOKEN: TOKEN.reducer,
  },
});
