import axios from "axios";
import SuccessAlert from "../components/UI/alerts/succesAlert";
import ErrorAlert from "../components/UI/alerts/ErrorAlert";

const URL = process.env.REACT_APP_URL;
const PostSeriesProduccion=async({serialProduccion, id_dtp, id_proceso, id_modelo})=>{
   
    console.log(serialProduccion, id_dtp, id_proceso, id_modelo)

    try {
        const response= await axios.post(`${URL}/DTP_CodigosProduccion`,{
            serialProduccion, id_dtp, id_proceso, id_modelo
        })

        const respuesta=response.data.mensaje
      
        console.log(respuesta)
        SuccessAlert({respuesta})
       
    } catch (error) {
        const err=error.response.data.mensaje
        console.log('error del server',error)
        ErrorAlert({err})
    }

}

export default PostSeriesProduccion;