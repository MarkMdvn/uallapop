import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleSell = () => {
    navigate(`/products/sell-product`);
  };
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img
            src="/wallapop_logo.png"
            alt="Wallapop Logo"
            className="logo-main-img"
          />
          <img
            className="logo-main-text-img"
            src="/wallapop_word_logo.jpg"
            alt="wallapop_img"
          />
        </div>
        <div className="search-container">
          <input
            type="search"
            placeholder="Buscar..."
            className="search-input"
          />
        </div>
        <div className="action-buttons">
          <button className="btn btn-outline">
            Regístrate o inicia sesión
          </button>
          <button className="btn btn-primary" onClick={handleSell}>
            Vender
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
