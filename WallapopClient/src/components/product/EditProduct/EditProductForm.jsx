import React, { useState, useEffect } from "react";
import CarForm from "../ProductListing/Forms/MainForms/CarForm/CarForm";
import JobsForm from "../ProductListing/Forms/MainForms/JobsForm/JobsForm";
import PropertyForm from "../ProductListing/Forms/MainForms/PropertyForm/PropertyForm";
import SubcategorySelector from "../ProductListing/Forms/OtherItemsForm/SubcategorySelector/SubcategorySelector";
import ImageSelector from "../ProductListing/Forms/ImageSelector/ImageSelector";

const EditProductForm = ({ product, closeForm }) => {
  const [formData, setFormData] = useState({
    ...product,
    images: product.imageUrls.map((url) => ({ url })),
  });

  const handleInputChange = (name, value, isAttribute = false) => {
    setFormData((prev) => ({
      ...prev,
      [isAttribute ? "attributes" : name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const data = new FormData();
    // Append data to formData as required by your backend
    console.log("Submitting updated product", formData);
    // Submit data to server...
  };

  console.log(formData);

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
