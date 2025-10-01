import React, { useState, useEffect } from 'react';
import axios from 'axios';
const URL = process.env.REACT_APP_URL
const EstadoProc = ({ id, encabezado, tabla, telefono, correlativo, EncName  }) => {
  const [cambiarEst, setCambiarEst] = useState(""); // Estado para almacenar el estado seleccionado
  const [cambiarRuta, setCambiarRuta] = useState('');
console.log('ruta cambiada',cambiarEst )


  // Manejar el cambio de opción
  const handleChange = (e) => {
    setCambiarEst(e.target.value); // Actualizar el estado con el valor seleccionado
  };

  // Definir la ruta basada en el encabezado seleccionado
  useEffect(() => {
    switch (encabezado) {
      case 'EstadoProcesoMezclaAserrin':
       setCambiarRuta('EstadoProcesoMezclaAserrin');
        break;
     
    }
  }, [encabezado]); // Ejecutar el efecto cuando el encabezado cambie 

  // Realizar la solicitud POST cuando se seleccione un estado
  useEffect(() => {
    const enviarEstado = async () => {
      if (cambiarEst !== "") {
        try {
          const response = await axios.put(`${URL}/EstadoProcesoMezclaAserrin`, { id_est: cambiarEst, id, correlativo, EncName, telefono });
          console.log('Datos de la tabla:', response.data);
          // Aquí puedes hacer algo con los datos de la tabla, por ejemplo, actualizar el estado
          window.location.href = "/Home/TablaProcesoDeMezclado";
        } catch (error) {
          console.log('Error al obtener los datos de la tabla:', error);
        }
      }
    };

    enviarEstado();
  }, [cambiarEst]); // Ejecutar cuando cambiarEst o cambiarRuta cambien



  return (  
    <div>
      <select
        name="estado"
        id="id_est"
        className="btn btn-dark btn-sm   dropdown-toggle"
        onChange={handleChange} // Agregar el evento onChange
        value={cambiarEst} // Establecer el valor seleccionado
      >
            <option value="">Estado</option>
            <option value="Aprobado">Aprobado</option>
            <option value="No Cumple">No Cumple</option>

      </select>

      
    </div>
  );
};

export default EstadoProc;
