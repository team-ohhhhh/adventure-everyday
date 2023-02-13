import { createSlice } from "@reduxjs/toolkit";

let boundSlice = createSlice({
  name: "bound",
  initialState: null,
  reducers: {
    saveBound(state, a) {
      return a.payload;
    },
  },
});

export const { saveBound } = boundSlice.actions;

export default boundSlice.reducer;
