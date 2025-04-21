
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL

const ConsultaDTHP = ({  id, onDataLoaded }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);


  useEffect(()=>{ if(onDataLoaded){onDataLoaded(fila)}},[onDataLoaded])
  useEffect(() => {
    axios.get(`${URL}/DTHP/${id}`)
      .then((response) => {
        setFila(response.data.data); // Acceder a response.data.data
       
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, []);

 
  return (
    
<div className="table-responsive">
  {error && <div>Error: {error}</div>}
  <table className="table text-center">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Fecha de Producción</th>
        <th scope="col">Hora</th>
        <th scope="col">OTHP</th>
        <th scope="col">Materia Prima</th>
        <th scope="col">Aserradero</th>
        <th scope="col">Patio</th>
        <th scope="col">Esquina Superior Izquierda</th>
        <th scope="col">Esquina Superior Derecha</th>
        <th scope="col">Centro</th>
        <th scope="col">Esquina Inferior Izquierda</th>
        <th scope="col">Esquina Inferior Derecha</th>
        <th scope="col">Promedio</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td className="text-wrap">{formatFecha(fila.fecha_creacion)}</td>
          <td>{fila.hora_creacion}</td>
          <td>{fila.id_OTHP}</td>
          <td>{fila.materiaPrima}</td>
          <td>{fila.aserradero}</td>
          <td>{fila.patio}</td>
          <td>{fila.esquinaSupIZ}%</td>
          <td>{fila.esquinaSupDA}%</td>
          <td>{fila.esquinaCentro}%</td>
          <td>{fila.esquinaInfIZ}%</td>
          <td>{fila.esquinaInfDR}%</td>
          <td><strong>{fila.promedio}%</strong></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    
  );
};

export default ConsultaDTHP;
