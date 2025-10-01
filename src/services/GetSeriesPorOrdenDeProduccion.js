
import axios from "axios"

const GetSeriesPorOrdenDeProduccion=async({id_dtp, id_proceso, id_modelo})=>{
    const URL = process.env.REACT_APP_URL
    console.log('id_dtp para pruea',id_dtp, id_proceso, id_modelo)

    try {
           const response= await axios.get(`${URL}/DTP_CodigosProduccion/${id_dtp}/${id_proceso}`)
           return response
    } catch (error) {
        console.log(error)
    }

    
}

export default GetSeriesPorOrdenDeProduccion