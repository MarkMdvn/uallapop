import React, { useState, useEffect } from "react";
import "./HomeBanner.css";
import image1 from "../../../assets/Images/home-banner/hero-slide-1.png";
import image2 from "../../../assets/Images/home-banner/hero-es-slide-2.png";
import image3 from "../../../assets/Images/home-banner/hero-es-slide-3.png";
import image4 from "../../../assets/Images/home-banner/hero-es-slide-4.png";
import image5 from "../../../assets/Images/home-banner/hero-slide-5.png";

const banners = [
  {
    image: image1,
    text: "<strong>Buy and sell</strong> second-hand items",
    sideColor: "#E9FFB4",
    textColor: "#015354",
    buttonText: "Sell now",
    buttonLink: "#learn-more-1",
  },
  {
    image: image2,
    text: "<strong>Who needs storage</strong> when you have Wallapop?",
    sideColor: "#85FFD3",
    textColor: "#015354",
    buttonText: "Sell it!",
    buttonLink: "Discover it!",
  },
  {
    image: image3,
    text: "<strong>This collection isn't new</strong>, it is much better",
    sideColor: "#6E0049",
    textColor: "#FFCEE6",
    buttonText: "Discover it!",
    buttonLink: "Disc",
  },
  {
    image: image4,
    text: "We need to update our <strong>point of view</strong>",
    sideColor: "#136D60",
    textColor: "#D8FF7C",
    buttonText: "Find it",
    buttonLink: "Find it",
  },
  {
    image: image5,
    text: "<strong>Maximize your business profits</strong> using Wallapop PRO",
    sideColor: "#0B2DB0",
    textColor: "#FFFFFF",
    buttonText: "Learn more",
    buttonLink: "#learn-more-5",
  },
];

const HomeBanner = () => {
  const [activeBanner, setActiveBanner] = useState(0);

  const handleMouseEnter = (index) => {
    setActiveBanner(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container">
      <div
        className="banner-side"
        style={{ backgroundColor: banners[activeBanner].sideColor }}
      ></div>
      <div className="banner-main">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`banner ${index === activeBanner ? "active" : ""}`}
            onMouseEnter={() => handleMouseEnter(index)}
            style={{
              "--banner-side-color": banner.sideColor,
              "--banner-text-color": banner.textColor,
              backgroundImage: `url(${banner.image})`,
            }}
          >
            {index === activeBanner && (
              <div className="banner-text-container">
                <div
                  className={`banner-text ${
                    index === activeBanner ? "active" : ""
                  }`}
                  style={{
                    backgroundColor: banner.sideColor,
                    color: banner.textColor,
                  }}
                  dangerouslySetInnerHTML={{ __html: banner.text }}
                ></div>
                <a
                  href={banner.buttonLink}
                  className="banner-button"
                  style={{
                    backgroundColor: banner.textColor,
                    color: banner.sideColor,
                  }}
                >
                  {banner.buttonText}
                </a>
                <div
                  className="banner-image"
                  style={{ backgroundImage: `url(${banner.image})` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className="banner-side"
        style={{ backgroundColor: banners[activeBanner].sideColor }}
      ></div>
    </div>
  );
};

export default HomeBanner;
