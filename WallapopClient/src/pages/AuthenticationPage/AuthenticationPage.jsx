import React, { useState } from "react";
import LoginForm from "../../components/auth/LoginForm/LoginForm";
import AuthenticationForm from "../../components/auth/AuthenticationForm/AuthenticationForm";
import "./AuthenticationPage.css";
import RegistrationForm from "../../components/auth/RegistrationForm/RegistrationForm";
import "./AuthenticationPage.css";

function AuthenticationPage() {
  const [formType, setFormType] = useState("auth");

  const changeForm = (type) => setFormType(type);

  return (
    <div className="authentication-page">
      {formType === "login" && (
        <LoginForm changeForm={() => changeForm("register")} />
      )}
      {formType === "register" && (
        <RegistrationForm changeForm={() => changeForm("auth")} />
      )}
      {formType === "auth" && (
        <AuthenticationForm changeForm={() => changeForm("login")} />
      )}
    </div>
  );
}

export default AuthenticationPage;
