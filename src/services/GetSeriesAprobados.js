
import axios from "axios"

const GetSeriesAprobados=async({ id_proceso, id_modelo})=>{
    const URL = process.env.REACT_APP_URL
    console.log('id_dtp para pruea', id_proceso, id_modelo)

    try {
           const response= await axios.get(`${URL}/DTP_CodigosAprobados/${id_proceso}/${id_modelo}`)
           return response
    } catch (error) {
        console.log(error)
    }

    
}


export default GetSeriesAprobados