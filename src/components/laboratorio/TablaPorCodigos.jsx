import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { formatFecha } from "../utilidades/FormatearFecta.js";
// import PdfROTCA1 from './pdfECO/PdfROTCA1.jsx'
import ExcelROTCA1 from './Excel/ExcelPorCodigoscopy.jsx'
import ExcelROTCA2 from './Excel/ExcelPorCodigos.jsx'
import { Alert, Flex, Spin } from 'antd';
import ReactPaginate from 'react-paginate';
import Detalle from '../reporteS/ControlProcesos/detalles/RedireccionDetalle_ROTT.jsx'
import Lottie from 'lottie-react';
import loadingAnimation from '../../loading.json'
// import loadingAnimation from './path/to/loading.json'; // archivo Lottie
const URL = process.env.REACT_APP_URL
const nombretabla='ROTHTablaxCodigos'
const ROTHP = () => {
  const [datos, setDatos] = useState([]);
  const [aserradero, setAserradero] = useState([]);
  const [materiaPrim, setMatPrim] = useState([]);
  const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
  const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
  const [id_aserradero, setIdAserradero] = useState('');
  const [codigos, setCodigos]=useState('')
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
const [mouseover, setmouseover]=useState(false)
const [modelo, setmodelo]=useState([])
const [id_modelo, setId_modelo]=useState('')
const [cargando, setCargando]=useState(false)
const [estadoSelect, setestadoSelect]=useState(false)
    const codigo=codigos.toUpperCase()

console.log('Datos',datos)
  const limpiarInputs = () => {
    setFecha(formatFecha(new Date()));
    setFecha2(formatFecha(new Date()));
    setIdAserradero('');
    setCodigos('')
    setestadoSelect(false)
    setDatos([])
    setId_modelo('')
  };
  console.log(fecha_creacion_inicio, fecha_creacion_fin)
  // Solicitud GET desde React


  useEffect(() => {
    const cargarDatosIniciales = async () => {
      setCargando(true);
      try {
        const url =` ${URL}/TablaPorCodigos/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${codigo || 'null'}/${ 'null'}/${id_modelo || 'null'}`;
        await axios.get(url)
          .then((response) => {
            setDatos(response.data);
            console.log('datos consulta', response.data);
          })
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }finally{
        setCargando(false);
      }
    }

    cargarDatosIniciales()
   
   }, [fecha_creacion_inicio,fecha_creacion_fin, id_aserradero,codigo,id_modelo]);


  // Realizar las solicitudes para obtener datos
  useEffect(() => {
    axios.all([
      axios.get(`${URL}/Aserradero`),
      axios.get(`${URL}/MateriaPrima`),
      axios.get(`${URL}/ModelosUF`)
   
    ])
    .then(axios.spread((aserraderoResponse, materiaPrimResponse, modeloResponse) => {
      setAserradero(aserraderoResponse.data);
      setMatPrim(materiaPrimResponse.data);
      setmodelo(modeloResponse.data)
    }))
    .catch((error) => {
      console.error('Error al obtener los datos:', error);
    });
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };


  const offset = currentPage * itemsPerPage;
  const currentPageData = datos.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(datos.length / itemsPerPage);

  const[produccion, setProduccion]=useState(0) 
  const [aprobados, setAprobados]=useState(0)
  const[altos, setAltos]=useState(0)
  const[Bajos, setBajos]=useState(0)
  const[rajado, SetRajado]=useState(0)
  const[ahumado,setAhumado]=useState(0)
  const[porcentageAprobado, setPorcentageAprobados]=useState(0)
  const[rajadoCrudo, SetRajadoCrudo]=useState(0)
  
  useEffect(()=>{
    setProduccion(datos.filter(dato=> dato.estadouf).length);    
    setAprobados(datos.filter(dato=> dato.estadouf === 'OK').length);
    setBajos(datos.filter(dato=> dato.estadouf === 'Bajo').length);
    setAltos(datos.filter(dato=> dato.estadouf === 'Alto').length);
    SetRajado(datos.filter(dato=> dato.estadouf === 'Rajado').length);    
    setAhumado(datos.filter(dato=> dato.estadouf === 'Ahumado').length);
    SetRajadoCrudo(datos.filter(dato=> dato.estadoCrudo === 'Rajado').length);
    setPorcentageAprobados((aprobados/produccion)*100)
  })
console.log(aprobados)

const handleMouseOver=(index)=>{
  setmouseover(index)
}
const handleMouseOut=()=>{
  setmouseover(false)
}

const BuscarCodigo=(e)=>{
  
  setFecha('')
  setFecha2('')
  setId_modelo('')
  setestadoSelect(true)
  setCodigos(e.target.value)


}


const contentStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw', // Ocupa toda la anchura de la pantalla
  height: '100vh', // Ocupa toda la altura de la pantalla
  // backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fondo ligero para mejorar la visibilidad
  position: 'fixed', // Para asegurar que se mantenga fijo mientras se carga
  top: 0,
  left: 0,
};

const spinnerStyle = {
  width: '50vmin', // Hace que el tamaño de la animación se ajuste a la pantalla
  height: '50vmin',
};

const content = (
  <div style={contentStyle}>
    <Lottie animationData={loadingAnimation} loop={true} style={spinnerStyle} />
  </div>
);
  return (
    <div className="row mb-3">
{/*    <Divider style={{ color: '#1d39c4'}}>Cernido 1</Divider> */}

    <div className="row mb-3">
  <div className="col-md-3">
    <label htmlFor="fecha" className="form-label">Fecha 1 </label>
    <input disabled={estadoSelect} className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
  </div>
  <div className="col-md-3">
    <label htmlFor="fecha" className="form-label">Fecha 2</label>
    <input disabled={estadoSelect} className="form-control" type="date" value={fecha_creacion_fin} onChange={(e) => setFecha2(e.target.value)} />
  </div>
  <div className="col-md-3">
  <label htmlFor="codigo" className="form-label">Código</label>
  <input className="form-control" type="text" value={codigos} onChange={BuscarCodigo}/>
</div>
<div className="col-md-3">
    <label htmlFor="aserradero" className="form-label">Modelo UF:</label>
    <select disabled={estadoSelect} className="form-select" name="id_aserradero" value={id_modelo} onChange={(e) => setId_modelo(e.target.value)}>
    <option value="" disabled selected>Seleccione...</option>
      {Array.isArray(modelo.rows) && modelo.rows.map((item) => (
        <option key={item.id} value={item.id_mod}>{item.nombre_modelo}</option>
      ))}
    </select>
  </div>
  {/* <div className="col-md-3">
    <label htmlFor="aserradero" className="form-label">Aserradero:</label>
    <select className="form-select" name="id_aserradero" value={id_aserradero} onChange={(e) => setIdAserradero(e.target.value)}>
    <option value="" disabled selected>Seleccione...</option>
      {Array.isArray(aserradero.rows) && aserradero.rows.map((item) => (
        <option key={item.id} value={item.id}>{item.nombre_aserradero}</option>
      ))}
    </select>
  </div> */}

  <div className="col-md-3 d-flex align-items-end">
    <button className="btn btn-primary ms-2" style={{width:'25%', marginTop:'5px'}} onClick={limpiarInputs}>Limpiar</button>
  </div>
{/* {datos.length>=0?(
  <div class="container text-center mt-3">
  <div class="row">
    <div class="col">
    Producido: {produccion}
    </div>
    <div class="col">
    Rajado Crudo: {rajadoCrudo}
    </div>
    <div class="col">
    Aprobados: {aprobados}
    </div>
    <div class="col">
    Bajos: {Bajos}
    </div>
    <div class="col">
    Altos: {altos}
    </div>
    <div class="col">
    Rajado C.c: {rajado}
    </div>
    <div class="col">
    Ahumado: {ahumado}
    </div>
  </div>
</div>
):''} */}
  
  {datos.length>0 ? 
  <div className="col-md-3 d-flex align-items-end">

  {/*<p>{(porcentageAprobado.toFixed(2))}</p> */}
 
   <ExcelROTCA1 datos={datos}/>
   <ExcelROTCA2 datos={datos}/>
 {/*<PdfROTCA1 datos={datos}/> */}
   </div>
   :''}
  
 


</div>

     
        
        {cargando ?
    
       <div>
       {content}
       </div>

   
      :
      <table className="table text-center">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Producción</th>
          <th scope="col">Control C.</th>
          <th scope="col">Formula</th>
          <th scope="col">Código</th>
          <th scope="col">Tipo de Filtro</th>
          <th scope="col">Proveedor</th>
          <th scope="col">Cantidad de aserrín</th>
          <th scope="col">Total</th>
          <th scope="col">Horno</th>
          <th scope="col">Estado</th>
          <th scope="col">Tasa</th>
          <th scope="col">Temperatura</th>
        </tr>
      </thead>
        <tbody>
      
        
          {Array.isArray(currentPageData) && currentPageData.map((fila, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{formatFecha(fila.fecha_produccion) }</td>
              <td>{formatFecha(fila.fechaCC)<='2000-12-31' ?'':formatFecha(fila.fechaCC)}</td>
              <td>{fila.formulaTipo}</td>
              <td>{fila.codigos}</td>
              <td>{fila.ufmodelo}</td>
              <td>{fila.aserradero_principal}/{fila.aserradero_secundario}</td>
     
              <td>{fila.librasAserrin}/{fila.librasAserrin2}</td>
              <td>{fila.formulatotal}</td>
              <td>{fila.horno}</td>
              <td>{fila.estadouf}</td>
              <td>{fila.tasa}</td>
              <td onMouseOver={()=>handleMouseOver(index)} onMouseOut={handleMouseOut}>
              {mouseover===index ? (<Detalle nombretabla={nombretabla} datos={datos} />):((fila.promedio))}</td>
            </tr>
          ))}


        </tbody>
      </table>
}
      {cargando  ? '':  <ReactPaginate
      previousLabel={'Anterior'}
      nextLabel={'Siguiente'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />}
    </div>
  );
}

export default ROTHP;