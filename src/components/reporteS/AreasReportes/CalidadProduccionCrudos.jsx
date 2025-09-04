    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../utilidades/FormatearFecta";
    import PdfROPS from './pdfECO/PdfROTPS'
    import { Divider } from 'antd';
    import CalidadProduccionCrudosExcel from './Excel/CalidadProduccionCrudos'
    const URL = process.env.REACT_APP_URL


    const id_area=2;
    const CalidadProduccionCrudos = () => {
      const [datos, setDatos] = useState([]);
      const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
      const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
      const [modeloUF, setModeloUf] = useState([]);
      const [pulidor, setPulidor] = useState([]);
      const [turno, setTurno]= useState([])
      const [turnoProd, setTurnoProd]= useState ('')
      const [id_prensador, setOpulidor]= useState('');
      const [ufmodelo, setUfmodelo]= useState('')
      const [paginaActual, setPaginaActual] = useState(1);
      const filasPorPagina = 10; 
console.log('datosdatosdatos',datos)
      const totalPaginas = Math.ceil(datos.length / filasPorPagina);
const indexInicio = (paginaActual - 1) * filasPorPagina;
const indexFin = indexInicio + filasPorPagina;
const datosPaginados = datos?.slice(indexInicio, indexFin);


      console.log(datos)
      // Realizar las solicitudes para obtener datos
      useEffect(() => {
        axios.all([
          axios.get(`${URL}/ModelosUF`),
          axios.get(`${URL}/Operarios/${id_area}`),
          axios.get(`${URL}/Turnos`)
        
        ])
        .then(axios.spread((modeloufReponse, PulidorResponse, TurnosResponse) => {
          setModeloUf(modeloufReponse.data);
          setPulidor(PulidorResponse.data)
          setTurno(TurnosResponse.data)
        }))
        .catch((error) => {
          console.error('Error al obtener los datos:', error);
        });
      }, []);
 

      useEffect(() => {
        // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
        const url = `${URL}/DCPCD/${fecha_creacion_inicio  || 'null'}/${fecha_creacion_fin  || 'null'}/${ufmodelo  || 'null'}/${turnoProd  || 'null'}`;

        axios.get(url)
          .then((response) => {
            setDatos(response.data);
            console.log('datos consulta', response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los datos:', error);
          });
      }, [fecha_creacion_inicio, fecha_creacion_fin, ufmodelo, id_prensador]);
console.log('dps',datos)
      
      const limpiarInputs = () => {
        setOpulidor('');
        setUfmodelo('');
        setFecha('');
        setFecha2('')
        setTurnoProd('')
        
      };
      return (
        <div className="row mb-3">
        <div className="row mb-3">
        <Divider style={{ color: '#1d39c4'}}>Control de calidad crudos</Divider>
      <div className="col-md-3">
        <label htmlFor="fecha" className="form-label">Fecha 1</label>
        <input className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
      </div>
      <div className="col-md-3">
        <label htmlFor="fecha" className="form-label">Fecha 2</label>
        <input className="form-control" type="date" value={fecha_creacion_fin} onChange={(e) => setFecha2(e.target.value)} />
      </div>
      {/* <div className="col-sm-3">
      <label htmlFor={`turno`} className="form-label">
        Turno
      </label>
      <select
        className="form-select"
        name={`id_turno`}
        id={`id_turno`}
        value={turnoProd} onChange={(e) => setTurnoProd(e.target.value)}
      >
      <option value="" disabled selected>Seleccione...</option>
      {Array.isArray(turno.rows) &&
          turno.rows.length > 0 &&
          turno.rows.map((turno) => (
            <option key={turno.id} value={turno.id} >
              {turno.turno}
            </option>
          ))}
      </select>
    </div> */}
      {/* <div className="col-md-6">
      <label htmlFor="aserradero" className="form-label">
        Modelo
      </label>
      <select className="form-select" id="id_modelo" value={ufmodelo} onChange={(e) => setUfmodelo(e.target.value)}>
      <option value="" disabled selected>Seleccione...</option>
      {Array.isArray(modeloUF.rows)
        && modeloUF.rows.length>0 && modeloUF.rows.map((modelo) => (
          <option key={modelo.id_mod} value={modelo.id_mod}>
            {modelo.nombre_modelo}
          </option>
        ))}
      </select>
    </div> */}
    {/* <div className="col-md-6">
    <label htmlFor="aserradero" className="form-label">
      Pulidor
    </label>
    <select className="form-select" id="id_pulidor" value={id_prensador} onChange={(e) => setOpulidor(e.target.value)}>
    <option value="" disabled selected>Seleccione...</option>          
    {Array.isArray(pulidor.rows)
      && pulidor.rows.length>0 && pulidor.rows.map((pulidor) => (
        <option key={pulidor.id} value={pulidor.id}>
          {pulidor.Nombre}
        </option>
      ))}
    </select>
  </div> */}

    
   
      <div className="col-md-3 d-flex align-items-end">
        <button className="btn btn-primary ms-2" onClick={limpiarInputs}>Limpiar</button>
      </div>
      <div className="col-md-3 d-flex align-items-end">
      {/* <PdfROPS datos={datos}/>     */}
      <CalidadProduccionCrudosExcel datos={datos}/>
      </div>


    </div>

          <table 
          pagination={{ pageSize: 20 }}
          
          className="table text-center">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha</th>
                <th scope="col">Modelo UF</th>
                <th scope="col">Prensa</th>
                <th scope="col">Turno</th>
                <th scope="col">Barro LB</th>
                <th scope="col">Aserrín LB</th>
                <th scope="col">Diametro</th>
                <th scope="col">Altura H1</th>
                <th scope="col">Altura H2</th>
                <th scope="col">Grosor 1</th>
                <th scope="col">Grosor 2</th>
                <th scope="col">Grosor Fondo</th>
                <th scope="col">Peso UF</th>
                
          
              </tr>
            </thead>
            <tbody>
  {Array.isArray(datosPaginados) && datosPaginados.map((fila, index) => (
    <tr key={index}>
      <th scope="row">{indexInicio + index + 1}</th>
      <td>{formatFecha(fila.fecha_produccion)}</td>
      <td>{fila.ufmodelo}</td>
      <td>{fila.molde}</td>
      <td>{fila.turno}</td>
      <td>{fila.barroLB}LB</td>
      <td>{fila.aserrinLB}LB</td>
      <td>{fila.diametro}mm</td>
      <td>{fila.alturaH1}mm</td>
      <td>{fila.alturaH2}mm</td>
      <td>{fila.grosor1}mm</td>
      <td>{fila.grosor2}mm</td>
      <td>{fila.grosorFondo}mm</td>
      <td>{fila.pesouf}LB</td>
    </tr>
  ))}
</tbody>

          </table >
          <nav className="d-flex justify-content-center">
  <ul className="pagination flex-wrap">
    <li className={`page-item ${paginaActual === 1 && 'disabled'}`}>
      <button className="page-link" onClick={() => setPaginaActual(paginaActual - 1)}>
        Anterior
      </button>
    </li>

    {paginaActual > 2 && (
      <li className="page-item disabled">
        <span className="page-link">...</span>
      </li>
    )}

    {[...Array(totalPaginas)]
      .map((_, i) => i + 1)
      .filter(
        (numero) =>
          numero === 1 ||
          numero === totalPaginas ||
          Math.abs(numero - paginaActual) <= 1
      )
      .map((numero) => (
        <li key={numero} className={`page-item ${paginaActual === numero ? 'active' : ''}`}>
          <button className="page-link" onClick={() => setPaginaActual(numero)}>
            {numero}
          </button>
        </li>
      ))}

    {paginaActual < totalPaginas - 1 && (
      <li className="page-item disabled">
        <span className="page-link">...</span>
      </li>
    )}

    <li className={`page-item ${paginaActual === totalPaginas && 'disabled'}`}>
      <button className="page-link" onClick={() => setPaginaActual(paginaActual + 1)}>
        Siguiente
      </button>
    </li>
  </ul>
</nav>


        </div>
      );
    }

    export default CalidadProduccionCrudos;
