// Signup.jsx
import React, { useState } from 'react';
import { BASEURL } from "../api";
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const signupData = {
      email,
      name,
      nickname,
      password,
      introduce
    };

    try {
      const response = await axios.post(BASEURL + '/auth/signup', signupData);
      // Handle response here (e.g., showing a success message, redirecting, etc.)
      console.log(response.data);
      window.location.href = '/login';
    } catch (error) {
      setErrorMessage('Signup failed: ' + error.message);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          </div>
          <div className="form-group">
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" required />
          </div>
          <div className="form-group">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </div>
          <div className="form-group">
            <textarea value={introduce} onChange={(e) => setIntroduce(e.target.value)} placeholder="Introduce Yourself" />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}
export default Signup;
