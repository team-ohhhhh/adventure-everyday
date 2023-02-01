import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist"
import { combineReducers } from "redux"
import UrlReducer from './urlSlice'
import TokenReducer from './tokenReducer'


const store = configureStore({
  reducer: {
    url : UrlReducer,
    token : TokenReducer,
  }
})

export default store;

