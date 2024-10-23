import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
const URL = process.env.REACT_APP_URL;

const ConsultaCKTA = ({ id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);


  useEffect(() => {
    axios.get(`${URL}/DCKM2/${id}`)
      .then((response) => {
        setFila(response.data.data);
      })

      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, []); 

  return (
    <div className=" mt-4">
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {Array.isArray(fila) && fila.length > 0 && fila.map((registro, index) => (
        <div key={index} className="card mb-3">
          <div className="card-header bg-primary text-white">
            <h5 className="card-title">Registro #{index + 1}</h5>
          </div>
          <div className="card-body">
            <p className="card-text small text-muted">
              <strong>Fecha de Reporte:</strong> {formatFecha(registro.fecha_creacion)} - {registro.hora_creacion}
            </p>
            <p className="card-text small text-muted">
              <strong>1. Limpieza General:</strong> {registro.id_limpiezaGeneral}
            </p>
            <p className="card-text small text-muted">
              <strong>2. Accionamiento Correcto de Tornillos:</strong> {registro.id_accionamientoCorrectoTornillos}
            </p>
            <p className="card-text small text-muted">
              <strong>3. Presion de Aire (125 PSI):</strong> {registro.id_presionAire125PSI}
            </p>
            <p className="card-text small text-muted">
              <strong>4.Vaciar Agua en Unidad de Mantenimiento:</strong> {registro.id_vaciarAguaUnidadMantenimientio}
            </p>
            <p className="card-text small text-muted">
              <strong>5. Accionamiento Compuerta de Polvos:</strong>  {registro.id_accionamientoCompuertaPolvos}
            </p>
            <p className="card-text small text-muted">
              <strong>6. Inspección De Tornillo Para Objetos Extraños:</strong> {registro.id_inspeccionTornillosObjetosExtraños}
            </p>
            <p className="card-text small text-muted">
              <strong>7. Ajuste Manual de Chumaceras (Tornillo Seco):</strong>  {registro.id_ajusteManuelChumaceras}
            </p>
            <p className="card-text small text-muted">
              <strong>8. Inspeccion Paletas de Mezclado (Tornillo Seco):</strong> {registro.id_inspeccionPaletaTornilloSeco}
            </p>
            <p className="card-text small text-muted">
              <strong>Creador:</strong>  {registro.creador}
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
             {registro.observacion2.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 3:</strong> {registro.observacion3}
              </p>
            )}
             {registro.observacion2.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 4:</strong> {registro.observacion4}
              </p>
            )}
             {registro.observacion2.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 5:</strong> {registro.observacion5}
              </p>
            )}
             {registro.observacion2.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 6:</strong> {registro.observacion6}
              </p>
            )}
             {registro.observacion2.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 7:</strong> {registro.observacion7}
              </p>
            )}
             {registro.observacion2.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 8:</strong> {registro.observacion8}
              </p>
            )}
            
          </div>
        </div>
      ))}
    </div>
  )
}

export default ConsultaCKTA;
