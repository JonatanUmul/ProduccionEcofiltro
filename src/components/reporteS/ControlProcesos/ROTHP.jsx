    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from '../../utilidades/FormatearFecta';
    import ExcelROTHP from './Excel/ExcelRothp.jsx'
    import { Divider } from 'antd';

    const URL = process.env.REACT_APP_URL


    const ROTHP = () => {
      const [datos, setDatos] = useState([]);
      const [aserradero, setAserradero] = useState([]);
      const [matPrim, setMatPrim] = useState([]);
      const [patios, setPatios] = useState([]);
      const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
      const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
      const [id_asrd, setIdAserradero] = useState('');
      const [id_enc, setIDEnc] = useState('');
      const [id_patio, setIdPatio] = useState('');

      // const fechaActual = new Date();
      // const fechaformateada=formatFecha(fechaActual)
      // const formatearFecha = () => {
      //  setFecha(fechaformateada)
      // };
     
     
console.log(matPrim)
      // Solicitud GET desde React
      useEffect(() => {
        // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
        const url = `${URL}/DTHP/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${id_asrd || 'null'}/${id_patio || 'null'}/${id_enc || 'null'}`;

        axios.get(url)
          .then((response) => {
            setDatos(response.data);
            console.log('datos consulta', response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los datos:', error);
          });
      }, [fecha_creacion_inicio, fecha_creacion_fin, id_asrd, id_patio, id_enc]);

      

      // Realizar las solicitudes para obtener datos
      useEffect(() => {
        axios.all([
          axios.get(`${URL}/Aserradero`),
          axios.get(`${URL}/MateriaPrima`),
          axios.get(`${URL}/Patios`)
        ])
        .then(axios.spread((aserraderoResponse, materiaPrimResponse, patiosResponse) => {
          setAserradero(aserraderoResponse.data);
          setMatPrim(materiaPrimResponse.data);
          setPatios(patiosResponse.data);
        }))
        .catch((error) => {
          console.error('Error al obtener los datos:', error);
        });
      }, []);

      const limpiarInputs = () => {
        setFecha('');
        setFecha2('');
        setIDEnc('');
        setIdAserradero('');
        setIdPatio(''); 
      };
      console.log('datos',datos)
      return (
        <div className="row mb-3">
        <Divider style={{ color: '#1d39c4'}}>Humedad en Patios</Divider>
        <div className="row mb-3">
      <div className="col-md-3">
        <label htmlFor="fecha" className="form-label">Fecha 1</label>
        <input className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
      </div>
      <div className="col-md-3">
        <label htmlFor="fecha" className="form-label">Fecha 2</label>
        <input className="form-control" type="date" value={fecha_creacion_fin} onChange={(e) => setFecha2(e.target.value)} />
      </div>
      <div className="col-md-3">
        <label htmlFor="Materia Prima" className="form-label">Materia Prima:</label>
        <select className="form-select" name="id_enc" value={id_enc} onChange={(e) => setIDEnc(e.target.value)}>
        <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(matPrim.rows) && matPrim.rows.map((item) => (
            <option key={item.id_enc} value={item.id_enc}>{item.nom_matPrima}</option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <label htmlFor="aserradero" className="form-label">Aserradero:</label>
        <select className="form-select" name="id_aserradero" value={id_asrd} onChange={(e) => setIdAserradero(e.target.value)}>
        <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(aserradero.rows) && aserradero.rows.map((item) => (
            <option key={item.id} value={item.id}>{item.nombre_aserradero}</option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <label htmlFor="patio" className="form-label">Patio:</label>
        <select className="form-select" name="id_patio" value={id_patio} onChange={(e) => setIdPatio(e.target.value)}>
        <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(patios.rows) && patios.rows.map((item) => (
            <option key={item.id} value={item.id}>{item.nombrePatio}</option>
          ))}
        </select>
      </div>
      <div className="col-md-3 d-flex align-items-end">
        <button className="btn btn-primary ms-2" onClick={limpiarInputs}>Limpiar</button>
      </div>
      <div className="col-md-3 d-flex align-items-end">
      
      <ExcelROTHP datos={datos}/>
      </div>


    </div>

          <table className="table text-center">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                <th scope="col">Materia Prima</th>
                <th scope="col">Patio</th>
                
                <th scope="col">Aserradero</th>
                
                <th scope="col">Esquina Inferior Derecha</th>
                <th scope="col">Esquina Inferior Izquierda</th>
                <th scope="col">Centro</th>
                <th scope="col">Esquina Superior Derecha</th>
                <th scope="col">Esquina Superior Izquierda</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(datos) && datos.map((fila, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{formatFecha(fila.fecha_creacion) }</td>
                  <td>{fila.hora_creacion}</td>
                  <td>{fila.materiaPrima}</td>
                  <td>{fila.patio}</td>
                  <td>{fila.aserradero}</td>
                  <td>{fila.esquinaInfDR}</td>
                  <td>{fila.esquinaInfIZ}</td>
                  <td>{fila.esquinaCentro}</td>
                  <td>{fila.esquinaSupDA}</td>
                  <td>{fila.esquinaSupIZ}</td>
                </tr>
              ))}

           
            </tbody>
          </table>
        </div>
      );
    }

    export default ROTHP;
