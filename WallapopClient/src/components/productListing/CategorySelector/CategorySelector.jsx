import React from "react";
import { FiSmartphone } from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";
import { IoCarSportOutline } from "react-icons/io5";
import { GiFamilyHouse } from "react-icons/gi";
import "./CategorySelector.css";

const CategorySelector = () => {
  return (
    <div className="category-selector-container">
      <h1 className="category-selector-h1">What are you trying to sell?</h1>
      <div className="category-selector-categories-container">
        <button className="category other-items-category">
          <FiSmartphone />
          <span>Other items</span>
        </button>
        <button className="category jobs-category">
          <MdWorkOutline />
          <span>A job</span>
        </button>
        <button className="category cars-category">
          <IoCarSportOutline />
          <span>A car</span>
        </button>
        <button className="category houses-category">
          <GiFamilyHouse />

          <span>Housing</span>
        </button>
      </div>
    </div>
  );
};

export default CategorySelector;
