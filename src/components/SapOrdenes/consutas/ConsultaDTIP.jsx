
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL

const ConsultaDTP = ({  id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/DTIP/${id}`)
      .then((response) => {
        setFila(response.data.data); // Acceder a response.data.data
       
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, []);

 
  return (
    <div className="table-responsive text-center">
      {error && <div>Error: {error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha de Impregnación</th>
            <th scope="col">OTIP</th>
            <th scope="col">Tipo de Plata</th>
            <th scope="col">Modelo</th>
            <th scope="col">Código Inicio</th>
            <th scope="col">Código Final</th>
            <th scope="col">Impregnados</th>
            <th scope="col">Mermas</th>
            
           
          </tr>
        </thead>
        <tbody>
          {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{formatFecha(fila.fechaCreacion)}</td>
              <td>{fila.id_otip}</td>
              <td>{fila.TipoPlata}/{fila.TipoPlata2}</td>
              <td>{fila.modelo}</td>
              <td>{fila.codigoInicio}</td>
              <td>{fila.codigoFinal}</td>
              <td>{fila.impregnados}</td>
              <td>{fila.mermas}</td>
             
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaDTP;
