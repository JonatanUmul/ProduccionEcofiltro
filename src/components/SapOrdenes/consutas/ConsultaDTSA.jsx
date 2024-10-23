
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL

const ConsultaDTHP = ({ id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/DASERRIN/${id}`)
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
        <th scope="col">OTSA</th>
        <th scope="col">Materi Prima</th>
        <th scope="col">Aserradero</th>
        <th scope="col">Patio</th>
        <th scope="col">Cantidad Inicial</th>
        <th scope="col">Cantidad Final</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td className="text-wrap">{formatFecha(fila.fecha_creacion)}</td>
          <td>{fila.id_otsa}</td>
          <td>{fila.matPrima}</td>
          <td>{fila.aserradero}</td>
          <td>{fila.patio}</td>
          <td>{fila.cantidad_inicial}</td>
          <td>{fila.cantidad_final}</td>
       
        </tr>
      ))}
    </tbody>
  </table>
</div>

    
  );
};

export default ConsultaDTHP;

