
import axios from "axios"

const GetSeriesPorOrdenDeProduccion=async({id_dtp, id_proceso, id_modelo})=>{
    const URL_MICRO1 = process.env.REACT_APP_URL_MICRO1
    

    try {
           const response= await axios.get(`${URL_MICRO1}/DTP_CodigosProduccion/${id_dtp}/${id_proceso}`)
           return response
    } catch (error) {
        console.log(error)
    }

    
}

export default GetSeriesPorOrdenDeProduccion