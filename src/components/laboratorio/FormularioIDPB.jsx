import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
import { Skeleton, Space } from 'antd';
import TablaIndicesPlasticos from '../laboratorio/TablaIndicesPlasticos.jsx'
const URL = process.env.REACT_APP_URL

const DTHH = ({ encabezado, EncName, fecha_creacion,id }) => {
  const { handleSubmit, register, reset } = useForm();
  const [id_creador, setid_creador] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]= useState('');
  const [tabla, setTabla]= useState(false)
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })

  const showSkeleton = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
 const Tabla=()=>{
  setTabla(true)
 }

  const onSubmit = async (formData) => {
    console.log('Forma Data prueba',formData)
    try {
      const response = await axios.post(`${URL}/indicesAtterberg`,
      {
        // id_dtp: id.toString(),
        // id_creador:id_creador,
        fechaEnsayo:formData.fecha_produccion,
        limite_liquido:formData.limite_liquido,
        limite_plastico:formData.limite_plastico,
        indice_plastico:formData.indice_plastico,
   
      });
      Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
 
      // Redirigir a la página de TablaOT después de 1.5 segundos
      setTimeout(() => {
        // window.location.href = "/Home/TablaLab";
        reset()
      },1500 );
      
    } catch (error) {
      setError("Error al enviar los datos:", error);
    }
    showSkeleton();
  };

  return (
    <div className="mt-4">
       <button
          className="btn btn-outline-primary me-2"
         onClick={Tabla}
        >Tabla Limites</button>
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Límites de Atterberg Barro</h4>

{tabla? (<TablaIndicesPlasticos/>):(
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
 

     <div className="col-md-6">
       <label htmlFor="aserradero" className="form-label">
           Fecha de producción
       </label>
       <span className="input-group-text">Fecha de producción</span>
 <input
   type="date"
 
   className="form-control"
   {...register("fecha_produccion", { required: true })}
   
 />
     </div>

     <div className="col-md-6">
       <label htmlFor="aserradero" className="form-label">
           Limite Liquido
       </label>
       <span className="input-group-text">Limite Liquido</span>
 <input
   type="number"
   // step="0.01"
  
   className="form-control"
   {...register("limite_liquido", { required: true })}
 />
     </div>

     <div className="col-md-6">
       <label htmlFor="aserradero" className="form-label">
           Limite Plastico
       </label>
       <span className="input-group-text">Limite Plastico</span>
 <input
   type="number"
   // step="0.01"

   className="form-control"
   {...register("limite_plastico", { required: true })}
 />
     </div>

     <div className="col-md-6">
       <label htmlFor="aserradero" className="form-label">
           Indice Plastico
       </label>
       <span className="input-group-text"> Indice Plastico</span>
 <input
   type="number"
 
   className="form-control"
   {...register("indice_plastico", { required: true })}
 />
     </div>




     
     <div className="col-12">
   
       <button type="submit" className="btn btn-primary" disabled={loading}>Guardar</button>
     </div>
     </>
)}
   </form>
)}
      {/*iniioc de form */}
     
    </div>
  );
};

export default DTHH;