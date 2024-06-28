import "./CarsForm.css";
import React, { useState } from "react";

const CarForm = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [cashPrice, setCashPrice] = useState("");
  const [financedPrice, setFinancedPrice] = useState("");
  const [currency, setCurrency] = useState("€");
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      brand,
      model,
      cashPrice,
      financedPrice,
      currency,
      year,
      title,
    };
    console.log(formData);
    // Implement form submission logic here
  };

  return (
    <div className="form-container">
      <h2>Información básica</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Marca</label>
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">Ej: Seat</option>
            </select>
            <button type="button">Añadir marca manualmente</button>
          </div>
          <div className="form-group">
            <label>Modelo</label>
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="">Ej: Ibiza</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Precio al contado</label>
            <input
              type="text"
              value={cashPrice}
              onChange={(e) => setCashPrice(e.target.value)}
              placeholder="Con cariño..."
            />
          </div>
          <div className="form-group">
            <label>Precio financiado (opcional)</label>
            <input
              type="text"
              value={financedPrice}
              onChange={(e) => setFinancedPrice(e.target.value)}
              placeholder="Precio final financiado"
            />
          </div>
          <div className="form-group">
            <label>Moneda</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="€">€</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Año</label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">De fabricación</option>
            </select>
          </div>
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Esto es lo que se verá en tu anuncio"
              maxLength="50"
            />
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CarForm;
