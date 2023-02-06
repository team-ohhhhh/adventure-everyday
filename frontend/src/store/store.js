import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import UrlReducer from './urlSlice'
import TokenReducer from './tokenSlice'
import UserReducer from './userSlice'
import ArticleReducer from './articleSlice'

import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer } from "redux-persist"
import { combineReducers } from "redux"


const persistConfig = {
  key: "root",
  version: 1,
  storage : storageSession,
  whitelist : ['token', 'user', 'article'] //TODO: 새로고침 이후에 수정중인 Article 어떻게 할까
}

const  reducer = combineReducers({
  token: TokenReducer,
  url: UrlReducer,
  user: UserReducer,
  article: ArticleReducer
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

