import React, { useState, useEffect } from "react";
import CarForm from "../ProductListing/Forms/MainForms/CarForm/CarForm";
import JobsForm from "../ProductListing/Forms/MainForms/JobsForm/JobsForm";
import PropertyForm from "../ProductListing/Forms/MainForms/PropertyForm/PropertyForm";
import SubcategorySelector from "../ProductListing/Forms/OtherItemsForm/SubcategorySelector/SubcategorySelector";
import ImageSelector from "../ProductListing/Forms/ImageSelector/ImageSelector";
import { updateProduct } from "../../../api/productService";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const EditProductForm = ({ product, closeForm }) => {
  const navigate = useNavigate(); // Hook to get the navigate function

  const initialImages = product.imageUrls
    ? [
        ...product.imageUrls.map((url) => ({ url })),
        ...Array(10 - product.imageUrls.length).fill(null),
      ]
    : Array(10).fill(null);

  const [formData, setFormData] = useState({
    ...product,
    images: initialImages,
  });

  useEffect(() => {
    setFormData({
      ...product,
      images: [
        ...product.imageUrls.map((url) => ({ url })),
        ...Array(10 - product.imageUrls.length).fill(null),
      ],
    });
  }, [product]);

  const handleInputChange = (name, value, isAttribute = false) => {
    if (isAttribute) {
      setFormData((prev) => ({
        ...prev,
        attributes: { ...prev.attributes, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const data = new FormData();

    const form = document.querySelector("form");
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return; // Stop the submission if the form is not valid
    }

    // Append each image file to the FormData if it's a file object (newly added)
    formData.images.forEach((file, index) => {
      if (file) data.append("images", file); // Use 'image' as the key expected by the backend
    });

    // Append other parts of formData as JSON, except images
    const { images, ...otherData } = formData;
    data.append("product", JSON.stringify(otherData));

    try {
      const response = await updateProduct(data, product.id, headers);
      console.log("Product updated:", response.data);
      window.location.reload(); // Reload the current page
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };
  const renderForm = () => {
    switch (formData.categoryName) {
      case "Cars":
        return (
          <CarForm formData={formData} handleInputChange={handleInputChange} />
        );
      case "Jobs":
        return (
          <JobsForm formData={formData} handleInputChange={handleInputChange} />
        );
      case "Properties":
        return (
          <PropertyForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case "OtherItems":
        return (
          <SubcategorySelector
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return <div>Select a category</div>;
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
      {renderForm()}
      <ImageSelector
        images={formData.images}
        onImageChange={(newImages) =>
          setFormData({ ...formData, images: newImages })
        }
      />
      <button onClick={handleSubmit} className="submit-product-button">
        Submit Product
      </button>{" "}
      <button type="button" onClick={closeForm}>
        Cancel
      </button>
    </form>
  );
};

export default EditProductForm;
