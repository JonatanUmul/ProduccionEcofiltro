import React, { useEffect, useState } from "react";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Get_detalles_del_aserrin from "../../../services/Get_detalles_del_aserrin";
import AlertAnt from "../../UI/alerts/AlertAnt";
import "./estiloTabla.css";

const ConsultaDTCA1 = ({ datosApi }) => {
  console.log('console', datosApi.id)
  const [error, setError] = useState("");
  const [datos, setDatos] = useState([]);
console.log('datos consola deaserrin', datos)
  const id_detalle = datosApi.id;

  const ObtenerDatos = async () => {
    try {
      const response = await Get_detalles_del_aserrin(
        {id_detalle},
      );
      setDatos(response.data.response[0]);
      console.log("Respuesta del servidor", response.data.response[0]);
    } catch (error) {
      console.log(error.response.data.mensaje);
      setError(error.response.data.mensaje);
    }
  };

  useEffect(() => {
    ObtenerDatos();
  }, [datosApi]);

  return (
    <div className="table-responsive">
      {error && <AlertAnt error={error} />}
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Hora</th>
            <th scope="col">aserradero</th>
            <th scope="col">{'>=2.00mm'}</th>
            <th scope="col">{'2.00mm-0.50mm'}</th>
            <th scope="col">{'<0.50mm'}</th>
            <th scope="col">Creado por</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(datos) &&
            datos.length > 0 &&
            datos.map((fila, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatFecha(fila.fecha_creacion)}</td>
                <td>{fila.hora_creacion}</td>
                <td>{fila.nombre_aserradero}</td>
                <td>{fila.mayor_2mm}</td>
                <td>{fila.entre_2_y_05mm} </td>
                <td>{fila.menor_05mm}</td>
                <td>{fila.Nombre}</td>
              </tr>
            ))}

    
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaDTCA1;
