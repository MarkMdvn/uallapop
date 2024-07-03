import React from "react";
import "./SustainabilityBanner.css";
import { BiWorld } from "react-icons/bi";

const SustainabilityBanner = () => {
  return (
    <div className="sustainability-banner-container">
      <div className="sustainability-banner">
        <BiWorld className="sustainability-icon" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className="sustainability-banner-phrase">
            This is some sustainability information, I have no idea how to
            reverse engineer this thing
          </p>
          <a href="">More information</a>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityBanner;
