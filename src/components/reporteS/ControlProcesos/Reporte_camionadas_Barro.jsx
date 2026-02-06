    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../utilidades/FormatearFecta.js";
    import Pdf_LOTES_BARRO from './pdfECO/Pdf_LOTES_BARRO.jsx'
    import ExcelCamionadaBarro from './Excel/ExcelLoteBarroAserrin.jsx'
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
        const url = `${URL}/Reporte_camionadas_Barro/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}`;
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
        <Divider style={{ color: '#1d39c4'}}>Lotes Barro</Divider>

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
   
      <ExcelCamionadaBarro datos={datos}/>
      <Pdf_LOTES_BARRO datos={datos}/>
      </div>


    </div>
          <table pagination={{ pageSize: 20 }} className="table text-center">
            <thead class="thead-dark">
              <tr>
               <th scope="col">#</th>
<th scope="col">ID</th>
<th scope="col">Fecha</th>
<th scope="col">Lote</th>
<th scope="col">Estado</th>
<th scope="col">Humedad</th>
<th scope="col">Prod.</th>
<th scope="col">Lb Pulv.</th>
<th scope="col">Lb Barro</th>
<th scope="col">Residuo</th>
<th scope="col">Lím. Líq.</th>
<th scope="col">Lím. Plást.</th>
<th scope="col">Índ. Plást.</th>
<th scope="col">Arcilla</th>
<th scope="col">Arena</th>
<th scope="col">Limo</th>


              </tr>
            </thead>

            <tbody >
              {Array.isArray(datosPaginados) && datosPaginados.map((fila, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{fila.id_camionada }</td>
                  <td>{formatFecha(fila.fecha) }</td>
                  <td>{fila.codigo_lote}</td>
                  <td style={{color:fila.estado==2?"#008000":"#001d3d"}}>{fila.estado==2?'En Producción':'Cerrado'}</td>
                  <td>{fila.humedad}%</td>
                  <td>{fila.producido}</td>
                  <td>{fila.peso_total_libras} lb</td>
                  <td>{fila.total_lb_p_consumido} lb</td>
                  <td>{(fila.peso_total_libras)-(fila.total_lb_p_consumido)} lb</td>
                  <td>{fila.limite_liquido} %</td>
                  <td>{fila.limite_plastico} %</td>
                  <td>{fila.indice_plastico} %</td>
                  <td>{fila.arcilla} %</td>
                  <td>{fila.arena} %</td>
                  <td>{fila.limo} %</td>

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
