import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
const URL = process.env.REACT_APP_URL;

const DCPB = ({ encabezado, EncName, fecha_creacion, id }) => {
  const { handleSubmit, register } = useForm();
  const [turno, setTurno] = useState([]);
  const [aserradero, setAserradero] = useState([]);
  const [formulador, setPrensador] = useState([]);
  const [error, setError]=useState('');
  const [modelos, setModelos] = useState([]);
  const id_area=2;
  const id_area2=9;
  const [formula2, setFormula2]=useState(false)
  const [id_creador, setid_creador] = useState('');
  
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })


  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/Aserradero`),
      axios.get(`${URL}/Turnos`),
      axios.get(`${URL}/Operarios/${id_area || 'null'}/${id_area2 || 'null'}`),
      axios.get(`${URL}/ModelosUF`),
    ])
      .then(([AserraderoResponse, TurnosResponse, operarioResponse, ModelosufResponse]) => {
        setTurno(TurnosResponse.data)
        setAserradero(AserraderoResponse.data)
        setPrensador(operarioResponse.data)
        setModelos(ModelosufResponse.data);
      })
      .catch((error) => {
        setError(error.json)
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    console.log('Datos enviados', formData);
    try {
      const response = await axios.post(`${URL}/DCPFM`, {
        id_cfmp: id.toString(),
        id_turno: formData.id_turno,
        id_aserradero: formData.id_aserradero,
        id_aserradero2:formData.id_aserradero2,
        id_formulador:formData.id_formulador,
        barroLB: formData.barroLB,
        aserrinLB:formData.aserrinLB,
        aserrinLB2:formData.aserrinLB2,
        humedadBarro: formData.humedadBarro,
        humedadAserrin: formData.humedadAserrin,
        id_ufmodelo:formData.id_ufmodelo,
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
  const llamar=()=>{
    setFormula2(true);

  }



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
      
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="id_turno" className="form-label">Turno</label>
            <select  className="form-select" id="id_turno" {...register("id_turno")} required>
            <option value="" disabled selected>Seleccione...</option>
              {Array.isArray(turno.rows) && turno.rows.map((turno) => (
                <option key={turno.id} value={turno.id}>{turno.turno}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
          <label htmlFor="modelo" className="form-label">
              Modelo
          </label>
          <select className="form-select" id="id_ufmodelo" {...register("id_ufmodelo")} required>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(modelos.rows)
            && modelos.rows.length>0 && modelos.rows.map((modelo) => (
              <option key={modelo.id_mod} value={modelo.id_mod}>
                {modelo.nombre_modelo}
              </option>
            ))}
          </select>
        </div>

          <div className="col-md-6">
          <label htmlFor="id_aserradero" className="form-label">Aserradero</label>
          <select className="form-select" id="id_aserradero" {...register("id_aserradero")} required>
          <option value="" disabled selected>Seleccione...</option>
            {Array.isArray(aserradero.rows) && aserradero.rows.map((aserradero) => (
              <option key={aserradero.id} value={aserradero.id}>{aserradero.nombre_aserradero}</option>
            ))}
          </select>
        </div>
    
        <div className="col-md-6">
            <label htmlFor="aserradero" className="form-label">
              Formulador
            </label>
            <select className="form-select" id="id_formulador" {...register("id_formulador")} required>
           
            <option value="" disabled selected>Seleccione...</option>
            {formulador.rows && Array.isArray(formulador.rows) && formulador.rows.filter(prensador =>  prensador.id_area === 2).map((prensador) => (
              <option key={prensador.id} value={prensador.id}>
                {prensador.Nombre}
              </option>
            ))}
          </select>
          </div>
          
    
          <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="barroLB" className="form-label">Barro LB</label>
            <input className="form-control" type="text" id="barroLB" {...register('barroLB')} required/>
          </div>

          <div className="col-md-6">
            <label htmlFor="aserrinLB" className="form-label">Aserrin LB</label>
            <input className="form-control" type="text" id="aserrinLB" {...register('aserrinLB')} required/>
          </div>


          <div className="col-md-6">
          <label htmlFor="aserrinLB" className="form-label">Humedad Barro</label>
          <input className="form-control" type="text" id="aserrinLB" {...register('humedadBarro')} required/>
        </div>
        <div className="col-md-6">
          <label htmlFor="aserrinLB" className="form-label">Humedad Aserrin</label>
          <input className="form-control" type="text" id="aserrinLB" {...register('humedadAserrin')} required/>
        </div>
          </div>
          {formula2 ?(
            <div className="col-md-12" >
            <p style={{textAlign:'center'}}>Mix</p>
            <div className="row">
            <div className="col-md-6">
            <label htmlFor="id_aserradero" className="form-label">Aserradero</label>
            <select  style={{ backgroundColor: 'rgba(192, 192, 192, 0.5)' }}  className="form-select" id="id_aserradero2" {...register("id_aserradero2")} required>
            <option value="" disabled selected>Seleccione...</option>
              {Array.isArray(aserradero.rows) && aserradero.rows.map((aserradero) => (
                <option key={aserradero.id} value={aserradero.id}>{aserradero.nombre_aserradero}</option>
              ))}
            </select>
          </div>
  
            <div className="col-md-6">
            
                      <label htmlFor="aserrinLB" className="form-label">Aserrin LB</label>
                      <input  style={{ backgroundColor: 'rgba(192, 192, 192, 0.5)' }}  className="form-control" type="text" id="aserrinLB2" {...register('aserrinLB2')} required/>
                    </div>
                    </div>
                    </div>
          ):false}
          <p>{error}</p>
    
        
          <div className="col-4">
          <a type="button" className="btn btn-danger mb-3" onClick={llamar}>Mix</a>
  
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
