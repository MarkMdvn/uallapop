import React from "react";
import "./OtherItemsForm.css";

const OtherItemsForm = () => {
  return (
    <div className="main-form-container">
      {/* Title form */}
      <h1 className="main-form-h1">Information about the product</h1>
      <div className="form-group">
        <label className="main-label">
          What are you selling? Write the relevant information
        </label>
        <input
          className="input-field"
          type="text"
          placeholder="Title of the product"
        />
      </div>
      <button className="continue-button">Continue</button>
    </div>
  );
};

export default OtherItemsForm;
