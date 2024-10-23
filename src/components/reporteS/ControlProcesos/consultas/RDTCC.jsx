import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatFecha } from "../../../utilidades/FormatearFecta";
import PdfROTHP from '../pdfECO/PdfROTHP';
import ExcelROTHP from '../Excel/ExcelRothp';
import { Card, li }from 'react-bootstrap';

const URL = process.env.REACT_APP_URL;

const ROTHP = ({ dats }) => {
  // console.log('DATOS DESDE RDTC', id_horno, fechaHorneado, id_turno, id_modelo);
  const [datos, setDatos] = useState([]);
  const [id_dthh]=useState(dats[0].id)
   console.log(id_dthh)
  // const [fecha_creacion_inicio, setFecha] = useState(formatFecha(fechaHorneado));
  // const [fecha_creacion_fin, setFecha2] = useState(formatFecha(fechaHorneado));
  // const [turnoHorno, setTurnohorno] = useState(id_turno);
  // const [horno, setHorno] = useState(id_horno);
  // const [modelo, setModelo] = useState(id_modelo);
const [porcentaje, setPorcentaje]=useState(0)

  useEffect(() => {
    
    const url = `${URL}/DTCC/${ 'null'}/${ 'null'}/${ 'null'}/${ 'null'}/${ 'null'}/${id_dthh || 'null'}`;

    axios.get(url)
      .then((response) => {
        setDatos(response.data.data);
        console.log('datos consulta', response.data);
        setPorcentaje(response.data.data.porcentaje)
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  console.log('porcentage',porcentaje );

  return (
  
    


  <div className="container-fluid">
  <div className="row">
    {Array.isArray(datos) && datos.map((fila, index) => (
      <div key={index}>
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{formatFecha(fila.fecha_real)}</h5>
              <div>
                <PdfROTHP datos={datos} />
                <ExcelROTHP datos={datos} />
              </div>
            </div>
          </div>
          <div className="card-body">
            <ul className="list-unstyled">
            <li><strong>Fecha Horneado:</strong> {formatFecha(fila.fechaHorneado)}</li>
            <li><strong>Código Inicio:</strong> {fila.codigoInicio}</li>
            <li><strong>Código Fin:</strong> {fila.codigoFin}</li>
            <li><strong>Modelo:</strong> {fila.modeloUF}</li>
            <li><strong>Turno C.c:</strong> {fila.turnoCC}</li>
            <li><strong>Turno Horneado:</strong> {fila.turnoHorneado}</li>
            <li><strong>Encargado C.c:</strong> {fila.encargadoCC}</li>
            <li><strong>Auditor:</strong> {fila.Aditor}</li>
            <li><strong>Horneado:</strong> {fila.horneados}</li>
            <li><strong>Aprobados:</strong> {fila.aprobados}</li>
            <li><strong>Altos:</strong> {fila.altos}</li>
            <li><strong>Bajos:</strong> {fila.bajos}</li>
            <li><strong>Rajados C.c:</strong> {fila.rajadosCC}</li>
            <li><strong>Crudos:</strong> {fila.crudoCC}</li>
            <li><strong>Quemados:</strong> {fila.quemados}</li>
            <li><strong>Ahumados:</strong> {fila.ahumados}</li>
            <li ><strong>%Aprobados:</strong> {fila.porcentaje}%</li>
           
            </ul>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  
   
  );
};

export default ROTHP;
