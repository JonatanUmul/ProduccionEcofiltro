import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
const URL = process.env.REACT_APP_URL

const DTFM = ({datosApi}) => {
  console.log('dtfm',datosApi)
  const { handleSubmit, register, watch } = useForm();
  const [modelos, setModelos] = useState([]);
  const [id_creador, setid_creador] = useState('');
  const [LotesAserrinOK, setlotesAserrinOK] = useState([]);
  const [Disponible, setDisponible]=useState([])
  const formulas=watch('cantidad')
  const correlativo=watch('correlativo')
  const peso=watch('peso')

  console.log('Disponible',LotesAserrinOK)

  const funcion=()=>{

    if(!Array.isArray(LotesAserrinOK.rows)){
      return
    }
    const LotesAserrin=LotesAserrinOK.rows
    const b= LotesAserrin.filter((e)=>e.oscorrelativo===correlativo)
    setDisponible(Number(b[0]?.lb_disponible))
  }

  useEffect(()=>{
    funcion()
  },[correlativo])
  
  const cantidadLibras=(formulas*peso)

  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })

  useEffect(() => {
    Promise.all([

      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/LotesAserrinMezcladosAprobados`),
    ])
      .then(([ ModelosufResponse, LotesAserrinAprobados]) => {
  
        setModelos(ModelosufResponse.data);
        setlotesAserrinOK(LotesAserrinAprobados?.data)
      })
      .catch((error) => {
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${URL}/DTFM`, {
        id_OTFM: datosApi.id.toString(),
        cantidad: formData.cantidad,
        peso: formData.peso,
        humedad: formData.humedad,
        id_modelo: formData.id_modelo,
        cantidadLibras:cantidadLibras,
        correlativo: formData.correlativo,
        id_creador:id_creador
      });  // Mostrar SweetAlert de éxito
      Swal.fire({
       icon: 'success',
       title: 'Guardado exitosamente',
       showConfirmButton: false,
       timer: 1500
     });

     // Redirigir a la página de TablaOT después de 1.5 segundos
     setTimeout(() => {
       window.location.href = "/Home/TablaProcesoDeFormulacion";
     },1500 );
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };



  
  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Formulación </h4>
      <div className="card">
        <div className="card-body">
          <label htmlFor="materiaPrima" className="form-label">
            Orden {datosApi.EncName}-{datosApi.encabezado}
          </label>
          <p id="materiaPrima" className="form-control-static">{datosApi.encabezado} - {datosApi.EncName}-{datosApi.id}</p>
          <label htmlFor="fecha" className="form-label">
            Fecha de Creación
          </label>
          <p id="fecha" className="form-control-static">{formatFecha(datosApi.fecha_creacion)}</p>
        </div>
      </div>

{/*  iniico de fomrulario*/}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">

      <div className="col-md-6">
      <label htmlFor="aserradero" className="form-label">
          Lote de aserrín
      </label>
      <select className="form-select" id="correlativo" {...register("correlativo")} required>
      <option value="" disabled selected>Seleccione...</option>
      {Array.isArray(LotesAserrinOK.rows)&& LotesAserrinOK.rows.map(Lotes => (
          <option key={Lotes.id} >
            {Lotes.oscorrelativo}
          </option>
        ))}
      </select>
    </div>
    
{Disponible<=0 ?
<div className="alert alert-danger" role="alert">
  El lote presenta un valor igual o inferior a cero en el inventario.  
  Por favor, solicita el cierre de la orden correspondiente.

  Disponible: {Disponible} lb
</div>

:
<div>
  
  <div className="alert alert-info" role="alert">
 Disponible: {Disponible} lb
</div>

  <div className="col-md-6">
      <label htmlFor="aserradero" className="form-label">
          Modelo:
      </label>
      <select className="form-select" id="id_modelo" {...register("id_modelo")} required>
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
          <label htmlFor="esquinaSI" className="form-label">
            Cantidad
          </label>
          <input type="number" className="form-control" id="cantidad" {...register("cantidad")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSD" className="form-label">
            Peso
          </label>
          <input type="number" className="form-control" id="peso" step="0.05" {...register("peso")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSD" className="form-label">
            Total Libras
          </label>
          <input disabled value={cantidadLibras} type="text" className="form-control"   />
        </div>
        <div className="col-md-6">
          <label htmlFor="centro" className="form-label">
            Humedad
          </label>
          <input type="text" className="form-control" id="humedad" {...register("humedad")} required />
        </div>  
             
        <div className="col-12">
        {/* <div className="col-4">
        <a type="button" className="btn btn-danger mb-3" onClick={llamar}>Mix</a>
        </div> */}
        {cantidadLibras>Disponible?
        <div className="alert alert-danger" role="alert">
  La cantidad en libras no puede ser mayor a lo Disponible, revisa tus datos.
</div>

        :
          <button type="submit" className="btn btn-primary">Guardar</button>
          }
        
        </div>
        </div>

}
{/* 
        {formula2 ? (
          <div className="row mt-3"> 
    <div className="col-md-12">
    <div className="row">
          <h5>Formula 2</h5>
       
      

            <div className="col-md-6">
              <label htmlFor="esquinaSD" className="form-label">
                Peso
              </label>
              <input type="text" className="form-control" id="peso2" {...register("peso2")} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="centro" className="form-label">
                Humedad
              </label>
              <input type="text" className="form-control" id="humedad2" {...register("humedad2")} required />
            </div>  
          </div>
          </div>
          </div>

        ) :false} */}
        
        
   
        
      </form>
    </div>
  );
};

export default DTFM;
