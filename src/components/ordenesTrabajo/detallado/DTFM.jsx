import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
const URL = process.env.REACT_APP_URL

const DTFM = ({ encabezado, EncName, fecha_creacion,id }) => {
  const { handleSubmit, register } = useForm();
  const [aserradero, setAserradero] = useState([]);
  const [matPrima, setMatPrima] = useState([]);
  const [formula2, setFormula2]=useState(false);
  const [cernidoDetalle, setCernidoDetalle] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [id_creador, setid_creador] = useState('');
  
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })

  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/Aserradero`),
      axios.get(`${URL}/MateriaPrima`),
      axios.get(`${URL}/CernidoDetalle`),
      axios.get(`${URL}/ModelosUF`),
    ])
      .then(([AserraderoResponse, MatPrimResponse, CernidodetalleResponse, ModelosufResponse]) => {
        setAserradero(AserraderoResponse.data);
        setMatPrima(MatPrimResponse.data);
        setCernidoDetalle(CernidodetalleResponse.data);
        setModelos(ModelosufResponse.data);
    
      })
      .catch((error) => {
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${URL}/DTFM`, {
        id_OTFM: id.toString(),
        id_Aserradero: formData.id_Aserradero,
        id_cernidodetalle:formData.id_cernidodetalle,
        cantidad: formData.cantidad,
        peso: formData.peso,
        humedad: formData.humedad,
        id_matPrim: formData.id_matPrim,
        id_Aserradero2: formData.id_Aserradero2,
        peso2: formData.peso2,
        humedad2: formData.humedad2,
        id_cernidodetalle2:formData.id_cernidodetalle2,
        id_modelo: formData.id_modelo,
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
       window.location.href = "/Home/TablaOT";
     },1500 );
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const llamar=()=>{
    setFormula2(true);
  }

 
  
  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Formulación </h4>
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

{/*  iniico de fomrulario*/}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">
           <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Materia Prima
          </label>
          <select className="form-select" id="id_matPrim" {...register("id_matPrim")} required>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(matPrima.rows)
            && matPrima.rows.length>0 && matPrima.rows.map((matPrima) => (
              <option key={matPrima.id_enc} value={matPrima.id_enc}>
                {matPrima.nom_matPrima}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Aserradero
          </label>
          <select className="form-select" id="id_Aserradero" {...register("id_Aserradero")} required>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(aserradero.rows)
            && aserradero.rows.length>0 && aserradero.rows.map((aserradero) => (
              <option key={aserradero.id} value={aserradero.id}>
                {aserradero.nombre_aserradero}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
        <label htmlFor="aserradero" className="form-label">
            Detalle Cernido
        </label>
        <select className="form-select" id="id_cernidodetalle" {...register("id_cernidodetalle")} required>
        <option value="" disabled selected>Seleccione...</option>
        
        {Array.isArray(cernidoDetalle.rows)
          && cernidoDetalle.rows.length>0 && cernidoDetalle.rows.map((cernidoDetalle) => (
            <option key={cernidoDetalle.id} value={cernidoDetalle.id}>
              {cernidoDetalle.detalle}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-6">
      <label htmlFor="aserradero" className="form-label">
          Modelo
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
          <input type="text" className="form-control" id="peso" {...register("peso")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="centro" className="form-label">
            Humedad
          </label>
          <input type="text" className="form-control" id="humedad" {...register("humedad")} required />
        </div>  

        {formula2 ? (
          <div className="row mt-3"> 
    <div className="col-md-12">
    <div className="row">
          <h5>Formula 2</h5>
          <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Aserradero
          </label>
          <select className="form-select" id="id_Aserradero2" {...register("id_Aserradero2")} required>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(aserradero.rows)
            && aserradero.rows.length>0 && aserradero.rows.map((aserradero) => (
              <option key={aserradero.id} value={aserradero.id}>
                {aserradero.nombre_aserradero}
              </option>
            ))}
          </select>
        </div>
        
        <div className="col-md-6">
        <label htmlFor="aserradero" className="form-label">
            Detalle Cernido
        </label>
        <select className="form-select" id="id_cernidodetalle2" {...register("id_cernidodetalle2")} required>
        <option value="" disabled selected>Seleccione...</option>
        
        {Array.isArray(cernidoDetalle.rows)
          && cernidoDetalle.rows.length>0 && cernidoDetalle.rows.map((cernidoDetalle) => (
            <option key={cernidoDetalle.id} value={cernidoDetalle.id}>
              {cernidoDetalle.detalle}
            </option>
          ))}
        </select>
      </div>

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

        ) :false}
        
        
        
        <div className="col-12">
        <div className="col-4">
        <a type="button" className="btn btn-danger mb-3" onClick={llamar}>Mix</a>
        </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
        
      </form>
    </div>
  );
};

export default DTFM;
