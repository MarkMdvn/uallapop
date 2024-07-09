import React, { useState } from "react";
import AuthenticationForm from "../../components/auth/AuthenticationForm/AuthenticationForm";
import LoginForm from "../../components/auth/LoginForm/LoginForm";
import RegistrationForm from "../../components/auth/RegistrationForm/RegistrationForm";
import "./AuthenticationPage.css";

const AuthenticationPage = () => {
  const [currentForm, setCurrentForm] = useState("auth"); // 'auth', 'login', 'register'

  const changeFormToLogin = () => setCurrentForm("login");
  const changeFormToRegister = () => setCurrentForm("register");

  return (
    <div>
      {currentForm === "auth" && (
        <AuthenticationForm
          changeFormToLogin={changeFormToLogin}
          changeFormToRegister={changeFormToRegister}
        />
      )}
      {currentForm === "login" && (
        <LoginForm changeForm={changeFormToRegister} />
      )}
      {currentForm === "register" && (
        <RegistrationForm changeForm={changeFormToLogin} />
      )}
    </div>
  );
};

export default AuthenticationPage;
