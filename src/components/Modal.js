import React from "react";

const Modal = ({ title, children }) => (
  <div className="modal is-active">
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <h3 className="modal-card-title">{title}</h3>
      </header>
      <div className="modal-card-body">{children}</div>
    </div>
  </div>
);

export default Modal;
