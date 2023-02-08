import React from "react";
import { Routes, Route } from "react-router-dom";

import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import FeedPage from "./pages/FeedPage";
import MapPage from "./pages/MapPage";
import AdventureCreatePage from "./pages/AdventureCreatePage";
import ArticleCreatePage from "./pages/ArticleCreatePage";
import AdventurePage from "./pages/AdventurePage";
import AdventureDetailPage from "./pages/AdventureDetailPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import PasswordChangePage from "./pages/PasswordChangePage";
import UserDeletePage from "./pages/UserDeletePage";
import FollowListPage from "./pages/FollowListPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import ArticleUpdatePage from "./pages/ArticleUpdatePage";

import CommentPage from "./pages/CommentPage";

import AuthLayout from "./AuthLayout";
import AntiAuthLayout from "./AntiAuthLayout";
import Navigate from "./Navigate";
import "./App.css";
import AdventureReviewPage from "./pages/AdventureReviewPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<AuthLayout />}>
          {/* 로그인이 필요한 페이지는 여기에 추가해주세요 */}
          <Route element={<Navigate />}>
            {/* Navbar가 필요한 페이지는 이곳에 추가해주세요*/}
            <Route path="/feed" element={<FeedPage />} />
            {/* <Route path={["/map", "/"]} element={<MapPage />} /> */}

            {["/map", "/"].map((path, idx) => (
              <Route key={idx} path={path} element={<MapPage />} />
            ))}

            <Route path="/adventure" element={<AdventurePage />} />
            <Route
              path="/adventure/detail/:id"
              element={<AdventureDetailPage />}
            />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route
              path="/profile/:userId/:relationType"
              element={<FollowListPage />}
            />
            <Route
              path="/search/user"
              element={<SearchPage searchType={"users"} />}
            />
            <Route
              path="/search/adventure"
              element={<SearchPage searchType={"adventures"} />}
            />
            <Route path="/delete" element={<UserDeletePage />} />
            <Route path="/passwordchange" element={<PasswordChangePage />} />
            <Route path="/article/:articleId" element={<ArticleDetailPage />} />
            <Route
              path="/article/:articleId/comments"
              element={<CommentPage />}
            />
          </Route>
          {/* Navbar가 필요하지 않은 페이지는 이곳에 추가해주세요 */}
          <Route path="/write/*" element={<ArticleCreatePage />} />
          <Route path="/adventure/create/*" element={<AdventureCreatePage />} />
          <Route
            path="/adventure/detail/:id/createReview/*"
            element={<AdventureReviewPage />}
          ></Route>
          <Route
            path="/article/:articleId/update"
            element={<ArticleUpdatePage />}
          />
        </Route>
        {/* 로그인 상태에서 가면 안되는 페이지는 이곳에 추가해주세요 */}
        <Route element={<AntiAuthLayout />}>
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
