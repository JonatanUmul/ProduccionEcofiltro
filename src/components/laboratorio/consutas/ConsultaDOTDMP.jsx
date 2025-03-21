
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL

const ConsultaDTHP = ({OTDats,  id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);
// const [id]= OTDats.length>0?OTDats[0].id:''
console.log('id seleccionado', fila)
  useEffect(() => {
    axios.get(`${URL}/DOTDMP/${id || 'null'} `)
      .then((response) => {
        setFila(response.data.data); // Acceder a response.data.data
        console.log(response.data.data)
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, []);

 
  return (

   
    

   


 
 
   
   
     
        <>
        {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
        
       
        <div class="row">
        {error && <div>Error: {error}</div>}
        {fila.lbaserrin && fila.aserradero1 ?(
        <div class="col-sm-12 mb-4">
        <div class="card" >
        <div class="card-header">
          Aserrín
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Libras de aserrín: {fila.lbaserrin} {fila.lbaserrin2 ? `/${fila.lbaserrin2}`:''} </li>
          <li class="list-group-item">Aserradero: {fila.aserradero1} {fila.aserradero2 ? `/${fila.aserradero2}`:``}</li>
          <li class="list-group-item">Tipo Cernido: {fila.tipocernido1} {fila.tipocernido2 ? `/${fila.tipocernido2}`:``}</li>
          <li class="list-group-item">≥ 2.00 mm:        <strong style={{ color: "red" }}>{fila.mayor_2mm}%</strong> </li>
          <li class="list-group-item">2.00 mm - 0.50 mm: <strong style={{ color: "red" }}>{fila.entre_2_y_05mm}%</strong></li>
          <li className="list-group-item">
  &lt; 0.5 mm: <strong style={{ color: "red" }}>{fila.menor_05mm}%</strong>
</li>
        </ul>
      </div>
      </div>):<p>Sin datos de aserrín</p>}
      {fila.lbbarro && fila.carcilla ?(
        <div class="col-sm-12 ">
      <div class="card" >
        <div class="card-header">
          Barro
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Lb Barro: {fila.lbbarro ? fila.lbbarro:''} </li>
        <li class="list-group-item">Cantidad Arcilla: {fila.carcilla ? fila.carcilla:''}</li>
        <li class="list-group-item">Cantidad Limo: {fila.climo ? fila.climo:''}</li>
          <li class="list-group-item">Cantidad Arena:{fila.carena ? fila.carena:''}</li>
          <li class="list-group-item">Cantidad Humedad Barro: {fila.iplastico ? fila.iplastico:''}</li>


          </ul>
      </div>
      </div>
      ):<p>Sin datos de Barro</p>}
      
      </div>
    ))}
      </>
    
    



    
  );
};

export default ConsultaDTHP;
