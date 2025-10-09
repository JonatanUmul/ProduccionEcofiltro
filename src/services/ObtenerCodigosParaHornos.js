import axios from "axios";


const ObtenerCodigosParaHornos=async({modeloSeleccionado, id_proceso})=>{
    console.log('modeloSeleccionado en Hornos',modeloSeleccionado, id_proceso)
    const URL_MICRO1 = process.env.REACT_APP_URL_MICRO1
    const response= await axios.get(`${URL_MICRO1}/DTHH_CodigosParaHornos`, {params:{modeloSeleccionado, id_proceso}})

    return response.data.rows
}

export default ObtenerCodigosParaHornos;