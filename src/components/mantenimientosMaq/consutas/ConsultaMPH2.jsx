import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
const URL = process.env.REACT_APP_URL;

const ConsultaCKTA = ({ id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/DMPH2/${id}`)
      .then((response) => {
        setFila(response.data.data);
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, [id]); 
  
console.log(fila)
  return (
    <div className=" mt-4">
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {fila.map((registro, index) => (
        <div key={index} className="card mb-3">
          <div className="card-header bg-primary text-white">
            <h5 className="card-title">Registro #{index + 1}</h5>
          </div>
          <div className="card-body">
            <p className="card-text small text-muted">
              <strong>Fecha de Reporte:</strong> {formatFecha(registro.fechaCreacion)} - {registro.horaCreacion}
            </p>
            <p className="card-text small text-muted">
              <strong>Estado de la Maquina:</strong> {registro.estadomaq}
            </p>
            <p className="card-text small text-muted">
              <strong>Tipo de Mantenimiento:</strong> {registro.tipoMantenimiento}
            </p>
            <p className="card-text small text-muted">
              <strong>Revisión:</strong> {registro.revision}
            </p>
            <p className="card-text small text-muted">
              <strong>Proveedor:</strong> {registro.proveedor}
            </p>
            <p className="card-text small text-muted">
              <strong>Responsable:</strong> {registro.responsable}
            </p>
           
            {registro.observacion1 !== "" && (
              
            <div class="card">
              <label htmlFor="detalle">Detalle:</label>
            <div class="card-body">
            {registro.detalle}
            </div>
          </div>
  )}
           
          
          </div>
        </div>
      ))}
    </div>
  )
}

export default ConsultaCKTA;