import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { use } from 'react';
import { TbArrowRightRhombusFilled } from 'react-icons/tb';

const GestionHorasLaborales = () => {
    const URL = process.env.REACT_APP_URL;
    const [horasLaborales, setHorasLaborales]=useState([]);
    const [diasLaborales, setDiasLaborales]=useState([])
console.log('Prueba de horas laborales',horasLaborales, diasLaborales)

    // useEffect(()=>{
    //     const fetch=async()=>{
    //         try {
            
    //             const URLS = `${URL}/GestionDiasLaborales`;
    //            await axios.get(URLS)
    //             .then(response=>{setHorasLaborales(response.data.rows)}
                    
    //             )
    //         } catch (error) {
    //             console.log('error al hacer axios',error)
    //         }
    //     }
       
    //    fetch()
    // },[URL])

    useEffect(() => {
      const fetch = async () => {
        try {
          const URL1 = `${URL}/GestionHorasLaborales`;
          const URL2 = `${URL}/GestionDiasLaborales`;
          
    
          const [respuesta1, respuesta2] = await Promise.all([
            axios.get(URL1),
            axios.get(URL2)
          ]);
          setHorasLaborales(respuesta1.data.rows);
          setDiasLaborales(respuesta2.data.rows);
          
        } catch (error) {
          console.error("Error al consultar APIs:", error);
        }
      };
    
      fetch(); // llamada dentro del useEffect
    }, []);
    
  
  return (
    <div class="container mt-4">
    <div class="row">
     
      <div class="col-md-6">
        <table class="table table-sm table-bordered text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Día</th>
              <th>Horas Normales</th>
              <th>Observación</th>
            </tr>
          </thead>
          <tbody>
            {diasLaborales.map((diasLaborales, index)=>(
           
                <tr key={index}>
                <th>{index+1}</th>
                <td>{diasLaborales.dia}</td>
                <td>{diasLaborales.horas_por_defecto}</td>
                <td>{diasLaborales.observacion}</td>
                </tr>
            ))}
           
          </tbody>
        </table>
      </div>
  
     
      <div class="col-md-6">
        <table class="table table-sm table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
          {horasLaborales.map((horasLaborale, index)=>(
           
           <tr key={index}>
           <th>{index+1}</th>
           <td>{horasLaborale.tipo_hora}</td>
           <td>{horasLaborale.precio}</td>
           <td>{horasLaborale.descripcion}</td>
           </tr>
       ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  )
}

export default GestionHorasLaborales
