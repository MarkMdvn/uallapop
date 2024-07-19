import "./JobsForm.css";

import React from "react";

const JobsForm = ({ formData, handleInputChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final form data to submit:", formData);
    onSubmit();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="main-form-container">
        <h1 className="main-form-h1">Information about the Job</h1>
        <div className="form-row">
          <div className="form-group">
            <input
              style={{ width: "41em" }}
              className="input-field"
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                handleInputChange("title", e.target.value, false)
              }
              required
              minLength={1}
              maxLength={50}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <select
              style={{ width: "41em" }}
              className="input-field"
              value={formData.attributes.jobType}
              onChange={(e) =>
                handleInputChange("jobType", e.target.value, true)
              }
              required
            >
              <option value="">Select a category</option>
              <option value="Searching for a job">Offering a job</option>
              <option value="Searching for a job">Looking for a job</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input
              className="input-field"
              type="text"
              placeholder="Profession"
              value={formData.attributes.profession}
              onChange={(e) =>
                handleInputChange("profession", e.target.value, true)
              }
              required
              minLength={1}
              maxLength={50}
            />
          </div>

          <div className="form-group" style={{ width: "20em" }}>
            <input
              className="input-field"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                handleInputChange("price", e.target.value, false)
              }
              required
              step="1"
              min="1"
            />
          </div>
          <div className="form-group" style={{ width: "100%" }}>
            <select
              className="input-field"
              type="text"
              value={formData.attributes.currency}
              onChange={(e) =>
                handleInputChange("currency", e.target.value, true)
              }
              required
            >
              <option value="€">€</option>
              <option value="$">$</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            {" "}
            <textarea
              style={{ width: "41em" }}
              className="input-field"
              rows="4"
              placeholder="Tell us a little bit more, is it new or used? Red or yellow? Does it have a little scratch?"
              value={formData.description}
              onChange={(e) =>
                handleInputChange("description", e.target.value, false)
              }
              required
              maxLength={1000}
            ></textarea>
          </div>
        </div>
      </div>
    </form>
  );
};

export default JobsForm;
