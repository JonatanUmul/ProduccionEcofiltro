import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import './user.css'
const URL = process.env.REACT_APP_URL

const FormEHP = () => {
  const { handleSubmit, register } = useForm();
  const [mtp, setMtp] = useState([]);
  const [id_creador, setid_creador] = useState(null);
  
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })
      
  
  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/MateriaPrima`),
    ])
      .then(([estadosResponse, rolesResponse]) => {
        setMtp(estadosResponse.data);
        console.log("Datos de Estadosroutes:", estadosResponse.data);
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);
 

  const onSubmit = async () => {
    // formData.preventDefault();
    try {
      // Actualizar el estado 'datos' con los valores del formulario
    
      // Realizar la solicitud POST al servidor con los datos del formulario
      const response = await axios.post(
        `${URL}/OTSA`,{id_creador},
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
  {/* <h5 className="text-muted">Orden de Trabajo - Secado de Materia Prima</h5> */}
  <div className="container">
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="mb-3">
        <label htmlFor="estados" className="form-label">
          Materia Prima
        </label>
        <select
          className="form-select"
          id="id_MP"
          {...register("id_MP")}
        >
          {Array.isArray(mtp.rows) && mtp.rows.length > 0 ? (
            mtp.rows.map((material) => (
              <option key={material.id_enc} value={material.id_enc}>
                {material.nom_matPrima}
              </option>
            ))
          ) : (
            <option value="">No hay materia prima disponible</option>
          )}
        </select>
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


    export default FormEHP;
