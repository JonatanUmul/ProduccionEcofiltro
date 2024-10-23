import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
import DiametroUF from '../../utilidades/DiametroUf'
const URL = process.env.REACT_APP_URL;

const DCPB = ({ encabezado, EncName, fecha_creacion, id }) => {
  const { handleSubmit, register } = useForm();
  const [turno, setTurno] = useState([]);
  const [maq, setTMaquinaria] = useState([]);
  const [modeloUF, setModeloUf] = useState([]);
  const [id_creador, setid_creador] = useState('');
  
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })
  const maquinaria = 'Prensa';
  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/maquinaria/${maquinaria}`),
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/Turnos`),
    ])
      .then(([MoldeResponse, ModelosResponse, TurnosResponse]) => {
        setTMaquinaria(MoldeResponse.data);
        setModeloUf(ModelosResponse.data);
        setTurno(TurnosResponse.data)
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    console.log('Datos enviados', formData);
    try {
      const response = await axios.post(`${URL}/DCPCD`, {
        id_cpcd: id.toString(),
        id_turno: formData.id_turno,
        molde: formData.molde,
        id_mod:formData.id_mod,
        diametro:formData.diametro,
        barroLB: formData.barroLB,
        aserrinLB:formData.aserrinLB,
        pesouf: formData.pesouf,
        alturaH1: formData.alturaH1,
        alturaH2: formData.alturaH2,
        grosor1: formData.grosor1,
        grosor2: formData.grosor2,
        grosorFondo: formData.grosorFondo,
        id_creador:id_creador
     
      });
      // Mostrar SweetAlert de éxito
      Swal.fire({
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

  return (
    <div className="mt-4">
      <h4 className="text-center text-muted">Calidad Producción Diario</h4>
      <div className="card">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <label className="form-label">Orden</label>
            <p className="form-control-static">{encabezado} - {EncName}</p>
            <label className="form-label">Fecha de Creación</label>
            <p className="form-control-static">{formatFecha(fecha_creacion)}</p>
          </div>
          <div className="img-fluid">
            <DiametroUF />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="id_turno" className="form-label">Turno</label>
            <select className="form-select" id="id_turno" {...register("id_turno")}>
            <option value="" disabled selected>Seleccione...</option>
              {Array.isArray(turno.rows) && turno.rows.map((turno) => (
                <option key={turno.id} value={turno.id}>{turno.turno}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="id_mod" className="form-label">Modelo UF</label>
            <select className="form-select" id="id_mod" {...register("id_mod")} required>
            <option value="" disabled selected>Seleccione...</option>
              {Array.isArray(modeloUF.rows) && modeloUF.rows.map((modeloUF) => (
                <option key={modeloUF.id_mod} value={modeloUF.id_mod}>{modeloUF.nombre_modelo}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="barroLB" className="form-label">Barro LB</label>
            <input className="form-control" type="text" id="barroLB" {...register('barroLB')} required/>
          </div>

          <div className="col-md-6">
            <label htmlFor="aserrinLB" className="form-label">Aserrin LB</label>
            <input className="form-control" type="text" id="aserrinLB" {...register('aserrinLB')} required/>
          </div>
          

          <div className="col-md-6">
            <label htmlFor="molde" className="form-label">Molde</label>
            <select className="form-select" id="molde" {...register("molde")} required>
              <option>--</option>
              {Array.isArray(maq.rows) && maq.rows.map((maq) => (
                <option key={maq.id_maq} value={maq.id_maq}>{maq.nombre_maq}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
          <label htmlFor="pesouf" className="form-label">Peso UF</label>
          <input className="form-control" type="text" id="pesouf" {...register('pesouf')} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="diametro" className="form-label">Diametro</label>
          <input className="form-control" type="text" id="diametro" {...register('diametro')} required />
        </div>

          <div className="row mb-3 mt-3">
          <div className="col-md-6 bg-light p-3" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
            <label className="text-center">Altura</label>
            <div className="row g-3">
              <div className="col">
                <label htmlFor="alturaH1" className="form-label">H1</label>
                <input className="form-control" type="text" id="alturaH1" {...register('alturaH1')} required />
              </div>
              <div className="col">
                <label htmlFor="alturaH2" className="form-label">H2</label>
                <input className="form-control" type="text" id="alturaH2" {...register('alturaH2')} required />
              </div>
            </div>
          </div>
        
          <div className="col-md-6 bg-light p-3" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
            <label className="text-center">Grosor</label>
            <div className="row g-3">
              <div className="col">
                <label htmlFor="grosor1">G1</label>
                <input className="form-control" type="text" id="grosor1" {...register('grosor1')} required />
              </div>
              <div className="col">
                <label htmlFor="grosor2">G2</label>
                <input className="form-control" type="text" id="grosor2" {...register('grosor2')} required/>
              </div>
              <div className="col">
                <label htmlFor="grosorFondo">GF</label>
                <input className="form-control" type="text" id="grosorFondo" {...register('grosorFondo')} required/>
              </div>
            </div>
          </div>
        </div>
        

          <div className="col-12">
            <button type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DCPB;
