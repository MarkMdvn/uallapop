// src/components/auth/RegistrationForm/RegistrationForm.jsx
import React, { useState } from "react";
import "./RegistrationForm.css";

function RegistrationForm({ changeForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [receivePromotions, setReceivePromotions] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Registration logic goes here
    console.log(name, email, password, agreeToTerms, receivePromotions);
  };

  return (
    <div className="registration-form-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Join Wallapop</h2>
        <div className="registration-input-container">
          <input
            type="text"
            value={name}
            placeholder="Nombre y apellidos"
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <input
            type="email"
            value={email}
            placeholder="Dirección de e-mail"
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            value={password}
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="registration-checkboxes">
          <label>
            <input
              type="checkbox"
              checked={receivePromotions}
              onChange={() => setReceivePromotions(!receivePromotions)}
            />
            Quiero recibir comunicaciones sobre promociones y novedades de
            Wallapop.
          </label>
          <label>
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
            />
            He leído y acepto las Condiciones de uso y Política de privacidad de
            Wallapop.
          </label>
        </div>
        <button type="submit" className="registration-button">
          Crear una cuenta
        </button>
      </form>
      <button onClick={() => changeForm()} className="switch-to-login">
        Have an account? Login
      </button>
    </div>
  );
}

export default RegistrationForm;
