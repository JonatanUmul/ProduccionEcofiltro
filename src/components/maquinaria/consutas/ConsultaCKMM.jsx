import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
const URL = process.env.REACT_APP_URL;

const ConsultaCKTA = ({ id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);


  useEffect(() => {
    axios.get(`${URL}/DCKMM/${id}`)
      .then((response) => {
        setFila(response.data.data);
      })

      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, []); 
console.log(fila)
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
              <strong>Fecha de Reporte:</strong> {formatFecha(registro.fechaCreacion)} - {registro.horaCreacion}
            </p>
            <p className="card-text small text-muted">
              <strong>1. Limpieza general :</strong> {registro.id_limpiezaGeneral}
            </p>
            <p className="card-text small text-muted">
              <strong>2. Accionamiento correcto de los tornillos :</strong> {registro.id_AccionamientoCorrectoTornillos}
            </p>
            <p className="card-text small text-muted">
              <strong>3. Accionamiento correcto de compuerta de polvos :</strong> {registro.id_AccionamientoCorrectoCompuertaPolvos}
            </p>
            <p className="card-text small text-muted">
              <strong>4. Verificar el ajuste de los tornillos de las chumaceras :</strong> {registro.id_VerificarAjusteCorrectoTornillosChumaceras}
            </p>
            <p className="card-text small text-muted">
              <strong>5. Verificar visualmente el estado de las paletas en el tornillo seco:</strong> {registro.id_VerificarVisualmenteEstadoPaletasTornilloSeco}
            </p>
            <p className="card-text small text-muted">
              <strong>6. Verificar tornillos de guardas de seguridad:</strong> {registro.id_VerificarTornillosGuardasDeSeguridad}
            </p>
            <p className="card-text small text-muted">
              <strong>7. Lubricación y limpieza de excesos de grasa</strong> {registro.id_LubricaciónYLimpiezaExcesosGrasa}
            </p>
            <p className="card-text small text-muted">
              <strong>Creador:</strong> {registro.creador}
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
             {registro.observacion4.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 4:</strong> {registro.observacion4}
              </p>
            )}
             {registro.observacion5.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 5:</strong> {registro.observacion5}
              </p>
            )}
             {registro.observacion6.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 6:</strong> {registro.observacion6}
              </p>
            )}
             {registro.observacion7.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 7:</strong> {registro.observacion7}
              </p>
            )}
            
          </div>
        </div>
      ))}
    </div>
  )
}

export default ConsultaCKTA;
