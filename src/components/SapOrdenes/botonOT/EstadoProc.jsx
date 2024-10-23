import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = process.env.REACT_APP_URL;

const EstadoProc = ({ id, encabezado }) => {
  const [estado, setEstado] = useState([]);
  const [cambiarEst, setCambiarEst] = useState("");
  const [cambiarRuta, setCambiarRuta] = useState('');

  console.log('Datos recibidos (id, encabezado): ', id, encabezado, cambiarRuta);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = `${URL}/EstadosProc`;
        const response = await axios.get(urls);
        setEstado(response.data);
        console.log('Datos de estado: ', response.data);
      } catch (error) {
        console.log('No se obtuvieron datos', error);
      }
    };

    fetchData();
  }, []);

  // Manejar el cambio de opción
  const handleChange = (e) => {
    setCambiarEst(e.target.value);
  };

  // Definir la ruta basada en el encabezado seleccionado
  useEffect(() => {
    console.log('Encabezado cambiado: ', encabezado);
    let ruta = '';
    switch (encabezado) {
      case 'othp':
        ruta = 'othp';
        break;
      case 'otsa':
        ruta = 'otsa';
        break;
      case 'otca1':
        ruta = 'otca1';
        break;
      case 'otca2':
        ruta = 'otca2';
        break;
      case 'otpv':
        ruta = 'otpv';
        break;
      case 'otp':
        ruta = 'otp';
        break;
      case 'othh':
        ruta = 'othh';
        break;
      case 'otfm':
        ruta = 'otfm';
        break;
      case 'otip':
        ruta = 'otip';
        break;
      case 'otcc':
        ruta = 'otcc';
        break;
      case 'cthh':
        ruta = 'dthh';
        break;
      default:
        ruta = '';
        break;  
    }
    console.log('Ruta establecida antes de actualizar el estado: ', ruta);
    setCambiarRuta(ruta);
  }, [encabezado]);

  // Verificar cambios en cambiarRuta
  useEffect(() => {
    console.log('Ruta establecida después de actualizar el estado: ', cambiarRuta);
  }, [cambiarRuta]);

  // Realizar la solicitud PUT cuando se seleccione un estado
  useEffect(() => {
    const enviarEstado = async () => {
      if (cambiarEst !== "" && cambiarRuta !== "") {
        try {
          console.log('Enviando datos a la ruta:', cambiarRuta);
          const response = await axios.put(`${URL}/${cambiarRuta}`, { id_est: cambiarEst, id });
          console.log('Datos de la tabla:', response.data);
          // Aquí puedes hacer algo con los datos de la tabla, por ejemplo, actualizar el estado
          window.location.href = "/Home/TablaOT";
        } catch (error) {
          console.log('Error al obtener los datos de la tabla:', error);
        }
      }
    };

    enviarEstado();
  }, [cambiarEst, cambiarRuta]);

  return (  
    <div>
      <select
        name="estado"
        id="id_est"
        className="btn btn-sm btn-dark dropdown-toggle"
        onChange={handleChange}
        value={cambiarEst}
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
