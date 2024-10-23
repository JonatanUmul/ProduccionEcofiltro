import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL;
const ConsultaDRM = ({ id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]); 

  
  useEffect(() => {
    axios.get(`${URL}/DRM/${id}`)

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
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha de Producción</th>
            <th scope="col">CRM</th>
            <th scope="col">Codigo</th>
            <th scope="col">Modelo</th>
            <th scope="col">Merma</th>
  
         
           
          </tr>
        </thead>
        <tbody>
          {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{formatFecha(fila.fecha_creacion)}</td>
              <td>{fila.id_crm}</td>
              <td>{fila.codigo}</td>
              <td>{fila.modelo}</td>
              <td>{fila.merma}</td>
            
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaDRM;
