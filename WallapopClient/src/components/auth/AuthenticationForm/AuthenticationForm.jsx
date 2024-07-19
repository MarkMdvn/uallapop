import React from "react";
import "./AuthenticationForm.css";

function AuthenticationForm({ changeFormToLogin, changeFormToRegister }) {
  return (
    <div className="authentication-form-container">
      <div className="authentication-form">
        <img
          className="auth-img"
          src="\onboarding_received_package.svg"
          alt="cool image"
        />
        <h2 className="auth-h2">Buy and sell on Wallapop</h2>
        <p className="auth-p">
          Get the best prices and earn money selling whatever you don't use.
        </p>
        <div className="auth-btn-container">
          <button
            id="google-btn"
            className="auth-register-btn"
            disabled
            title="coming soon!"
          >
            Register with Google
          </button>
          <button
            id="facebook-btn"
            className="auth-register-btn"
            title="coming soon!"
            disabled
          >
            Register with Facebook
          </button>
          <button onClick={changeFormToRegister} className="auth-register-btn">
            Continue with e-mail
          </button>
        </div>
        <div className="change-auth-form">
          <p className="login-p">Already have an account? </p>
          <button className="login-form-btn" onClick={changeFormToLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationForm;
