    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../utilidades/FormatearFecta";
    import PdfROTPV from './pdfECO/PdfROTPV'
    import ExcelRotpv from './Excel/ExcelRotpv'
    import { Divider } from 'antd';

    const URL = process.env.REACT_APP_URL


    const ROTHP = () => {
      const [datos, setDatos] = useState([]);
      const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
      const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));

      const limpiarInputs = () => {
        setFecha('');
        setFecha2('');
    
      };
      
      // Solicitud GET desde React
      useEffect(() => {
        // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
        const url = `${URL}/DTPV/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}`;

        axios.get(url)
          .then((response) => {
            setDatos(response.data);
            console.log('datos consulta', response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los datos:', error);
          });
      }, [fecha_creacion_inicio, fecha_creacion_fin]);

     

      return (
        <div className="row mb-3">
        <Divider style={{ color: '#1d39c4'}}>Pulverizado</Divider>

        <div className="row mb-3">
        <div className="col-md-3">
        <label htmlFor="fecha" className="form-label">Fecha 1 </label>
        <input className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
      </div>
      <div className="col-md-3">
        <label htmlFor="fecha" className="form-label">Fecha 2</label>
        <input className="form-control" type="date" value={fecha_creacion_fin} onChange={(e) => setFecha(e.target.value)} />
      </div>
      <div className="col-md-3 d-flex align-items-end">
        <button className="btn btn-primary ms-2" onClick={limpiarInputs}>Limpiar</button>
      </div>
      <div className="col-md-3 d-flex align-items-end">
  
      <ExcelRotpv datos={datos}/>
      <PdfROTPV datos={datos}/>
      </div>


    </div>

          <table className="table text-center">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha</th>
                <th scope="col">Lote</th>
                <th scope="col">Hora</th>
                <th scope="col">Sacos</th>
                <th scope="col">Total libras</th>
                <th scope="col">Humedad</th>
           

              </tr>
            </thead>
            <tbody>
              {Array.isArray(datos) && datos.map((fila, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{formatFecha(fila.fecha_creacion) }</td>
                  <td>{fila.codigo_lote}</td>
                  <td>{fila.hora_creacion}</td>
                  <td>{fila.cantidad}</td>
                  <td>{fila.libras_tot}</td>
                  
                  <td>{fila.humedad} %</td>
               
                </tr>
              ))}
              <tr>
          <td colSpan="4"><strong>Total:</strong></td>
          <td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.sacos), 0)}</strong></td>
                    <td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.libras_tot), 0)}lb</strong></td>
          {/*<td><strong>{(datos.reduce((total, fila) => total + parseFloat(fila.libras_tot), 0) / datos.length).toFixed(1)}%</strong></td>*/}
          </tr>
            </tbody>
          </table>
        </div>
      );
    }

    export default ROTHP;
