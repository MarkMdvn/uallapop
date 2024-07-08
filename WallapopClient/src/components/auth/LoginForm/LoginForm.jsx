// src/components/auth/LoginForm/LoginForm.jsx
import React, { useState } from "react";
import { loginUser } from "../../../api/authService";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();
  const navigate = useNavigate(); // Initialize navigate function

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);
    if (success) {
      const token = success.token;
      auth.handleLogin(token);
      navigate("/");
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
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
            placeholder="email"
            value={login.email}
            onChange={handleInputChange}
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="input-field"
            value={login.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="login-remember-forgot">
          <a href="#" className="forgot-password">
            ¿Has olvidado tu contraseña?
          </a>
        </div>
        <button type="submit" className="login-button">
          Acceder a Wallapop
        </button>
      </form>
      <button onClick={() => changeForm()} className="switch-to-register">
        Need to register?
      </button>
    </div>
  );
};

export default LoginForm;
