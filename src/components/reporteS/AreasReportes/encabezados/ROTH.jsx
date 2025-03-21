import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatFecha } from "../../../utilidades/FormatearFecta.js";
import ExcelROTHP from '../Excel/ExcelRTH';
import Detalle from '../detalles/Detalle_ROTT.jsx';
import ReactPaginate from 'react-paginate';
import { Divider } from 'antd';
const URL = process.env.REACT_APP_URL;

const ROTH = () => {
  const [datos, setDatos] = useState([]);
  const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
  const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
  const id_est='';
  const fecha_CC='';
const [ufmodelo, setUfmodelo]= useState([]);
const [modeloUF, setModeloUF]=useState('')
const [turno, setTurno] = useState([]);
const [turn, setTurn]=useState('')
const[horno, setHorno]=useState('')
const [hornos, setTHornos] = useState([]);
const [currentPage, setCurrentPage] = useState(0);
const itemsPerPage = 20;
const maquinaria="Horno"; 
  useEffect(() => {
    axios.all([
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/Turnos`),
      axios.get(`${URL}/maquinaria/${maquinaria}`),
      // axios.get(`${URL}/GrupodeTrabajo`)
    ])
    .then(axios.spread((ModelosufResponse, TurnosResponse, HornosResponse) => {
      setUfmodelo(ModelosufResponse.data)
      setTurno(TurnosResponse.data);
      setTHornos(HornosResponse.data);
    }))
    .catch((error) => {
      console.error('Error al obtener los datos:', error);
    });
  }, []);

  useEffect(() => {
    // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
    const url = `${URL}/DTH/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${'null'}/${turn || 'null'}/${horno||'null'}`;

    axios.get(url)
      .then((response) => {
        setDatos(response.data.data);

      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);

    
      });
  }, [fecha_creacion_inicio, fecha_creacion_fin,modeloUF,turn,horno]);
console.log('Prueba de datos',fecha_creacion_inicio, fecha_creacion_fin,modeloUF,turn,horno )

const handlePageClick = (data) => {
  setCurrentPage(data.selected);
};

const offset = currentPage * itemsPerPage;
const currentPageData = datos.slice(offset, offset + itemsPerPage);
const pageCount = Math.ceil(datos.length / itemsPerPage);
  return (
    <div className="row mb-3">
      <div className="row mb-3">
      <Divider style={{ color: '#1d39c4'}}>Temperatura Hornos</Divider>

        <div className="col-md-3">
          <label htmlFor="fecha" className="form-label">Fecha 1</label>
          <input className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="fecha" className="form-label">Fecha 2</label>
          <input className="form-control" type="date" value={fecha_creacion_fin} onChange={(e) => setFecha2(e.target.value)} />
        </div>
       

        <div className="col-md-3">
      <label htmlFor="modelo"  className="form-label">Modelo:</label>
      <select className="form-select" name="ufmodelo" value={modeloUF}  onChange={(e) => setModeloUF(e.target.value)}>
      <option value="" disabled selected>Seleccione...</option>
        {Array.isArray(ufmodelo.rows) && ufmodelo.rows.map((item) => (
          <option key={item.id_mod} value={item.id_mod}>{item.nombre_modelo}</option>
        ))}
      </select>
    </div>
    <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
              Horno
          </label>
          <select className="form-select" id="id_horno" value={horno} onChange={(e) => setHorno(e.target.value)}>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(hornos.rows)
            && hornos.rows.length>0 && hornos.rows.map((horno) => (
              <option key={horno.id_maq} value={horno.id_maq}>
                {horno.nombre_maq}
              </option>
            ))}
          </select>
        </div>
    
    <div className="col-md-6">
    <label htmlFor="aserradero" className="form-label">
        Turno de Producción
    </label>
    <select className="form-select" id="id_turno" value={turn} onChange={(e)=>setTurn(e.target.value)}>
    <option>--</option>
    {Array.isArray(turno.rows)
      && turno.rows.length>0 && turno.rows.map((turno) => (
        <option key={turno.id} value={turno.id}>
          {turno.turno}
        </option>
      ))}
    </select>
  </div>
    <div className="col-md-3 d-flex align-items-end">
    <ExcelROTHP datos={datos} />
  </div>
      </div>



      <table className="table text-center" style={{ lineHeight: '1.5' }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha Creación</th>
            <th scope="col">Hora</th>
            <th scope="col">Horno</th>
            <th scope="col">Turno</th>
            <th scope="col">Cabeza DR</th>
            <th scope="col">Pie DR</th>
            <th scope="col">Cabeza IZ</th>
            <th scope="col">Pie IZ</th>
            <th scope="col">Promedio</th>
          
           
          </tr>
        </thead>
        <tbody>
          {Array.isArray(currentPageData) && currentPageData.map((fila, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
         {/*     <th>
                <Detalle
                  nombretabla={fila.tabla}
                  id={fila.id}
                />
              </th> */}
              <td>{formatFecha(fila.fecha_real)}</td>
              <td>{fila.hora_creacion}</td>
              <td>{fila.horno}</td>
              <td>{fila.turno}</td>
              <td>{fila.tempCabezaDR}</td>
              <td>{fila.tempCabezaIZ}</td>
              <td>{fila.tempPieDR}</td>
              <td>{fila.tempPieIZ}</td>
              <td>{fila.promedio}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
      previousLabel={'Anterior'}
      nextLabel={'Siguiente'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
    </div>
  );
}

export default ROTH;
