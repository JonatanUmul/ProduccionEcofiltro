import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = process.env.REACT_APP_URL;

const EstadoProc = ({ id, encabezado }) => {
  console.log('Cerrar Orden',id, encabezado)
  const [estado, setEstado] = useState([]);
  const [cambiarEst, setCambiarEst] = useState("");
  const [cambiarRuta, setCambiarRuta] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = `${URL}/EstadosProc`;
        const response = await axios.get(urls);
        setEstado(response.data);
      } catch (error) {
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
    setCambiarRuta(ruta);
  }, [encabezado]);

  // Verificar cambios en cambiarRuta
  useEffect(() => {
  }, [cambiarRuta]);

  // Realizar la solicitud PUT cuando se seleccione un estado
  useEffect(() => {
    const enviarEstado = async () => {
      if (cambiarEst !== "" && cambiarRuta !== "") {
        try {
          const response = await axios.put(`${URL}/${cambiarRuta}`, { id_est: cambiarEst, id });
          // Aquí puedes hacer algo con los datos de la tabla, por ejemplo, actualizar el estado
          window.location.href = "/Home/TablaOT";
        } catch (error) {
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
