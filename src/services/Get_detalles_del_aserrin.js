import axios from "axios";

const Get_detalles_del_aserrin = async ({id_detalle}) => {
  console.log('ids',id_detalle)
  const URL = process.env.REACT_APP_URL;
  try {
    const response = await axios.get(`${URL}/Detalles_del_Aserrin`,
       {
        params: { id_detalle }
      }
    );
    console.log("Resultado desde api", response);
    return response;
  } catch (error) {
    console.log('este es el error',error.message);
    throw error;
  }
};

export default Get_detalles_del_aserrin;
