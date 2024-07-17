import React from "react";
import "./PropertyForm.css";

const PropertyForm = ({ formData, handleInputChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final form data to submit:", formData);
    onSubmit();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Text inputs */}

        <div className="main-form-container">
          <h1 className="main-form-h1">Information about the property</h1>
          <div className="form-row four-columns">
            <div className="form-group" style={{ width: "10em" }}>
              <label className="main-label">Price</label>
              <input
                className="input-field"
                type="number"
                placeholder="Carefully..."
                value={formData.price}
                onChange={(e) =>
                  handleInputChange("price", e.target.value, false)
                }
                required
                step="1"
                min="1"
              />
            </div>
            <div className="form-group" style={{ width: "7em" }}>
              <label className="main-label">Currency</label>
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
            <div className="form-group" style={{ width: "7em" }}>
              <label className="main-label">Space m2</label>
              <input
                className="input-field"
                type="number"
                placeholder="m2"
                value={formData.attributes.squeareSpace}
                onChange={(e) =>
                  handleInputChange("squareSpace", e.target.value, true)
                }
                required
              />
            </div>
            <div className="form-group" style={{ width: "13em" }}>
              <label className="main-label">State</label>
              <select
                className="input-field"
                type="text"
                value={formData.attributes.propertyState}
                onChange={(e) =>
                  handleInputChange("propertyState", e.target.value, true)
                }
                required
              >
                <option value="New">New</option>
                <option value="Good State">Good state</option>
                <option value="to renovate">Needs renovation</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group" style={{ width: "41em" }}>
              <label className="main-label">Title</label>
              <input
                className="input-field"
                type="text"
                placeholder="This is what people will see in your notice"
                value={formData.title}
                onChange={(e) =>
                  handleInputChange("title", e.target.value, false)
                }
                required
                minLength={1}
                maxLength={50}
              />
            </div>{" "}
          </div>
          <div className="form-group">
            <label className="main-label">Description</label>
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
      </form>
    </>
  );
};

export default PropertyForm;
