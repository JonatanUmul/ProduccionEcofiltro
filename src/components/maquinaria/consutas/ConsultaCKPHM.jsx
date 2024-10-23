import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
const URL = process.env.REACT_APP_URL;

const ConsultaCKTA = ({ id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);


  useEffect(() => {
    axios.get(`${URL}/DCKPHM/${id}`)
      .then((response) => {
        setFila(response.data.data);
      })

      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, []); 
console.log('ckphm', fila)
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
              <strong>1. ¿El grupo anterior ha completado satisfactoriamente la limpieza general?</strong> {registro.id_GrupoAnteriorCompletoSatisfactoriamenteLimpiezaGeneral}
            </p>
            <p className="card-text small text-muted">
              <strong>2. ¿Se ha verificado el correcto accionamiento del motor de la bomba?</strong> {registro.id_AccionamientoCorrectoMotorBomba}
            </p>
            <p className="card-text small text-muted">
              <strong>3. ¿Se ha verificado el nivel de aceite en el tanque hidráulico?:</strong> {registro.id_NivelDeAceiteEnTanqueHidraulicoCorrecto}
            </p>
            <p className="card-text small text-muted">
              <strong>4. ¿La manguera hidráulica está en buen estado y sin fugas de aceite?</strong> {registro.id_MangueraHidraulicaEstaEnBuenEstadoSinFugasAceite}
            </p>
            <p className="card-text small text-muted">
              <strong>5. ¿Se ha verificado el funcionamiento del cilindro hidráulico para subir y bajar correctamente?</strong> {registro.id_FuncionamientoCorrectamenteCilindroHidraulicoParaSubirBajar}
            </p>
            <p className="card-text small text-muted">
              <strong>6. ¿La estructura de la prensa se encuentra sin fisuras?</strong> {registro.id_EstructuraPrensaEncuentraSinFisuras}
            </p>
            <p className="card-text small text-muted">
              <strong>7.¿La estructura de los moldes se encuentra sin fisuras ni defectos?</strong> {registro.id_EstructuraDeMoldesEncuentraSinFisurasDefectos}
            </p>
            <p className="card-text small text-muted">
              <strong>8. ¿Se realizó la limpieza y lubricación adecuada de barras y bujes por el equipo anterior?</strong> {registro.id_LimpiezaLubricacionBarrasBujesEquipoAnterior}
            </p>
            <p className="card-text small text-muted">
              <strong>9. ¿La integridad de los bujes y barras principales se encuentra en óptimas condiciones?</strong> {registro.id_IntegridadBujesBarrasPrincipalesOptimas}
            </p>
            
            <p className="card-text small text-muted">
              <strong>Creador:</strong> {registro.creador}
            </p>
            
            {registro.observacion1.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 1:</strong> {registro.observacion1}
              </p>
            )}
           
            {registro.observacion3.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 2:</strong> {registro.observacion2}
              </p>
            )}
            {registro.observacion2.trim() !== "" && (
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
            {registro.observacion8.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 8:</strong> {registro.observacion8}
              </p>
            )}
             {registro.observacion9.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 9:</strong> {registro.observacion9}
              </p>
            )}
            
          </div>
        </div>
      ))}
    </div>
  )
}

export default ConsultaCKTA;
