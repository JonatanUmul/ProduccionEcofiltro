
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
const URL = process.env.REACT_APP_URL

const DTHP = ({ encabezado, EncName, fecha_creacion,id }) => {
  const { handleSubmit, register } = useForm();
  const [aserradero, setAserradero] = useState([]);
  const [patio, setPatio] = useState([]);
  const [matPrim, setMatPrim]= useState([])
  const [id_creador, setid_creador] = useState('');
  console.log('consultando iddddddddddddddddddddddddddddd'. id_creador)
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
      const response = await axios.post(`${URL}/DTHP`, {
        id_OTHP: id.toString(),
        fecha_real:fecha_creacion,
        id_asrd: formData.id_asrd,
        id_matPrima: formData.id_matPrima,
        id_patio: formData.id_patio,
        esquinaSupIZ: formData.esquinaSupIZ,
        esquinaSupDA: formData.esquinaSupDA,
        esquinaCentro: formData.esquinaCentro,
        esquinaInfIZ: formData.esquinaInfIZ,
        esquinaInfDR: formData.esquinaInfDR,
        id_creador:id_creador
      });Swal.fire({
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
console.log('datos props',encabezado, EncName, fecha_creacion,id)
  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Toma de Humedad</h4>
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
          <select className="form-select" id="id_matPrima" {...register("id_matPrima")} required>
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
          <label htmlFor="esquinaSI" className="form-label">
            Esquina Superior Izquierda
          </label>
          <input type="text" className="form-control" id="esquinaSupIZ" {...register("esquinaSupIZ")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSD" className="form-label">
            Esquina Superior Derecha
          </label>
          <input type="text" className="form-control" id="esquinaSupDA" {...register("esquinaSupDA")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="centro" className="form-label">
            Centro
          </label>
          <input type="text" className="form-control" id="esquinaCentro" {...register("esquinaCentro")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaII" className="form-label">
            Esquina Inferior Izquierda
          </label>
          <input type="text" className="form-control" id="esquinaInfIZ" {...register("esquinaInfIZ")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaID" className="form-label">
            Esquina Inferior Derecha
          </label>
          <input type="text" className="form-control" id="esquinaInfDR" {...register("esquinaInfDR")} required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default DTHP;
