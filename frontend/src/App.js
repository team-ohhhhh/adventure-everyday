import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import AdventurePage from "./pages/AdventurePage";
import MapPage from "./pages/MapPage";
import ArticleCreatePage from "./pages/ArticleCreatePage";
import Navigate from "./Navigate";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Link to="/">home</Link>
      <Link to="/login">login</Link>
      <Link to="/signup">signup</Link>
      <Routes>
        <Route element={<Navigate />}>
          <Route path="/" element={<MapPage />} />
          <Route path="/adventure" element={<AdventurePage />} />
        </Route>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/write" element={<ArticleCreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
