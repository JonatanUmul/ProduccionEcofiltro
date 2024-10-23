    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../../utilidades/FormatearFecta";
    import PdfROTHP from '../pdfECO/PdfROTHP'
   

    import ExcelROTHP from '../Excel/ExcelRothp'
    const URL = process.env.REACT_APP_URL

   
    const ROTHP = ({patio,fechaSecado, id_patio,cantidad_inicial,cantidad_final, merma, FirmaJefe, NombreJefe}) => {
      const [datos, setDatos] = useState([]);
      const [aserradero, setAserradero] = useState('');
      const [matPrim, setMatPrim] = useState('');

      const [fecha_creacion_inicio, setFecha] = useState(fechaSecado);
      const [fecha_creacion_fin, setFecha2] = useState(fechaSecado);
      const [id_asrd, setIdAserradero] = useState('');
      const [id_enc, setIDEnc] = useState('');
      const [idpatio, setIdPatio] = useState(id_patio);
      // const fechaActual = new Date();
      // const fechaformateada=formatFecha(fechaActual)
      // const formatearFecha = () => {
      //  setFecha(fechaformateada)
      // };

     
console.log('FEcha Humedad patios',fechaSecado,idpatio)
      // Solicitud GET desde React
      useEffect(() => {
        // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
        const url = `${URL}/DTHP/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${id_asrd || 'null'}/${idpatio || 'null'}/${id_enc || 'null'}`;

        axios.get(url)
          .then((response) => {
            setDatos(response.data);
            console.log('datos consulta', response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los datos:', error);
          });
      }, [fecha_creacion_inicio, fecha_creacion_fin, id_asrd, idpatio, id_enc]);

    console.log('Datosss', patio,fechaSecado, id_patio,cantidad_inicial,cantidad_final, merma)

   
      console.log('datos',datos)
      return (
        <div className="row mb-3">
        <div className="row mb-3">
        <div className="row mb-3">
        <div className="col-md-6">
          <strong>
            <div className=" shadow-sm bg-light">
           
              <div className="datos card-body">
                <h5 className="card-title">Datos:</h5>
              
                <ul className="list-group list-group-horizontal" >
                  <li className="list-group-item">Fecha: {fechaSecado}</li>
                  <li className="list-group-item">Patio: {patio}</li>
                  <li className="list-group-item">C. Inicial: {cantidad_inicial}</li>
                  <li className="list-group-item">C. Final: {cantidad_final}</li>
                  <li className="list-group-item">Merma: {merma}</li>
        
                </ul>
                <div className="col-md-3 d-flex align-items-center justify-content-center">
                <ExcelROTHP 
                datos={datos} 
                fechaSecado={fechaSecado}
                patio={patio}
                cantidad_inicial={cantidad_inicial}
                cantidad_final={cantidad_final}
                merma={merma}
                 />
                 <PdfROTHP datos={datos} patio={patio} fechaSecado={fechaSecado} cantidad_final={cantidad_final} FirmaJefe={FirmaJefe} NombreJefe={NombreJefe} />
               

              </div>
              </div>
            </div>
          </strong>
        </div>
      </div>
    
 

    </div>

          <table className="table text-center">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha1</th>
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
