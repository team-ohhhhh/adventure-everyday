import { configureStore, createSlice } from "@reduxjs/toolkit";

let URL = createSlice({
  name: "URL",
  initialState: "http://i8a305.p.ssafy.io:8080",
});

let TOKEN = createSlice({
  name: "TOKEN",
  initialState: "",
  reducers: {
    saveToken(state, a) {
      return a.payload;
    },
  },
});
export let { saveToken } = TOKEN.actions;

export default configureStore({
  reducer: {
    URL: URL.reducer,
    TOKEN: TOKEN.reducer,
  },
});
