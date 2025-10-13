import axios from "axios";
import SuccessAlert from "../components/UI/alerts/succesAlert";
import ErrorAlert from "../components/UI/alerts/ErrorAlert";
import Swal from "sweetalert2";
const URL_MICRO1 = process.env.REACT_APP_URL_MICRO1;
const PostSeriesProduccion=async({serialProduccion, id_dtp, id_proceso, id_modelo})=>{
   
    console.log(serialProduccion, id_dtp, id_proceso, id_modelo)

    try {
        const response= await axios.post(`${URL_MICRO1}/DTP_CodigosProduccion`,{
            serialProduccion, id_dtp, id_proceso, id_modelo
        })
 
        const respuesta=response.data.mensaje
      
        SuccessAlert({respuesta})
       
    } catch (error) {
        const err=error.response.data.mensaje
        console.log('error del server',error)
        ErrorAlert({err})
    }

}

export default PostSeriesProduccion;