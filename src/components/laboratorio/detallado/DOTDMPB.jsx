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
      const response = await axios.post(`${URL}/DOTDMPB` ,
      {
        id_dtp: id.toString(),
    id_creador:id_creador,
    lbbarro:formData.lbbarro,
    carcilla:formData.carcilla,
    climo:formData.climo,
    carena:formData.carena,
    hbarro:formData.hbarro,
    iplastico:formData.iplastico

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
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Barro</h4>
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
          <label htmlFor="esquinaSI" className="form-label">
            Cantidad de Barro (lb)
          </label>
          <input type="text" className="form-control" id="lbbarro" {...register("lbbarro")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
            Contenido de arcilla (%)
          </label>
          <input type="text" className="form-control" id="carcilla" {...register("carcilla")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
            Contenido de limo (%)
          </label>
          <input type="text" className="form-control" id="climo" {...register("climo")} required />
        </div>
        <div className="col-md-6">
        <label htmlFor="esquinaSI" className="form-label">
          Contenido de arena (%)
        </label>
        <input type="text" className="form-control" id="carena" {...register("carena")} required />
      </div>
      <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
            Humedad del barro (%)
          </label>
          <input type="text" className="form-control" id="hbarro" {...register("hbarro")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
            Indice Plastico (%)
          </label>
          <input type="text" className="form-control" id="iplastico" {...register("iplastico")} required />
        </div>
     

     <div className="col-12">
       
          <button type="submit" className="btn btn-primary" disabled={loading}>Guardar</button>
        </div>
        </>
)}
      </form>
    </div>
  );
};

export default DTHH;
