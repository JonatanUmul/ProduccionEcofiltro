import axios from "axios";

const TempHornos_Solantec=async({fecha_creacion_inicio, fecha_creacion_fin, modeloUF, turn, horno, tiempo})=>{
    console.log('datos recibuidos',fecha_creacion_inicio, fecha_creacion_fin, modeloUF, turn, horno, tiempo)
    const URL = process.env.REACT_APP_URL

    try {
        const response=await axios.get(`${URL}/DTHSOLANTEC/${fecha_creacion_inicio || null}/${fecha_creacion_fin || null}/${modeloUF|| null}/${turn|| null}/${horno|| null}/${tiempo|| null}`)
        console.log(response)
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}


export default TempHornos_Solantec