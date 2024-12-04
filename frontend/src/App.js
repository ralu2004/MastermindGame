import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginSignup from './components/LoginSignup/LoginSignup.jsx';
import Background from './components/BackgroundGame/BackgroundGame.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import MyHistory from './components/MyHistory/MyHistory.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [gameId, setGameId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [resumeButtonDisabled, setResumeButtonDisabled] = useState(true);

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        {/* Default Login Route */}
        <Route 
          path="/login" 
          element={<LoginSignup setIsLoggedIn={setIsLoggedIn} setUserId={setUserId}/>} 
        />

        {/* Protected Game Routes */}
        {isLoggedIn ? (
          <>
            <Route 
              path="/" 
              element={
                <Background 
                  gameId={gameId} 
                  setGameId={setGameId} 
                  userId={userId}
                  resumeButtonDisabled={resumeButtonDisabled} 
                  setResumeButtonDisabled={setResumeButtonDisabled} 
                />
              } 
            />
            <Route 
              path="/about" 
              element={
                <MyHistory 
                  userId = {userId}
                  setGameId={setGameId} 
                  resumeButtonDisabled={resumeButtonDisabled} 
                  setResumeButtonDisabled={setResumeButtonDisabled} 
                />
              } 
            />
          </>
        ) : (
          // Redirect any other route to login if not logged in
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
