import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import "./estilosFormatos.css";
import Swal from "sweetalert2";

const URL = process.env.REACT_APP_URL;

const DCKBT = ({ encabezado, EncName, fecha_creacion, id }) => {
  const { handleSubmit, register, watch } = useForm();
  const [respuestas, setRespuestas] = useState([]);
  const [errors, setError] = useState("");
  const [grupo, setGrupo] = useState([]);
  const [id_creador, setIdCreador] = useState("");

  // visibilidad de bloques
  const [showBreakers, setShowBreakers] = useState(false);
  const [showMotores, setShowMotores] = useState(false);

  const tanque_agua_nivel_OK = watch("breaker_qf2_on");
  const [responsable, setResponsables] = useState({});
  const breaker_qf1_on=watch('breaker_qf1_on')
  const breaker_qf2_on=watch('breaker_qf2_on')
  const breaker_qf3_on=watch('breaker_qf3_on')
  const breaker_qf4_on=watch('breaker_qf4_on')
  const hongo_emergencia_quitado=watch('hongo_emergencia_quitado')
  const ventilador_qf1_on=watch('ventilador_qf1_on')
  const bomba_recirculacion_qf2_on=watch('bomba_recirculacion_qf2_on')
  const dosificador_quimicos_on=watch('dosificador_quimicos_on')

  const Operariosresponsables=[1,7,8,9,77,78,79]
  useEffect(() => {
    setIdCreador(localStorage.getItem("id_creador") || "");
  }, []);

  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/respuestas`),
     axios.get(`${URL}/GrupodeTrabajo`),
     axios.get(`${URL}/Operariosresponsables/${Operariosresponsables}`),])
      .then(([RespuestasResponse, grupoResponse, grupoResponsables]) => {
        setRespuestas(RespuestasResponse.data);
        setGrupo(grupoResponse.data);
        setResponsables(grupoResponsables.data.rows)
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      await axios.put(`${URL}/DCKSCRUBBER`, {
        id_dckscrubber: id.toString(),
        id_creador:id_creador,
        breaker_qf1_on: formData.breaker_qf1_on,
        breaker_qf2_on: formData.breaker_qf2_on,
        breaker_qf3_on: formData.breaker_qf3_on,
        breaker_qf4_on: formData.breaker_qf4_on,
        hongo_emergencia_quitado: formData.hongo_emergencia_quitado,
        ventilador_qf1_on: formData.ventilador_qf1_on,
        bomba_recirculacion_qf2_on: formData.bomba_recirculacion_qf2_on,
        dosificador_quimicos_on: formData.dosificador_quimicos_on,
        id_responsable_seguimiento_ckmotores:formData.id_responsable_seguimiento_ckmotores

      });

      Swal.fire({
        icon: "success",
        title: "Guardado exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.href = "/Home/TablaMaq";
      }, 1500);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Error al enviar los datos al servidor.");
      }
      console.error("Error al enviar los datos:", error);
    }
  };

  const opciones = Array.isArray(respuestas.rows) ? respuestas.rows : [];

  return (
    <div className="mt-1">
      <h4 style={{ textAlign: "center", color: "gray" }}>
        {encabezado}.{EncName}
      </h4>

      <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <div className="card-body">
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
            <label htmlFor="materiaPrima" className="form-label" style={{ marginRight: "10px", width: "150px" }}>
              Orden:
            </label>
            <p id="materiaPrima" className="form-control-static" style={{ marginBottom: "0" }}>
              {encabezado} - {EncName}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <label htmlFor="fecha" className="form-label" style={{ marginRight: "10px", width: "150px" }}>
              Fecha de Creación:
            </label>
            <p id="fecha" className="form-control-static" style={{ marginBottom: "0" }}>
              {formatFecha(fecha_creacion)}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* Botones que DESPLIEGAN bloques */}
      

        {/* BLOQUE 1: Revisión de Breakers */}
    
          <fieldset className="w-100 mt-3 p-3 border rounded">
            <legend className="fw-bold">Revisión de Breakers</legend>

            <div className="form-group mt-2">
              <label className="mb-1">
                1. ¿El breaker del ventilador de tiro inducido (QF1) está en posición ON?
              </label>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {opciones.map((respuesta) => (
                  <div key={`q1-${respuesta.id}`} className="form-check">
                    <input
                      required
                      className="form-check-input"
                      type="radio"
                      name="breaker_qf1_on"
                      id={`breaker_qf1_on${respuesta.id}`}
                      value={respuesta.id}
                      {...register("breaker_qf1_on")}
                    />
                    <label className="form-check-label" htmlFor={`breaker_qf1_on${respuesta.id}`}>
                      {respuesta.respuesta}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group mt-3">
              <label className="mb-1">
                2. ¿El breaker de la bomba de recirculación de agua (QF2) está en posición ON?
              </label>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {opciones.map((respuesta) => (
                  <div key={`q2-${respuesta.id}`} className="form-check">
                    <input
                      required
                      className="form-check-input"
                      type="radio"
                      name="breaker_qf2_on"
                      id={`breaker_qf2_on-${respuesta.id}`}
                      value={respuesta.id}
                      {...register("breaker_qf2_on")}
                    />
                    <label className="form-check-label" htmlFor={`breaker_qf2_on-${respuesta.id}`}>
                      {respuesta.respuesta}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group mt-3">
              <label className="mb-1">
                3. ¿El breaker de la bomba de dosificación de químicos (QF3) está en posición ON?
              </label>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {opciones.map((respuesta) => (
                  <div key={`q3-${respuesta.id}`} className="form-check">
                    <input
                      required
                      className="form-check-input"
                      type="radio"
                      name="breaker_qf3_on"
                      id={`breaker_qf3_on-${respuesta.id}`}
                      value={respuesta.id}
                      {...register("breaker_qf3_on")}
                    />
                    <label className="form-check-label" htmlFor={`breaker_qf3_on-${respuesta.id}`}>
                      {respuesta.respuesta}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group mt-3">
              <label className="mb-1">4. ¿El breaker del fusible (QF4) está en posición ON?</label>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {opciones.map((respuesta) => (
                  <div key={`q4-${respuesta.id}`} className="form-check">
                    <input
                      required
                      className="form-check-input"
                      type="radio"
                      name="breaker_qf4_on"
                      id={`breaker_qf4_on-${respuesta.id}`}
                      value={respuesta.id}
                      {...register("breaker_qf4_on")}
                    />
                    <label className="form-check-label" htmlFor={`breaker_qf4_on-${respuesta.id}`}>
                      {respuesta.respuesta}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group mt-2">
              <label className="mb-1">
                5. ¿Se quitó el hongo de emergencia para permitir el arranque de los motores?
              </label>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {opciones.map((respuesta) => (
                  <div key={`q5-${respuesta.id}`} className="form-check">
                    <input
                      required
                      className="form-check-input"
                      type="radio"
                      name="hongo_emergencia_quitado"
                      id={`hongo_emergencia_quitado-${respuesta.id}`}
                      value={respuesta.id}
                      {...register("hongo_emergencia_quitado")}
                    />
                    <label className="form-check-label" htmlFor={`hongo_emergencia_quitado-${respuesta.id}`}>
                      {respuesta.respuesta}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>
     


          <fieldset className="w-100 mt-3 p-3 border rounded">
            <legend className="fw-bold">Encendido de motores</legend>
            
            <div className="form-group mt-2">
              <label className="mb-1">
                1. ¿El ventilador de tiro inducido encendió correctamente?
              </label>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {opciones.map((respuesta) => (
                  <div key={`q5-${respuesta.id}`} className="form-check">
                    <input
                      required
                      className="form-check-input"
                      type="radio"
                      name="ventilador_qf1_on"
                      id={`ventilador_qf1_on-${respuesta.id}`}
                      value={respuesta.id}
                      {...register("ventilador_qf1_on")}
                    />
                    <label className="form-check-label" htmlFor={`ventilador_qf1_on-${respuesta.id}`}>
                      {respuesta.respuesta}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group mt-2">
              <label className="mb-1">
                2. ¿La bomba de recirculación de agua encendió correctamente?
              </label>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {opciones.map((respuesta) => (
                  <div key={`q5-${respuesta.id}`} className="form-check">
                    <input
                      required
                      className="form-check-input"
                      type="radio"
                      name="bomba_recirculacion_qf2_on"
                      id={`bomba_recirculacion_qf2_on-${respuesta.id}`}
                      value={respuesta.id}
                      {...register("bomba_recirculacion_qf2_on")}
                    />
                    <label className="form-check-label" htmlFor={`bomba_recirculacion_qf2_on-${respuesta.id}`}>
                      {respuesta.respuesta}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group mt-2">
              <label className="mb-1">
                3. ¿La dosificación de químicos encendió correctamente?
              </label>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {opciones.map((respuesta) => (
                  <div key={`q5-${respuesta.id}`} className="form-check">
                    <input
                      required
                      className="form-check-input"
                      type="radio"
                      name="dosificador_quimicos_on"
                      id={`dosificador_quimicos_on-${respuesta.id}`}
                      value={respuesta.id}
                      {...register("dosificador_quimicos_on")}
                    />
                    <label className="form-check-label" htmlFor={`dosificador_quimicos_on-${respuesta.id}`}>
                      {respuesta.respuesta}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* Ejemplos de campos adicionales propios del bloque de “motores” (opcionales) */}
          
          </fieldset>
      
          {
breaker_qf1_on==2||
breaker_qf2_on==2||
breaker_qf3_on==2||
breaker_qf4_on==2||
hongo_emergencia_quitado==2||
ventilador_qf1_on==2||
bomba_recirculacion_qf2_on==2||
dosificador_quimicos_on==2
          ?
  <div className="form-group" >
<label htmlFor="id_responsable_seguimiento_ckmotores">
  Si en el checklist marcaste alguna casilla en NO, ¿a quién se lo reportaste?
</label>

<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
  <select
    id="id_responsable_seguimiento_ckmotores"
    {...register("id_responsable_seguimiento_ckmotores", {
      required: true,
      valueAsNumber: true, // quita si prefieres string
    })}
    defaultValue=""  // para que tome el placeholder
  >
    <option value="" disabled>Seleccione un responsable…</option>

    {Array.isArray(responsable) &&
      responsable.map((row) => (
        <option key={row.id} value={row.id}>
          {row.Nombre}
        </option>
      ))
    }
  </select>
</div>

</div>




  :''}

          <div className="form-group mt-3">
              <label className="mb-1">Observaciones</label>
              <input
                type="text"
                className="form-control"
                id="observaciones"
                placeholder="Observación"
                {...register("observaciones")}
              />
            </div>

        {/* Botón único de envío */}
        <div className="w-100 mt-3">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>

      <p style={{ color: errors ? "red" : "inherit" }}>{errors}</p>
    </div>
  );
};

export default DCKBT;

