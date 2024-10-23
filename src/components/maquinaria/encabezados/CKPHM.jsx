import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import './user.css'
const URL = process.env.REACT_APP_URL;
const OTCMP = ({enviarId, modalTitle}) => {
  const { handleSubmit, register } = useForm();
  const [maquina, setMaquina] = useState([]);
  const [id_creador, setid_creador] = useState('');
  
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })

const maquinaria=modalTitle; 
  useEffect(() => {
    Promise.all([
     
      axios.get(`${URL}/maquinaria/${maquinaria}`),
    ])
      .then(([maquinaResponse]) => {
        setMaquina(maquinaResponse.data);
        console.log("Datos de Estadosroutes:", maquinaResponse.data);
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);
  enviarId = (id_est) => {
    // Aquí puedes realizar la llamada a la API con el id_est
    console.log('Enviando id_est a la API:', id_est);
  };

  const onSubmit = async (formData) => {
    // formData.preventDefault();
    try {
      
      const id_maq = maquina.rows[0]?.id_maq;
      // Realizar la solicitud POST al servidor con los datos del formulario
      const response = await axios.post(
        `${URL}/CKPHM`,
        {id_creador, id_maq : id_maq }
      );
      window.location.href = "/Home/TablaMaq";
      console.log("Respuesta del servidor:", response.data);
      // Aquí podrías agregar lógica adicional, como mostrar un mensaje de éxito al usuario, por ejemplo
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Aquí podrías manejar el error, mostrar un mensaje al usuario, etc.
    }
  };


  // console.log(estados);
  return (
    <div className="mt-4 text-center">
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="col-md-7 mx-auto mb-3"> {/* Añadimos la clase mx-auto */}
          
          {Array.isArray(maquina.rows) && maquina.rows.length > 0 ? (
              maquina.rows.map((maquina) => (
                <p key={maquina.id_maq} value={maquina.id_maq}>
                  {maquina.nombre_maq}
                </p>
              ))
            ) : (
              <p value="">No hay maquinaria disponible</p>
            )}
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Crear
          </button>
        </div>
      </form>
    </div>
  </div>
  

  );
};


    export default OTCMP;
