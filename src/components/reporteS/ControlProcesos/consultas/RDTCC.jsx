import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatFecha } from "../../../utilidades/FormatearFecta";
import PdfROTHP from '../pdfECO/PdfROCC';
import ExcelROTHP from '../Excel/ExcelRothp';
import { Card, li }from 'react-bootstrap';

const URL = process.env.REACT_APP_URL;

const ROTHP = ({ dats }) => {
  // console.log('DATOS DESDE RDTC', id_horno, fechaHorneado, id_turno, id_modelo);
  const [datos, setDatos] = useState([]);
  const [id_dthh]=useState(dats.id)
  console.log('id_dthh',id_dthh)
 
  // const [fecha_creacion_inicio, setFecha] = useState(formatFecha(fechaHorneado));
  // const [fecha_creacion_fin, setFecha2] = useState(formatFecha(fechaHorneado));
  // const [turnoHorno, setTurnohorno] = useState(id_turno);
  // const [horno, setHorno] = useState(id_horno);
  // const [modelo, setModelo] = useState(id_modelo);
//const [porcentaje, setPorcentaje]=useState(0)

  useEffect(() => {
    
//    const url = `${URL}/DTCC/${ 'null'}/${ 'null'}/${ 'null'}/${'null'}/${ 'null'}/${id_dthh || ''}`;
    const url = `${URL}/DTCC/${id_dthh || ''}`;

    axios.get(url)
      .then((response) => {
        setDatos(response.data.data);
        console.log('datos consulta', response.data);
        //setPorcentaje(response.data.data.porcentaje)
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  //console.log('porcentage',porcentaje );

  return (
  
    


  <div className="container-fluid">
  <div className="row">
    {Array.isArray(datos) && datos?.map((fila, index) => (
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
            <li><strong>Fecha C.c:</strong> {formatFecha(fila.fecha_creacion)}</li>
            <li><strong>Código Inicio:</strong> {fila.codigoInicio}</li>
            <li><strong>Código Fin:</strong> {fila.codigoFin}</li>
            <li><strong>Modelo:</strong> {fila.modeloUF}</li>
            <li><strong>Turno C.c:</strong> {fila.turnoCC}</li>
            <li><strong>Turno Horneado:</strong> {fila.turnoHorneado}</li>
            <li><strong>Encargado C.c:</strong> {fila.encargadoCC}</li>
            <li><strong>Auditor:</strong> {fila.Aditor}</li>
            <li><strong>Horneado:</strong> {fila.horneados}</li>
            <li><strong>Aprobados:</strong> {fila.aprobados}</li>
            <li><strong>Reasignados:</strong> {fila.reasignado}</li>
            <li><strong>Altos:</strong> {fila.altos}</li>
            <li><strong>Bajos:</strong> {fila.bajos}</li>
            <li><strong>Sin Tasa:</strong> {fila.sin_tasa}</li>
            <li><strong>Rajados C.c:</strong> {fila.rajadosCC}</li>
            <li><strong>Rajados Hornos:</strong> {fila.rajados_horno}</li>
            <li><strong>Desportillado:</strong> {fila.desportillado}</li>
            <li><strong>Desportillado Hornos:</strong> {fila.desportillado_horno}</li>
            <li><strong>Crudos:</strong> {fila.crudoCC}</li>
            <li><strong>Quemados:</strong> {fila.quemados}</li>
            <li><strong>Quemados Hornos:</strong> {fila.quemados_horno}</li>
            <li><strong>Ahumados:</strong> {fila.ahumados}</li>
            <li><strong>Ovalados:</strong> {fila.ovalado}</li>
            <li><strong>Ahumados Hornos:</strong> {fila.ahumados_horno}</li>
            <li><strong>Defecto de producción:</strong> {fila.Desperfecto_de_produccion}</li>
            <li ><strong>% Aprobados sin reasignados:</strong> {fila.porcentaje_aprobados_sin_reasignados}%</li>
            <li ><strong>% Aprobados con reasignados:</strong> {fila.porcentaje_aprobados_con_reasignados}%</li>
           
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
