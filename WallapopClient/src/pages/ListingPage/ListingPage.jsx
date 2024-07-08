import React, { useState } from "react";
import CategorySelector from "../../components/product/ProductListing/CategorySelector/CategorySelector";
import CarForm from "../../components/product/ProductListing/Forms/MainForms/CarForm/CarForm";
import JobsForm from "../../components/product/ProductListing/Forms/MainForms/JobsForm/JobsForm";
import PropertyForm from "../../components/product/ProductListing/Forms/MainForms/PropertyForm/PropertyForm";
import SubcategorySelector from "../../components/product/ProductListing/Forms/OtherItemsForm/SubcategorySelector/SubcategorySelector";
import ImageSelector from "../../components/product/ProductListing/Forms/ImageSelector/ImageSelector";
import { sellProduct } from "../../api/productService";
import { useAuth } from "../../components/auth/AuthProvider";
import ProtectedRoute from "../../components/ProtectedRoute";

const ListingPage = () => {
  const { user } = useAuth();
  const [submitButtonVisible, setSubmitButtonVisible] = useState(false);
  const [imageSelector, setImageSelectorVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    shippingAvailable: false,
    itemCondition: "NEW",
    categoryId: 3,
    categoryName: "",
    attributes: {},
    images: Array(10).fill(null),
  });

  const handleSelectCategory = (category) => {
    const categoryIds = {
      Cars: 2,
      Properties: 3,
      Jobs: 4,
      OtherItems: 1,
    };
    setFormData({
      ...formData,
      categoryName: category,
      categoryId: categoryIds[category],
    });
    setSubmitButtonVisible(true);
  };

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

  const handleSubmit = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const data = new FormData();

    // Append each image file to the FormData
    formData.images.forEach((file, index) => {
      if (file) data.append("images", file); // Use 'image' as the key expected by the backend
    });

    data.append(
      "product",
      JSON.stringify({
        title: formData.title,
        price: formData.price,
        description: formData.description,
        shippingAvailable: formData.shippingAvailable,
        itemCondition: formData.itemCondition,
        categoryId: formData.categoryId,
        categoryName: formData.categoryName,
        attributes: formData.attributes,
      })
    );

    try {
      const response = await sellProduct(data, headers);
      console.log("Product created:", response.data);
    } catch (error) {
      console.error("Failed to post product:", error);
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
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <div className="listing-page-container">
        <h1 className="listing-page-h1">Post your product</h1>
        <CategorySelector
          onSelectCategory={handleSelectCategory}
          selectedCategory={formData.categoryName}
        />
        {formData.categoryName && renderForm()}
        {formData.categoryName && (
          <ImageSelector
            images={formData.images}
            onImageChange={(newImages) =>
              setFormData({ ...formData, images: newImages })
            }
          />
        )}
        {submitButtonVisible && (
          <button onClick={handleSubmit} className="submit-product-button">
            Submit Product
          </button>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ListingPage;
