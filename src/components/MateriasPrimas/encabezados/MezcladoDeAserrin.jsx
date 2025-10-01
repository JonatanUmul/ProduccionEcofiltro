import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const URL = process.env.REACT_APP_URL

const FormEHP = () => {
  const { handleSubmit, register } = useForm();
  const [id_creador, setid_creador] = useState('');
  const [correlativoFormateado, setMaxid] = useState('');
  const correlativo= correlativoFormateado?.correlativo

useEffect(()=>{
  setid_creador(localStorage.getItem('id_creador'))
})
  
const Id_Max = async () => {
  try {
    const response = await axios.get(`${URL}/get_Max_id_ot_mezclado_aserrin`);
    setMaxid(response.data);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  Id_Max();
}, []);


  const onSubmit = async () => {
    // formData.preventDefault();
    try {
      // Actualizar el estado 'datos' con los valores del formulario
    
      // Realizar la solicitud POST al servidor con los datos del formulario
      const response = await axios.post(
        `${URL}/OT_mezclado_aserrin`,
        {id_creador,correlativo }
      );
      window.location.href = "/Home/TablaProcesoDeMezclado";
      console.log("Respuesta del servidor:", response.data);
      // Aquí podrías agregar lógica adicional, como mostrar un mensaje de éxito al usuario, por ejemplo
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Aquí podrías manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  const currentDate = new Date();
const dayMonthYear = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

 


  // console.log(estados);
  return (
    <div className="mt-4 text-center">
  {/* <h5 className="text-muted">Orden de Trabajo - Secado de Materia Prima</h5> */}
  <div className="container">
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="mb-3">
        <h1>Orden mezclado de aserrín</h1>
        <h4>Correlativo: {correlativoFormateado.correlativo}</h4>
        <h5 className="mt-3">Con fecha:</h5>
        <p>{dayMonthYear}</p>
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary mt-5">
          Crear
        </button>
      </div>
    </form>
  </div>
</div>

  );
};


    export default FormEHP;



