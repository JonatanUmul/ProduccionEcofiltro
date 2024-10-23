    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../utilidades/FormatearFecta";
    import PdfROTCA1 from './pdfECO/PdfROTCA1.jsx'
    import ExcelROTCA1 from './Excel/ExcelRoca1.jsx'
    import { Divider } from 'antd';

    const URL = process.env.REACT_APP_URL

    const ROTHP = () => {
      const [datos, setDatos] = useState([]);
      const [aserradero, setAserradero] = useState([]);
      const [materiaPrim, setMatPrim] = useState([]);
      const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
      const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
      const [id_aserradero, setIdAserradero] = useState('');
  

      const limpiarInputs = () => {
        setFecha('');
        setFecha2('');
        setIdAserradero('');
    
      };
      
      // Solicitud GET desde React
      useEffect(() => {
        // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
        const url = `${URL}/DTCA1/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${id_aserradero || 'null'}`;

        axios.get(url)
          .then((response) => {
            setDatos(response.data);
            console.log('datos consulta', response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los datos:', error);
          });
      }, [fecha_creacion_inicio,fecha_creacion_fin, id_aserradero]);
console.log('datos', datos)
      // Realizar las solicitudes para obtener datos
      useEffect(() => {
        axios.all([
          axios.get(`${URL}/Aserradero`),
          axios.get(`${URL}/MateriaPrima`),
       
        ])
        .then(axios.spread((aserraderoResponse, materiaPrimResponse, ) => {
          setAserradero(aserraderoResponse.data);
          setMatPrim(materiaPrimResponse.data);
        
        }))
        .catch((error) => {
          console.error('Error al obtener los datos:', error);
        });
      }, []);

      return (
        <div className="row mb-3">
        <Divider style={{ color: '#1d39c4'}}>Cernido 1</Divider>

        <div className="row mb-3">
      <div className="col-md-3">
        <label htmlFor="fecha" className="form-label">Fecha 1 </label>
        <input className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
      </div>
      <div className="col-md-3">
        <label htmlFor="fecha" className="form-label">Fecha 2</label>
        <input className="form-control" type="date" value={fecha_creacion_fin} onChange={(e) => setFecha2(e.target.value)} />
      </div>
      <div className="col-md-3">
        <label htmlFor="aserradero" className="form-label">Aserradero:</label>
        <select className="form-select" name="id_aserradero" value={id_aserradero} onChange={(e) => setIdAserradero(e.target.value)}>
        <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(aserradero.rows) && aserradero.rows.map((item) => (
            <option key={item.id} value={item.id}>{item.nombre_aserradero}</option>
          ))}
        </select>
      </div>
   
      <div className="col-md-3 d-flex align-items-end">
        <button className="btn btn-primary ms-2" onClick={limpiarInputs}>Limpiar</button>
      </div>
      <div className="col-md-3 d-flex align-items-end">
     
      <ExcelROTCA1 datos={datos}/>
<PdfROTCA1 datos={datos}/>
      </div>


    </div>

          <table className="table text-center">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
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
                  <td>{formatFecha(fila.fecha_creacion) }</td>
                  <td>{fila.hora_creacion}</td>
                  <td>{fila.aserradero}</td>
                  
                  <td>{fila.CantidadInicial}</td>
                  <td>{fila.CantidadFinal}</td>
                  <td>{fila.merma}</td>
            
                </tr>
              ))}
              <tr>
          <td colSpan="4"><strong>Total:</strong></td>
          <td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.CantidadInicial), 0)}</strong></td>
<td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.CantidadFinal), 0)}</strong></td>
<td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.merma), 0)}</strong></td>
 </tr>
            </tbody>
          </table>
        </div>
      );
    }

    export default ROTHP;
