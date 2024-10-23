import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL;
const ConsultaDCPB = ({  id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/DCPB/${id}`)
      .then((response) => {
        setFila(response.data.data); // Acceder a response.data.data
        console.log(response.data.data)
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, []);

 console.log(fila)
  return (
    <div className="table-responsive">
      {error && <div>Error: {error}</div>}
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha de Creación</th>
            {/* <th scope="col">Fecha de Producción</th> */}
            <th scope="col">CPB</th>
            <th scope="col">Pulido</th>
            <th scope="col">Modelo</th>
            {/* <th scope="col">Pulidor</th>
            <th scope="col">Prensa</th>
            <th scope="col">Modulo</th> */}
            <th scope="col">Calificación</th>
         
         
           
          </tr>
        </thead>
        <tbody>
          {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{formatFecha(fila.fecha_creacion)}</td>
              {/* <td>{fila.fechaProduccion}</td> */}
              <td>{fila.id_cpb}</td>
              <td>{fila.pulido}</td>
              <td>{fila.modelo}</td>
              {/* <td>{fila.pulidor}</td>
              <td>{fila.prensa}</td>
              <td>{fila.modulo}</td> */}
              <td>{fila.calificacion}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaDCPB;
