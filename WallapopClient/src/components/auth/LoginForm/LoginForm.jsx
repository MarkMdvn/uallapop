// src/components/auth/LoginForm/LoginForm.jsx
import React, { useState } from "react";
import { loginUser } from "../../../api/authService";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = ({ changeForm }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await loginUser(login);
      if (success) {
        const token = success.token;
        auth.handleLogin(token);
        navigate("/");
      } else {
        setErrorMessage("Invalid username or password. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Welcome to Wallapop!</h2>
        <div className="login-input-container">
          <input
            id="email"
            name="email"
            type="email"
            className="input-field"
            placeholder="Email"
            value={login.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            placeholder="Password"
            value={login.password}
            onChange={handleInputChange}
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="login-remember-forgot">
          <a href="#" className="forgot-password">
            Forgot your password?
          </a>
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      <button onClick={changeForm} className="switch-to-register">
        Need to register?
      </button>
    </div>
  );
};

export default LoginForm;
