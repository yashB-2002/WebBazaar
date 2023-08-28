import React from "react";
const ModalComp = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &#10005;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalComp;
