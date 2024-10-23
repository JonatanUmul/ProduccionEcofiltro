import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estilosFormatos.css'
import Swal from 'sweetalert2'; // Importar SweetAlert
const URL = process.env.REACT_APP_URL;
const DCKBT= ({ encabezado, EncName, fecha_creacion, id }) => {
  const { handleSubmit, register } = useForm();
  const [respuestas, setRespuestas] = useState([]);
  const [errors, setError]= useState('')
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


  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/respuestas`),

    ])
      .then(([RespuestasResponse]) => {
        setRespuestas(RespuestasResponse.data)
      
      }
      
      )
      .catch((error) => {
        setError('Uno o varios datos estan vacios')

        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${URL}/DCKMM`, {
        id_CKMM: id.toString(),
        id_grupoProduccion:formData.id_grupoProduccion,
    id_limpiezaGeneral: formData.id_limpiezaGeneral,
    id_AccionamientoCorrectoTornillos: formData.id_AccionamientoCorrectoTornillos,
    id_AccionamientoCorrectoCompuertaPolvos: formData.id_AccionamientoCorrectoCompuertaPolvos,
    id_VerificarAjusteCorrectoTornillosChumaceras: formData.id_VerificarAjusteCorrectoTornillosChumaceras,
    id_VerificarVisualmenteEstadoPaletasTornilloSeco: formData.id_VerificarVisualmenteEstadoPaletasTornilloSeco,
    id_VerificarTornillosGuardasDeSeguridad: formData.id_VerificarTornillosGuardasDeSeguridad,
    id_LubricaciónYLimpiezaExcesosGrasa: formData.id_LubricaciónYLimpiezaExcesosGrasa,
    id_creador:id_creador,
    observacion1: formData.observacion1,
    observacion2: formData.observacion2,
    observacion3: formData.observacion3,
    observacion4: formData.observacion4,
    observacion5: formData.observacion5,
    observacion6: formData.observacion6,
    observacion7: formData.observacion7
        
      });  Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
 
      // Redirigir a la página de TablaOT después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "/Home/TablaMaq";
      }, 1500);
    } catch (error) {
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

<form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
<div className="form-group mt-3">
  <label htmlFor="limpiezaGeneral">1. Limpieza general :</label>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
    {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
    {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
      <div key={respuesta.id} className="form-check">
        <input required
          className="form-check-input required"  
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
  

    <input  type="text" className="form-control mt-2" id="observacionLimpieza" placeholder="Observación" {...register("observacion1")}  />

</div>

<div className="form-group mt-3">
  <label htmlFor="limpiezaGeneral">2. Accionamiento correcto de los tornillos  :</label>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
    {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
    {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
      <div key={respuesta.id} className="form-check">
        <input required
          className="form-check-input required"  
          type="radio"
          name="calificacionLimpieza"
          id={`id_AccionamientoCorrectoTornillos${respuesta.id}`}
          value={respuesta.id}
          {...register("id_AccionamientoCorrectoTornillos")}
        />
        <label className="form-check-label" htmlFor={`id_AccionamientoCorrectoTornillos${respuesta.id}`}>
          {respuesta.respuesta}
        </label>
      </div>
    ))}
  </div>
  

    <input  type="text" className="form-control mt-2" id="observacionLimpieza" placeholder="observación" {...register("observacion2")}  />

</div>

<div className="form-group mt-3">
  <label htmlFor="limpiezaGeneral">3. Accionamiento correcto de compuerta de polvos  :</label>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
    {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
    {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
      <div key={respuesta.id} className="form-check">
        <input required
          className="form-check-input required"  
          type="radio"
          name="calificacionLimpieza"
          id={`id_AccionamientoCorrectoCompuertaPolvos${respuesta.id}`}
          value={respuesta.id}
          {...register("id_AccionamientoCorrectoCompuertaPolvos")}
        />
        <label className="form-check-label" htmlFor={`id_AccionamientoCorrectoCompuertaPolvos${respuesta.id}`}>
          {respuesta.respuesta}
        </label>
      </div>
    ))}
  </div>
  

    <input  type="text" className="form-control mt-2" id="observacionLimpieza" placeholder="observación" {...register("observacion3")}  />

</div>

<div className="form-group mt-3">
  <label htmlFor="limpiezaGeneral">4. Verificar el ajuste de los tornillos de las chumaceras   :</label>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
    {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
    {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
      <div key={respuesta.id} className="form-check">
        <input required
          className="form-check-input required"  
          type="radio"
          name="calificacionLimpieza"
          id={`id_VerificarAjusteCorrectoTornillosChumaceras${respuesta.id}`}
          value={respuesta.id}
          {...register("id_VerificarAjusteCorrectoTornillosChumaceras")}
        />
        <label className="form-check-label" htmlFor={`id_VerificarAjusteCorrectoTornillosChumaceras${respuesta.id}`}>
          {respuesta.respuesta}
        </label>
      </div>
    ))}
  </div>
  

    <input  type="text" className="form-control mt-2" id="observacionLimpieza" placeholder="observación" {...register("observacion4")}  />

