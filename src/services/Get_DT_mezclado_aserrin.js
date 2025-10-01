import axios from "axios";

const GetRegistrosHomogenización = async ({id_ot_mezclado_aserrin}) => {
  const URL = process.env.REACT_APP_URL;


  try {
    const response = await axios.get(`${URL}/Get_DT_mezclado_aserrin`,{params:{id_ot_mezclado_aserrin}});
    console.log("Resultado desde api", response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetRegistrosHomogenización;
