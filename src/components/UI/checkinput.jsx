// Checkinput.jsx
import React from "react";

const Checkinput = ({ checked, onChange, onHover }) => {
  return (
    <input
      type="checkbox"
      className="form-check-input"
      checked={checked}
      onChange={onChange}
      onMouseEnter={onHover} 
    />
  );
};

export default Checkinput;
