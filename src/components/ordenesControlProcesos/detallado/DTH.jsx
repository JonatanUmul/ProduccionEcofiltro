import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
import { Skeleton, Space } from 'antd';

const URL = process.env.REACT_APP_URL;
const DRM = ({  encabezado, EncName,fecha_creacion, id }) => {
  const { handleSubmit, register } = useForm();
  const [modeloUF, setModeloUf] = useState([]);
  const [maquina, setMaquina]= useState([]);
  const [turno, setTurno]= useState([])
  const [btn, setBtn]= useState(false)
  const maquinaria="Horno"; 
  const [id_creador, setid_creador] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })
  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/maquinaria/${maquinaria}`),
      axios.get(`${URL}/Turnos`)
    ])
      .then(([ModelosResponse, MaquinaResponse, TurnosResponse]) => {
        setModeloUf(ModelosResponse.data);
        setMaquina(MaquinaResponse.data);
        setTurno(TurnosResponse.data)
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);


  
  const showSkeleton = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const onSubmit = async (formData) => {
    try {
      
   
      const response = await axios.post(`${URL}/DTH`, {
        id_cth: id.toString(),
        fecha_real: fecha_creacion,
        id_modelo: formData.id_modelo,
        id_modelo2:formData.id_modelo2,
        id_horno: formData.id_horno,
        id_turno: formData.id_turno,
        id_creador:'',
        tempCabezaIZ:formData.tempCabezaIZ,
        tempCentroIZ: formData.tempCentroIZ,
        tempPieIZ: formData.tempPieIZ,
        tempCabezaDR: formData.tempCabezaDR,
        tempCentroDR: formData.tempCentroDR,
        tempPieDR: formData.tempPieDR,
        id_creador:id_creador
      });
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
    showSkeleton();
  };


  function onclick(){
    setBtn(true)
  }
    
  

  

  return (

    
    <div className="mt-2">
      <h4 style={{ textAlign: "center", color: "gray" }}>{EncName}</h4>
      <div className="card">
        <div className="card-body">
          <label htmlFor="materiaPrima" className="form-label">
            Orden
          </label>
          <p id="materiaPrima" className="form-control-static">
            {encabezado} - {EncName}
          </p>

         
          <label htmlFor="fecha" className="form-label">
            Fecha de Creación
          </label>
          <p id="fecha" className="form-control-static">
            {formatFecha(fecha_creacion)}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">

      {loading?(
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
          size={16}
        >
        <p>Enviando los datos... espere...</p>
          <Skeleton loading={loading}>
          
          </Skeleton>
         
        </Space>
      ):(<>
    <div className="col-sm-6 col-md-12 col-lg-12">
       
        <div className="row text-center" >
        <div className='col-sm-2 col-md-4 col-lg-4'>
        <label htmlFor={`modelo`} className="form-label">
        Modelo
        <strong> <a  onClick={onclick}><i class="bi bi-clipboard-plus"></i></a></strong>
        
      </label>
      <select
        className="form-select"
        name={`id_modelo`}
        id={`id_modelo`}
        {...register(`id_modelo`)}
      >
      <option value="" disabled selected>Seleccione...</option>
      {Array.isArray(modeloUF.rows) &&
          modeloUF.rows.length > 0 &&
          modeloUF.rows.map((modelo) => (
            <option key={modelo.id_mod} value={modelo.id_mod} >
              {modelo.nombre_modelo}
            </option>
          ))}
      </select>
    </div>

    {btn?(
      <div className='col-sm-2 col-md-4 col-lg-4'>
      <label htmlFor={`modelo`} className="form-label">
        Modelo 2
        <strong> <a  onClick={onclick}><i class="bi bi-clipboard-plus"></i></a></strong>
      </label>
      <select
        className="form-select"
        style={{ backgroundColor: 'rgba(192, 192, 192, 0.5)' }} // Gris suave con opacidad reducida
        name={`id_modelo2`}
        id={`id_modelo2`}
        {...register(`id_modelo2`)}
      >
      <option value="" disabled selected>Seleccione...</option>
        {Array.isArray(modeloUF.rows) &&
            modeloUF.rows.length > 0 &&
            modeloUF.rows.map((modelo) => (
              <option key={modelo.id_mod} value={modelo.id_mod} >
                {modelo.nombre_modelo}
              </option>
            ))}
      </select>
    </div>
    

    ):false}

<div className='col-sm-2 col-md-4 col-lg-4'>
<label htmlFor={`turno`} className="form-label">
        Turno
      </label>
      <select
        className="form-select"
        name={`id_turno`}
        id={`id_turno`}
        {...register(`id_turno`)}
      >
      <option value="" disabled selected>Seleccione...</option>
      {Array.isArray(turno.rows) &&
          turno.rows.length > 0 &&
          turno.rows.map((turno) => (
            <option key={turno.id} value={turno.id} >
              {turno.turno}
            </option>
          ))}
      </select>
    </div>
    <div className='col-sm-2 col-md-4 col-lg-4'>
    <label htmlFor={`horno`} className="form-label">
        Horno
      </label>
      <select
        className="form-select"
        name={`id_horno`}
        id={`id_horno`}
        {...register(`id_horno`)}
      >
      <option value="" disabled selected>Seleccione...</option>
      {Array.isArray(maquina.rows) &&
          maquina.rows.length > 0 &&
          maquina.rows.map((maquina) => (
            <option key={maquina.id_maq} value={maquina.id_maq} >
              {maquina.nombre_maq}
              </option>
            ))}
      </select>

      
    </div>
    </div>

    <div class="container text-center mt-3">
    <div class="row"> 
    <div class="col-4"> 
    <label htmlFor={`Cabeza Izquierda`} className="form-label">
      Cabeza Izquierda
    </label>
    <input type="text" className="form-control" id="tempCabezaIZ" {...register(`tempCabezaIZ`)} required />
  </div>
  {/* <div class="col">
    <label htmlFor={`Centro Izquierdo`} className="form-label">
      Centro Izquierdo
    </label>
    <input type="text" className="form-control" id="tempCentroIZ" {...register(`tempCentroIZ`)} required />
  </div> */}
  <div class="col-4">   
    <label htmlFor={`Pie Izquierdo`} className="form-label">
      Pie Izquierdo
    </label>
    <input type="text" className="form-control" id="tempPieIZ" {...register(`tempPieIZ`)} required />
  </div>

  <div class="col-4">
    <label htmlFor={`Cabeza Derecha`} className="form-label">
      Cabeza Derecha
    </label>
    <input type="text" className="form-control" id="tempCabezaDR" {...register(`tempCabezaDR`)} required />
  </div>
  {/* <div class="col">
    <label htmlFor={`Centro Derecho`} className="form-label">
      Centro Derecho
    </label>
    <input type="text" className="form-control" id="tempCentroDR" {...register(`tempCentroDR`)} required />
  </div> */}
  <div class="col-4">
    <label htmlFor={`Pie Derecho`} className="form-label">
      Pie Derecho
    </label>
    <input type="text" className="form-control" id="tempPieDR" {...register(`tempPieDR`)} required />
  </div>
</div>
</div>


        </div>
       
        <div className="col-3 m2-3">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Guardar
          </button>
        </div>
        </>
)}
      </form>
    </div>
  );
};

export default DRM;
