
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL
const ConsultaDTCA1 = ({id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/DTCA1/${id}`)
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
            <th scope="col">OTCA1</th>
            <th scope="col">Materi Prima</th>
            <th scope="col">Aserradero</th>
         
            <th scope="col">Cantidad Inicial</th>
            <th scope="col">Cantidad Final</th>
         
           
          </tr>
        </thead>
        <tbody>
          {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{formatFecha(fila.fecha_creacion)}</td>
              <td>{fila.id_otca1}</td>
              <td>{fila.matPrima}</td>
              <td>{fila.aserradero}</td>
              <td>{fila.CantidadInicial}</td>
              <td>{fila.CantidadFinal}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaDTCA1;
