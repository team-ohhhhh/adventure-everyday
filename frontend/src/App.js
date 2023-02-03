import React from "react";
import { Routes, Route } from "react-router-dom";

import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import FeedPage from "./pages/FeedPage";
import MapPage from "./pages/MapPage";
import ArticleCreatePage from "./pages/ArticleCreatePage";
import AdventurePage from "./pages/AdventurePage";
import AdventureDetailPage from "./pages/AdventureDetailPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";


import Navigate from "./Navigate";
import "./App.css";

function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route element={<Navigate />}>
          {/* Navbar가 필요한 페이지는 이곳에 추가해주세요*/}
          <Route path="/feed" element={<FeedPage />} />
          {/* <Route path={["/map", "/"]} element={<MapPage />} /> */}
        
          {['/map', '/'].map((path) => (
            <Route path={path} element={<MapPage/>} />
          ))}
        
          <Route path="/adventure" element={<AdventurePage />} />
          <Route
            path="/adventure/detail/:id"
            element={<AdventureDetailPage />}
          />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/search/user" element={<SearchPage searchType={"users"}/>} />
          <Route path="/search/adventure" element={<SearchPage searchType={"adventures"}/>} />
        </Route>
        {/* Navbar가 필요하지 않은 페이지는 이곳에 추가해주세요 */}
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/write" element={<ArticleCreatePage />} />
        <Route path="/profile/:userId" element={ <ProfilePage />}/>
      </Routes>
    </div>
  );
}

export default App;
