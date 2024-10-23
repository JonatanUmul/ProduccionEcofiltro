import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL

const ConsultaDTHH = ({ id, onDataLoaded }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);
  

  useEffect(() => {
    axios.get(`${URL}/DTHH/${id}`)
      .then((response) => {
        setFila(response.data.data); // Acceder a response.data.data
        console.log(response.data.data)
        const respuestaApi=response.data.data
        if(onDataLoaded){onDataLoaded(respuestaApi)}

      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, [onDataLoaded]);

 console.log('Orden seleccionada',id)
  return (
    <div className="table-responsive">
      {error && <div>Error: {error}</div>}
      <table className="table  text-center ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha de Producción</th>
            <th scope="col">Horneado</th>
            <th scope="col">Mermas Crudas</th>
            <th scope="col">barro</th>
            <th scope="col">Aserrin</th>
            <th scope="col">Inicio</th>
            <th scope="col">Fin</th>
            <th scope="col">Turno</th>
            <th scope="col">Aserradero</th>
            <th scope="col">Cernido</th>
            <th scope="col">Modelo</th>
            <th scope="col">Horno</th>
            <th scope="col">Hornero</th>
           
          </tr>
        </thead>
        <tbody>
          {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{formatFecha(fila.fechaHorneado)}</td>
      
              <td>{fila.horneado}</td>
              <td>{fila.mermasCrudas}</td>
              <td>{fila.librasBarro}</td>
              <td>{fila.librasAserrin}/{fila.librasAserrin2}</td>
              <td>{fila.codigoInicio}</td>
              <td>{fila.codigoFin}</td>
              <td>{fila.turnoHorneado}</td>
              <td>{fila.aserradero}</td>
              <td>{fila.tipocernido1}/{fila.tipocernido2}</td>
              <td>{fila.ModeloEco}</td>
              <td>{fila.Horno}</td>
              <td>{fila.Hornero}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaDTHH;

