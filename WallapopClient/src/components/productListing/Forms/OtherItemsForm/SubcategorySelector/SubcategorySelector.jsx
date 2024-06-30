import React, { useEffect, useState } from "react";
import "../../../../../pages/ListingPage/ListingPage.css";
import "./SubcategorySelector.css";
import { getAllCategories } from "../../../../../api/categoryService";
import SmartphoneForm from "../SubCategoriesForm/SmartphoneForm/SmartphoneForm";
import DefaultForm from "../SubCategoriesForm/DefaultForm/DefaultForm";
import BicycleForm from "../SubCategoriesForm/BicycleForm/BicycleForm";

const SubcategorySelector = () => {
  const [title, setTitle] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch categories: ", error);
      });
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContinue = () => {
    if (title) {
      setShowDropdown(true);
    } else {
      alert("Please enter a title for your product.");
    }
  };

  /* Subcategory selection */
  const formComponents = {
    5: BicycleForm,
    6: SmartphoneForm,
  };

  const handleCategoryChange = (e) => {
    const newCategoryId = e.target.value;
    setCategory(newCategoryId);
    handleFormSelection(newCategoryId);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { title, category });
  };

  const handleFormSelection = (categoryId) => {
    const FormComponent = formComponents[categoryId] || DefaultForm;
    setSelectedForm(<FormComponent key={categoryId} />); // Use key to force re-render on change
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="main-form-container">
        <h1 className="main-form-h1">Information about the product</h1>
        <div className="form-group">
          <label className="main-label">
            What are you selling? Write the relevant information
          </label>
          <input
            className="input-field"
            type="text"
            placeholder="Title of the product"
            value={title}
            onChange={handleTitleChange}
          />
          <p className="small-form-recomendations">
            Example: Red velvet three-seater sofa{" "}
          </p>
        </div>
        <button
          type="button"
          className="continue-button"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>

      {showDropdown && (
        <>
          <div className="main-form-container">
            <div className="form-group">
              <label className="main-label">Select a Category</label>
              <select
                className="input-field"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">Select a subcategory</option>
                {categories.slice(4).map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>{selectedForm}</div>
        </>
      )}
    </form>
  );
};

export default SubcategorySelector;