</div>

<div className="form-group mt-3">
  <label htmlFor="limpiezaGeneral">5. Verificar visualmente el estado de las paletas en el tornillo seco:</label>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
    {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
    {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
      <div key={respuesta.id} className="form-check">
        <input required
          className="form-check-input required"  
          type="radio"
          name="calificacionLimpieza"
          id={`id_VerificarVisualmenteEstadoPaletasTornilloSeco${respuesta.id}`}
          value={respuesta.id}
          {...register("id_VerificarVisualmenteEstadoPaletasTornilloSeco")}
        />
        <label className="form-check-label" htmlFor={`id_VerificarVisualmenteEstadoPaletasTornilloSeco${respuesta.id}`}>
          {respuesta.respuesta}
        </label>
      </div>
    ))}
  </div>
  

    <input  type="text" className="form-control mt-2" id="observacionLimpieza" placeholder="observación" {...register("observacion5")}  />

</div>

<div className="form-group mt-3">
  <label htmlFor="limpiezaGeneral">6. Verificar tornillos de guardas de seguridad:</label>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
    {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
    {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
      <div key={respuesta.id} className="form-check">
        <input required
          className="form-check-input required"  
          type="radio"
          name="calificacionLimpieza"
          id={`id_VerificarTornillosGuardasDeSeguridad${respuesta.id}`}
          value={respuesta.id}
          {...register("id_VerificarTornillosGuardasDeSeguridad")}
        />
        <label className="form-check-label" htmlFor={`id_VerificarTornillosGuardasDeSeguridad${respuesta.id}`}>
          {respuesta.respuesta}
        </label>
      </div>
    ))}
  </div>
  

    <input  type="text" className="form-control mt-2" id="observacionLimpieza" placeholder="observación" {...register("observacion6")}  />

</div>

<div className="form-group mt-3">
  <label htmlFor="limpiezaGeneral">6. Lubricación y limpieza de excesos de grasa:</label>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
    {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
    {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
      <div key={respuesta.id} className="form-check">
        <input required
          className="form-check-input required"  
          type="radio"
          name="calificacionLimpieza"
          id={`id_LubricaciónYLimpiezaExcesosGrasa${respuesta.id}`}
          value={respuesta.id}
          {...register("id_LubricaciónYLimpiezaExcesosGrasa")}
        />
        <label className="form-check-label" htmlFor={`id_LubricaciónYLimpiezaExcesosGrasa${respuesta.id}`}>
          {respuesta.respuesta}
        </label>
      </div>
    ))}
  </div>
  

    <input  type="text" className="form-control mt-2" id="observacionLimpieza" placeholder="observación" {...register("observacion7")}  />

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

export default DCKBT;
