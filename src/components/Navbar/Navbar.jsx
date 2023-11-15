import React, { useState, useEffect } from "react";
import "../Navbar/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "./hackerlog.png";

export default function Navbar(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const navigateToLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to home or login page after logout
  };

  return (
    <div className="navbar-header">
      <div className="navbar-content">
        <div className="navbar-w">
          <img className="navbar-w-logo" src={logo} alt="logo" />
        </div>
      </div>
      {isLoggedIn ? (
        <button className="login-button" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="login-button" onClick={navigateToLogin}>Login</button>
      )}
    </div>
  );
}
