import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import UrlReducer from './urlSlice'
import TokenReducer from './tokenSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist"
import { combineReducers } from "redux"


const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const  reducer = combineReducers({
  token: TokenReducer,
  url: UrlReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  // 이부분 공부 필요...
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
})

export default store;

