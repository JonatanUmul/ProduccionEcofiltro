import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estilosFormatos.css'
import Swal from 'sweetalert2'; // Importar SweetAlert
const URL = process.env.REACT_APP_URL;

const DCKBT= ({ encabezado, EncName, fecha_creacion, id }) => {
  const { handleSubmit, register } = useForm();
  const [estadosMaq, setEstadosMaq] = useState([]);
  const [revision, setRevision]= useState([]);
  const [proveedores, setProveedores]= useState([]);
  const [responsable, setResponsable]= useState([]);
  const [tipoMantenimiento, settipoMantenimiento]= useState([]);
  const [errors, setError]= useState('')
  const [id_creador, setid_creador] = useState('');
  
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })
const id_area=8
  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/EstadosMaq`),
      axios.get(`${URL}/RevisionMaquinaria`),
      axios.get(`${URL}/Provedores`),
      axios.get(`${URL}/Operarios/${id_area}`),
      axios.get(`${URL}/TipoMantenimiento`),
    ])
      .then(([RespuestasResponse, RevisionResponse, ProveedoresResponse, OperarioResponse,TipoMantenimientoResponse]) => {
        setEstadosMaq(RespuestasResponse.data)
        setRevision(RevisionResponse.data)
        setProveedores(ProveedoresResponse.data)
        setResponsable(OperarioResponse.data)
        settipoMantenimiento(TipoMantenimientoResponse.data)
      }
      
      )
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${URL}/DMEXT`, {
        id_MEXT: id.toString(),
        id_estadomaq: formData.id_estadomaq,
        id_tipoMantenimiento:formData.id_tipoMantenimiento,
        id_revision:formData.id_revision ,
        id_proveedor:formData.id_proveedor ,
        id_responsable:formData.id_responsable ,
        detalle:formData.detalle ,
        creador:id_creador
    
        
      });Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
 
      // Redirigir a la página de TablaOT después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "/Home/TableMantenimientoMaq";
      }, 1500);
    } catch (error) {
      setError('Uno o varios datos estan vacios')
      
      console.error("Error al enviar los datos:", error);
    }
  };


 
  return (
    <div className="container mt-4">
      <h4 className="text-center text-secondary">{encabezado}.{EncName}</h4>
      <hr />
      
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label text-end">Orden:</label>
            <div className="col-sm-9">
              <p className="form-control-static">{encabezado} - {EncName}</p>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label text-end">Fecha de Creación:</label>
            <div className="col-sm-9">
              <p className="form-control-static">{formatFecha(fecha_creacion)}</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <div className="container">
        

        <div className="row mb-3">

            <div className="col-md-6">
              <label htmlFor="aserradero" className="form-label">Estado de la Maquina:</label>
              <select className="form-select" id="id_estadomaq" {...register("id_estadomaq")} required>
                {Array.isArray(estadosMaq.rows) && estadosMaq.rows.length > 0 && estadosMaq.rows.map((estadosMaq) => (
                  <option key={estadosMaq.id_est} value={estadosMaq.id_est}>
                    {estadosMaq.estado}
                  </option>
                ))}
              </select>
            </div>


          <div className="col-md-6">
              <label htmlFor="aserradero" className="form-label">Tipo de Mantenimiento:</label>
              <select className="form-select" id="id_tipoMantenimiento" {...register("id_tipoMantenimiento")} required>
                {Array.isArray(tipoMantenimiento.rows) && tipoMantenimiento.rows.length > 0 && tipoMantenimiento.rows.map((tipoMantenimiento) => (
                  <option key={tipoMantenimiento.id} value={tipoMantenimiento.id}>
                    {tipoMantenimiento.tipo}
                  </option>
                ))}
              </select>
            </div>
          
            <div className="col-md-6">
              <label htmlFor="aserradero" className="form-label">Revisión:</label>
              <select className="form-select" id="id_revision" {...register("id_revision")} required>
                {Array.isArray(revision.rows) && revision.rows.length > 0 && revision.rows.map((revision) => (
                  <option key={revision.id} value={revision.id}>
                    {revision.tipo}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="aserradero" className="form-label">Proveedor:</label>
              <select className="form-select" id="id_proveedor" {...register("id_proveedor")} required>
                {Array.isArray(proveedores.rows) && proveedores.rows.length > 0 && proveedores.rows.map((proveedor) => (
                  <option key={proveedor.id_prov} value={proveedor.id_prov}>
                    {proveedor.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="aserradero" className="form-label">Responsable:</label>
              <select className="form-select" id="id_responsable" {...register("id_responsable")} required>
                {Array.isArray(responsable.rows) && responsable.rows.length > 0 && responsable.rows.map((responsable) => (
                  <option key={responsable.id} value={responsable.id}>
                    {responsable.Nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="detalle" className="form-label">Detalle del Mantenimiento:</label>
              <textarea className="form-control" id="detalle" rows="3" {...register('detalle')} required></textarea>
            </div>
          </div>
        </div>
        <p style={{ color: 'red' }}>{errors}</p>
        <div className="row mb-3 justify-content-center">
          <div className="col-6 text-center">
            <button type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DCKBT;
