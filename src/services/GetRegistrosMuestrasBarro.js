import axios from "axios"

const GetRegistrosMuestrasBarro = async({ codigo_lote}) => {
    console.log('Props',codigo_lote)
    const URL = process.env.REACT_APP_URL

    try {
        const response= await  await axios.get(`${URL}/indicesAtterbergCod`, {
            params: { codLote: codigo_lote }
          });
        
        return response

       

          
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export default GetRegistrosMuestrasBarro


