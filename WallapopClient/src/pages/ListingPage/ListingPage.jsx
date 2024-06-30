import CategorySelector from "../../components/productListing/CategorySelector/CategorySelector";
import "./ListingPage.css";
import CarsForm from "../../components/productListing/Forms/MainForms/CarsForm/CarsForm";
import JobsForm from "../../components/productListing/Forms/MainForms/JobsForm/JobsForm";
import SubcategorySelector from "../../components/productListing/Forms/OtherItemsForm/SubcategorySelector/SubcategorySelector";
import PropertyForm from "../../components/productListing/Forms/MainForms/PropertyForm/PropertyForm";

import React, { useState } from "react";

const ListingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const renderForm = () => {
    switch (selectedCategory) {
      case "Cars":
        return <CarsForm />;
      case "Jobs":
        return <JobsForm />;
      case "Properties":
        return <PropertyForm />;
      case "OtherItems":
        return <SubcategorySelector />;
    }
  };

  return (
    <div className="listing-page-container">
      <h1 className="listing-page-h1">Post your product</h1>
      <CategorySelector
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />
      {selectedCategory && renderForm(selectedCategory)}
    </div>
  );
};

export default ListingPage;
