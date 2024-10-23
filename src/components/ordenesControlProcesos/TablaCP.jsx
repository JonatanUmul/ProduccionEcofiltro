import React, { useEffect, useState } from "react";
import BotonOT from "./botonCP/BotonCP";
import ButtnEst from "./botonCP/EstadoProc";
import axios from "axios";
import { formatFecha } from "../utilidades/FormatearFecta";
import CrearCP from "./botonCP/Crear_CP";
import Detalle from "./botonCP/Detalle";
import '../maquinaria/TablaEstilos.css';
import { useAbility } from '../AbilityContext';
import {Button} from 'antd' 
const URL = process.env.REACT_APP_URL
const TablaCP = () => {
  const ability=useAbility();
  const [estOT, setEstot] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get(`${URL}/TablaCP`);
        setEstot(response.data);
        console.log("ver aca ", response);
      } catch (error) {
        setError("No hay órdenes de trabajo activas en este momento.");
        console.error("Error al obtener los datos:", error);
      }
    };

    obtenerDatos();
  }, []); 

  const selectForm = (id) => {
    
  };

  const handleClickButton = (id, encabezado) => {
    // Aquí puedes trabajar con el id y el encabezado recibidos
    console.log("ID:", id);
    console.log("Encabezado:", encabezado);
    // Luego puedes realizar la operación que necesites con estos datos
  };


  return (
    <div>
      <div className="mb-3">
      {(ability && ability.can('manage', 'all')|| ability.can('manage', 'Supervisor'))?(
      
        <BotonOT />
      ):<Button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
      Crear OT
    </Button>}
      </div>
      <div style={{ overflowX: "auto" }}>
        {error && <p>{error}</p>}
        <table className="table table-striped table-hover text-center ">
          <thead>
            <tr>
              <th scope="col" style={{ width: "0%" }}></th>
              <th scope="col" style={{ width: "1%" }}>
              <i class="bi bi-calendar"></i>
              </th>
              <th scope="col" style={{ width: "1%" }}>
                Orden
              </th>
              <th scope="col" style={{ width: "1%" }}>
                Area
              </th>
              <th scope="col" style={{ width: "1%" }}>
                Codigo Inicio
              </th>
              <th scope="col" style={{ width: "1%" }}>
                Codigo Fin
              </th>
              <th scope="col" style={{ width: "1%" }}>
                Area
              </th>
              <th scope="col" style={{ width: "0%" }}>
                Crear OT
              </th>
              <th scope="col" style={{ width: "0%" }}>
                Estado
              </th>
              {/* <th scope="col" style={{ width: "0%" }}>
                Eliminar
              </th> */}
            </tr>
          </thead>
          <tbody>
            {estOT.map((CPDats, index) => (
              <tr key={index} onClick={() => selectForm(CPDats.encabezado)}>
                <th>
                 <Detalle
                  encabezado={CPDats.encabezado}
                  EncName={CPDats.EncName}
                  fecha_creacion={CPDats.fecha_creacion}
                  id={CPDats.id}
                  codigoInicio={CPDats.codigoInicio}
                  codigoFinal= {CPDats.codigoFinal}
                  />
                </th>
                <td>{formatFecha(CPDats.fecha_creacion)}</td>
                <td>{CPDats.encabezado}-{CPDats.id}</td>
                <td>{CPDats.EncName}</td>
                <td>{CPDats.codigoInicio}</td>
                <td>{CPDats.codigoFinal}</td>
                <td>{CPDats.EncName}</td>
                <td>
                {(ability && (ability.can('create', 'BotonOT') || ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (

                  <CrearCP
                    encabezado={CPDats.encabezado}
                    EncName={CPDats.EncName}
                    fecha_creacion={CPDats.fecha_creacion}
                    id={CPDats.id}
                    codigoInicio={CPDats.codigoInicio}
                    codigoFinal= {CPDats.codigoFinal}
                  />
                ):<Button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
                OT
              </Button>}

                </td>
                <td>
                {(ability && (ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (

                  <ButtnEst
                    handleClickButton={handleClickButton} // Pasar la función handleClickButton como prop
                    id={CPDats.id}
                    encabezado={CPDats.encabezado}
                  />
                ) : <Button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
                Estado
              </Button>}
              
                </td>
                  {/* <td>
                    <button className="btn btn-danger bt-sm" style={{ width: '60px', fontSize: '0.8rem', padding: '0.2rem 0.4rem' }}>Eliminar</button>
                  </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaCP;
