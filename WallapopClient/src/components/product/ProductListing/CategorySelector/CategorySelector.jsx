import React from "react";
import { SlScreenSmartphone } from "react-icons/sl";

import {
  PiBooksLight,
  PiTelevisionLight,
  PiBicycleLight,
  PiWashingMachineLight,
  PiGameControllerLight,
  PiLaptopLight,
  PiCarProfileLight,
  PiHouseLight,
  PiBagSimpleLight,
  PiTShirtLight,
} from "react-icons/pi";
import "./CategorySelector.css";

const CategorySelector = ({ onSelectCategory, selectedCategory }) => {
  return (
    <div className="main-form-container">
      <h1 className="main-form-h1">What are you trying to sell?</h1>
      <div className="category-selector-categories-container">
        {["OtherItems", "Jobs", "Cars", "Properties"].map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`category ${category.toLowerCase()}-category ${
              selectedCategory === category ? "category-selected" : ""
            }`}
          >
            {category === "OtherItems" && (
              <div className="category-icon-container">
                <SlScreenSmartphone />
                <PiTShirtLight />
                <PiBooksLight />
                <PiTelevisionLight />
                <PiBicycleLight />
                <PiWashingMachineLight />
                <PiGameControllerLight />
                <PiLaptopLight />
              </div>
            )}
            {category === "Jobs" && <PiBagSimpleLight />}
            {category === "Cars" && <PiCarProfileLight />}
            {category === "Properties" && <PiHouseLight />}
            <span>{category === "OtherItems" ? "Other items" : category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
