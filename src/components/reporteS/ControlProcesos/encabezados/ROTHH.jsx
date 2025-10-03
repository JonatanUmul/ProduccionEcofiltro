import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatFecha } from "../../../utilidades/FormatearFecta.js";
import PdfROTHH from '../pdfECO/PdfROTHH.jsx';
import ExcelRHorneados from '../Excel/ExcelRHorneados.jsx';
import Detalle from '../detalles/RedireccionDetalle_ROTT.jsx';
import DetalleCC from '../detalles/RedireccionDetalleCC.jsx'
import { Divider } from 'antd';
import Button from '../../../UI/Button.jsx';
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_URL;

const ROTHP = () => {
  const [datos, setDatos] = useState([]);
  console.log('datosHorneados',datos)
  const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
  const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
  const fecha_CC='';
const [modeloUF, setModeloUF]=useState('')
const [turn, setMturn]=useState('')
const [horno, sethorno]=useState('')
const [porcentaje, setPorcentaje]=useState(0)
const navigate=useNavigate()
const id_est='3'
  useEffect(() => {
    // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
    const url = `${URL}/DTHH/${fecha_creacion_inicio ? fecha_creacion_inicio : 'null'}/${fecha_creacion_fin ? fecha_creacion_fin : 'null'}/${modeloUF ? modeloUF : 'null'}/${turn ? turn : 'null'}/${horno ? horno : 'null'}/${id_est ? id_est : 'null'}/${fecha_CC?fecha_CC:'null'}`;

    axios.get(url)
      .then((response) => {
        setDatos(response.data.data);

      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, [fecha_creacion_inicio, fecha_creacion_fin, modeloUF, turn,horno]);

console.log('porcentage',porcentaje );
  return (
    
    <div className="row mb-3">
    <Divider style={{ color: '#1d39c4'}}>Horneados</Divider>

  <div className="row mb-3">
    <div className="col-md-3">
      <label htmlFor="fecha" className="form-label">Fecha 1</label>
      <input className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
    </div>
    <div className="col-md-3">
      <label htmlFor="fecha" className="form-label">Fecha 2</label>
      <input className="form-control" type="date" value={fecha_creacion_fin} onChange={(e) => setFecha2(e.target.value)} />
    </div>
    <div className="col-md-3 d-flex align-items-end">
      <PdfROTHH datos={datos} />
      <ExcelRHorneados datos={datos} />
    </div>
  </div>

  <div className="table-responsive">
    <table className="table text-center" style={{ lineHeight: '1.5' }}>
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
        {/*<th scope="col">Temperatura</th> */}  
          <th scope="col">Fecha Horneado</th>
          <th scope="col">Turno</th>
          <th scope="col">C.Inicio</th>
          <th scope="col">C.Fin</th>
          <th scope="col">Horneado</th>
          <th scope="col">Mermas C.</th>
          {/* <th scope="col">Barro</th>
          <th scope="col">Aserrín</th>
          <th scope="col">Aserradero</th>
          <th scope="col">T. Cernido</th> */}
          <th scope="col">Modelo</th>
          <th scope="col">Horno</th>
          <th scope="col">%Aprobado</th>
          <th scope="col">Hornero</th>
          <th scope='col'>Temperatura</th>
          <th scope='col'>Codigos Con tasa</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(datos) && datos.map((fila, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
           {/* <th style={{ width: "0%" }}>
              <Detalle
              datos={datos}
              nombretabla={fila.tabla}
              
              />
            </th>*/}
            <td>{formatFecha(fila.fechaHorneado)}</td>
            <td>{fila.turnoHorneado}</td>
            <td>{fila.codigoInicio}</td>
            <td>{fila.codigoFin}</td>
            <td>{fila.horneado}</td>
            <td>{fila.mermasCrudas}</td>
            {/* <td>{fila.librasBarro}</td>
            <td>{fila.librasAserrin}/{fila.librasAserrin2}</td>
            <td>{fila.aserradero}/{fila.aserradero1}</td>
            <td>{fila.tipocernido1}/{fila.tipocernido2}</td> */}
            <td>{fila.ModeloEco}</td>
            <td>{fila.Horno}</td>
            
           <td style={{color:'red'}} class="text-muted" value={porcentaje} onChange={(e)=>setPorcentaje(e.target.value)}>{fila.porcentaje}
           <DetalleCC
           datos={datos}
           nombretabla={fila.tabla}
           />
           </td>
     
            <td>{fila.Hornero}</td>
            <td>{fila.promedio}</td>
            <td><Button onClick={()=>navigate('/Home/TablaReportesOT/CodigosTasaFiltracion',{state:{
              fila
            }})} >Series</Button></td>
          </tr>
        ))}


      </tbody>
    </table>
  </div>
</div>

  );
}

export default ROTHP;
