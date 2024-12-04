import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import axios from 'axios';

import user_icon from '../assets/user.png';
import password_icon from '../assets/password.png';

const LoginSignup = ({ setIsLoggedIn, setUserId }) => {
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!username || !password) {
      alert("Please fill in all fields.");
      return false;
    }
    if (username.length < 3 || password.length < 6) {
      alert("Username must be at least 3 characters and password at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError(null);

    try {
      const url = action === "Sign Up"
        ? "https://centered-game-0-0-1-1.onrender.com/api/user"
        : "https://centered-game-0-0-1-1.onrender.com/api/user/login";

      const response = await axios.post(url, { name: username, password: password });

      if (action === "Sign Up") {
        if (response.data === "") {
          alert(`Username already exists!`);
        } else {
          alert(`${action} successful: ${response.data.name}. Login to play...`);
        }
      } else {
        if (response.data !== -1) {
          setIsLoggedIn(true);
          console.log("Navigating to game...");
          setUserId(response.data);
          navigate('/');
        } else {
          alert(`Wrong username or password`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.name || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  };


  return (
    <div className="container-login-signup">
      <div className="left-section-ls">
        <h2 className="description-heading-ls">Welcome to Centered Game</h2>
        <p className="description-text-ls">
          Here you can sign up or log in to access our platform. 
          Join us to have fun playing a smart and challenging game!
        </p>

        <div className="action-buttons-ls">
          <button 
            className={`action-button ${action === "Sign Up" ? "active" : ""}`} 
            onClick={() => setAction("Sign Up")}
          >
            Sign Up
          </button>
          <button 
            className={`action-button ${action === "Log In" ? "active" : ""}`} 
            onClick={() => setAction("Log In")}
          >
            Log In
          </button>
        </div>
      </div>

      <div className="vertical-line-ls"></div>

      <div className="right-section-ls">
        <div className="header-ls">
          <div className="text-ls">{action}</div>
          <div className="underline-ls"></div>
        </div>
        <div className="inputs-ls">
          <div className="input-ls">
            <img src={user_icon} alt="User Icon" />
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          
          <div className="input-ls">
            <img src={password_icon} alt="Password Icon" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          {action === "Sign Up" ? null : (
            <div className="forgot-password">
              Lost Password? <span>Click Here!</span>
            </div>
          )}
          <div className="submit-container-ls">
            <button className="submit-ls" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
