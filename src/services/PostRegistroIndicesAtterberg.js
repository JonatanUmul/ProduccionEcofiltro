import axios from "axios"

const GetRegistrosMuestrasBarro = async({ values, codigoLote}) => {
 console.log('Values de values',values)
    const URL = process.env.REACT_APP_URL

    try {
        const response= await axios.post(`${URL}/IndicesAtterberg`, {
            params: { codigoLote, values:values }
          });
        
        return response

       

          
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export default GetRegistrosMuestrasBarro





// CreaciondeCodigosHornos({
//     serialProduccion: seriesOK.map((row) => row.serie1),
//     id_modelo: formData.id_modelo,
//     id_proceso:10,
//     id_dtp :id_dthh_calculado
//   })

// const ultimoIDgthh=async()=>{
//     const response= await axios.get(`${URL}/Ultimo_id_DTHH`)
//     console.log('uktimo id de hornos',response.data.rows[0].ultimoId)
//   }