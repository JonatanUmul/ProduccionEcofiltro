import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
const URL = process.env.REACT_APP_URL;

const ConsultaCKTA = ({ id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/DCKBT/${id}`)
      .then((response) => {
        setFila(response.data.data);
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, [id]); 
  

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
              <strong>1. Limpieza de Banda y Rodillos :</strong> {registro.id_limpiezaBandaYRodillos}
            </p>
            <p className="card-text small text-muted">
              <strong>2. Lubricar Chumaceras :</strong> {registro.id_lubricacionChumaceras}
            </p>
            <p className="card-text small text-muted">
              <strong>3. Verificar Accionamiento de Motor :</strong> {registro.id_accionamientoCorrectoDeMotor}
            </p>
            <p className="card-text small text-muted">
              <strong>4. Creador :</strong> {registro.creador}
            </p>
        
            {registro.observacion1.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 1:</strong> {registro.observacion1}
              </p>
            )}
            {registro.observacion2.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 2:</strong> {registro.observacion2}
              </p>
            )}
            {registro.observacion3.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 3:</strong> {registro.observacion3}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ConsultaCKTA;