    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../utilidades/FormatearFecta";
    // import PdfROTHP from './pdfECO/PdfROTHH'
    import ExcelROTHP from './Excel/ExcelRothp'
    const URL = process.env.REACT_APP_URL


    const id_area=7;
    const ROTHP = () => {
      const [datos, setDatos] = useState([]);
      const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
      const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
      const [modeloUF, setModeloUf] = useState([]);
      const [pulidor, setPulidor] = useState([]);

      const [id_pulidor, setOpulidor]= useState('');
      const [ufmodelo, setUfmodelo]= useState('')
      console.log('Pulidor: ',id_pulidor, 'modelo', ufmodelo)
      // Realizar las solicitudes para obtener datos
      useEffect(() => {
        axios.all([
          axios.get(`${URL}/ModelosUF`),
          axios.get(`${URL}/Operarios/${id_area}`),
        
        ])
        .then(axios.spread((modeloufReponse, PulidorResponse) => {
          setModeloUf(modeloufReponse.data);
          setPulidor(PulidorResponse.data)
        
        }))
        .catch((error) => {
          console.error('Error al obtener los datos:', error);
        });
      }, []);
 

      useEffect(() => {
        // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
        const url = `${URL}/DCPB/${fecha_creacion_inicio  || 'null'}/${fecha_creacion_fin  || 'null'}/${ufmodelo  || 'null'}/${id_pulidor  || 'null'}`;

        axios.get(url)
          .then((response) => {
            setDatos(response.data);
            console.log('datos consulta', response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los datos:', error);
          });
      }, [fecha_creacion_inicio, fecha_creacion_fin, ufmodelo, id_pulidor]);
console.log('Datos12',datos)
      
      const limpiarInputs = () => {
        setOpulidor('');
        setUfmodelo('');
        setFecha('');
        setFecha2('')
        
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
    <select className="form-select" id="id_pulidor" value={id_pulidor} onChange={(e) => setOpulidor(e.target.value)}>
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
 {/*<PdfROTHP datos={datos}/>*/}     
      <ExcelROTHP datos={datos}/>
      </div>


    </div>

          <table className="table text-center">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha</th>
                <th scope="col">Pulidor</th>
                <th scope="col">Pulido</th>
                <th scope="col">Calificación</th>
          
              </tr>
            </thead>
            <tbody>
              {Array.isArray(datos) && datos.map((fila, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{formatFecha(fila.fecha_creacion) }</td>
                  <td>{fila.pulidor}</td>
                  <td>{fila.pulido}</td>
                  <td>{fila.calificacion}</td>
                  
                </tr>
              ))}

           
            </tbody>
          </table>
        </div>
      );
    }

    export default ROTHP;
