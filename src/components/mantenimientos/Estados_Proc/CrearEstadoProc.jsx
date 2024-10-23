import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const URL = process.env.REACT_APP_URL;

const CrearEstMaq = () => {
  const { handleSubmit, register } = useForm();

  const [estProc, setEstProc] = useState({ estado: "", descripcion: "" });

  const onSubmit = async (formData) => {
    try {
      // Actualizar el estado 'datos' con los valores del formulario

      if (
        formData.estado === "" ||
        formData.descripcion === "" 

      ) {
        console.log("No puede enviar Datos Vacios");
      } else {
        // Realizar la solicitud POST al servidor con los datos del formulario
        setEstProc({
          estado: formData.estado,
          descripcion: formData.descripcion,

        });
        const response = await axios.post(
          `${URL}/EstadosProc`,
          formData
        );
        console.log("Respuesta del servidor:", response.data);
        // Aquí podrías agregar lógica adicional, como mostrar un mensaje de éxito al usuario, por ejemplo
        window.location.href = "/Home/TablaEstProc";
      }
      console.log(estProc.descripcion);
      console.log(estProc.estado);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Aquí podrías manejar el error, mostrar un mensaje al usuario, etc.
    }
  };
 

  return (
    <div >
      <div className="card-body">
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">
              Estado
            </label>
            <input
              type="text"
              className="form-control"
              id="estado"
              {...register("estado")}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripcion
            </label>
            <input
              type="text"
              className="form-control"
              id="descripcion"
              {...register("descripcion")}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearEstMaq;
