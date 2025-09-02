import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estilosFormatos.css'
import Swal from 'sweetalert2'; // Importar SweetAlert
const URL = process.env.REACT_APP_URL;
const DCKBT= ({ encabezado, EncName, fecha_creacion, id }) => {
  const { handleSubmit, register, watch } = useForm();
  const [respuestas, setRespuestas] = useState([]);
  const [errors, setError]= useState('');
  const [grupo, setGrupo]= useState([])
  const [id_creador, setid_creador] = useState('');
  const [nombre_user, setnombre_user] = useState('');
  const [responsable, setResponsables] = useState({});
  console.log('res por aca',responsable)
  let tanque_agua_nivel_OK =watch('nivel_agua_correcto')
  const area_scrubber_despejada=parseInt(watch('area_scrubber_despejada'))
  const nivel_agua_correcto=watch('nivel_agua_correcto')
  const flote_buenas_condiciones=watch('flote_buenas_condiciones')
  const llave_paso_abierta=watch('llave_paso_abierta')
  const  existe_agua_soda=watch('existe_agua_soda')
  const  tablero_principal_libre=watch('tablero_principal_libre')
  const  breaker_principal_on=watch('breaker_principal_on')
  const Operariosresponsables=[1,7,8,9,77,78,79]

 
   
useEffect(()=>{
  setid_creador(localStorage.getItem('id_creador'))
  setnombre_user(localStorage.getItem('nombre'))
})
  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/respuestas`),
      axios.get(`${URL}/GrupodeTrabajo`),
      axios.get(`${URL}/Operariosresponsables/${Operariosresponsables}`),

    ])
      .then(([RespuestasResponse, grupoResponse, grupoResponsables]) => {
        setRespuestas(RespuestasResponse.data)
        setGrupo(grupoResponse.data)
        setResponsables(grupoResponsables.data.rows)
      }
      
      )
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${URL}/DCKSCRUBBER`, {
        id_dckscrubber: id.toString(),
        area_scrubber_despejada: formData.area_scrubber_despejada,
        nivel_agua_correcto: formData.nivel_agua_correcto,
        flote_buenas_condiciones: formData.flote_buenas_condiciones,
        agua_limpia:formData.agua_limpia,
        llave_paso_abierta: formData.llave_paso_abierta,
        existe_agua_soda: formData.existe_agua_soda,
        tablero_principal_libre: formData.tablero_principal_libre,
        breaker_principal_on: formData.breaker_principal_on,
        observaciones: formData.observaciones,
        id_creador:id_creador,
        id_responsable_seguimiento_ckinicial:formData.id_responsable_seguimiento_ckinicial
        
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
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <label htmlFor="fecha" className="form-label" style={{ marginRight: "10px", width: "150px" }}>
        Responsable: 
      </label>
      <p id="fecha" className="form-control-static" style={{ marginBottom: "0" }}>{nombre_user}</p>
    </div>

</div>

</div>

<form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
<div className="form-group mt-3">
  <label htmlFor="limpiezaGeneral">1. ¿El área del scrubber está despejada de personas y con el acceso libre?</label>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
    {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
    {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
      <div key={respuesta.id} className="form-check">
        <input required
          className="form-check-input"  
          type="radio"
          name="area_scrubber_despejada"
          id={`area_scrubber_despejada${respuesta.id}`}
          value={respuesta.id}
          {...register("area_scrubber_despejada")}
          />
        <label className="form-check-label" htmlFor={`area_scrubber_despejada${respuesta.id}`}>
          {respuesta.respuesta}
        </label>
      </div>
    ))}
  </div>
  
</div>

{/*Esto depende de la pregunta anterior si  es no, se muestra esta pregunta*/}

  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">2. ¿El tanque tiene agua, está en el nivel correcto y en óptimas condiciones para su uso?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input required"
            type="radio"
            name="nivel_agua_correcto"
            id={`nivel_agua_correcto-${respuesta.id}`}
            value={respuesta.id}
            {...register("nivel_agua_correcto")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
  </div>
  {/*Si la respuesta de la anterior es no, se muestran estas otras 2  */}
{tanque_agua_nivel_OK==2 ?
<>
  <div className="form-group" style={{ background:'gray'}}>
    <label htmlFor="accionamientoTornillos">2.1 ¿está el flotador funcionando bien?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", background:'gray'}}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input required"
            type="radio"
            name="flote_buenas_condiciones"
            id={`flote_buenas_condiciones-${respuesta.id}`}
            value={respuesta.id}
            {...register("flote_buenas_condiciones")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
  </div>
  <div className="form-group" style={{ background:'gray'}}>
    <label htmlFor="accionamientoTornillos">2.2 ¿Está abierta la llave de paso del agua?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input required"
            type="radio"
            name="llave_paso_abierta"
            id={`llave_paso_abierta-${respuesta.id}`}
            value={respuesta.id}
            {...register("llave_paso_abierta")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
      </div>


      <div className="form-group" style={{ background:'gray'}}>
    <label htmlFor="accionamientoTornillos">2.3 ¿El agua está sucia?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input required"
            type="radio"
            name="agua_limpia"
            id={`agua_limpia-${respuesta.id}`}
            value={respuesta.id}
            {...register("agua_limpia")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
      </div> 

      
      </>
      :''}
  {/* */}
  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">3. ¿El tanque de químicos tiene agua con soda?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input required"
            type="radio"
            name="existe_agua_soda"
            id={`existe_agua_soda-${respuesta.id}`}
            value={respuesta.id}
            {...register("existe_agua_soda")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
  </div>

  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">4. ¿Está el área del tablero principal del scrubber libre de obstrucciones?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input required"
            type="radio"
            name="tablero_principal_libre"
            id={`tablero_principal_libre-${respuesta.id}`}
            value={respuesta.id}
            {...register("tablero_principal_libre")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
      </div>

  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">5. ¿Está el breaker QF en ON?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input required
            className="form-check-input required"
            type="radio"
            name="breaker_principal_on"
            id={`breaker_principal_on-${respuesta.id}`}
            value={respuesta.id}
            {...register("breaker_principal_on")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
  </div>
  <input  type="text" className="form-control mt-2" id="observaciones" placeholder="Observación" {...register("observaciones")}  />

{area_scrubber_despejada==2 || nivel_agua_correcto==2 || flote_buenas_condiciones==2 ||llave_paso_abierta==2 || existe_agua_soda==2 || tablero_principal_libre==2 || breaker_principal_on==2 ?
  <div className="form-group" >
<label htmlFor="accionamientoTornillos">
  Si en el checklist marcaste alguna casilla en NO, ¿a quién se lo reportaste?
</label>

<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
  <select
    id="id_responsable_seguimiento_ckinicial"
    {...register("id_responsable_seguimiento_ckinicial", {
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
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Guardar</button>
  </div>
</form>
<p style={{ color: errors ? 'red' : 'inherit' }}>{errors}</p>

    </div>
  );
};

export default DCKBT;
