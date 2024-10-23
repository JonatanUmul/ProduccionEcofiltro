import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
const URL = process.env.REACT_APP_URL;

const ConsultaCKTA = ({ id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/DCKPH2/${id}`)
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
              <strong>1.¿Se ha verificado el correcto accionamiento del motor de la bomba?</strong> {registro.id_verificadoCorrectoAccionamientoDebomba}
            </p>
            <p className="card-text small text-muted">
              <strong>2. ¿Se confirma que el sensor de barrera infrarroja está limpio?</strong> {registro.id_sensorInfrarrojaLimpio}
            </p>
            <p className="card-text small text-muted">
              <strong>3. ¿Se ha comprobado que el sensor de barrera infrarroja funciona correctamente?</strong> {registro.id_SecompruebaSensorBarreraInfrarrojaFuncionaCorrectamente}
            </p>
            <p className="card-text small text-muted">
              <strong>4. ¿La manguera hidráulica está en buen estado y sin fugas de aceite:</strong> {registro.id_mangueraHidráulicaEstaEnBuenEstadoSinFugasAceite}
            </p>
            <p className="card-text small text-muted">
              <strong>5. ¿La integridad de los bujes y las barras principales está en buen estado y sin daños?:</strong> {registro.id_integridadDeLosBujesYBarrasPrincipalesEstaBuenEstadoSinDaños}
            </p>
            <p className="card-text small text-muted">
              <strong>6. ¿El grupo anterior ha completado satisfactoriamente la limpieza general?</strong> {registro.id_elGrupoAnteriorCompletoSatisfactoriamenteLimpiezaGenera}
            </p>
            <p className="card-text small text-muted">
              <strong>Creador: </strong> {registro.creador}
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
          </div>
        </div>
      ))}
    </div>
  )
}

export default ConsultaCKTA;