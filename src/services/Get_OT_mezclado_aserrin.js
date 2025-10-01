import axios from "axios";

const GetRegistrosHomogenización = async () => {
  const URL = process.env.REACT_APP_URL;


  try {
    const response = await axios.get(`${URL}/Get_OT_mezclado_aserrin`);
    console.log("Resultado desde api", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetRegistrosHomogenización;
