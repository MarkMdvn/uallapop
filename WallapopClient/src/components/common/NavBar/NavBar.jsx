import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Add Link to the import
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleSell = () => {
    navigate(`/products/sell-product`);
  };

  return (
    <nav className="navbar">
      <div className="container">
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
