import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { name, email, password });
      alert('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Create an Account</h2>

        <form onSubmit={handleRegister}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn create-btn">Sign Up</button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
          Already have an account? <a href="/" style={{ color: '#2563eb' }}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
