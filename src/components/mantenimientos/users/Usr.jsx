import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Firma from '../../ComponenteCamara/Firma';
import './Usr.css'; // Archivo CSS para estilos personalizados
const URL = process.env.REACT_APP_URL;

const Usr = () => {
  const { handleSubmit, register } = useForm();
  const [roles, setRoles] = useState([]);
  const [firma, setFirma] = useState('');
const[operario, setOperario]=useState(null)
  const handleFirma = (firmaData) => {
    setFirma(firmaData);
  };
console.log(operario)
  useEffect(() => {
 
    Promise.all([
      axios.get(`${URL}/Rolrouter`),
      axios.get(`${URL}/Operarios`)
    ])
      .then(([rolesResponse, Operarios]) => {
        setRoles(rolesResponse.data);
        setOperario(Operarios.data.rows)
        console.log("Datos de Rolrouter:", rolesResponse.data);
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      formData.firmaUsr = firma;

      const response = await axios.post(
        `${URL}/UsuariosR`,
        formData
      );
      console.log("Respuesta del servidor:", response.data);
      window.location.href = "/Home/TablaUser";
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="mt-1">
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
            Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              {...register("username")}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">
              Name
            </label>
            <select
              className="select form-select"
              id="nombre"
              {...register("nombre")}
            >
              <option value="" disabled selected>Seleccione...</option>
              {operario && operario.map((nombre) => (
                  <option key={nombre.id} value={nombre.id}>
                    {nombre.Nombre}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-3">
          <label htmlFor="rol" className="form-label">
            Rols
          </label>
          <select
            className="select form-select"
            id="rol"
            {...register("rol")}
          >
            <option value="" disabled selected>Seleccione...</option>
            {Array.isArray(roles.rows) &&
              roles.rows.length > 0 &&
              roles.rows.map((rol) => (
                <option key={rol.id_rol} value={rol.id_rol}>
                  {rol.rol}
                </option>
              ))}
          </select>
        </div>

          <div className="mb-3">
            <label htmlFor="mail" className="form-label">
              Correo
            </label>
            <input
              type="text"
              className="form-control"
              id="mail"
              {...register("mail")}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Teléfono
            </label>
            <input
              type="number"
              className="form-control"
              id="phone"
              {...register("phone")}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              {...register("password")}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">
              Rol
            </label>
            <select
              className="select form-select"
              id="rol"
              {...register("rol")}
            >
              <option value="" disabled selected>Seleccione...</option>
              {Array.isArray(roles.rows) &&
                roles.rows.length > 0 &&
                roles.rows.map((rol) => (
                  <option key={rol.id_rol} value={rol.id_rol}>
                    {rol.rol}
                  </option>
                ))}
            </select>
          </div>
          <Firma 
          
            id='firmaUsr'
            {...register("firmaUsr")}
            handleFirma={handleFirma} /> {/* Pasar la función handleFirma como prop */}
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Usr;
