import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({isLoggedIn, setIsLoggedIn}) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`navbar ${isVisible && isLoggedIn ? 'visible' : 'hidden'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="navbar-menu">
        <li><Link to="/">Play</Link></li>
        <li><Link to="/about">History</Link></li>
        <li><Link onClick = {() => setIsLoggedIn(false)} to="/login">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;