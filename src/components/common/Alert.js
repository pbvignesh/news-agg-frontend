import React from 'react';
import './Alert.css';

const Alert = ({ message, type, show, onClose }) => {
  if (!show) return null;

  return (
    <div className={`alert alert-${type} popup-alert`} role="alert">
      {message}
      <button type="button" className="close" onClick={onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Alert;
