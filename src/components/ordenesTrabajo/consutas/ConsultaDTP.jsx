import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL

const ConsultaDTP = ({ encabezado, EncName, fecha_creacion, id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/DTP/${id}`)
      .then((response) => {
        setFila(response.data.data); // Acceder a response.data.data
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, []);

 
  return (
    <div className="table-responsive" style={{textAlign:'center'}}>
      {error && <div>Error: {error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha de Producción</th>
            <th scope="col">OTHP</th>
            <th scope="col">Turno</th>
            <th scope="col">Modelo</th>
            <th scope="col">Producido</th>
            <th scope="col">Codigo de Inicio</th>
            <th scope="col">Codigo Final</th>
            <th scope="col">Barro</th>
            <th scope="col">Correlativo Lote Formulación</th>
            <th scope="col">Aserrín</th>
           
          </tr>
        </thead>
        <tbody>
          {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{formatFecha(fila.fecha_creacion)}</td>
              <td>{fila.id_OTP}</td>
              <td>{fila.nombre_turno}</td>
              <td>{fila.nombre_ufmodelo}</td>
              <td>{fila.producido}</td>
              <td>{fila.letra_inicio}{fila.codigoInicio}</td>
              <td>{fila.letra_fin}{fila.codigoFinal}</td>
              <td>{fila.librasBarro}</td>
              <td>{fila.correlativo}</td>
              <td>{fila.peso}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaDTP;

  