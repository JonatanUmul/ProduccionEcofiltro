import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import './user.css'
const URL = process.env.REACT_APP_URL

const OTPV = () => {
  const { handleSubmit, register } = useForm();
  const [mtp, setMtp] = useState([]);
  const [correlativo, setCorrelativo] = useState([]);
  const [id_creador, setid_creador] = useState('');

  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })
  
  
  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/MateriaPrima`),
      axios.get(`${URL}/OTFM`),
    ])
      .then(([estadosResponse, MAX_idotfm]) => {
        setMtp(estadosResponse.data);
        setCorrelativo(MAX_idotfm.data.correlativo);

      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);


  const onSubmit = async (formData) => {
    // formData.preventDefault();
    try {
 
      const response = await axios.post(
        `${URL}/OTFM`,{id_creador, correlativo}
      );
      window.location.href = "/Home/TablaProcesoDeFormulacion";
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
  {/* <h5 className="text-muted">Orden de Trabajo - Cernido de Materia Prima</h5> */}
  <div className="container">
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="mb-3">
        <label htmlFor="estados" className="form-label">
          Formulación
        </label>
        <label htmlFor="estados" className="form-label">
          Correlativo: {correlativo}
        </label>
      
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


    export default OTPV;
