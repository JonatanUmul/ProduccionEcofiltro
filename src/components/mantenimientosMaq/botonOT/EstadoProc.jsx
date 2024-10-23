import React, { useState, useEffect } from 'react';
import axios from 'axios';
const URL = process.env.REACT_APP_URL;

const EstadoProc = ({ id, encabezado }) => {
  const [estado, setEstado] = useState([]);
  const [cambiarEst, setCambiarEst] = useState(""); // Estado para almacenar el estado seleccionado
  const [cambiarRuta, setCambiarRuta] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${URL}/EstadosProc`;
        const response = await axios.get(url);
        setEstado(response.data);
        console.log('datos: ', response.data);
      } catch (error) {
        console.log('No se obtuvieron datos', error);
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
      case 'mta':
        setCambiarRuta('mta');
        break;
      case 'mext':
        setCambiarRuta('mext');
        break;
      case 'mcta':
        setCambiarRuta('mcta');
        break;
      case 'mtam':
        setCambiarRuta('mtam');
        break;
      case 'mm2':
          setCambiarRuta('mm2');
          break;
      case 'mmm':
          setCambiarRuta('mmm');
          break;
      case 'mph2':
          setCambiarRuta('mph2');
          break;
      case 'mphm':
          setCambiarRuta('mphm');
          break;
      case 'mpm':
          setCambiarRuta('mpm');
          break;
          case 'mbt':
            setCambiarRuta('mbt');
            break;
     
    }
  }, [encabezado]); // Ejecutar el efecto cuando el encabezado cambie 

  // Realizar la solicitud POST cuando se seleccione un estado
  useEffect(() => {
    const enviarEstado = async () => {
      if (cambiarEst !== "") {
        try {
          const response = await axios.put(`${URL}/${cambiarRuta}`, { id_estado: cambiarEst, id });
          console.log('Datos de la tabla:', response.data);
          // Aquí puedes hacer algo con los datos de la tabla, por ejemplo, actualizar el estado
          window.location.href = "/Home/TableMantenimientoMaq";
        } catch (error) {
          console.log('Error al obtener los datos de la tabla:', error);
        }
      }
    };

    enviarEstado();
  }, [cambiarEst, cambiarRuta]); // Ejecutar cuando cambiarEst o cambiarRuta cambien



  return (  
    <div>
      <select
        name="estado"
        id="id_estado"
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

      
    </div>
  );
};

export default EstadoProc;
