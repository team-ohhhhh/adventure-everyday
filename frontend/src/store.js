import { configureStore, createSlice } from '@reduxjs/toolkit'

let URL = createSlice({
  name : 'URL',
  initialState : 'http://localhost:8080'
})

let TOKEN = createSlice({
  name : 'TOKEN',
  initialState : null
})


export default configureStore({
  reducer: {
    URL : URL.reducer,
    TOKEN : TOKEN.reducer
   }
})