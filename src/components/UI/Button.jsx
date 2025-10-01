import React from 'react';
import './Button.css'; // Importa el archivo de estilos si usas CSS externo

const Button = ({ children, ...props }) => {
  return (
    <button className="custom-btn" {...props}>
      {children}
    </button>
  );
};

export default Button;
