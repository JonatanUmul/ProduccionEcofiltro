import axios from "axios";
// import SuccessAlert from "../components/UI/alerts/succesAlert";
import ErrorAlert from "../components/UI/alerts/ErrorAlert";

const URL = process.env.REACT_APP_URL;


const GetSeriesMermasProduccion=async({id_modelo, id_proceso, fecha_inicio, fecha_fin})=>{
   
    console.log('mermas de produccion',id_modelo, id_proceso, fecha_inicio, fecha_fin)

    try {
        const response= await axios.get(`${URL}/DTP_MermasProduccion`,{
            params:{
                id_modelo, id_proceso, fecha_inicio, fecha_fin
        }})
        console.log('response',response)
        const respuesta=response.data.mensaje
        return response
     
        // SuccessAlert({respuesta})
       
    } catch (error) {
        const err=error.response.data.mensaje
        console.log('error del server',error)
        ErrorAlert({err})
    }

}

export default GetSeriesMermasProduccion;