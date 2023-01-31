import React from 'react';
import './App.css';
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import { Routes, Route, Link } from 'react-router-dom'
import AdventurePage from './pages/AdventurePage';
import NavBar from './components/NavBar';
import MapPage from './pages/MapPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <MapPage/> } />
        <Route path="/login" element={ <LogInPage/>} />
        <Route path="/signup" element={ <SignUpPage/>} />
        <Route path="/adventure" element={ <AdventurePage/>} />
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;
