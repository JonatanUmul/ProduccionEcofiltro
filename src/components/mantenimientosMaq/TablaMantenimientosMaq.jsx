import React, { useEffect, useState } from "react";
import BotonOT from "./botonOT/BotonOT";
import ButtnEst from "./botonOT/EstadoProc";
import axios from "axios";
import { formatFecha } from "../utilidades/FormatearFecta";
import CrearOT from "./botonOT/Crear_OT";
import Detalle from "./botonOT/Detalle";
import './TablaEstilos.css'
import { useAbility } from '../AbilityContext';
import {Button} from 'antd'
const URL = process.env.REACT_APP_URL;

const TablaMaq = ({ OTDats }) => {
  const ability=useAbility();
  const [estOT, setEstot] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get(`${URL}/MantenimientoMaq`);
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
    // console.log("ID:", id);
    // console.log("Encabezado:", encabezado);
  
  };

  return (
    <div>
      <div className="mb-3">
      {(ability && ability.can('manage', 'all')|| ability.can('manage', 'Supervisor'))?(

        <BotonOT />
      ):<Button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
      Crear
    </Button>}

      </div>
      <div className="table-container" style={{ overflowX: "auto", maxHeight: "500px" }}>
        {error && <p>{error}</p>}
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col" style={{ width: "0%" }}></th>
              <th scope="col" style={{ width: "1%" }}>
              <i class="bi bi-calendar"></i>
              </th>
              <th scope="col" style={{ width: "1%" }}>
                Orden
              </th>
              {/* <th scope="col" style={{ width: "1%" }}>
                ID Maquina
              </th> */}
              <th scope="col" style={{ width: "1%" }}>
                Area
              </th>
              <th scope="col" style={{ width: "0%" }}>
                Crear OT
              </th>
              <th scope="col" style={{ width: "0%" }}>
                Estado
              </th>
            
            </tr>
          </thead>
          
          <tbody>
            {estOT.map((OTDats, index) => (
              <tr key={index} onClick={() => selectForm(OTDats.encabezado)}>
                <th>
                 <Detalle
                  encabezado={OTDats.encabezado}
                  EncName={OTDats.EncName}
                  fecha_creacion={OTDats.fechaCreacion}
                  id={OTDats.id}
                  />
                </th>
                <td>{formatFecha(OTDats.fechaCreacion)}</td>
                <td>{OTDats.encabezado}-{OTDats.id}</td>
                {/* <td>{OTDats.id_maquina}</td> */}
                <td>{OTDats.EncName}</td>
                <td>
                {(ability && (ability.can('create', 'BotonOT') || ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (

                  <CrearOT
                    encabezado={OTDats.encabezado}
                    EncName={OTDats.EncName}
                    fecha_creacion={OTDats.fechaCreacion}
                    id={OTDats.id}
                  />
                ):<Button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
                OT
              </Button>}

                </td>{" "}
                {/* Pasando el ID como propiedad */}
                <td>
                {(ability && (ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (

                  <ButtnEst
                    handleClickButton={handleClickButton} // Pasar la función handleClickButton como prop
                    id={OTDats.id}
                    encabezado={OTDats.encabezado}
                  />
                ) : <Button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
                Estado
              </Button>}
              
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaMaq;
