import React, { useState, useEffect } from 'react';
import { formatFecha } from "../utilidades/FormatearFecta.js";
import axios from 'axios';

const URL = process.env.REACT_APP_URL;

const ReporteGeneralDiario = () => {
  const [secadoAserrin, setSecadoAserrin] = useState([]);
  const [produccion, setProduccion] = useState([]);
  const [fecha_creacion_inicio, setFechaCreacionInicio] = useState(formatFecha(new Date()));
  const [horneado, setHorneado]=useState([])
  const [ccalidad, setCCaliudad]=useState([])
  const [ipregnacion, setImpregnaion]=useState([])
  const fecha_creacion_fin = fecha_creacion_inicio
  const fecha_CC=fecha_creacion_inicio

  useEffect(() => {
    axios.all([
      axios.get(`${URL}/DASERRIN/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${ 'null'}/${ 'null'}`),
      axios.get(`${URL}/DTP/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${'null'}/${'null'}`),
      axios.get(`${URL}/DTHH/${fecha_creacion_inicio||  'null'}/${fecha_creacion_fin|| 'null'}/${ 'null'}/${ 'null'}/${ 'null'}/${ 'null'}/${'null'}`),
      axios.get(`${URL}/DTHH/${'null'}/${ 'null'}/${ 'null'}/${ 'null'}/${ 'null'}/${ 'null'}/${fecha_CC || 'null'}`),
      axios.get(`${URL}/DTIP/${fecha_creacion_inicio ||  'null'}/${fecha_creacion_fin|| 'null'}`)
    ])
    .then(axios.spread((secadoaserrinResponse, produccionResponse, horneadosResponse, responseCC, responseImpregnados) => {
      setSecadoAserrin(secadoaserrinResponse.data);
      setProduccion(produccionResponse.data);
      setHorneado(horneadosResponse.data.data);
      setCCaliudad(responseCC.data.data);
      setImpregnaion(responseImpregnados.data)
    }))
    .catch((error) => {
      console.error('Error al obtener los datos:', error);
    });
  }, [fecha_creacion_inicio, fecha_creacion_fin]);

  const handleFechaInicioChange = (e) => {
    setFechaCreacionInicio(e.target.value);
  };
  // const handleFechaFinChange = (e) => {
  //   setFechaCreacionFin(e.target.value);
  // };

  return (
    <div className="">
      
      <div className="col-md-3 mb-5">
        <input
          className="form-control"
          type="date"
          value={fecha_creacion_inicio}
          onChange={handleFechaInicioChange}
        />
      {/*  <input
          className="form-control"
          type="date"
          value={fecha_creacion_fin}
          onChange={handleFechaFinChange}
        /> */}
      </div>
      <div className="row">
      <div className="col">
      <h4>Secado de Aserrín</h4>
      {secadoAserrin.length>0?(
        <table style={{border:0.5, textAlign:'center'}} class="table table-bordered">
      <thead>
      <tr>
      <td ></td>
      <td ><strong> Inicial</strong></td>
      <td ><strong> Final</strong></td>
      <td ><strong> Merma</strong></td>
      </tr>
      </thead>
      <tbody>
        {Array.isArray(secadoAserrin) && secadoAserrin.map((secadoAserrin, index) => (
          <tr key={index}>
          <th>{index+1})</th>

            <td>{secadoAserrin.cantidad_inicial}</td>
            <td>{secadoAserrin.cantidad_final}</td>
            <td>{secadoAserrin.merma}</td>

            </tr>
        ))}
        <td colSpan="1"><strong>Total:</strong></td>
        <td><strong>{secadoAserrin.reduce((total, secadoAserrin) => total + parseFloat(secadoAserrin.cantidad_inicial), 0)}</strong></td>
        <td><strong>{secadoAserrin.reduce((total, secadoAserrin) => total + parseFloat(secadoAserrin.cantidad_final), 0)}</strong></td>
        <td><strong>{secadoAserrin.reduce((total, secadoAserrin) => total + parseFloat(secadoAserrin.merma), 0)}</strong></td>
      </tbody>
    </table>
      ):(<p style={{textAlign:'center'}} >Sin Datos</p>)}
      
    
    </div>
        <div className="col">
          <h4>Producción</h4>
          <table style={{border:0.5, textAlign:'center'}} class="table table-bordered">
          <tbody>
            {Array.isArray(produccion) && produccion.map((prod, index) => (
              <tr key={index}>
                <th>{index+1})</th>
                
                
                <td>{prod.nombre_turno}</td>
                <td>{prod.nombre_ufmodelo}</td>
                <td>{prod.codigoInicio}</td>
                <td>{prod.codigoFinal}</td>
                <td>{prod.producido}</td>
               
              </tr>
              
            ))}
            {produccion.length>0?(
              <>
              <td colSpan="5"><strong>Total:</strong></td>
            <td><strong>{produccion.reduce((total, prod) => total + parseFloat(prod.producido), 0)}</strong></td>
  </>

            ):(<p>Sin Datos</p>)}
            
          </tbody>
        </table>
        
        </div>
        <div className="col">
        <h4>Formulación</h4>
        <table style={{border:0.5, textAlign:'center'}} class="table table-bordered">
        <tbody>
          {Array.isArray(produccion) && produccion.map((prod, index) => (
            <tr key={index}>
            <th>{index+1})</th>
              <td>{prod.aserradero1}/{prod.aserradero2}</td>
              <td>{prod.librasAserrin}/{prod.librasAserrin2}</td>
            </tr>
            
          ))}
     
        </tbody>
      </table>
      
      </div>
      </div>

      <div className="row">
      <div className="col">
      <h4>Horneados</h4>
      <table style={{border:0.5, textAlign:'center'}} class="table table-bordered">
      
      {horneado.length>0?(
        <thead class="thead-light">
      <>
       <tr>
        <td></td>
      <td>Horno</td>
      <td>Turno</td>
      <td>Modelo</td>
      <td>Inicio</td>
      <td>Fin</td>
      <td>Horneado</td>
      <td>Hornero</td>
      <td>%</td>
      </tr>
      </>
      
      </thead>
      ):(<p>Sin Datos</p>)}
      
      <tbody>
        {Array.isArray(horneado) && horneado.map((horneado, index) => (
          <tr key={index}>
          <th>{index+1})</th>
          <td>{horneado.Horno}</td>
          <td>{horneado.turnoHorneado}</td>
            <td>{horneado.ModeloEco}</td>
            <td>{horneado.codigoInicio}</td>
            <td>{horneado.codigoFin}</td>
            <td>{horneado.horneado}</td>
            <td>{horneado.Hornero}</td>
            <td>{horneado.porcentaje}</td>
            </tr>
        ))}
      </tbody>
      {horneado.length>0?(
        <>
        <td colSpan="6"><strong>Total:</strong></td>
        <td><strong>{horneado.reduce((total, horneado) => total + parseFloat(horneado.horneado), 0)}</strong></td>
  </>
      ):''}
    
    </table>
    
    </div>

    <div className="col">
    <h4>Control de calidad</h4>
    <table style={{border:0.5, textAlign:'center'}} class="table table-bordered">
       
    {ccalidad.length>0?(
      <thead class="thead-dark">
      
      <>
      <tr>
      <td></td>
    <td scope="col">Horno</td>
    <td scope="col">Modelo</td>
    <td scope="col">Aprobados</td>
    <td scope="col">altos</td>
    <td scope="col">Bajos</td>
    <td scope="col">R.C.C</td>
    <td scope="col">Crudo CC</td>
    <td scope="col">Quemados</td>
    <td scope="col">Ahumados</td>
    <td scope="col">R.hornos</td>
    <td scope="col">%</td>
    </tr>
    </>

    </thead>
    ):(<p>Sin Datos</p>)}
 <tbody>   
    {Array.isArray(ccalidad) && ccalidad.map((ccalidad, index) => (
 
        <tr key={index}>
        <th>{index+1})</th>
        <td>{ccalidad.Horno}</td>
        <td>{ccalidad.ModeloEco}</td>
          <td>{ccalidad.aprobados}</td>
          <td>{ccalidad.altos}</td>
          <td>{ccalidad.bajos}</td>
          <td>{ccalidad.rajadosCC}</td>
          <td>{ccalidad.crudoCC}</td>
          <td>{ccalidad.quemados}</td>
          <td>{ccalidad.ahumados}</td>
          <td>{ccalidad.mermas_hornos}</td>
          <td>{ccalidad.porcentaje}</td>
      
          </tr>
        ))}    
    </tbody>
    {ccalidad.length>0?(
      <>
      <td colSpan="3"><strong>Total:</strong></td>
      <td><strong>{ccalidad.reduce((total, ccalidad) => total + parseFloat(ccalidad.aprobados), 0)}</strong></td>
      <td><strong>{ccalidad.reduce((total, ccalidad) => total + parseFloat(ccalidad.altos), 0)}</strong></td>
      <td><strong>{ccalidad.reduce((total, ccalidad) => total + parseFloat(ccalidad.bajos), 0)}</strong></td>
      <td><strong>{ccalidad.reduce((total, ccalidad) => total + parseFloat(ccalidad.rajadosCC), 0)}</strong></td>
      <td><strong>{ccalidad.reduce((total, ccalidad) => total + parseFloat(ccalidad.crudoCC), 0)}</strong></td>
      <td><strong>{ccalidad.reduce((total, ccalidad) => total + parseFloat(ccalidad.quemados), 0)}</strong></td>
      <td><strong>{ccalidad.reduce((total, ccalidad) => total + parseFloat(ccalidad.ahumados), 0)}</strong></td>
      <td><strong>{ccalidad.reduce((total, ccalidad) => total + parseFloat(ccalidad.mermas_hornos), 0)}</strong></td>
  </>
    ):''}

    </table>
  
  </div>

  <div className="col">
  <h4>Impregnación</h4>
  <table style={{border:0.5, textAlign:'center'}} class="table table-bordered">
  
  {ipregnacion.length>0?(
    <thead class="thead-dark">
    <>
    <tr>
    <td scope="col"></td>
    <td scope="col">Inicio</td>
    <td scope="col">Fin</td>
    <td scope="col">Impregnados</td>
    <td scope="col">Mermas</td>
    <td scope="col">TipoPLata</td>
    <td scope="col">Modelo</td>
    </tr>
  </>
  </thead>
  
  ):(<p>Sin Datos</p>)}
  <tbody>
    {Array.isArray(ipregnacion) && ipregnacion.map((ipregnacion, index) => (
      <tr key={index}>
      <th>{index+1})</th>
      <td>{ipregnacion.codigoInicio}</td>
      <td>{ipregnacion.codigoFinal}</td>
        <td>{ipregnacion.impregnados}</td>
        <td>{ipregnacion.mermas}</td>
        <td>{ipregnacion.TipoPlata}</td>
        <td>{ipregnacion.modelo}</td>
    
        </tr>
    ))}
  </tbody>
  {ipregnacion.length>0?(
    <tr>
  <td colSpan='3' scope="col"><strong>Total</strong></td>
  <td scope="col"><strong>{ipregnacion.reduce((total, impregnacion)=>total+parseFloat(impregnacion.impregnados),0)}</strong></td>
  <td scope="col"><strong>{ipregnacion.reduce((total, impregnacion)=>total+parseFloat(impregnacion.mermas),0)}</strong></td>

  </tr>
  ):''}
  
  </table>

</div>
      </div>
    </div>
  );
};

export default ReporteGeneralDiario;
