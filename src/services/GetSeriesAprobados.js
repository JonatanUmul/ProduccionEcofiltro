
import axios from "axios"

const GetSeriesAprobados=async({ id_proceso, id_modelo})=>{
    const URL_MICRO1 = process.env.REACT_APP_URL_MICRO1
    console.log('id_dtp para pruea', id_proceso, id_modelo)

    try {
           const response= await axios.get(`${URL_MICRO1}/DTP_CodigosAprobados/${id_proceso}/${id_modelo}`)
           return response
    } catch (error) {
        console.log(error)
    }

    
}


export default GetSeriesAprobados