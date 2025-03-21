    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../utilidades/FormatearFecta";
    import PdfROTIP from './pdfECO/PdfROTIP'
    import ExcelROTHP from './Excel/ExcelRotP'
    import { Divider } from 'antd';
    import DatosProduccion from './consultas/DatosProducción'
    const URL = process.env.REACT_APP_URL
    
    const ROTHP = () => {
      const [datos, setDatos] = useState([]);
      console.log('De impregnaion',datos)
      // const [fecha_creacion_inicio, setFecha] = useState('2024/04/01');
      // const [fecha_creacion_fin, setFecha2] = useState('2024/04/29');
      const [modeloUF, setModelos] = useState([]);
      const [id_ufmodelo, setmodelosUF] = useState('');
      const [grupoProduccion, setGrupodetrabajo] = useState([]);
      const [id_grupoproduccion, setGrupoP]=useState('')
      const [turno, setTurno] = useState([]);
      const [turn, setTurn]=useState('')
      const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
      const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
     const [detalleProduccion, setDetalleProduccion]=useState(false)

      useEffect(() => {
        axios.all([
          axios.get(`${URL}/ModelosUF`),
          axios.get(`${URL}/GrupodeTrabajo`),
          axios.get(`${URL}/Turnos`),
        ])
        .then(axios.spread((ModelosufResponse, GrupodeTrabajoResponse, TurnosResponse) => {
          setModelos(ModelosufResponse.data)
          setGrupodetrabajo(GrupodeTrabajoResponse.data)
          setTurno(TurnosResponse.data);
        }))
        .catch((error) => {
          console.error('Error al obtener los datos:', error);
        });
      }, []);


      const limpiarInputs = () => {
       
        setmodelosUF('');
        setGrupoP('');
        setFecha(formatFecha(new Date()))
        setFecha2(formatFecha(new Date()))
      };
   
      useEffect(() => {
        // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos

       const url=`${URL}/DTIP/${fecha_creacion_inicio|| 'null'}/${fecha_creacion_fin|| 'null'}/${id_ufmodelo || 'null'}}`;


        axios.get(url).then((response) => {
            setDatos(response.data);
                })
          .catch((error) => {
     
          });
      }, [ fecha_creacion_inicio,fecha_creacion_fin, id_ufmodelo]);

      const Mouseevent=(index)=>{
        setDetalleProduccion(index)
      }
      const MouseeventOt=()=>{
        setDetalleProduccion(false)
        
      }
  
      return (
        <div className="row mb-3">
        <Divider style={{ color: '#1d39c4'}}>Impregnación</Divider>

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
      <label htmlFor="modelo"  className="form-label">Modelo:</label>
      <select className="form-select" name="UFmodelo" value={id_ufmodelo}  onChange={(e) => setmodelosUF(e.target.value)}>
      <option value="" disabled selected>Seleccione...</option>
        {Array.isArray(modeloUF.rows) && modeloUF.rows.map((item) => (
          <option key={item.id_mod} value={item.id_mod}>{item.nombre_modelo}</option>
        ))}
      </select>
    </div>

      <div className="col-md-3 d-flex align-items-end">
        <button className="btn btn-primary ms-2" onClick={limpiarInputs}>Limpiar</button>
      </div>

      
    

      <div className="col-md-3 d-flex align-items-end">
     
      <ExcelROTHP datos={datos}/>
      <PdfROTIP datos={datos}/>
      </div>


    </div>

          <table className="table text-center">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">id</th>
                <th scope="col">Fecha</th>
                <th scope="col">Modelo</th>
                <th scope="col">Impregnados</th>
                <th scope="col">C.Inicio</th>
                <th scope="col">C.Fin</th>
                <th scope="col">Tipo Plata</th>   
           
              </tr>
            </thead>
            <tbody>
              {Array.isArray(datos) && datos.map((fila, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th> 
                  <td className={detalleProduccion===index?'text-light bg-dark':''} role={detalleProduccion===index?'alert':''}>{fila.id}</td>
                  <td>{(formatFecha(fila.fechaCreacion))}</td>
                  <td className={detalleProduccion===index?'text-light bg-dark':''} role={detalleProduccion===index?'alert':''}>{fila.modelo}</td>
                  <td className={detalleProduccion===index?'text-light bg-dark':''} role={detalleProduccion===index?'alert':''}>{fila.impregnados}</td>
                  <td className={detalleProduccion===index?'text-light bg-dark':''} role={detalleProduccion===index?'alert':''}>{fila.codigoInicio}</td>
                  <td className={detalleProduccion===index?'text-light bg-dark':''} role={detalleProduccion===index?'alert':''}>{fila.codigoFinal}</td>
                  <td className={detalleProduccion===index?'text-light bg-dark':''} role={detalleProduccion===index?'alert':''}>{fila.TipoPlata}</td>
                  
                  
               
                </tr>
              ))}
              <tr>
              <td colSpan="4"><strong>Total:</strong></td>
              <td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.impregnados), 0)}</strong></td>
    
     </tr>
            </tbody>
          </table>
        </div>
      );
    }

    export default ROTHP;
