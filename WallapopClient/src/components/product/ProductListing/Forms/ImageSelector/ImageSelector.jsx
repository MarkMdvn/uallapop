import React from "react";
import "./ImageSelector.css";
import { TbLibraryPhoto } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";

const ImageSelector = ({ images, onImageChange }) => {
  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      // If an image exists and is a File object, revoke its URL
      if (images[index] && images[index] instanceof File) {
        URL.revokeObjectURL(images[index]);
      }
      const newImages = [...images];
      newImages[index] = file;
      onImageChange(newImages);
    }
  };

  const handleRemoveImage = (index) => {
    if (images[index] instanceof File) {
      URL.revokeObjectURL(images[index]);
    }
    const newImages = [...images];
    newImages[index] = null;
    onImageChange(newImages);
  };

  return (
    <div className="main-form-container">
      <h1 className="main-form-h1">Photos</h1>
      <div className="image-selector-recommendation">
        <h4>Want a trick? Post at least 4 photos</h4>
        <p>
          When you show your product from different angles, people appreciate it
        </p>
      </div>
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
              <>
                <img
                  src={
                    image instanceof File
                      ? URL.createObjectURL(image)
                      : image.url || image
                  }
                  alt="Uploaded"
                  className="photo-preview"
                  onLoad={() =>
                    image instanceof File && URL.revokeObjectURL(image)
                  }
                />
                <AiOutlineClose
                  className="remove-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                />
              </>
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
