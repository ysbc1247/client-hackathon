import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { BASEURL } from "../api";
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(BASEURL + '/auth/signin', { email, password });
      handleLoginSuccess(response.data);
    } catch (error) {
      setErrorMessage('Login failed: ' + error.message);
    }
  };

  const handleLoginSuccess = (data) => {
    localStorage.setItem('accessToken', data.data.accessToken);
    localStorage.setItem('refreshToken', data.data.refreshToken);
    setIsLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    navigate('/login'); 
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <div className="form-container">
          <form onSubmit={handleLogin} className="form">
            <div className="form-group">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            </div>
            <div className="form-group">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <button onClick={navigateToSignup} className="signup-button">Sign Up</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      ) : (
        <div>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  );
}

export default Login;
