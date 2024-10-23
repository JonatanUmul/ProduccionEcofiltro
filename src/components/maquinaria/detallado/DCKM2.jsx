import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estilosFormatos.css'
import Swal from 'sweetalert2'; // Importar SweetAlert
const URL = process.env.REACT_APP_URL;

const DCKCM2= ({ encabezado, EncName, fecha_creacion, id }) => {
  const { handleSubmit, register } = useForm();
  const [respuestas, setRespuestas] = useState([]);
  const [errors, setError]= useState('');
  const [grupo, setGrupo]= useState([])
  const [id_creador, setid_creador] = useState('');
  
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })
  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/respuestas`),
      axios.get(`${URL}/GrupodeTrabajo`),

    ])
      .then(([RespuestasResponse, grupoResponse]) => {
        setRespuestas(RespuestasResponse.data)
        setGrupo(grupoResponse.data)
      }
      
      )
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${URL}/DCKM2`, {
        id_CKM2: id.toString(),
        id_grupoProduccion:formData.id_grupoProduccion,
        id_limpiezaGeneral: formData.id_limpiezaGeneral,
        id_accionamientoCorrectoTornillos: formData.id_accionamientoCorrectoTornillos,
        id_presionAire125PSI: formData.id_presionAire125PSI,
        id_vaciarAguaUnidadMantenimientio: formData.id_vaciarAguaUnidadMantenimientio,
        id_accionamientoCompuertaPolvos: formData.id_accionamientoCompuertaPolvos,
        id_inspeccionTornillosObjetosExtraños: formData.id_inspeccionTornillosObjetosExtraños,
        id_ajusteManuelChumaceras: formData.id_ajusteManuelChumaceras,
        id_inspeccionPaletaTornilloSeco: formData.id_inspeccionPaletaTornilloSeco,
        id_creador:id_creador,
        observacion1: formData.observacion1,
        observacion2: formData.observacion2,
        observacion3: formData.observacion3,
        observacion4: formData.observacion4,
        observacion5: formData.observacion5,
        observacion6: formData.observacion6,
        observacion7: formData.observacion7,
        observacion8: formData.observacion8,
     
        
      }); Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
 
      // Redirigir a la página de TablaOT después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "/Home/TablaMaq";
      }, 1500);
    }catch (error) {
      // Mostrar el mensaje de error del servidor
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        // Si no hay un mensaje de error específico, mostrar un mensaje genérico
        setError('Error al enviar los datos al servidor.');
      }
      console.error("Error al enviar los datos:", error);
    }
  };


 
  return (
    <div className="mt-1">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>{encabezado}.{EncName}</h4>
     
      <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
  <div className="card-body">
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
      <label htmlFor="materiaPrima" className="form-label" style={{ marginRight: "10px", width: "150px" }}>
        Orden:
      </label>
      <p id="materiaPrima" className="form-control-static" style={{ marginBottom: "0" }}>{encabezado} - {EncName}</p>
    </div>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <label htmlFor="fecha" className="form-label" style={{ marginRight: "10px", width: "150px" }}>
        Fecha de Creación:
      </label>
      <p id="fecha" className="form-control-static" style={{ marginBottom: "0" }}>{formatFecha(fecha_creacion)}</p>
    </div>

    <div className="mt-2">
    <strong>
      <label htmlFor="aserradero" className="form-label">
        Grupo de Producción
      </label>
      <select className="form-select" id="id_grupoProduccion" {...register("id_grupoProduccion")} required>
        <option value="">-- Selecciona un grupo --</option>
        {Array.isArray(grupo.rows) && grupo.rows.length > 0 && grupo.rows.map((grupo) => (
          <option key={grupo.id} value={grupo.id} required>
            {grupo.grupos}
          </option>
        ))}
      </select>
    </strong>
  </div>
 
</div>

</div>

<form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
<div className="form-group mt-3">
  <label htmlFor="limpiezaGeneral">1. Limpieza General:</label>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
    {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
    {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
      <div key={respuesta.id} className="form-check">
        <input
        required
          className="form-check-input
          required"  
          type="radio"
          name="calificacionLimpieza"
          id={`id_limpiezaGeneral${respuesta.id}`}
          value={respuesta.id}
          {...register("id_limpiezaGeneral")}
        />
        <label className="form-check-label" htmlFor={`id_limpiezaGeneral${respuesta.id}`}>
          {respuesta.respuesta}
        </label>
      </div>
    ))}
  </div>
  

    <input
     type="text" className="form-control mt-2" id="observacionLimpieza" placeholder="Observación" {...register("observacion1")}  />

