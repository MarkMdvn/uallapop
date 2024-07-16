import React, { useState } from "react";
import { MdOutlineOilBarrel, MdElectricalServices } from "react-icons/md";
import { LuFuel } from "react-icons/lu";
import { TbManualGearbox, TbAutomaticGearbox } from "react-icons/tb";
import carBrands from "../../../../../../data/carBrands.json";
import "./CarForm.css";

const CarForm = ({ formData, handleInputChange }) => {
  const [selectedEngine, setSelectedEngine] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");

  // FORM THINGS
  const isModelInputDisabled =
    !formData.attributes.brand || formData.attributes.brand === "";

  // Generate an array of years from 1950 to the current year
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 1969 },
    (v, k) => 1970 + k
  ).reverse();

  const carTypes = [
    "Small",
    "Coupe",
    "Sedan",
    "Family",
    "Minivan",
    "4X4",
    "Van",
    "Other",
  ];

  // FORM HOOKS

  const handleEngineSelect = (engine) => {
    setSelectedEngine(engine);
    handleInputChange("engine", engine, true);
  };

  const handleTransmissionSelect = (transmission) => {
    setSelectedTransmission(transmission);
    handleInputChange("transmission", transmission, true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final form data to submit:", formData);
    onSubmit();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="main-form-container">
          <h1 className="main-form-h1">Basic information</h1>
          <div className="form-row two-columns">
            <div className="form-group">
              <label className="main-label">Brand</label>
              <select
                className="input-field"
                value={formData.attributes.brand}
                placeholder="Ej: Seat"
                onChange={(e) =>
                  handleInputChange("brand", e.target.value, true)
                }
                required
              >
                <option value="">Select a brand</option>
                {carBrands.map((brand) => (
                  <option key={brand.name} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="main-label">Model</label>
              <input
                className="input-field"
                type="text"
                value={formData.attributes.model}
                onChange={(e) =>
                  handleInputChange("model", e.target.value, true)
                }
                required
                disabled={isModelInputDisabled}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group" style={{ width: "16em" }}>
              <label className="main-label">Cash price Ex. 13500</label>
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

            <div className="form-group" style={{ width: "16em" }}>
              <label className="main-label">Financed price (optional)</label>
              <input
                className="input-field"
                type="number"
                placeholder="Final financed price"
                value={formData.attributes.financedPrice}
                onChange={(e) =>
                  handleInputChange("financedPrice", e.target.value, true)
                }
                step="1"
              />
            </div>
            <div className="form-group" style={{ width: "100%" }}>
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
          </div>
          <div className="form-row two-columns">
            <div className="form-group">
              <label className="main-label">Year</label>
              <select
                className="input-field"
                type="number"
                value={formData.attributes.year}
                onChange={(e) =>
                  handleInputChange("year", e.target.value, true)
                }
                required
              >
                <option value="">Select a year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ width: "27em" }}>
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
            </div>
          </div>
        </div>

        {/* Other information about the vehicle*/}

        <div className="main-form-container">
          <h1 className="main-form-h1">Information about your vehicle</h1>
          <div className="form-row two-columns">
            <div className="form-group">
              <label className="main-label">Version (optional)</label>
              <input
                className="input-field"
                type="text"
                placeholder="Is it some special version?"
                value={formData.attributes.carVersion}
                onChange={(e) =>
                  handleInputChange("carVersion", e.target.value, true)
                }
              />
            </div>
            <div className="form-group">
              <label className="main-label">Number of seats</label>
              <input
                className="input-field"
                type="number"
                placeholder="Write a number"
                value={formData.attributes.numberOfSeats}
                onChange={(e) =>
                  handleInputChange("numberOfSeats", e.target.value, true)
                }
              />
            </div>
          </div>

          <div className="form-row two-columns">
            <div className="form-group">
              <label className="main-label">Number of doors</label>
              <input
                className="input-field"
                type="number"
                placeholder="Write a number"
                value={formData.attributes.numberOfDoors}
                onChange={(e) =>
                  handleInputChange("numberOfDoors", e.target.value, true)
                }
              />
            </div>
            <div className="form-group two-columns">
              <label className="main-label">Horsepower</label>
              <input
                className="input-field"
                type="number"
                placeholder="Write a number"
                value={formData.attributes.horsepower}
                onChange={(e) =>
                  handleInputChange("horsepower", e.target.value, true)
                }
                required
              />
            </div>
          </div>

          <div className="form-row two-columns">
            <div className="form-group ">
              <label className="main-label">Type of car</label>
              <select
                className="input-field"
                value={formData.attributes.carType}
                onChange={(e) =>
                  handleInputChange("carType", e.target.value, true)
                }
                required
              >
                <option value="">Select a car type</option>
                {carTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group ">
              <label className="main-label">Kilometers</label>
              <input
                className="input-field"
                type="text"
                placeholder="With precision!"
                value={formData.attributes.kilometers}
                onChange={(e) =>
                  handleInputChange("kilometers", e.target.value, true)
                }
                required
                step="1"
              />
            </div>
          </div>

          {/* ICONS  */}

          <div className="form-row two-columns">
            <div className="form-group icons">
              <label className="main-label">Motor</label>
              <div className="icon-row">
                <div
                  onClick={() => handleEngineSelect("gasoline")}
                  className={`icon-button ${
                    selectedEngine === "gasoline" ? "active" : ""
                  }`}
                >
                  <LuFuel style={{ strokeWidth: "2" }} />

                  <span className="icon-label">GASOLINE</span>
                </div>
                <div
                  onClick={() => handleEngineSelect("diesel")}
                  className={`icon-button ${
                    selectedEngine === "diesel" ? "active" : ""
                  }`}
                >
                  <MdOutlineOilBarrel style={{ strokeWidth: "0" }} />

                  <span className="icon-label">DIESEL</span>
                </div>
                <div
                  onClick={() => handleEngineSelect("electric")}
                  className={`icon-button ${
                    selectedEngine === "electric" ? "active" : ""
                  }`}
                >
                  <MdElectricalServices style={{ strokeWidth: "0" }} />
                  <span className="icon-label">ELECTRIC</span>
                </div>
              </div>
            </div>

            <div className="form-group icons">
              <label className="main-label">Transmission</label>
              <div className="icon-row">
                <button
                  type="button"
                  onClick={() => handleTransmissionSelect("manual")}
                  className={`icon-button ${
                    selectedTransmission === "manual" ? "active" : ""
                  }`}
                >
                  <TbManualGearbox />
                  <span className="icon-label">MANUAL</span>
                </button>
                <button
                  onClick={() => handleTransmissionSelect("automatic")}
                  className={`icon-button ${
                    selectedTransmission === "automatic" ? "active" : ""
                  }`}
                >
                  <TbAutomaticGearbox />
                  <span className="icon-label">AUTOMATIC</span>
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="main-label">Descripción</label>
            <textarea
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

export default CarForm;
