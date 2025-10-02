import React, { useEffect, useState } from "react";
import axios from "axios";

const URL = process.env.REACT_APP_URL;

const ConsultaDTCC = ({ id }) => {
  const [fila, setFila] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${URL}/DTCC/${id || "null"}`)
      .then((response) => {
        const data = response.data.data;
        if (Array.isArray(data) && data.length > 0) {
          setFila(data[0]);
        }
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, [id]);

  const formatFecha = (fecha) => {
    if (!fecha) return "—";
    return new Date(fecha).toISOString().split("T")[0];
  };

  const getColor = (valor) => {
    const n = parseFloat(valor);
    if (isNaN(n)) return "#374151";
    if (n >= 90) return "green";
    if (n >= 70) return "orange";
    return "red";
  };

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!fila) return <div>Cargando…</div>;

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          width: "95%",
          maxWidth: 800,
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
          fontFamily: "Segoe UI, Arial, sans-serif",
        }}
      >
        {/* Encabezado */}
        <div
          style={{
            background: "#111827",
            color: "#fff",
            padding: "12px 20px",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Proceso #{fila.id}
        </div>

        <div style={{ padding: 20 }}>
          {/* Datos Generales */}
          <h4
            style={{
              margin: "10px 0",
              fontSize: 14,
              textTransform: "uppercase",
              color: "#6b7280",
            }}
          >
            Datos Generales
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 15,
            }}
          >
            <p><strong>Fecha:</strong> {formatFecha(fila.fechaHorneado)}</p>
            <p><strong>Modelo:</strong> {fila.modeloUF}</p>
            <p><strong>Inicio:</strong> {fila.codigoInicio || "—"}</p>
            <p><strong>Fin:</strong> {fila.codigoFin || "—"}</p>
          </div>

          {/* Calidad */}
          <h4
            style={{
              margin: "10px 0",
              fontSize: 14,
              textTransform: "uppercase",
              color: "#6b7280",
            }}
          >
            Calidad
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              marginBottom: 15,
            }}
          >
            <p><strong>Aprobados:</strong> {fila.aprobados}</p>
            <p><strong>Altos:</strong> {fila.altos}</p>
            <p><strong>Bajos:</strong> {fila.bajos}</p>
            <p><strong>Rajados C.C:</strong> {fila.rajadosCC}</p>
            <p><strong>Quemados:</strong> {fila.quemados}</p>
            <p><strong>Ahumados:</strong> {fila.ahumados}</p>
            <p><strong>Ovalados:</strong> {fila.ovalado}</p>
            <p><strong>Reasignados:</strong> {fila.reasignado}</p>
            <p><strong>Sin tasa:</strong> {fila.sin_tasa}</p>
          </div>

          {/* Porcentajes */}
          <h4
            style={{
              margin: "10px 0",
              fontSize: 14,
              textTransform: "uppercase",
              color: "#6b7280",
            }}
          >
            Porcentajes
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 15,
            }}
          >
            <p>
              <strong>% con reasignados:</strong>{" "}
              <span style={{ color: getColor(fila.porcentaje_aprobados_con_reasignados), fontWeight: "bold" }}>
                {fila.porcentaje_aprobados_con_reasignados}%
              </span>
            </p>
            <p>
              <strong>% sin reasignados:</strong>{" "}
              <span style={{ color: getColor(fila.porcentaje_aprobados_sin_reasignados), fontWeight: "bold" }}>
                {fila.porcentaje_aprobados_sin_reasignados}%
              </span>
            </p>
          </div>

          {/* Responsables */}
          <h4
            style={{
              margin: "10px 0",
              fontSize: 14,
              textTransform: "uppercase",
              color: "#6b7280",
            }}
          >
            Responsables
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <p><strong>Encargado C.C:</strong> {fila.encargadoCC}</p>
            <p><strong>Turno C.C:</strong> {fila.turnoCC}</p>
            <p><strong>Turno Horneado:</strong> {fila.turnoHorneado}</p>
            <p><strong>Auditor:</strong> {fila.Aditor}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultaDTCC;
