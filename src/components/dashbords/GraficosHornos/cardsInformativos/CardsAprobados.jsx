import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CardsInformacion = () => {
  return (
    <div className="card text-white bg-info" style={{ maxWidth: '20rem', borderRadius: '10px', margin: '0' }}>
    <div className="card-header text-center" style={{ borderRadius: '10px 10px 0 0', fontSize: '1.25rem' }}>Aprobados</div>
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="turno-label" style={{ fontSize: '1rem' }}>Turno Día:</div>
        <div className="produccion" style={{ fontSize: '1rem' }}>390</div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="turno-label" style={{ fontSize: '1rem' }}>Turno Noche:</div>
        <div className="produccion" style={{ fontSize: '1rem' }}>410</div>
      </div>
    </div>
  </div>
  );
};

export default CardsInformacion;
