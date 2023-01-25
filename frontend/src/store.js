import { configureStore, createSlice } from '@reduxjs/toolkit'

let URL = createSlice({
  name : 'URL',
  initialState : 'http://localhost:8080'
})


export default configureStore({
  reducer: {
    URL : URL.reducer
   }
})