
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL

const ConsultaDTHP = ({OTDats,  id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);
// const [id]= OTDats.length>0?OTDats[0].id:''
  useEffect(() => {
    axios.get(`${URL}/DTCC/${id || 'null'} `)
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
        <th scope="col">Fecha</th>
        <th scope="col">Inicio</th>
        <th scope="col">Fin</th>
        <th scope="col">Aprobados</th>
        <th scope="col">Altos</th>
        <th scope="col">Bajos</th>
        <th scope="col">Rajados C.C</th>
        <th scope="col">Rajados Crudos</th>
        <th scope="col">Quemados</th>
        <th scope="col">Ahumados</th>
        <th scope="col">Modelo</th>
        <th scope="col">%</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td className="text-wrap">{formatFecha(OTDats.fechaHorneado)}</td>
          <td>{OTDats.codigoInicio}</td>
          <td>{OTDats.codigoFin}</td>
          <td>{fila.aprobados}</td>
          <td>{fila.altos}</td>
          <td>{fila.bajos}</td>
          <td>{fila.rajadosCC}</td>
          <td>{fila.crudoCC}</td>
          <td>{fila.quemados}</td>
          <td>{fila.ahumados}</td>
          <td>{OTDats.ModeloEco}</td>
          <td><strong>{OTDats.porcentaje}</strong></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    
  );
};

export default ConsultaDTHP;
