import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
import { Skeleton, Space } from 'antd';
const URL = process.env.REACT_APP_URL

const DTHH = ({ encabezado, EncName, fecha_creacion,id }) => {
  const { handleSubmit, register, watch } = useForm();
  const [humedad, setHumedad]=useState(0);
  const [error, setError]= useState('');
    const [id_creador, setid_creador] = useState('');
  const [loading, setLoading] = useState(false);
  // const [factorLimite, setfactorLimite]=useState(0)
  // const golpes=[
  //   {
  //     20:0.974,
  //     21:0.979,
  //     22:0.985,
  //     23:0.99,
  //     24:0.995,
  //     25:1,
  //     26:1.005,
  //     27:1.009,
  //     28:1.014,
  //     29:1.018,
  //     30:1.022,
  //   }
  // ]
  

  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })


  // useEffect(() => {
  //   try {
  //     Promise.all([
  //       axios.get(`${URL}/Aserradero`),
  //       axios.get(`${URL}/ModelosUF`),
  //       axios.get(`${URL}/CernidoDetalle`),
  //       axios.get(`${URL}/maquinaria/${maquinaria}`),
  //       axios.get(`${URL}/Operarios/${id_area}`),
  //       axios.get(`${URL}/granulometria`),
  //     ])
  //       .then(([ AserraderoResponse, ModelosufResponse, CernidodetalleResponse, HornosResponse, OperariosResponse, GranulometriaResponse]) => {
  //         setAserradero(AserraderoResponse.data);
  //         setModelos(ModelosufResponse.data); 
  //         setCernidoDetalle(CernidodetalleResponse.data);
  //         setTHornos(HornosResponse.data);
  //         setHornero(OperariosResponse.data);
  //         setGranulometria(GranulometriaResponse.data)
  //       })
  //       .catch((error) => {
  //         setError("Error al obtener los datos", error);
  //       });
  //   } catch(error) {
  //     setError("Error al obtener los datos", error);
  //   }
  // }, []);


  const showSkeleton = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };


    
  const [golpes, setGolpes]=useState(0);
  console.log('Numero de Golpes',golpes)
  useEffect(()=>{
      const pesoMaterialHumedo= watch('PesoDeRecipienteYMaterialHumedo')
      console.log('aca',pesoMaterialHumedo)
      const pesoMaterialSeco=watch('pesoMaterialSeco')
      const pesoderecipiente=watch('PesoDeRecipiente')
      setGolpes(watch('NoGolpes'))
      console.log(golpes)
      const humeda=(Math.trunc(( pesoMaterialHumedo-pesoMaterialSeco)/(pesoMaterialSeco-pesoderecipiente)*100))
      setHumedad(humeda)
  })

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${URL}/Cliquido` ,
      {
        id_clp: id.toString(),
        id_creador:id_creador,
        pesoderecipiente:formData.pesoderecipiente,
        NoGolpes:formData.NoGolpes,
        PesoDeRecipienteYMaterialHumedo:formData.PesoDeRecipienteYMaterialHumedo
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
  // const llamar=()=>{
  //   setFormula2(true);
  // }
  // const Humedad=(formData)=>{
  //   const pesoMaterialHumedo= formData.pesoMaterialHumedo
  //   const pesoMaterialSeco=formData.pesoMaterialSeco
  //   const pesoderecipiente=formData.pesoderecipiente
  //   const humeda=((pesoMaterialHumedo-pesoMaterialSeco)/(pesoMaterialSeco-pesoderecipiente))
  //   setHumedad(humeda)

  // }
  // Humedad()


  const [factorLimite, setfactorLimite]=useState(0)
  console.log('Factor Limite aca',factorLimite)
  useEffect(()=>{
    switch(golpes){
      case '20':
        setfactorLimite(0.974)
        break;
      case '21':
        setfactorLimite(0.979)
        break;
        case '22':
          setfactorLimite(0.985)
          break;
          case '23':
            setfactorLimite(0.99)
            break;
            case '24':
              setfactorLimite(0.995)
              break;
              case '25':
                setfactorLimite(0.1)
                break;
                case '26':
                  setfactorLimite(1.005)
                  break;
                  case '27':
                    setfactorLimite(1.009)
                    break;
                    case '28':
                      setfactorLimite(1.014)
                      break;
                      case '29':
                      setfactorLimite(1.018)
                      break;
                      case '30':
                      setfactorLimite(1.022)
                      break;
                  

    default:
      setfactorLimite('')
      break;
  }
  },[golpes])
  
 

  
  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Limite Liquido</h4>
      <div className="card">
        <div className="card-body">
          <label htmlFor="materiaPrima" className="form-label">
            Orden
          </label>
          <p id="materiaPrima" className="form-control-static">{encabezado} - {id}</p>
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
            Peso del Recipiente (g)                        
          </label>
          <input type="number" className="form-control" id="PesoDeRecipiente" {...register("PesoDeRecipiente")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
            No. Golpes
          </label>
          <input type="number" className="form-control" id="NoGolpes" {...register("NoGolpes")} required />
        </div>
        {/* <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
          Peso de recipiente y material seco (g)                       
          </label>
          <input type="number" className="form-control" id="pesoMaterialSeco" {...register("pesoMaterialSeco")} required />
        </div> */}
        <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
           Peso de recipiente y material humedo (g)
          </label>
          <input type="number" className="form-control" id="PesoDeRecipienteYMaterialHumedo" {...register("PesoDeRecipienteYMaterialHumedo")} required />
        </div>
        {/* <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
          Humedad
          </label>
          <input type="number" disabled className="form-control" value={humedad}></input>
        </div> */}
        <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
           Factor Limite Liquido
          </label>
         
          {golpes<=19 || golpes>=31 ? 
        <div class="alert alert-danger" role="alert">
        El valor de golpes debe ser superior a 20 e inferior a 30.
    </div>
        : <input disabled type="number" className="form-control" value={factorLimite}></input>}
        </div>
       
     

     <div className="col-12" >
     {golpes<=19 || golpes>=31 ? 
      <button type="button" className="btn btn-danger" style={{width:'20%'}} disabled={loading}>Guardar</button>
              :
      <button type="submit" className="btn btn-primary" style={{width:'20%'}} disabled={loading}>Guardar</button>

    }
          </div>
        </>
)}
      </form>
    </div>
  );
};

export default DTHH;
