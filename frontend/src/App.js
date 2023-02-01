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

import Navigate from "./Navigate";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Navigate />}>
          {/* Navbar가 필요한 페이지는 이곳에 추가해주세요*/}
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/adventure" element={<AdventurePage />} />
          <Route
            path="/adventure/detail/:id"
            element={<AdventureDetailPage />}
          />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        {/* Navbar가 필요하지 않은 페이지는 이곳에 추가해주세요 */}
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/write" element={<ArticleCreatePage />} />
        <Route path="/adventure/create/*" element={<AdventureCreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
