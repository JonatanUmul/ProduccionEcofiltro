import React, { useEffect, useState } from "react";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Get_DT_mezclado_aserrin from "../../../services/Get_DT_mezclado_aserrin";
import AlertAnt from "../../UI/alerts/AlertAnt";
import "./estiloTabla.css";

const ConsultaDTCA1 = ({ datosApi }) => {
  console.log('console', datosApi)
  const [error, setError] = useState("");
  const [datos, setDatos] = useState([]);
console.log('datos consola', datos)
  const id_ot_mezclado_aserrin = datosApi.id;

  const ObtenerDatos = async () => {
    try {
      const response = await Get_DT_mezclado_aserrin({
        id_ot_mezclado_aserrin: id_ot_mezclado_aserrin,
      });
      setDatos(response.data);
      console.log("Respuesta del servidor", response);
    } catch (error) {
      console.log(error.response.data.mensaje);
      setError(error.response.data.mensaje);
    }
  };

  useEffect(() => {
    ObtenerDatos();
  }, []);

  // Calcular totales
  const totalSacos = datos.reduce((acc, fila) => acc + (parseInt(fila.sacos) || 0), 0);
  const totalLibras = datos.reduce((acc, fila) => acc + (parseInt(fila.libras_aserrin) || 0), 0);
  const totalMinutos = datos.reduce((acc, fila) => acc + (parseInt(fila.tiempo_mezclado) || 0), 0);

  return (
    <div className="table-responsive">
      {error && <AlertAnt error={error} />}
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Código camionada</th>
            <th scope="col">Sacos</th>
            <th scope="col">Libras</th>
            <th scope="col">Tiempo Mezclado</th>
            <th scope="col">Creado por:</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(datos) &&
            datos.length > 0 &&
            datos.map((fila, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatFecha(fila.fecha_creacion)}</td>
                <td>{fila.codigo_lote}</td>
                <td>{fila.sacos}</td>
                <td>{fila.libras_aserrin}</td>
                <td>{fila.tiempo_mezclado} minutos</td>
                <td>{fila.nombre}</td>
              </tr>
            ))}

          {/* Fila de totales */}
          {datos.length > 0 && (
            <tr className="fw-bold table-secondary">
              <td colSpan="3">Totales</td>
              <td>{totalSacos}</td>
              <td>{totalLibras}</td>
              <td>{totalMinutos} minutos</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaDTCA1;
