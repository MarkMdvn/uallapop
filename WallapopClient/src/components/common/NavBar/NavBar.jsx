import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./NavBar.css";
import { useAuth } from "../../auth/AuthProvider";

const NavBar = () => {
  const navigate = useNavigate();

  const currentUser = localStorage.getItem("userId");

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
              src="/wallapop_word_logo.jpg"
              alt="Wallapop Logo Text"
              className="logo-main-text-img"
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
        <div className="right-nav-container">
          {currentUser ? (
            <h6 className="text-success text-center">
              {" "}
              You are logged-In as {currentUser}
            </h6>
          ) : (
            <Link to="/authentication">
              <button className="btn btn-outline">
                Regístrate o inicia sesión
              </button>
            </Link>
          )}
          <button className="btn btn-primary" onClick={handleSell}>
            Vender
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
