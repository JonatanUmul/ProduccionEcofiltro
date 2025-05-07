import React, { useEffect, useState } from "react";
import axios from "axios";
import AreaOperario from "./botonOT/AreaOperario";
import { formatFecha } from "../utilidades/FormatearFecta";

const URL = process.env.REACT_APP_URL;

const OperariosTable = () => {
    const [operarios, setOperarios] = useState([]);
    const [DiaLaboral, setDiaLaboral]= useState([]);
    const [tipoHora, setTipoHora]=useState([])
 
    const precioHora = tipoHora.find(u => u.tipo_hora === 'Normal')?.precio;
    console.log(precioHora ?? 'No se encontró el tipo de hora');
    


    const hoy=new Date()

      const getOperarios = async () => {
        try {
          const [respuesta1,respuesta2, respuesta3] = await Promise.all([
            axios.get(`${URL}/RegistroTrabajo`),
            axios.get(`${URL}/GestionDiasLaborales`),
            axios.get(`${URL}/GestionHorasLaborales`)
          ]);
          setOperarios(respuesta1.data.data);
          setDiaLaboral(respuesta2.data.rows);
          setTipoHora(respuesta3.data.rows)
        } catch (error) {
          console.error("Error al consultar APIs:", error);
        }
      };

    useEffect(() => {
        getOperarios();
    }, []);
    

    function obtenerNombreDia(dia, mes, anio) {
      const fecha = new Date(anio, mes - 1, dia); 
      const opciones = { weekday: 'long' };
      return fecha.toLocaleDateString('es-ES', opciones); 
    }
    
    const diaDelMes = hoy.getDate();
    const mes = hoy.getMonth()+1;
    const anio = hoy.getFullYear();
    
    const nombreDia = obtenerNombreDia(diaDelMes, mes, anio);

    useEffect(() => {
      if (DiaLaboral.length > 0) {
        const encontrado = DiaLaboral.find(
          (d) => d.dia === nombreDia
        );
        setDiaActual(encontrado.horas_por_defecto);
        console.log(encontrado)
      }
    }, [DiaLaboral, nombreDia]);
    const [diaActual, setDiaActual] = useState('');

    const operariosPorArea = operarios.reduce((acc, operario) => {
        const area = operario.proceso || "Sin Área";
        if (!acc[area]) {
            acc[area] = [];
        }
        acc[area].push(operario);
        return acc;
    }, {});

    const Guardar=()=>{
      const operariosCOnHoras = operarios.map(op=>({
      
        ...op,
        horas: diaActual,
        tipoHora: 1,
        precioHora: precioHora
      }))
      console.log(operariosCOnHoras)
      axios.post(`${URL}/RegistroTrabajo`, operariosCOnHoras)
      .then(response => {
      })
      .catch(error => {
      });
    }



    return (
        <div>
        {/* Grid de tablas por área */}
        <h1>{nombreDia.toUpperCase()} - Horas laborales: {diaActual}</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "20px", padding: "20px", textAlign:'center' }}>
         
          {Object.entries(operariosPorArea).map(([area, ops]) => (
            <div key={area} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px", background: "#f9f9f9" }}>
              <h3 className="text-center">{area} - {ops.length}</h3>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Estado</th>
                    <th>Nombre</th>
                    <th>Área Actual</th>
                    <th>Actualizar Área</th>
                  </tr>
                </thead>
                <tbody>
                  {ops.map((op,index) => (
                    <tr key={op.id}>
                      <td>{index + 1}</td>
                      <td>{op.estado}</td>
                      <td>{op.Nombre}</td>
                      <td>{op.proceso}</td>
                      <td>{diaActual}</td>
                      <td><AreaOperario area={op} actualizarTab={getOperarios} /></td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      
        {/* Botón fuera del grid, al final */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>

         {diaActual>0 ?
         <button type="submit" onClick={Guardar} className="btn btn-primary">
            Guardar Mano de Obra
          </button>:
          'Sin horas'}
          
        </div>
      </div>
      
    );
};

export default OperariosTable;
