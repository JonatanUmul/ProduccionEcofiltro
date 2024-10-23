
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert

import {  Skeleton, Space } from 'antd';

const URL = process.env.REACT_APP_URL
const DTCA2= ({ encabezado, EncName, fecha_creacion, id }) => {

  const [loading, setLoading] = useState(false);
  
  const showSkeleton = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const { handleSubmit, register } = useForm();
  const [aserradero, setAserradero] = useState([]);
  const [tipCernido, setTipCernido] = useState([]);
  const [matPrim, setMatPrim]= useState([])
  const [id_creador, setid_creador] = useState('');
  
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })
      

  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/Aserradero`),
      axios.get(`${URL}/TipoCernido`),
      axios.get(`${URL}/MateriaPrima`)
    ])
      .then(([AserraderoResponse, TIpCernidoResponse, MatprimaResponse]) => {
        setAserradero(AserraderoResponse.data);
        setTipCernido(TIpCernidoResponse.data);
        setMatPrim(MatprimaResponse.data)
      }
      
      )
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      setLoading(false)
      const response = await axios.post(`${URL}/DTCA2`, {
        id_OTCA2: id.toString(),
        id_aserradero: formData.id_asrd,
        id_MP: formData.id_MP,
        cantidad_inicial: formData.cantidad_inicial,
        cernido_fino: formData.cernido_fino,
        cernido_grueso: formData.cernido_grueso,
        id_creador:id_creador
       
      });
      console.log(formData.cantidad_inicial)
      setLoading(false)
       // Mostrar SweetAlert de éxito
       Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });

      // Redirigir a la página de TablaOT después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "/Home/TablaOT";
      }, 1500);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setLoading(false)
    }
  };
  console.log('hola',aserradero, tipCernido)  

  return (

    
    <div className="mt-4">

    <h4 style={{ textAlign: 'center', color: 'gray' }}>Cernido 2 - {encabezado}</h4>
      <h5 style={{ textAlign: 'center', color: 'gray' }}>{EncName}</h5>
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
      
      {loading ? (
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
          size={16}
        >
        <img 
        src="/images/laptop.gif" 
        alt="Logo" 
        style={{
          width: '300px', 
          display: 'block', 
          margin: '0 auto', 
          filter: 'brightness(1.2) contrast(1.2)'  // Ajusta el brillo y contraste
        }} 
      />
        </Space>
      ) 
      :
      (
        
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">
      <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Materia Prima
          </label>
          <select className="form-select" id="id_MP" {...register("id_MP")} required>
          <option value="" disabled selected>Seleccione...</option>
            {Array.isArray(matPrim.rows)
            && matPrim.rows.length>0 && matPrim.rows.map((matPrim) => (
              <option key={matPrim.id_enc} value={matPrim.id_enc}>
                {matPrim.nom_matPrima}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Aserradero
          </label>
          <select className="form-select" id="id_asrd" {...register("id_asrd")} required>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(aserradero.rows)
            && aserradero.rows.length>0 && aserradero.rows.map((aserrado) => (
              <option key={aserrado.id} value={aserrado.id}>
                {aserrado.nombre_aserradero}
              </option>
            ))}
          </select>
        </div>
        
       
        <div className="col-md-6">
          <label htmlFor="esquinaII" className="form-label">
            Cantidad Inicial
          </label>
          <input type="number" className="form-control" id="cantidad_inicial" {...register("cantidad_inicial")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaID" className="form-label">
           Cernido Fino
          </label>
          <input type="number" className="form-control" id="cernido_fino" {...register("cernido_fino")} required />
        </div>
        
        <div className="col-md-6">
          <label htmlFor="esquinaID" className="form-label">
           Cernido Grueso
          </label>
          <input type="number" className="form-control" id="cernido_grueso" {...register("cernido_grueso")} required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary"   disabled={loading}>Guardar</button>
        </div>
      </form>
 
      )}
    
  
         </div>
  );
};

export default DTCA2
;