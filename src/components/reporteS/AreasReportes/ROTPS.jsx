    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../utilidades/FormatearFecta";
    import PdfROPS from './pdfECO/PdfROTPS'
    import ExcelROTHP from './Excel/ExcelRothp'
    const URL = process.env.REACT_APP_URL


    const id_area=2;
    const ROTHP = () => {
      const [datos, setDatos] = useState([]);
      const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
      const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
      const [modeloUF, setModeloUf] = useState([]);
      const [pulidor, setPulidor] = useState([]);
      const [turno, setTurno]= useState([])
      const [turnoProd, setTurnoProd]= useState ('')
      const [id_prensador, setOpulidor]= useState('');
      const [ufmodelo, setUfmodelo]= useState('')
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
        const url = `${URL}/DCPS/${fecha_creacion_inicio  || 'null'}/${fecha_creacion_fin  || 'null'}/${ufmodelo  || 'null'}/${id_prensador  || 'null'}/${turnoProd  || 'null'}`;

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
      <div className="col-md-3">
        <label htmlFor="fecha" className="form-label">Fecha 1</label>
        <input className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
      </div>
      <div className="col-md-3">
        <label htmlFor="fecha" className="form-label">Fecha 2</label>
        <input className="form-control" type="date" value={fecha_creacion_fin} onChange={(e) => setFecha2(e.target.value)} />
      </div>
      <div className="col-sm-3">
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
    </div>
      <div className="col-md-6">
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
    </div>
    <div className="col-md-6">
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
  </div>

    
   
      <div className="col-md-3 d-flex align-items-end">
        <button className="btn btn-primary ms-2" onClick={limpiarInputs}>Limpiar</button>
      </div>
      <div className="col-md-3 d-flex align-items-end">
      <PdfROPS datos={datos}/>    
      <ExcelROTHP datos={datos}/>
      </div>


    </div>

          <table className="table text-center">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora Producción</th>
                <th scope="col">Prensador</th>
                <th scope="col">Prensa</th>
                <th scope="col">Modelo</th>
                <th scope="col">Calificación</th>
                <th scope="col">Auditor</th>
                
          
              </tr>
            </thead>
            <tbody>
              {Array.isArray(datos) && datos.map((fila, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{formatFecha(fila.fecha_produccion) }</td>
                  <td>{fila.hora_produccion}</td>
                  <td>{fila.prensador}</td>
                  <td>{fila.prensa}</td>
                  <td>{fila.modeloUF}</td>
                  <td>{fila.calificacion}</td>
                  <td>{fila.auditor}</td>
                  
                </tr>
              ))}

           
            </tbody>
          </table>
        </div>
      );
    }

    export default ROTHP;
