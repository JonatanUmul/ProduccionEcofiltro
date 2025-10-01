import axios from "axios";


const ObtenerCodigosParaHornos=async({modeloSeleccionado, id_proceso})=>{
    console.log('modeloSeleccionado en Hornos',modeloSeleccionado, id_proceso)
    const URL = process.env.REACT_APP_URL
    const response= await axios.get(`${URL}/DTHH_CodigosParaHornos`, {params:{modeloSeleccionado, id_proceso}})

    return response.data.rows
}

export default ObtenerCodigosParaHornos;