</div>


  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">2. Accionamiento Correcto de Tornillos:</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
          required
            className="form-check-input
            required"
            type="radio"
            name="calificacionTornillos"
            id={`id_accionamientoCorrectoTornillos-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_accionamientoCorrectoTornillos")}
          />  
          <label className="form-check-label" htmlFor={`id_accionamientoCorrectoTornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    <input
     type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion2")}  />
  </div>

  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">3. Presion de Aire (125 PSI):</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
          required
            className="form-check-input
            required"
            type="radio"
            name="calificacionTornillos"
            id={`id_presionAire125PSI-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_presionAire125PSI")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
    <input
     type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion3")}  />
  </div>

  <div className="form-group">
    <label htmlFor="accionamientoTornillos">4.Vaciar Agua en Unidad de Mantenimiento:</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
          required
            className="form-check-input
            required"
            type="radio"
            name="calificacionTornillos"
            id={`id_vaciarAguaUnidadMantenimientio-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_vaciarAguaUnidadMantenimientio")}
          />
          <label className="form-check-label" htmlFor={`id_vaciarAguaUnidadMantenimientio-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    <input
     type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion4")}  />
  </div>

  <div className="form-group">
    <label htmlFor="accionamientoTornillos">5. Accionamiento Compuerta de Polvos:</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
          required
            className="form-check-input
            required"
            type="radio"
            name="calificacionTornillos"
            id={`id_accionamientoCompuertaPolvos-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_accionamientoCompuertaPolvos")}
          />
          <label className="form-check-label" htmlFor={`id_accionamientoCompuertaPolvos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    <input
     type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion5")}  />
  </div>

  

  <div className="form-group">
    <label htmlFor="accionamientoTornillos">6. Inspección De Tornillo Para Objetos Extraños:</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
          required
            className="form-check-input
            required"
            type="radio"
            name="calificacionTornillos"
            id={`id_inspeccionTornillosObjetosExtraños-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_inspeccionTornillosObjetosExtraños")}
          />
          <label className="form-check-label" htmlFor={`id_inspeccionTornillosObjetosExtraños-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    <input
     type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion6")}  />
  </div>

  <div className="form-group">
    <label htmlFor="accionamientoTornillos">7. Ajuste Manual de Chumaceras (Tornillo Seco):</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
          required
            className="form-check-input
            required"
            type="radio"
            name="calificacionTornillos"
            id={`id_ajusteManuelChumaceras-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_ajusteManuelChumaceras")}
          />
          <label className="form-check-label" htmlFor={`id_ajusteManuelChumaceras-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    <input
     type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion7")}  />
  </div>

  <div className="form-group">
    <label htmlFor="accionamientoTornillos">8. Inspeccion Paletas de Mezclado (Tornillo Seco):</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
          required
            className="form-check-input
            required"
            type="radio"
            name="calificacionTornillos"
            id={`id_inspeccionPaletaTornilloSeco-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_inspeccionPaletaTornilloSeco")}
          />
          <label className="form-check-label" htmlFor={`id_inspeccionPaletaTornilloSeco-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    <input
     type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion8")}  />
  </div>

  <p style={{ color: errors ? 'red' : 'inherit' }}>{errors}</p>
  {/* Agrega más preguntas aquí siguiendo el mismo patrón */}
  
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Guardar</button>
  </div>
</form>


    </div>
  );
};

export default DCKCM2;
