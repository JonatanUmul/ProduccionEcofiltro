import axios from "axios"

const Homogenizacion = async({fase_aprobacion_mp, datosApi, id_creador}) => {
  console.log('datos en homogenizacion',datosApi)
    const URL = process.env.REACT_APP_URL
    console.log(URL)

    try {
        const response= await axios.post(`${URL}/etapas_barro`,{fase_aprobacion_mp, datosApi, id_creador});
    
        return response

    } catch (error) {
        console.log(error)
        throw error;
    }
}

export default Homogenizacion    
