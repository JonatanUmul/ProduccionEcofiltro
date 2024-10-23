import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
const URL = process.env.REACT_APP_URL;
const DRM = ({ encabezado, EncName, fecha_creacion, id }) => {
  const { handleSubmit, register } = useForm();
  const [merma, setMerma] = useState([]);
  const [modeloUF, setModeloUf] = useState([]);
  const [formData, setFormData] = useState([]);
  // const id_area = 2;
  const [id_creador, setid_creador] = useState('');
  
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })
  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/tipoMermas`),
      axios.get(`${URL}/ModelosUF`),
    ])
      .then(([MermaResponse, ModelosResponse]) => {
        setMerma(MermaResponse.data);
        setModeloUf(ModelosResponse.data);
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async () => {
    try {
      // Mapeamos el arreglo de inputs para formatear los datos correctamente
      const formattedData = (formdata) => ({
        codigo: formdata.codigo,
        id_modelo: formdata.id_modelo,
        id_motivo: formdata.id_motivo,
        id_creador:id_creador
      });
      console.log("Datos formateados:", formattedData);
      // Enviamos los datos formateados al servidor
      const response = await axios.post(`${URL}/DRM`, {
        id_CRM: id.toString(),
         formattedData
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
  };
  

  const [inputs, setInputs] = useState([{ id: Date.now() }]);

  // const handleAddInput = () => {
  //   setInputs([...inputs, { id: Date.now() }]);
 
 
  // };
  const handleAddInput = () => {
    setInputs([...inputs, { id: Date.now() }]);
    // Agrega una nueva línea al estado formData cuando se hace clic en el botón "Agregar"
    setFormData([...formData, {}]);
  };
  

  return (

    
    <div className="mt-2">
      <h4 style={{ textAlign: "center", color: "gray" }}>Reporte De Mermas</h4>
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
        <div>
          {inputs.map((input, index) => (
  <div className="row" key={input.id}>
    <div className="col-md-4">
      <label htmlFor={`codigo-${index}`}>Codigo</label>
      <input
        className="form-control"
        type="text"
        name={`codigo-${index}`}
        id={`codigo-${index}`}
        {...register(`codigo-${index}`)}
      />
    </div>
    <div className="col-md-4">
      <label htmlFor={`modelo-${index}`} className="form-label">
        Modelo
      </label>
      <select
        className="form-select"
        name={`id_modelo-${index}`}
        id={`id_modelo-${index}`}
        {...register(`id_modelo-${index}`)}
      >
        {Array.isArray(modeloUF.rows) &&
          modeloUF.rows.length > 0 &&
          modeloUF.rows.map((modelo) => (
            
            <option key={modelo.id_mod} value={modelo.id_mod} >
              {modelo.nombre_modelo}
            </option>
          ))}
      </select>
    </div>
    <div className="col-md-4">
      <label htmlFor={`motivo-${index}`} className="form-label">
        Motivo
      </label>
      <select
        className="form-select"
        name={`id_motivo-${index}`}
        id={`id_motivo-${index}`}
        {...register(`id_motivo-${index}`)}
      >
        {Array.isArray(merma.rows) &&
          merma.rows.length > 0 &&
          merma.rows.map((merma) => (
            <option key={merma.id} value={merma.id} >
              {merma.tipo}
            </option>
          ))}
      </select>
    </div>
  </div>
))}

        </div>
        <div className="col-2 ">
          <button type="button" className="btn btn-primary" onClick={handleAddInput}>
           +
          </button>
        </div>
        <div className="col-12 mt-3">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DRM;
