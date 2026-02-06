    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../utilidades/FormatearFecta.js";
    import Pdf_LOTES_ASERRIN from './pdfECO/Pdf_LOTES_ASERRIN.jsx'
    import ExcelLoteBarroAserrin from './Excel/ExcelLoteBarroAserrin.jsx'
    import { Divider } from 'antd';

    const URL = process.env.REACT_APP_URL


    const ROTHP = () => {
      const [datos, setDatos] = useState([]);
      const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
      const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
      const [id_aserradero, setIdAserradero] = useState('');
      const [paginaActual, setPaginaActual] = useState(1);
      const filasPorPagina = 5; 

      const totalPaginas = Math.ceil(datos.length / filasPorPagina);
const indexInicio = (paginaActual - 1) * filasPorPagina;
const indexFin = indexInicio + filasPorPagina;
const datosPaginados = datos.slice(indexInicio, indexFin);

console.log('lkjhgfdssdfghj',datos)
      const limpiarInputs = () => {
        setFecha('');
        setFecha2('');
    
      };
      
      // Solicitud GET desde React
      useEffect(() => {
        // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
        const url = `${URL}/Reporte_lote_Aserrin/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}`;
        console.log('entro aca,,,',url)
        axios.get(url)
          .then((response) => {
            setDatos(response.data);
           
          })
          .catch((error) => {
            console.error('Error al obtener los datos:', error);
          });
      }, [fecha_creacion_inicio, fecha_creacion_fin, id_aserradero]);


      return (
        <div className="row mb-3">
        <Divider style={{ color: '#1d39c4'}}>Lotes Aserrín</Divider>

        <div className="row mb-3">
        <div className="col-md-3">
        <label htmlFor="fecha" className="form-label">Fecha 1 </label>
        <input className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
      </div>
      <div className="col-md-3">
        <label htmlFor="fecha" className="form-label">Fecha 2</label>
        <input className="form-control" type="date" value={fecha_creacion_fin} onChange={(e) => setFecha2(e.target.value)} />
      </div>
   
      <div className="col-md-3 d-flex align-items-end">
        <button className="btn btn-primary ms-2" onClick={limpiarInputs}>Limpiar</button>
      </div>
      <div className="col-md-3 d-flex align-items-end">
   
      <ExcelLoteBarroAserrin lote='aserrin' datos={datos}/>
      <Pdf_LOTES_ASERRIN datos={datos}/>
      </div>


    </div>
          <table pagination={{ pageSize: 20 }} className="table text-center">
            <thead class="thead-dark">
              <tr>
              <th scope="col">#</th>
              <th scope="col">Fecha</th>
              <th scope="col">Lote</th>
              <th scope="col">Aserr.</th>
              <th scope="col">Lote Mezcla</th>
              <th scope="col">&gt; 2 mm</th>
              <th scope="col">2–0.5 mm</th> 
              <th scope="col">&lt; 0.5 mm</th>
              {/*<th scope="col">Sacos</th>*/}
              <th scope="col">OT Mezcla</th>
              {/*<th scope="col">Estado</th>*/}
              <th scope="col">Lb Mezcla</th>
              <th scope="col">OT Fórmula</th>
              <th scope="col">Tot. Fórm.</th>
              <th scope="col">Peso Fórm.</th>
              <th scope="col">Humedad</th>
              <th scope="col">T. Mezcla</th>
              <th scope="col">UF Prod.</th>
              <th scope="col">Fórm. Prod.</th>
              </tr>
            </thead>

            <tbody >
              {Array.isArray(datosPaginados) && datosPaginados.map((fila, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{formatFecha(fila.fecha) }</td>
                  <td>{fila.codigo_lote}</td>
                  <td>{fila.nombre_aserradero}</td>
                  <td>{fila.om_correlativo}</td>
                  <td>{fila.mayor_2mm}</td>
                  <td>{fila.entre_2_y_05mm}</td>
                  <td>{fila.menor_05mm}</td>
                  {/*<td>{fila.sacos}</td>*/}
                  <td>{fila.aprobado}</td>
                  <td>{fila.libras_aserrin} lb</td>
                  <td>{fila.afm_correlativo}</td>
                  <td>{fila.dfm_cantidad}</td>
                  <td>{fila.dfm_peso} lb</td>
                  <td>{fila.dfm_humedad}%</td>
                  <td>{fila.tiempo_mezclado}</td>
                  <td>{fila.producido}</td>
                  <td>{fila.formulas_usadas}</td>
                </tr>
              ))}
     {/**         <tr>
          <td colSpan="4"><strong>Total:</strong></td>
          <td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.cantidad_inicial), 0)}</strong></td>
<td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.cernido_fino), 0)}</strong></td>
<td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.cernido_grueso), 0)}</strong></td>
<td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.merma), 0)}</strong></td>

</tr>
 */}
            </tbody>  
   
          </table>

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

    export default ROTHP;
