import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
const URL = process.env.REACT_APP_URL

const DTSASERRIN = ({ encabezado, EncName, fecha_creacion, id }) => {
  const { handleSubmit, register } = useForm();
  const [aserradero, setAserradero] = useState([]);
  const [patio, setPatio] = useState([]);
  const [matPrim, setMatPrim]= useState([]);
  const [id_creador, setid_creador] = useState('');
  
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })
      
 
  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/Aserradero`),
      axios.get(`${URL}/Patios`),
      axios.get(`${URL}/MateriaPrima`)
    ])
      .then(([AserraderoResponse, PatiosResponse, MatprimaResponse]) => {
        setAserradero(AserraderoResponse.data);
        setPatio(PatiosResponse.data);
        setMatPrim(MatprimaResponse.data)
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${URL}/DASERRIN`, {
        id_OTSaserrin: id.toString(),
        id_asrd: formData.id_asrd,
        id_MP: formData.id_MP,
        id_patio: formData.id_patio,
        cantidad_inicial: formData.cantidad_inicial,
        cantidad_final: formData.cantidad_final,
        id_creador:id_creador
      });Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
      console.log('hoa aca',formData.id_MP)
      // Redirigir a la página de TablaOT después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "/Home/TablaOT";
      },1500 );
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  console.log('datos props',encabezado, EncName, fecha_creacion,id)

  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Secado de Aserrin</h4>
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
            && aserradero.rows.length>0 && aserradero.rows.map((aserradero) => (
              <option key={aserradero.id} value={aserradero.id}>
                {aserradero.nombre_aserradero}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="patio" className="form-label">
            Patio
          </label>
          <select className="form-select" id="id_patio" {...register("id_patio")} required>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(patio.rows)&& patio.rows.length>0 &&patio.rows.map((patio) => (
              <option key={patio.id} value={patio.id}>
                {patio.nombrePatio}
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
           Cantidad Final
          </label>
          <input type="number" className="form-control" id="cantidad_final" {...register("cantidad_final")} required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default DTSASERRIN;
