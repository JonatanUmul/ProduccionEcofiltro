import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import './user.css'
const URL = process.env.REACT_APP_URL

const FormEHP = () => {
  const { handleSubmit, register } = useForm();
  const [id_creador, setid_creador] = useState('');
  
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })
  
  const onSubmit = async (formData) => {
    // formData.preventDefault();
    try {

      // Realizar la solicitud POST al servidor con los datos del formulario
      const response = await axios.post(
        `${URL}/OTHP`,
        {id_creador}
      );
      window.location.href = "/Home/TablaOT";
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


    export default FormEHP;
