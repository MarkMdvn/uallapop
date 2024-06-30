import React, { useState } from "react";
import { MdOilBarrel, MdElectricalServices } from "react-icons/md";
import { LuFuel } from "react-icons/lu";
import { TbManualGearbox, TbAutomaticGearbox } from "react-icons/tb";
import "./CarsForm.css";

const CarForm = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [cashPrice, setCashPrice] = useState("");
  const [financedPrice, setFinancedPrice] = useState("");
  const [currency, setCurrency] = useState("€");
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [version, setVersion] = useState("");
  const [numberOfDoors, setNumberOfDoors] = useState("");
  const [horsePower, setHorsePower] = useState("");
  const [carType, setCarType] = useState("");
  const [kilometers, setKilometers] = useState("");
  const [engine, setEngine] = useState("");
  const [transmission, setTransmission] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");

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
      version,
      numberOfDoors,
      horsePower,
      carType,
      kilometers,
      engine,
      transmission,
      description,
    };
    console.log(formData);
    // Implement form submission logic here
  };
  const handleEngineSelect = (engine) => {
    setSelectedEngine(engine);
  };

  const handleTransmissionSelect = (transmission) => {
    setSelectedTransmission(transmission);
  };

  return (
    <>
      <div className="main-form-container">
        <h1 className="main-form-h1">Basic information</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row two-columns">
            <div className="form-group">
              <label className="main-label">Marca</label>
              <select
                className="input-field"
                value={brand}
                placeholder="Ej: Seat"
                onChange={(e) => setBrand(e.target.value)}
              >
                <option></option>
              </select>
            </div>
            <div className="form-group">
              <label className="main-label">Modelo</label>
              <select
                className="input-field"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option className="input-field" value="Ej: ibiza"></option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="main-label">Precio al contado</label>
              <input
                className="input-field"
                type="text"
                value={cashPrice}
                onChange={(e) => setCashPrice(e.target.value)}
                placeholder="Con cariño..."
              />
            </div>
            <div className="form-group" style={{ width: "23em" }}>
              <label className="main-label">Precio financiado (opcional)</label>
              <input
                className="input-field"
                type="text"
                value={financedPrice}
                onChange={(e) => setFinancedPrice(e.target.value)}
                placeholder="Precio final financiado"
              />
            </div>
            <div className="form-group" style={{ width: "80px" }}>
              <label className="main-label">Moneda</label>
              <select
                className="input-field"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="€">€</option>
              </select>
            </div>
          </div>

          <div className="form-row two-columns">
            <div className="form-group">
              <label className="main-label">Año</label>
              <select
                className="input-field"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">De fabricación</option>
              </select>
            </div>
            <div className="form-group">
              <label className="main-label">Título</label>
              <input
                className="input-field"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Esto es lo que se verá en tu anuncio"
                maxLength="50"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="main-form-container">
        <h1 className="main-form-h1">Información de tu vehículo</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row two-columns">
            <div className="form-group">
              <label className="main-label">Versión</label>
              <select
                className="input-field"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              >
                <option value="">¿Es alguna versión o serie especf?</option>
              </select>
            </div>
            <div className="form-group">
              <label className="main-label">Número de plazas</label>
              <input
                className="input-field"
                type="number"
                placeholder="Escribe un número"
                onChange={(e) => setNumberOfDoors(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row two-columns">
            <div className="form-group">
              <label className="main-label">Número de puertas</label>
              <input
                className="input-field"
                type="number"
                placeholder="Escribe un número"
                onChange={(e) => setNumberOfDoors(e.target.value)}
              />
            </div>
            <div className="form-group two-columns">
              <label className="main-label">Caballos</label>
              <input
                className="input-field"
                type="number"
                placeholder="Escribe un número"
                onChange={(e) => setHorsePower(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row two-columns">
            <div className="form-group ">
              <label className="main-label">Tipo de coche</label>
              <select
                className="input-field"
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
              >
                <option value="">Pequeño, coupé, sedán, familiar</option>
              </select>
            </div>
            <div className="form-group ">
              <label className="main-label">Kilómetros</label>
              <input
                className="input-field"
                type="text"
                placeholder="¡Con precisión!"
                onChange={(e) => setKilometers(e.target.value)}
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
                  className={` icon-button ${
                    selectedEngine === "gasoline" ? "active" : ""
                  }`}
                >
                  <MdOilBarrel />
                  <span className="icon-label">GASOLINA</span>
                </div>
                <div
                  onClick={() => handleEngineSelect("diesel")}
                  className={`icon-button ${
                    selectedEngine === "diesel" ? "active" : ""
                  }`}
                >
                  <LuFuel />
                  <span className="icon-label">DIESEL</span>
                </div>
                <div
                  onClick={() => handleEngineSelect("electric")}
                  className={`icon-button ${
                    selectedEngine === "electric" ? "active" : ""
                  }`}
                >
                  <MdElectricalServices />
                  <span className="icon-label">ELÉCTRICO</span>
                </div>
              </div>
            </div>
            <div className="form-group icons">
              <label className="main-label">Cambio</label>
              <div className="icon-row">
                <div
                  onClick={() => handleTransmissionSelect("manual")}
                  className={`icon-button ${
                    selectedTransmission === "manual" ? "active" : ""
                  }`}
                >
                  <TbManualGearbox />
                  <span className="icon-label">MANUAL</span>
                </div>
                <div
                  onClick={() => handleTransmissionSelect("automatic")}
                  className={`icon-button ${
                    selectedTransmission === "automatic" ? "active" : ""
                  }`}
                >
                  <TbAutomaticGearbox />
                  <span className="icon-label">AUTOMÁTICO</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="main-label">Descripción</label>
            <textarea
              className="input-field"
              rows="4"
              placeholder="Cuéntanos más. ¿Usado o nuevo? ¿Rojo o amarillo? ¿Tiene algún golpecito?"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </form>
      </div>
    </>
  );
};

export default CarForm;
