import React from 'react';
import './Modal.css'; // Assuming you have a CSS file for modal styling

function Modal({ onClose, children }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>X</button>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
