import React from "react";

const ImageSlider = ({ images }) => {
  if (!Array.isArray(images)) {
    // Check if images is an array
    return <div>No images available</div>; // Appropriate fallback if no images
  }

  return (
    <div className="image-slider">
      {images.map((url, index) => (
        <img key={index} src={url} alt={`Product Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default ImageSlider;
