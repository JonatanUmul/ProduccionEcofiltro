import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAbility } from "../../AbilityContext";
const URL = process.env.REACT_APP_URL;

const EstadoProc = ({ id, encabezado, tabla }) => {
  
  const ability = useAbility();
  const [estado, setEstado] = useState([]);
  const [cambiarEst, setCambiarEst] = useState(""); // Estado para almacenar el estado seleccionado
  const [cambiarRuta, setCambiarRuta] = useState("");
  console.log("cambiarRutacambiarRuta", cambiarRuta);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${URL}/EstadosProc`;
        const response = await axios.get(url);
        setEstado(response.data);
        console.log("datos: ", response.data);
      } catch (error) {
        console.log("No se obtuvieron datos", error);
      }
    };

    fetchData();
  }, []);

  // Manejar el cambio de opción
  const handleChange = (e) => {
    setCambiarEst(e.target.value); // Actualizar el estado con el valor seleccionado
  };

  // Definir la ruta basada en el encabezado seleccionado
  useEffect(() => {
    switch (encabezado) {
      case "cps":
        setCambiarRuta("cps");
        break;
      case "cpb":
        setCambiarRuta("cpb");
        break;
      case "crm":
        setCambiarRuta("crm");
        break;
      case "ctt":
        setCambiarRuta("ctt");
        break;
      case "cth":
        setCambiarRuta("cth");
        break;
      case "cpcd":
        setCambiarRuta("cpcd");
        break;
      case "cfmp":
        setCambiarRuta("cfmp");
        break;
      case "ProcesoMezclado":
        setCambiarRuta("OT_mezclado_aserrin");
        break;
      case "registroMuestra":
        setCambiarRuta("registroMuestra");
        break;
    }
  }, [encabezado]); // Ejecutar el efecto cuando el encabezado cambie

  // Realizar la solicitud POST cuando se seleccione un estado
  useEffect(() => {
    const enviarEstado = async () => {
      if (cambiarEst !== "") {
        try {
          const response = await axios.put(`${URL}/${cambiarRuta}`, {
            id_est: cambiarEst,
            id,
          });
          console.log("Datos de la tabla:", response.data);
      
          
    if(encabezado === "ProcesoMezclado"){(window.location.href = "/Home/TablaProcesoDeMezclado")}
          else if(encabezado==="registroMuestra"){(window.location.href = "/Home/TablaProduccion")}
          else{(window.location.href = "/Home/TablaCP")}
          

    // {
    //         encabezado === "ProcesoMezclado"
    //           ? (window.location.href = "/Home/TablaProcesoDeMezclado")
    //           : (window.location.href = "/Home/TablaCP");
    // }
        } catch (error) {
          console.log("Error al obtener los datos de la tabla:", error);
        }
      }
    };

    enviarEstado();
  }, [cambiarEst, cambiarRuta]); // Ejecutar cuando cambiarEst o cambiarRuta cambien

  return (
    <div>
                {(ability && ( ability.can('manage', 'all') || ability.can('manage', 'Supervisor'))) ? (
      <select
        name="estado"
        id="id_est"
        className="btn btn-dark btn-sm   dropdown-toggle"
        onChange={handleChange} // Agregar el evento onChange
        value={cambiarEst} // Establecer el valor seleccionado
      >
        <option value="">Estado</option>
        {Array.isArray(estado.rows) &&
          estado.rows.map((estados) => (
            <option key={estados.id_est} value={estados.id_est}>
              {estados.estado}
            </option>
          ))}
      </select>
      ):
       <button type="default" disabled style={{ color: 'red', fontWeight: 'bold' }}>
        Sin Permisos
            </button>
      }
    </div>
  );
};

export default EstadoProc;
