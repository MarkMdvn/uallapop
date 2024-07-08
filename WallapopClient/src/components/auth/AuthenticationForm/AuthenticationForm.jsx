import React from "react";
import "./AuthenticationForm.css";

function AuthenticationForm({ changeForm }) {
  return (
    <div className="authentication-form-container">
      <div className="authentication-form">
        <img
          className="auth-img"
          src="\onboarding_received_package.svg"
          alt="cool image"
        />
        <h2 className="auth-h2">Buy and sell in wallapop</h2>
        <p className="auth-p">
          Get the best prices and gain money selling whatever you don't use
        </p>
        <div className="auth-btn-container">
          <button className="auth-register-btn">Register with e-mail</button>
          <button className="auth-register-btn">Register with e-mail</button>
          <button onClick={changeForm} className="auth-register-btn">
            Register with e-mail
          </button>
        </div>
        <div className="change-auth-form">
          <p className="login-p">You already have an account? </p>
          <button className="login-form-btn" onClick={changeForm}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationForm;
