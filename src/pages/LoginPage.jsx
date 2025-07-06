import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // link this if you're separating styles

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google'; // Your Google login route
  };

  const handleCreateAccount = () => {
    navigate('/register'); // You can change this to '/signup' or custom path
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Welcome to Task Manager</h2>
        <p>Please choose an option to continue:</p>

        <button className="btn google-btn" onClick={handleGoogleLogin}>
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
          Continue with Google
        </button>

        <button className="btn create-btn" onClick={handleCreateAccount}>
          Create Account with Email
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
