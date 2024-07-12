import React from "react";
import { Link } from "react-router-dom";
import "./NavCategorySelector.css";
import { IoMenuOutline } from "react-icons/io5";
const NavCategorySelector = () => {
  return (
    <div className="nav-category-selector-container">
      <div className="nav-category-selector-list">
        <div className="nc-list-item all-categories-item">
          <Link to="/category/all">
            <IoMenuOutline />
            <span>All categories</span>
          </Link>
        </div>
        <div className="nc-list-item">
          <Link to="/products-by-category/technology">
            <span>Technology</span>
          </Link>
        </div>
        <div className="nc-list-item">
          <Link to="/category/movies">
            <span>Properties</span>
          </Link>
        </div>
        <div className="nc-list-item">
          <Link to="/products-by-category/2">
            <span>Cars</span>
          </Link>
        </div>
        <div className="nc-list-item">
          <Link to="/products-by-category/3">
            <span> Employement</span>
          </Link>
        </div>
        <div className="nc-list-item">
          <Link to="/products-by-category/6">
            <span>Smartphones</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavCategorySelector;
