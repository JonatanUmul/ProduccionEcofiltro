import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";

const URL = process.env.REACT_APP_URL;

const V = (x) => (x === "" || x == null ? "—" : x);             // muestra vacío bonito
const fmt = (d) => (d ? formatFecha(d) : "");                    // usa tu formateador
const Row = ({ label, value }) => (
  <p className="card-text small text-muted mb-1">
    <strong>{label}</strong> {V(value)}
  </p>
);

const ConsultaCKPM = ({ id }) => {
  const [error, setError] = useState("");
  const [fila, setFila] = useState([]);
   
  // ======= Deja la consulta con axios tal cual =======
  useEffect(() => {
    axios
      .get(`${URL}/DCKSCRUBBER/${id}`)
      .then((response) => {
        setFila(response.data.rows);
        console.log("Datos obtenidos correctamente");
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, []); 
  // ===================================================

  const registros = Array.isArray(fila) ? fila : (fila ? [fila] : []);

  return (
    <div className="mt-4">
      {error && <div className="alert alert-danger">Error: {error}</div>}

      {registros.length > 0 &&
        registros.map((r, index) => (
          <div key={index} className="card mb-3">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Registro #{index + 1}</h5>
            </div>

            <div className="card-body">
              {/* Encabezado */}
              <Row label="Fecha de Reporte:" value={`${fmt(r.fecha)} - ${r.hora_inicio || ""}`} />
              <Row label="Creador:" value={r.creador} />
              <Row label="Reportado (CK inicial):" value={r.aquiensereportoInicial} />
              <Row label="Reportado (CK motores):" value={r.aquiensereportoMotores} />

              <hr />

              {/* ckscrubber.SCRUBBER */}
              <h6 className="fw-bold mb-2">Checklist inicial (ckscrubber.SCRUBBER)</h6>
              <Row label="1. ¿Área del scrubber despejada y con acceso libre?" value={r.area_scrubber_despejada} />
              <Row
                label="2. ¿El tanque tiene agua, está en el nivel correcto y en óptimas condiciones para su uso?"
                value={r.nivel_agua_correcto}
              />
              <Row label="2.1 ¿Flotador funcionando bien?" value={r.flote_buenas_condiciones} />
              <Row label="2.2 ¿Llave de paso del agua abierta?" value={r.llave_paso_abierta} />
              {/* invertimos semántica: si 'agua_limpia' es 'Sí', la respuesta a '¿agua sucia?' es 'No' */}
              <Row
                label="2.3 ¿El agua está sucia?"
                value={
                  r.agua_limpia === "Sí" ? "No" : r.agua_limpia === "No" ? "Sí" : V(r.agua_limpia)
                }
              />
              <Row label="3. ¿Tanque de químicos con soda?" value={r.existe_agua_soda} />
              <Row label="4. ¿Área del tablero principal libre de obstrucciones?" value={r.tablero_principal_libre} />
              <Row label="5. ¿Breaker QF en ON?" value={r.breaker_principal_on} />
              <Row label="Observaciones:" value={r.observaciones} />

              <hr />

              {/* ckmotores.SCRUBBER */}
              <h6 className="fw-bold mb-2">Revisión de Breakers (ckmotores.SCRUBBER)</h6>
              <Row label="QF1 (ventilador) en ON" value={r.breaker_qf1_on} />
              <Row label="QF2 (bomba recirculación) en ON" value={r.breaker_qf2_on} />
              <Row label="QF3 (dosificación químicos) en ON" value={r.breaker_qf3_on} />
              <Row label="QF4 (fusible) en ON" value={r.breaker_qf4_on} />
              <Row label="Hongo de emergencia quitado" value={r.hongo_emergencia_quitado} />

              <h6 className="fw-bold mt-3 mb-2">Encendido de motores</h6>
              <Row label="Ventilador encendió correctamente" value={r.ventilador_qf1_on} />
              <Row label="Bomba de recirculación encendió" value={r.bomba_recirculacion_qf2_on} />
              <Row label="Dosificador de químicos encendió" value={r.dosificador_quimicos_on} />
              <Row label="Fecha/Hora de arranque" value={r.dateTime_arranque_motor} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ConsultaCKPM;
