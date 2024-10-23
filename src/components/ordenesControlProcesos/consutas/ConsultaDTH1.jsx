import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL;
const ConsultaDTT = ({  id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/DTH/${id}`)
      .then((response) => {
        setFila(response.data.data); // Acceder a response.data.data
        console.log(response.data.data)
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, []);

 
  return (
    
<div className="table-responsive">
  {error && <div>Error: {error}</div>}
  <table className="table text-center" >
    <thead>
      <tr>
      <th scope="col">#</th>
            <th scope="col">Fecha de Horneado</th>
            <th scope="col">Hora</th>
            <th scope="col">CTH</th>
            <th scope="col">Modelo</th>
            <th scope="col">Horno</th>
            <th scope="col">Turno</th>
            <th scope="col">Cabeza Izquierda</th>
            <th scope="col">Centro Izquierdo</th>
            <th scope="col">Pie Izquierdo</th>
            <th scope="col">Cabeza Derecha</th>
            <th scope="col">Centro Derecha</th>
            <th scope="col">Pie Derecho</th>
            <th scope="col">Promedio</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td className="text-wrap">{formatFecha(fila.fecha_creacion)}</td>
          <td>{fila.hora_creacion}</td>
          <td>{fila.id_cth}</td>
          <td>{fila.modelo}</td>
          <td>{fila.horno}</td>
          <td>{fila.turnos}</td>
          <td>{fila.tempCabezaIZ}°</td>
          <td>{fila.tempCentroIZ}°</td>
          <td>{fila.tempPieIZ}°</td>
          <td>{fila.tempCabezaDR}°</td>
          <td>{fila.tempCentroDR}°</td>
          <td>{fila.tempPieDR}°</td>
          <td style={{ color: 'red' }}><strong>{fila.promedio}°</strong></td>
          

        
        </tr>
      ))}
    </tbody>
  </table>
</div>

    
  );
};

export default ConsultaDTT;


