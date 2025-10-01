import axios from "axios"

const PostLoteRegistroDeCamionadas = async({payload}) => {
    console.log('Props',payload)
    const URL = process.env.REACT_APP_URL

    try {
        const response= await axios.post(`${URL}/LoteRegistroDeCamionadas`, payload)

        return response
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export default PostLoteRegistroDeCamionadas
