import React from "react";
import "./CarDetails.css";
import { LiaCarSideSolid } from "react-icons/lia";
import { PiSeatbeltLight, PiEngine } from "react-icons/pi";
import { GiCarDoor, GiGearStick } from "react-icons/gi";
import { TbHorse } from "react-icons/tb";

const CarDetails = ({ product }) => {
  const attributes = product.attributes;

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-product-price">
        {product.price.toFixed(0)} €
      </div>
      <h1 className="product-details-product-title">{product.title}</h1>
      <hr className="custom-hr" />
      {/* car details */}
      <div className="car-details-container">
        <div className="single-car-detail-container">
          <LiaCarSideSolid />
          <span>{attributes.carType}</span>
        </div>
        <div className="single-car-detail-container">
          <PiSeatbeltLight />
          <span>{attributes.numberOfSeats} seats</span>
        </div>
        <div className="single-car-detail-container">
          <GiCarDoor />
          <span>{attributes.numberOfDoors} doors</span>
        </div>
        <div className="single-car-detail-container">
          <PiEngine />
          <span>{attributes.engine}</span>
        </div>
        <div className="single-car-detail-container">
          <TbHorse />
          <span>{attributes.horsepower} HP</span>
        </div>
        <div className="single-car-detail-container">
          <GiGearStick />
          <span>{attributes.transmission}</span>
        </div>
      </div>
      <hr className="custom-hr" />
      {/* car model details */}
      <div className="model-details-container">
        <div className="single-model-detail">
          <span className="model-detail-name">Brand </span>
          <span className="model-detail-value"> {attributes.brand}</span>
        </div>
        <div className="single-model-detail">
          <span className="model-detail-name">Model </span>
          <span className="model-detail-value"> {attributes.model}</span>
        </div>
        <div className="single-model-detail">
          <span className="model-detail-name">Year </span>
          <span className="model-detail-value"> {attributes.year}</span>
        </div>
        <div className="single-model-detail">
          <span className="model-detail-name">Kilometers </span>
          <span className="model-detail-value"> {attributes.kilometers}</span>
        </div>
      </div>
      <hr className="custom-hr" />
      <p className="product-details-product-description">
        {product.description}
      </p>
      <hr className="custom-hr" />
    </div>
  );
};

export default CarDetails;
