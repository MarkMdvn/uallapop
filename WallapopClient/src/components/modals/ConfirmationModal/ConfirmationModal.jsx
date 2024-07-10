// ConfirmActionModal.js
import React from "react";
import Modal from "react-modal";
import "./ConfirmationModal.css";

const ConfirmActionModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  product,
  actionType,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Confirmation Modal"
    className="modal-content"
    overlayClassName="modal-overlay"
  >
    <h2 style={{ paddingBottom: "20px" }}>{actionType} product</h2>
    <p>
      Are you sure you want to <b>{actionType} </b>
      {product?.title}?
    </p>
    <div className="modal-buttons">
      <button className="modal-b confirmation-modal-yes-b" onClick={onConfirm}>
        Yes
      </button>
      <button
        className="modal-b confirmation-modal-no-b"
        onClick={onRequestClose}
      >
        No
      </button>
    </div>
  </Modal>
);

export default ConfirmActionModal;
