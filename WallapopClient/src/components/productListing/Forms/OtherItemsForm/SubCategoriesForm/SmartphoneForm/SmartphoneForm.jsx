import React, { useState } from "react";
import "../../../../../../pages/ListingPage/ListingPage.css";

const SmartphoneForm = () => {
  const [state, setState] = useState({
    condition: "",
    price: "",
    currency: "€",
    brand: "",
    model: "",
    storage: "",
    color: "",
    description: "",
    hashtag: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", state);
    // Add form submission logic here
  };

  return (
    <div className="main-form-container">
      <h1 className="main-form-h1" style={{ paddingBottom: "20px" }}>
        Información del producto
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row" style={{ paddingBottom: "20px" }}>
          <div className="form-group">
            <select
              className="input-field"
              name="condition"
              value={state.condition}
              onChange={handleChange}
            >
              <option value="">Estado del producto</option>
              <option value="new">Nuevo</option>
              <option value="used">Usado</option>
            </select>
          </div>
          <div className="form-group">
            <input
              className="input-field"
              type="number"
              name="price"
              value={state.price}
              onChange={handleChange}
              placeholder="Precio"
            />
            <p className="small-form-recomendations">Be reasonable...</p>
          </div>
          <div className="form-group">
            <select
              className="input-field"
              name="currency"
              value={state.currency}
              onChange={handleChange}
            >
              <option value="€">€</option>
              <option value="$">$</option>
            </select>
          </div>
        </div>

        <div className="form-row two-columns">
          <div className="form-group">
            <input
              className="input-field"
              type="text"
              name="brand"
              value={state.brand}
              onChange={handleChange}
              placeholder="Marca"
            />
          </div>

          <div className="form-group">
            <input
              className="input-field"
              type="text"
              name="model"
              value={state.model}
              onChange={handleChange}
              placeholder="Modelo"
            />
          </div>
        </div>
        <div className="form-row two-columns">
          <div className="form-group">
            <select
              className="input-field"
              name="storage"
              value={state.storage}
              onChange={handleChange}
            >
              <option value="">Capacidad de Almacenamiento</option>
              <option value="64GB">64GB</option>
              <option value="128GB">128GB</option>
            </select>
          </div>

          <div className="form-group">
            <select
              className="input-field"
              name="color"
              value={state.color}
              onChange={handleChange}
            >
              <option value="">Color del dispositivo*</option>
              <option value="black">Negro</option>
              <option value="white">Blanco</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <textarea
            className="input-field"
            name="description"
            value={state.description}
            onChange={handleChange}
            rows="4"
            placeholder="Descripción"
          ></textarea>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: "bold", padding: "20px 0 20px" }}>
            Hashtags
          </label>
          <textarea
            className="input-field"
            type="text"
            name="hashtag"
            value={state.hashtag}
            onChange={handleChange}
            rows="4"
            placeholder="Create hashtags"
          />
        </div>
      </form>
    </div>
  );
};

export default SmartphoneForm;
