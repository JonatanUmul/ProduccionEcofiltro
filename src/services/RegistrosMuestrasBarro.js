import axios from "axios"

const RegistrosMuestrasBarro = async({values, codigoLote}) => {
    console.log('Props',values)
    const URL = process.env.REACT_APP_URL

    try {
        const response= await axios.get(`${URL}/IndicesAtterberg`,{values:values, codigoLote:codigoLote })

        return response
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export default RegistrosMuestrasBarro
