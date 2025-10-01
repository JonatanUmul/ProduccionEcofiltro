import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessAlert from '../../UI/alerts/succesAlert';
import Swal from 'sweetalert2';

const URL = process.env.REACT_APP_URL;

//encacezado='TablaRecepcionBarro'
const EstadoProc = ({ datosApi, id_creador, materiaPrima }) => {
  console.log('boton estado',materiaPrima)
  const [estado, setEstado] = useState([]);
  const [cambiarRuta, setCambiarRuta] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = `${URL}/EstadosProc`;
        const response = await axios.get(urls);
        setEstado(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    let ruta = '';
    switch (datosApi.encabezado) {
      case 'muestras':
        ruta = 'muestras';
        break;
      default:
        ruta = '';
        break;
    }
    setCambiarRuta(ruta);
  }, [datosApi.encabezado]);
console.log('id_muestras', datosApi)
  const handleChange = async (e) => {
    const valorSeleccionado = e.target.value;
    if (!valorSeleccionado) return;

    const accion = valorSeleccionado === "2" ? "aprobar" : "rechazar";
    const color = valorSeleccionado === "2" ? "#3085d6" : "#d33";

    const result = await Swal.fire({
      title: `¿Estás seguro de ${accion} el lote ${datosApi.codigo_lote}?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: color,
      cancelButtonColor: "#6c757d",
      confirmButtonText: `Sí, ${accion}`,
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      try {
        const consulta = await axios.put(`${URL}/CorrelativoMuestraBarro`, {
          id_est: valorSeleccionado,
          datosApi,
          id_creador,
          materiaPrima:materiaPrima
        });

        const respuesta = consulta.data.mensaje;
        SuccessAlert({ respuesta });

        setTimeout(() => {
          {materiaPrima==='Barro'? window.location.href = "/Home/TablaRecepcionBarro": window.location.href = "/Home/TablaRecepcionAserrin"; }
          
        }, 3000);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al procesar la solicitud.",
          icon: "error"
        });
      }
    }
  };

  return (
    <div>
      <select
        style={{ marginLeft: '5px', background: 'gray', border: 'none' }}
        name="estado"
        id="id_est"
        className="btn btn-sm btn-dark dropdown-toggle"
        onChange={handleChange}
        defaultValue=""
      >
        {materiaPrima=='Barro'? 
        <>       
          <option value="">Estado</option>
         <option value="2">Aprobar</option>
         <option value="3">Rechazar</option>
         </>
         :
         <>       
         <option value="">Estado</option>
         <option value="2">Pasar a Mezclado</option>
        </>
        }
       
      </select>
    </div>
  );
};

export default EstadoProc;
