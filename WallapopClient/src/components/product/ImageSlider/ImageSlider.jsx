import React, { useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import "./ImageSlider.css";

const ImageSlider = ({ imageUrls }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === imageUrls.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? imageUrls.length - 1 : slide - 1);
  };

  if (!imageUrls || imageUrls.length === 0) {
    return <img src="/NoImageFound.jpg" alt="" />;
  }

  return (
    <div className="image-slider-container">
      <div className="carousel">
        <IoIosArrowDropleftCircle
          onClick={prevSlide}
          className="arrow arrow-left"
        />
        <div className="image-slider-images">
          {imageUrls.map((url, idx) => (
            <img
              src={url}
              alt={`Product image ${idx + 1}`}
              key={idx}
              className={slide === idx ? "slide" : "slide slide-hidden"}
            />
          ))}
        </div>
        <IoIosArrowDroprightCircle
          onClick={nextSlide}
          className="arrow arrow-right"
        />
        <span className="indicators">
          {imageUrls.map((_, idx) => (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            />
          ))}
        </span>
      </div>
    </div>
  );
};

export default ImageSlider;
