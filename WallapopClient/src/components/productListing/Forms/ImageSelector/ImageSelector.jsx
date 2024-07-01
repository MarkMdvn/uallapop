import React from "react";
import "./ImageSelector.css";
import { TbLibraryPhoto } from "react-icons/tb";

const ImageSelector = ({ images, onImageChange }) => {
  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file; // Store file object directly
      onImageChange(newImages);
    }
  };

  return (
    <div className="main-form-container">
      <h1 className="main-form-h1">Photos</h1>
      <div className="image-container">
        {images.map((image, index) => (
          <div
            key={index}
            className="image-slot"
            onClick={() =>
              document.getElementById(`file-input-${index}`).click()
            }
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="photo-preview"
              />
            ) : (
              <TbLibraryPhoto className="photo-icon" />
            )}
            <input
              id={`file-input-${index}`}
              type="file"
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;
