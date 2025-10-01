import axios from "axios"

const GetRegistrosMuestrasBarro = async() => {
  
    const URL = process.env.REACT_APP_URL
    console.log(URL)

    try {
        const response= await axios.get(`${URL}/LoteRegistroDeCamionadas`);
        console.log('Resultado desde api',response)
        return response

       

          
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export default GetRegistrosMuestrasBarro    
