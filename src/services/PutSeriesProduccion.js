import axios from "axios";
import SuccessAlert from "../components/UI/alerts/succesAlert";
import ErrorAlert from "../components/UI/alerts/ErrorAlert";
import timeAlert from "../components/UI/alerts/timeAlert";
import Swal from "sweetalert2";
//const URL = process.env.REACT_APP_URL;
const URL_MICRO1 = process.env.REACT_APP_URL_MICRO1;

const PostSeriesProduccion=async({serialProduccion, id_proceso, id_modelo, disponibilidad})=>{
   
    console.log('Series para actualizar',serialProduccion, id_proceso, id_modelo, disponibilidad)

    try {
       const response= await axios.put(`${URL_MICRO1}/UPDATE_CodigosProduccion`,{
            serialProduccion, id_proceso, id_modelo, disponibilidad
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