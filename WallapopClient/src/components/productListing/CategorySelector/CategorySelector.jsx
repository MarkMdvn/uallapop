import React from "react";
import { FiSmartphone } from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";
import { IoCarSportOutline } from "react-icons/io5";
import { GiFamilyHouse } from "react-icons/gi";
import "./CategorySelector.css";

const CategorySelector = ({ onSelectCategory, selectedCategory }) => {
  return (
    <div className="main-form-container">
      <h1 className="main-form-h1">What are you trying to sell?</h1>
      <div className="category-selector-categories-container">
        {["OtherItems", "Jobs", "Cars", "Houses"].map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`category ${category.toLowerCase()}-category ${
              selectedCategory === category ? "category-selected" : ""
            }`}
          >
            {category === "OtherItems" && <FiSmartphone />}
            {category === "Jobs" && <MdWorkOutline />}
            {category === "Cars" && <IoCarSportOutline />}
            {category === "Houses" && <GiFamilyHouse />}
            <span>{category === "OtherItems" ? "Other items" : category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
