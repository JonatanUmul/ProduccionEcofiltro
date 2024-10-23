import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
import { Skeleton, Space } from 'antd';

const URL = process.env.REACT_APP_URL;
const DRM = ({  encabezado, EncName,fecha_creacion, id, codigoInicio, codigoFinal }) => {
  const { handleSubmit, register } = useForm();
  const [modeloUF, setModeloUf] = useState([]);
  const [tunel, setTunel]= useState([]);
  const [estadouf, setEstadoUF]= useState([]);
  const [btn, setBtn]= useState(false)

  const maquinaria="Tunel"; 
  const [id_creador, setid_creador] = useState('');
  const [loading, setLoading] = useState(false);

useEffect(()=>{
  setid_creador(localStorage.getItem('id_creador'))
})

  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/maquinaria/${maquinaria}`),
      axios.get(`${URL}/Estadouf`),
    ])
      .then(([ModelosResponse, TunelResponse, EstadoUFResponse]) => {
        setModeloUf(ModelosResponse.data);
        setTunel(TunelResponse.data);
        setEstadoUF(EstadoUFResponse.data)
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
      
   
      const response = await axios.post(`${URL}/DTT`, {
        id_CTT: id.toString(),
        id_modelo: formData.id_modelo,
        id_tunel: formData.id_tunel,
        id_estadouf:formData.id_estadouf,
        id_modelo2:formData.id_modelo2,
        cabezaDerecha1: formData.cabezaDerecha1,
        pieDerecho1:formData.pieDerecho1,
        cabezaDerecha2: formData.cabezaDerecha2,
        pieDerecho2: formData.pieDerecho2,
        cabezaDerecha3: formData.cabezaDerecha3,
        pieIzquierdo1: formData.pieIzquierdo1,
        cabezaizquierda1: formData.cabezaizquierda1,
        pieIzquierdo2: formData.pieIzquierdo2,
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
      <h4 style={{ textAlign: "center", color: "gray" }}>Control de Temperatura Tunel</h4>
      <div className="card">
        <div className="card-body">
          <label htmlFor="materiaPrima" className="form-label">
            Orden
          </label>
          <p id="materiaPrima" className="form-control-static">
            {encabezado} - {EncName}
          </p>

          <label htmlFor="materiaPrima" className="form-label">
            Codigos
          </label>
          <p id="materiaPrima" className="form-control-static">
            {codigoInicio} - {codigoFinal}
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

        <div>
       
        <div className="row text-center"  >


        <div className="col-sm-3" style={{ alignItems: "center" }}>
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
          <option>--</option>
          {Array.isArray(modeloUF.rows) &&
            modeloUF.rows.length > 0 &&
            modeloUF.rows.map((modelo) => (
              <option key={modelo.id_mod} value={modelo.id_mod}>
                {modelo.nombre_modelo}
              </option>
            ))}
        </select>
      </div>
      
    
    {btn?(
      <div className="col-sm-3 ">
      <label htmlFor={`modelo`} className="form-label">
        Modelo 2
      </label>
      <select
        className="form-select"
        style={{ backgroundColor: 'rgba(192, 192, 192, 0.5)' }} // Gris suave con opacidad reducida
        name={`id_modelo2`}
        id={`id_modelo2`}
        {...register(`id_modelo2`)}
      >
        <option>--</option>  
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



    <div className="col-sm-3">
    <label htmlFor={`id_estadouf`} className="form-label">
      Estado UF
    </label>
    <select
      className="form-select"
      name={`id_estadouf`}
      id={`id_estadouf`}
      {...register(`id_estadouf`)}
    >
    <option value="" disabled selected>Seleccione...</option>
    {Array.isArray(estadouf.rows) &&
      estadouf.rows.length > 0 &&
      estadouf.rows.map((estadouf) => (
          <option key={estadouf.id} value={estadouf.id} >
            {estadouf.estado}
          </option>
        ))}
    </select>
  </div>

    <div className="col-sm-3">
      <label htmlFor={`tunel`} className="form-label">
        Tunel
      </label>
      <select
        className="form-select"
        name={`id_tunel`}
        id={`id_tunel`}
        {...register(`id_tunel`)}
      >
      <option value="" disabled selected>Seleccione...</option>
      {Array.isArray(tunel.rows) &&
          tunel.rows.length > 0 &&
          tunel.rows.map((tunel) => (
            <option key={tunel.id_maq} value={tunel.id_maq} >
              {tunel.nombre_maq}
              </option>
            ))}
      </select>

      
    </div>
    </div>

  <div className="row text-center mt-2" >
  
    <div className="col-md-auto">
    <label htmlFor={`modelo`} className="form-label">
      Cabeza Derecha 1
    </label>  
    <input type="text"  className="form-control" id="pieIZ1" {...register(`cabezaDerecha1`)} required/>
    
    </div>
    <div className="col-md-auto">
    <label htmlFor={`modelo`} className="form-label">
      Pie Derecho 1
    </label>  
    <input type="text"  className="form-control" id="cabezaIZ1" {...register(`pieDerecho1`)} required />
    
    </div>
    <div className="col-md-auto">
    <label htmlFor={`modelo`} className="form-label">
    Cabeza Derecha 2
    </label>  
    <input type="text"  className="form-control" id="cabezaIZ2" {...register(`cabezaDerecha2`)} required/>
    
    </div>
    <div className="col-md-auto">
    <label htmlFor={`modelo`} className="form-label">
    Pie Derecho 2
    </label>  
    <input type="text" className="form-control"  id="cabezaIZ3" {...register(`pieDerecho2`)} required/>
    
    </div>
    <div className="col-md-auto">
    <label htmlFor={`modelo`} className="form-label">
    Cabeza Derecha 3
    </label>  
    <input type="text" className="form-control" id="pieIZ1" {...register(`cabezaDerecha3`)} required/>
    
    </div>
    <div className="col-md-auto">
    <label htmlFor={`modelo`} className="form-label">
    Pie Izquierdo 1
    </label>  
    <input type="text"  className="form-control" id="cabezaDR1" {...register(`pieIzquierdo1`)}required/>
    
    </div>
    <div className="col-md-auto">
    <label htmlFor={`modelo`} className="form-label">
    Cabeza Izquierda 1
    </label> 
    <input type="text" className="form-control" id="cabezaDR2" {...register(`cabezaizquierda1`)} required/>
    
    </div>
    <div className="col-md-auto">
    <label htmlFor={`modelo`} className="form-label">
    Pie Izquierdo 2
    </label>  
    <input type="text" className="form-control"  id="cabezaDR3" {...register(`pieIzquierdo2`)} required/>
    </div>

   
  </div>

        </div>
       
        <div className="col-3 m2-3">
          <button type="submit" className="btn btn-primary">
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
