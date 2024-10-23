    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../../utilidades/FormatearFecta.js";
    import ExcelRotsa from '../Excel/ExcelRotsa.jsx'
    import PdfROTSA from '../pdfECO/PdfROTSA.jsx'
import Detalle from '../detalles/RedireccionDetalleROTHP'
import { Divider } from 'antd';

    const URL = process.env.REACT_APP_URL

    const ROTHP = () => {
      const [datos, setDatos] = useState([]);
      const [aserradero, setAserradero] = useState([]);
      const [materiaPrim, setMatPrim] = useState([]);
      const [patios, setPatios] = useState([]);
      const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
      const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
      const [id_asrdSMP, setIdAserradero] = useState('');
      const [id_patio, setIdPatio] = useState('');
console.log('datos en secado de aserrin', datos)
      const limpiarInputs = () => {
        setFecha(formatFecha(new Date()));
        setFecha2(formatFecha(new Date()));
        setIdAserradero('');
        setIdPatio(''); 
      };

      // Solicitud GET desde React
      useEffect(() => {
        // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
        const url = `${URL}/DASERRIN/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${id_asrdSMP || 'null'}/${id_patio || 'null'}`;

        
        axios.get(url)
          .then((response) => {
            setDatos(response.data);
            console.log('datos consulta', response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los datos:', error);
          });
      }, [fecha_creacion_inicio, fecha_creacion_fin,  id_asrdSMP, id_patio]);
console.log(datos)
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

      return (
      
        <div className="row mb-3">
        <Divider style={{ color: '#1d39c4'}}>Secado de Aserrín</Divider>

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
        <label htmlFor="aserradero" className="form-label">Aserradero:</label>
        <select className="form-select" name="id_aserradero" value={id_asrdSMP} onChange={(e) => setIdAserradero(e.target.value)}>
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

      <ExcelRotsa datos={datos}
      fechaSecado={datos.fecha_creacion}/>
      <PdfROTSA datos={datos}/>
      </div>
    

    </div>

          <table className="table text-center">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Detalle</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                <th scope="col">Patio</th>
                <th scope="col">Aserradero</th>
                
                <th scope="col">Cantidad Inicial</th>
                <th scope="col">Cantidad Final</th>
                <th scope="col">Merma</th>
                

              </tr>
            </thead>
            <tbody>
              {Array.isArray(datos) && datos.map((fila, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  
                 <th> <Detalle
                 nombretabla={fila.tabla}
                 fechaSecado={formatFecha(fila.fecha_creacion)}
                 id_patio={fila.id_patio}
                 patio={fila.patio}

                 cantidad_inicial={fila.cantidad_inicial}
                 cantidad_final={fila.cantidad_final}
                 merma={fila.merma}
                 FirmaJefe={fila.firmaJefe}
                 NombreJefe={fila.NombreJefe}
                 /></th> 
                  <td>{formatFecha(fila.fecha_creacion) }</td>
                  <td>{fila.hora_creacion}</td>
                  <td>{fila.patio}</td>
                  <td>{fila.aserradero}</td>
                  <td>{fila.cantidad_inicial}</td>
                  <td>{fila.cantidad_final}</td>
                  <td>{fila.merma}</td>
            
                </tr>
              ))}

<tr style={{color:'blue'}}>
          <td colSpan="6"><strong>Total:</strong></td>
          <td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.cantidad_inicial), 0)}</strong></td>
<td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.cantidad_final), 0)}</strong></td>
<td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.merma), 0)}</strong></td>
 </tr>
            </tbody>
          </table>
        </div>
      );
    }

    export default ROTHP;
