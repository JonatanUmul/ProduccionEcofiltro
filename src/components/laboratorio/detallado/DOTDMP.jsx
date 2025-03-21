import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
import { Skeleton, Space } from 'antd';
const URL = process.env.REACT_APP_URL

const DTHH = ({ encabezado, EncName, fecha_creacion,id }) => {
  const { handleSubmit, register } = useForm();
  const [aserradero, setAserradero] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [hornos, setTHornos] = useState([]);
  const [hornero, setHornero] = useState([]);
  const [granulometria, setGranulometria]=useState([])
  const [error, setError]= useState('');
  const [formula2, setFormula2]=useState(false);
  const [cernidoDetalle, setCernidoDetalle] = useState([]);
  const [id_creador, setid_creador] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })

  const maquinaria="Horno"; 
  const id_area=3;
  useEffect(() => {
    try {
      Promise.all([
        axios.get(`${URL}/Aserradero`),
        axios.get(`${URL}/ModelosUF`),
        axios.get(`${URL}/CernidoDetalle`),
        axios.get(`${URL}/maquinaria/${maquinaria}`),
        axios.get(`${URL}/Operarios/${id_area}`),
        axios.get(`${URL}/granulometria`),
      ])
        .then(([ AserraderoResponse, ModelosufResponse, CernidodetalleResponse, HornosResponse, OperariosResponse, GranulometriaResponse]) => {
          setAserradero(AserraderoResponse.data);
          setModelos(ModelosufResponse.data); 
          setCernidoDetalle(CernidodetalleResponse.data);
          setTHornos(HornosResponse.data);
          setHornero(OperariosResponse.data);
          setGranulometria(GranulometriaResponse.data)
        })
        .catch((error) => {
          setError("Error al obtener los datos", error);
        });
    } catch(error) {
      setError("Error al obtener los datos", error);
    }
  }, []);
  console.log(hornos)

  const showSkeleton = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };


  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${URL}/DOTDMP` ,
      {
        id_dtp: id.toString(),
        id_creador:id_creador,
    id_aserradero:formData.id_aserradero,
    id_aserradero2:formData.id_aserradero2,
    id_cernidodetalle:formData.id_cernidodetalle,
    id_cernidodetalle2:formData.id_cernidodetalle2,
    lbaserrin:formData.lbaserrin,
    lbaserrin2:formData.lbaserrin2,
    id_granulometria:formData.id_granulometria,
    id_granulometria2:formData.id_granulometria2,
    mayor_2mm:formData.mayor_2mm,
    entre_2_y_05mm:formData.entre_2_y_05mm,
    menor_05mm:formData.menor_05mm
      });
      Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
 
      // Redirigir a la página de TablaOT después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "/Home/TablaLab";
      },1500 );
    } catch (error) {
      setError("Error al enviar los datos:", error);
    }
    showSkeleton();
  };
  const llamar=()=>{
    setFormula2(true);
  }
  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Aserrín</h4>
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

      {/*iniioc de form */}
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
              Aserradero
          </label>
          <select className="form-select" id="id_aserradero" {...register("id_aserradero")}>
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
{/*       
      <div className="col-md-6">
      <label htmlFor="aserradero" className="form-label">
          Granulometria
      </label>
      <select className="form-select" id="id_granulometria" {...register("id_granulometria")} required>
      <option value="" disabled selected>Seleccione...</option>
      
      {Array.isArray(granulometria.rows)
        && granulometria.rows.length>0 && granulometria.rows.map((granulometria) => (
          <option key={granulometria.id} value={granulometria.id}>
            {granulometria.granulometria}
          </option>
        ))}
      </select>
    </div> */}
     <div className="col-md-10">
  <label className="form-label">
    Granulometría de aserrín (%)
  </label>

  <div className="input-group mb-2">
    <span className="input-group-text">≥2.00 mm</span>
    <input
      type="number"
      step="0.01"
      min="0"
      max="100"
      className="form-control"
      {...register("mayor_2mm", { required: true })}
    />
    <span className="input-group-text">%</span>
  </div>

  <div className="input-group mb-2">
    <span className="input-group-text">2.00 mm - 0.50 mm</span>
    <input
      type="number"
      step="0.01"
      min="0"
      max="100"
      className="form-control"
      {...register("entre_2_y_05mm", { required: true })}
    />
    <span className="input-group-text">%</span>
  </div>

  <div className="input-group">
    <span className="input-group-text">&lt;0.5 mm</span>
    <input
      type="number"
      step="0.01"
      min="0"
      max="100"
      className="form-control"
      {...register("menor_05mm", { required: true })}
    />
    <span className="input-group-text">%</span>
  </div>
</div>


    <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
            Cantidad de Aserrín (lb)
          </label>
          <input type="text" className="form-control" id="lbaserrin" {...register("lbaserrin")} required />
        </div>
   


        
        {formula2 ? (
          <>
          <p><strong>Formula 2</strong></p>
          <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
              Aserradero 2
          </label>
          <select className="form-select" id="id_aserradero2" {...register("id_aserradero2")}>
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
            Detalle Cernido 2
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
      <label htmlFor="aserradero" className="form-label">
          Granulometria 2
      </label>
      <select className="form-select" id="id_granulometria2" {...register("id_granulometria2")} required>
      <option value="" disabled selected>Seleccione...</option>
      
      {Array.isArray(granulometria.rows)
        && granulometria.rows.length>0 && granulometria.rows.map((granulometria) => (
          <option key={granulometria.id} value={granulometria.id}>
            {granulometria.granulometria}
          </option>
        ))}
      </select>
    </div>
    <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
            Cantidad de Aserrín (lb)
          </label>
          <input type="text" className="form-control" id="lbaserrin2" {...register("lbaserrin2")} required />
        </div>
   
</>

        ) :false}
        
        <div className="col-12">
        <div className="col-4">
        <button disabled type="button" className="btn btn-danger mb-3" onClick={llamar}>Mix</button>
        </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>Guardar</button>
        </div>
        </>
)}
      </form>
    </div>
  );
};

export default DTHH;
