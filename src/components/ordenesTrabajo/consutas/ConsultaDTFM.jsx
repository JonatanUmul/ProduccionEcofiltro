import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL

const ConsultaDTFM = ({  id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]); 

  
  useEffect(() => {
    axios.get(`${URL}/DTFM/${id}`)

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
            <th scope="col">OTFM</th>
            <th scope="col">Correlativo</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Peso</th>
            <th scope="col">Peso Libras</th>
            <th scope="col">Humedad</th>
            <th scope="col">Modelo</th>
         
           
          </tr>
        </thead>
        <tbody>
          {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{formatFecha(fila.fecha_creacion)}</td>
              <td>{fila.id_otfm}</td>
              <td>{fila.correlativo}</td>
              <td>{fila.cantidad}</td>
              <td>{fila.peso}</td>
              <td>{fila.peso_libras}</td>
              <td>{fila.humedad}%</td>
              <td>{fila.modelo}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaDTFM;
