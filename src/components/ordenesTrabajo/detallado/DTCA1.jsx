
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2'; // Importar SweetAlert
import { formatFecha } from "../../utilidades/FormatearFecta";
const URL = process.env.REACT_APP_URL

const DTCMP = ({ encabezado, EncName, fecha_creacion, id }) => {
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
      })
      .catch((error) => {
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${URL}/DTCA1`, {
        id_OTCA1: id.toString(),
        id_aserradero: formData.id_asrd,
        id_MP: formData.id_MP,
        id_tipoCernido: formData.tipCernido,
        CantidadInicial: formData.cantidad_inicial,
        CantidadFinal: formData.cantidad_final,
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
        window.location.href = "/Home/TablaOT";
      }, 1500);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al enviar los datos!",
        footer: '<a href="#">Why do I have this issue?</a>',
        timer: 900
      });
    }
  };

  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Cernido 1</h4>
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

export default DTCMP;
