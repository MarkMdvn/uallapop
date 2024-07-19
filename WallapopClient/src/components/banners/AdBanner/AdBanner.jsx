import React from "react";
import "./AdBanner.css";
import adImg from "../../../assets/Images/ad-banner/ad-banner.png";

function AdBanner() {
  return (
    <div className="ad-container">
      <img src={adImg} alt="" />
    </div>
  );
}

export default AdBanner;
