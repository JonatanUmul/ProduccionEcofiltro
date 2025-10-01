import axios from "axios"
import SuccessAlert from "../components/UI/alerts/succesAlert";
import ErrorAlert from "../components/UI/alerts/ErrorAlert";

const PostLoteRegistroDeCamionadas = async({payload, onClose}) => {

    console.log('Props',payload)
    const URL = process.env.REACT_APP_URL

    try {
        const response= await axios.post(`${URL}/DTPV`, payload)
        
 
        const respuesta=response.data.mensaje
        {
            (window.location.href = "/Home/TablaPulverizado")
        }
        console.log(respuesta)
        SuccessAlert({respuesta})
        onClose()
    } catch (error) {
        const err=error.response.data.mensaje
        console.log('error del server',err)
        ErrorAlert({err})
    }
}   

export default PostLoteRegistroDeCamionadas
