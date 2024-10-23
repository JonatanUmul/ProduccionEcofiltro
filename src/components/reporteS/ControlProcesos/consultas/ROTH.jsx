import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { formatFecha } from "../../../utilidades/FormatearFecta";
import PdfROTH from '../pdfECO/PdfROTH'
import './estilosCss.css'
import ExcelROTHP from '../Excel/ExcelRothp'
const URL = process.env.REACT_APP_URL

const maquinaria = "Horno";

const ROTHP = ({ datos }) => {
  const [dats, setDats] = useState([]);
  const [fecha_creacion_inicio, setFecha] = useState(formatFecha(datos[0].fechaHorneado));
  const [fecha_creacion_fin, setFecha2] = useState(formatFecha(datos[0].fechaHorneado));
  const [modeloUF, setModeloUf] = useState(datos[0].id_modelo);
  const [turn, setTurnoProd] = useState(datos[0].id_turno)
  const [horno, setHornos] = useState(datos[0].id_horno);
console.log('datos seleccionados', fecha_creacion_fin,fecha_creacion_inicio,modeloUF,turn,horno)
console.log('prueba de dats', datos[0].fechaHorneado, datos[0].id_modelo, datos[0].id_horno, datos[0].id_turno) 
// Realizar las solicitudes para obtener dats
 
  useEffect(() => {
    // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
    const url = `${URL}/DTH/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${modeloUF || 'null'}/${turn || 'null'}/${horno || 'null'}`;
  
    axios.get(url)
      .then((response) => {
        setDats(response.data.data);
        console.log('dats consulta', response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los dats:', error);
      });
  }, [ modeloUF, turn, horno, fecha_creacion_inicio,fecha_creacion_fin ]);


console.log(dats)
  return (
    




    
    <div className="ROTH">
    <div className="row mb-3">
    <div className="col-md-3">
  

  <div className="col-md-3 d-flex align-items-center justify-content-center">
  <PdfROTH dats={dats} datos={datos} />
  <ExcelROTHP datos={dats} />
</div>
  

    </div>
  </div>
  <div className="row mb-3">
  <div className="col-md-6">
    <strong>
      <div className=" shadow-sm bg-light">
        <div className="dats card-body">
          <h5 className="card-title">Dats:</h5>
          <ul className="list-group list-group-horizontal" >
          <li className="list-group-item">Fecha Horneado: {formatFecha(datos[0].fechaHorneado)}</li>
            <li className="list-group-item">Código Inicio: {datos[0].codigoInicio}/{datos[0].id}</li>
            <li className="list-group-item">Código Fin: {datos[0].codigoFin}</li>
            <li className="list-group-item">Modelo: {datos[0].ModeloEco}</li>
            <li className="list-group-item">Horneado: {datos[0].horneado}</li>
            <li className="list-group-item">Turno: {datos[0].turnoHorneado}</li>
            <li className="list-group-item">Mermas Crudas: {datos[0].mermasCrudas}</li>
            <li className="list-group-item">Hornero: {datos[0].Hornero}</li>
          </ul>
        </div>
      </div>
    </strong>
  </div>
</div>


  <div className="row">
    <div className="col-md-12">
      <div className="table-responsive">
        <table className="table table-sm text-center">
       

  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Hora</th>
      <th scope="col">Cabeza IZ</th>
      <th scope="col">Centro IZ</th>
      <th scope="col">Pie IZ</th>
      <th scope="col">Cabeza DR</th>
      <th scope="col">Centro DR</th>
      <th scope="col">Pie DR</th>
   
      <th scope="col">Prom.</th>
    </tr>
  </thead>
  <tbody>
    {Array.isArray(dats) && dats.map((fila, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{fila.hora_creacion}</td>
        <td>{fila.tempCabezaIZ}</td>
        <td>{fila.tempCentroIZ}</td>
        <td>{fila.tempPieIZ}</td>
        <td>{fila.tempCabezaDR}</td>
        <td>{fila.tempCentroDR}</td>
        <td>{fila.tempPieDR}</td>
        <td>{fila.promedio}</td>
       
      </tr>
    ))}
  </tbody>



        </table>
      </div>
    </div>
  </div>
</div>
);
};

export default ROTHP;
 