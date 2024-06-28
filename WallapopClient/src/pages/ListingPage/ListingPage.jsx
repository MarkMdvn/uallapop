import CategorySelector from "../../components/productListing/CategorySelector/CategorySelector";
import "./ListingPage.css";
import CarsForm from "../../components/productListing/CarsForm/CarsForm";

import React from "react";

const ListingPage = () => {
  return (
    <div className="listing-page-container">
      <h1 className="listing-page-h1">Post your product</h1>
      <CategorySelector />
    </div>
  );
};

export default ListingPage;
