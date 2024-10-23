  import React, { useEffect, useState } from "react";
  import { useForm } from "react-hook-form";
  import axios from "axios";
  import Swal from 'sweetalert2'; // Importar SweetAlert
  import { formatFecha } from "../../utilidades/FormatearFecta";
  const URL = process.env.REACT_APP_URL;
  const DCPS= ({ encabezado, EncName, fecha_creacion, id }) => {
    const { handleSubmit, register } = useForm();
    const [prensador, setPrensador] = useState([]);
    const [maq, setTMaquinaria] = useState([]);
    const [calificacion, setCalificaciones] = useState([]);
    const [modeloUF, setModeloUf] = useState([]);
    const [id_creador, setid_creador] = useState('');
  
    useEffect(()=>{
      setid_creador(localStorage.getItem('id_creador'))
    })
    const id_area=2;
    const id_area2=9;
    const maquinaria = 'Prensa';
    useEffect(() => {
      Promise.all([
        axios.get(`${URL}/Operarios/${id_area || 'null'}/${id_area2 || 'null'}`),
        axios.get(`${URL}/maquinaria/${maquinaria}`),
        axios.get(`${URL}/calificacion`),
        axios.get(`${URL}/ModelosUF`),
      ])
        .then(([PrensadorResponse, MoldeResponse, CalificacionesResponse, ModelosResponse]) => {
          setPrensador(PrensadorResponse.data);
          setTMaquinaria(MoldeResponse.data);
          setCalificaciones(CalificacionesResponse.data);
          setModeloUf(ModelosResponse.data)
        }
      
        )
        .catch((error) => {
          console.log("Error al obtener los datos:", error);
        });
    }, []);
    console.log(maq)
    const onSubmit = async (formData) => {
      console.log('Datod enviaados',formData)
      try {
        const response = await axios.post(`${URL}/DCPS`, {
          id_DCPS: id.toString(),
          codigo: formData.codigo,
          id_prensador: formData.id_prensador,
          id_auditor: formData.id_auditor,
          id_prensa: formData.id_molde,
          id_calificacion: formData.id_calificacion,
          id_mod: formData.id_modelo,
          id_creador:id_creador
        }); Swal.fire({
          icon: 'success',
          title: 'Guardado exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
  
        // Redirigir a la página de TablaOT después de 1.5 segundos
        setTimeout(() => {
          window.location.href = "/Home/TablaCP";
        }, 1500);
      } catch (error) {
        console.error("Error al enviar los datos:", error);
      }
    };
console.log('id des encabezado',id)


    return (
      <div className="mt-4">
        <h4 style={{ textAlign: 'center', color: 'gray' }}>Pulida Superior</h4>
        <div className="card">
          <div className="card-body">
            <label htmlFor="materiaPrima" className="form-label">
              Orden
            </label>
            <p id="materiaPrima" className="form-control-static">{encabezado} - {EncName}</p>
          
            <label htmlFor="fecha" className="form-label">
              Fecha de Creación
            </label>
            <p id="fecha" className="form-control-static">{formatFecha(fecha_creacion)}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">
          
        <div className="col-md-6">
          <label htmlFor="Codigo">Codigo</label>
          <input className="form-control" type="text" id='codigo' {...register('codigo')}/>

          
        </div>  
          <div className="col-md-6">
            <label htmlFor="aserradero" className="form-label">
              Prensador
            </label>
            <select className="form-select" id="id_prensador" {...register("id_prensador")}>
           
            <option value="" disabled selected>Seleccione...</option>
            {prensador.rows && Array.isArray(prensador.rows) && prensador.rows.filter(prensador =>  prensador.id_area === 2).map((prensador) => (
              <option key={prensador.id} value={prensador.id}>
                {prensador.Nombre}
              </option>
            ))}
          </select>
          </div>

          <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Auditor
          </label>
          <select className="form-select" id="id_auditor" {...register("id_auditor")}>
         
          <option value="" disabled selected>Seleccione...</option>
          {prensador.rows && Array.isArray(prensador.rows) && prensador.rows.filter(prensador =>  prensador.id_area === 9).map((prensador) => (
            <option key={prensador.id} value={prensador.id}>
              {prensador.Nombre}
            </option>
          ))}
        </select>
        </div>
          <div className="col-md-6">
            <label htmlFor="aserradero" className="form-label">
              Molde
            </label>
            <select className="form-select" id="id_molde" {...register("id_molde")}>
            <option value="" disabled selected>Seleccione...</option>
            {Array.isArray(maq.rows)
              && maq.rows.length>0 && maq.rows.map((molde) => (
                <option key={molde.id_maq} value={molde.id_maq}>
                  {molde.nombre_maq}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="aserradero" className="form-label">
              Modelo
            </label>
            <select className="form-select" id="id_modelo" {...register("id_modelo")}>
            <option value="" disabled selected>Seleccione...</option>
            {Array.isArray(modeloUF.rows)
              && modeloUF.rows.length>0 && modeloUF.rows.map((modelo) => (
                <option key={modelo.id_mod} value={modelo.id_mod}>
                  {modelo.nombre_modelo}
                </option>
              ))}
            </select>
          </div>
          <div>
          <h5>Calificación:</h5>
          <div style={{ display: "flex", flexDirection: 'column', alignItems: 'flex-start' }} className="form-check form-check-inline mt-2 responsive">
            {/* Itera sobre el array de calificaciones y muestra las opciones de radio */}
            {Array.isArray(calificacion.rows) && calificacion.rows.length > 0 && calificacion.rows.map((calificacion) => (
              <div key={calificacion.id} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="calificacion"
                  id={`checkbox-calificacion-${calificacion.id}`}
                  value={calificacion.id}
                  {...register("id_calificacion")}
                />
                <label className="form-check-label ml-2" htmlFor={`calificacion-${calificacion.id}`}>
                <strong>  {calificacion.calificacion}</strong>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        
        
        
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default DCPS;
