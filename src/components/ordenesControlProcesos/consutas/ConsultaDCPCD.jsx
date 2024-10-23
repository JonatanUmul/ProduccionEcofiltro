import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL;
const ConsultaDCPB = ({  id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/DCPCD/${id}`)
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
            <th scope="col">Fecha de Producción</th>
            <th scope="col">Hora Creación</th>
            <th scope="col">Barro</th>
            <th scope="col">Aserrín</th>
            <th scope="col">Diametro</th>
            <th scope="col">Altura H1</th>
            <th scope="col">Altura H2</th>
            <th scope="col">Grosor 1</th>
            <th scope="col">Grosor 2</th>
            <th scope="col">Grosor Fondo</th>
            <th scope="col">Peso</th>
            <th scope="col">Molde</th>
            <th scope="col">Uf</th>
            <th scope="col">Turno</th>
         
         
           
          </tr>
        </thead>
        <tbody>
          {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{formatFecha(fila.fecha_produccion)}</td>
              <td>{fila.hora_ceacrion}</td>
              <td>{fila.barroLB}</td>
              <td>{fila.aserrinLB}</td>
              <td>{fila.diametro}</td>
              <td>{fila.alturaH1}</td>
              <td>{fila.alturaH2}</td>
              <td>{fila.grosor1}</td>
              <td>{fila.grosor2}</td>
              <td>{fila.grosorFondo}</td>
              <td>{fila.pesouf}</td>
              <td>{fila.molde}</td>
              <td>{fila.ufmodelo}</td>
              <td>{fila.turno}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaDCPB;
