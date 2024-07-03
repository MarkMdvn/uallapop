import React from "react";
import "./Footer.css";
import { FaApple, FaGooglePlay, FaAppStoreIos } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-section">
          <div className="logo">
            <Link to="/">
              <img
                src="/wallapop_logo.png"
                alt="Wallapop Logo"
                className="logo-main-img"
              />
              <img
                className="logo-main-text-img"
                src="/wallapop_word_logo.jpg"
                alt="Wallapop Logo Text"
              />
            </Link>
          </div>
          <p className="footer-under-logo-paragraph">
            Built by Mark Mordvin, no rights bacause <br /> I copied literally
            everything{" "}
          </p>
        </div>
        <div className="footer-section">
          <h4>Wallapop</h4>
          <a href="#!">Quiénes somos</a>
          <a href="#!">Cómo funciona</a>
          <a href="#!">Brand Book</a>
          <a href="#!">Prensa</a>
          <a href="#!">Empleo</a>
          <a href="#!">No Nueva Colección</a>
        </div>
        <div className="footer-section">
          <h4>Soporte</h4>
          <a href="#!">Centro de ayuda</a>
          <a href="#!">Normas de la comunidad</a>
          <a href="#!">Consejos de seguridad</a>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <a href="#!">Aviso legal</a>
          <a href="#!">Condiciones de uso</a>
          <a href="#!">Política de privacidad</a>
          <a href="#!">Política de Cookies</a>
        </div>
        <div className="footer-section">
          <h4>Motor</h4>
          <a href="#!">Particular</a>
          <a href="#!">Profesional</a>
        </div>
        <div className="footer-section">
          <h4>Wallapop PRO</h4>
          <a href="#!">Impulsa tu negocio</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-store-link">
          <a href="#!">
            <FaApple className="store-icon" />
            <span>Apple Store</span>{" "}
          </a>
        </div>
        <div className="footer-store-link">
          <a href="#!">
            <FaGooglePlay className="store-icon" />
            <span>Play Store</span>{" "}
          </a>
        </div>
        <div className="footer-store-link">
          <a href="#!">
            <FaAppStoreIos className="store-icon" />
            <span>App Store</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
