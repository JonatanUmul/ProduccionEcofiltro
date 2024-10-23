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
      const response = await axios.post(`${URL}/DCKPM`, {
        id_CKPM: id.toString(),
        id_grupoProduccion:formData.id_grupoProduccion,
        id_GrupoAnteriorCompletoSatisfactoriamenteLimpiezaGeneral: formData.id_GrupoAnteriorCompletoSatisfactoriamenteLimpiezaGeneral,
        id_AccionamientoCorrectoMotorBomba: formData.id_AccionamientoCorrectoMotorBomba,
        id_NivelDeAceiteEnTanqueHidraulicoCorrecto: formData.id_NivelDeAceiteEnTanqueHidraulicoCorrecto,
        id_MangueraHidraulicaEstaEnBuenEstadoSinFugasAceite: formData.id_MangueraHidraulicaEstaEnBuenEstadoSinFugasAceite,
        id_FuncionamientoCorrectamenteCilindroHidraulicoParaSubirBajar: formData.id_FuncionamientoCorrectamenteCilindroHidraulicoParaSubirBajar,
        id_EstructuraPrensaEncuentraSinFisuras: formData.id_EstructuraPrensaEncuentraSinFisuras,
        id_EstructuraDeMoldesEncuentraSinFisurasDefectos: formData.id_EstructuraDeMoldesEncuentraSinFisurasDefectos,
        id_LimpiezaLubricacionBarrasBujesEquipoAnterior: formData.id_LimpiezaLubricacionBarrasBujesEquipoAnterior,
        id_IntegridadBujesBarrasPrincipalesOptimas: formData.id_IntegridadBujesBarrasPrincipalesOptimas,

        
        observacion1: formData.observacion1,
        observacion2: formData.observacion2,
        observacion3: formData.observacion3,
        observacion4: formData.observacion4,
        observacion5: formData.observacion5,
        observacion6: formData.observacion6,
        observacion7: formData.observacion7,
        observacion8: formData.observacion8,
        observacion9: formData.observacion9,
        id_creador:id_creador
        
      });   Swal.fire({
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
  <label htmlFor="limpiezaGeneral">1. ¿El grupo anterior ha completado satisfactoriamente la limpieza general?</label>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
    {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
    {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
      <div key={respuesta.id} className="form-check">
        <input required
          className="form-check-input"  
          type="radio"
          name="id_GrupoAnteriorCompletoSatisfactoriamenteLimpiezaGeneral"
          id={`id_GrupoAnteriorCompletoSatisfactoriamenteLimpiezaGeneral${respuesta.id}`}
          value={respuesta.id}
          {...register("id_GrupoAnteriorCompletoSatisfactoriamenteLimpiezaGeneral")}
          />
        <label className="form-check-label" htmlFor={`id_visorFuncionandoNivelDeAguaVisible${respuesta.id}`}>
          {respuesta.respuesta}
        </label>
      </div>
    ))}
  </div>
  

    <input  type="text" className="form-control mt-2" id="observacionLimpieza" placeholder="Observación" {...register("observacion1")}  />

</div>


  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">2. ¿Se ha verificado el correcto accionamiento del motor de la bomba?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input "
            type="radio"
            name="calificacionTornillos"
            id={`id_AccionamientoCorrectoMotorBomba-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_AccionamientoCorrectoMotorBomba")}
          />  
          <label className="form-check-label" htmlFor={`id_accionamientoCorrectoSelenoideAlimentacion-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    <input  type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion2")}  />
  </div>

  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">3. ¿Se ha verificado el nivel de aceite en el tanque hidráulico?:</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input "
            type="radio"
            name="id_NivelDeAceiteEnTanqueHidraulicoCorrecto"
            id={`id_NivelDeAceiteEnTanqueHidraulicoCorrecto-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_NivelDeAceiteEnTanqueHidraulicoCorrecto")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
    <input  type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion3")}  />
  </div>

  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">4. ¿La manguera hidráulica está en buen estado y sin fugas de aceite?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input required"
            type="radio"
            name="id_MangueraHidraulicaEstaEnBuenEstadoSinFugasAceite"
            id={`id_MangueraHidraulicaEstaEnBuenEstadoSinFugasAceite-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_MangueraHidraulicaEstaEnBuenEstadoSinFugasAceite")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
    <input  type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion4")}  />
  </div>

  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">5. ¿Se ha verificado el funcionamiento del cilindro hidráulico para subir y bajar correctamente?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input required"
            type="radio"
            name="id_FuncionamientoCorrectamenteCilindroHidraulicoParaSubirBajar"
            id={`id_FuncionamientoCorrectamenteCilindroHidraulicoParaSubirBajar-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_FuncionamientoCorrectamenteCilindroHidraulicoParaSubirBajar")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
    <input  type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion5")}  />
  </div>

  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">6. ¿La estructura de la prensa se encuentra sin fisuras?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input required"
            type="radio"
            name="id_EstructuraPrensaEncuentraSinFisuras"
            id={`id_EstructuraPrensaEncuentraSinFisuras-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_EstructuraPrensaEncuentraSinFisuras")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
    <input  type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion6")}  />
  </div>

  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">7.¿La estructura de los moldes se encuentra sin fisuras ni defectos?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input required"
            type="radio"
            name="id_EstructuraDeMoldesEncuentraSinFisurasDefectos"
            id={`id_EstructuraDeMoldesEncuentraSinFisurasDefectos-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_EstructuraDeMoldesEncuentraSinFisurasDefectos")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
    <input  type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion7")}  />
  </div>

  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">8. ¿Se realizó la limpieza y lubricación adecuada de barras y bujes por el equipo anterior?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input required"
            type="radio"
            name="id_LimpiezaLubricacionBarrasBujesEquipoAnterior"
            id={`id_LimpiezaLubricacionBarrasBujesEquipoAnterior-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_LimpiezaLubricacionBarrasBujesEquipoAnterior")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
    <input  type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion8")}  />
  </div>


  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">9. 
¿La integridad de los bujes y barras principales se encuentra en óptimas condiciones?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input required"
            type="radio"
            name="id_IntegridadBujesBarrasPrincipalesOptimas"
            id={`id_IntegridadBujesBarrasPrincipalesOptimas-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_IntegridadBujesBarrasPrincipalesOptimas")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
    <input  type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion9")}  />
  </div>

  

 
 
  {/* Agrega más preguntas aquí siguiendo el mismo patrón */}
  
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Guardar</button>
  </div>
</form>
<p style={{ color: errors ? 'red' : 'inherit' }}>{errors}</p>

    </div>
  );
};

export default DCKBT;
