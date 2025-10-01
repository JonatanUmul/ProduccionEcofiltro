import axios from "axios";

const GetRegistrosHomogenización = async ({materiaPrim}) => {
  console.log('materiaPrim',materiaPrim)
  const URL = process.env.REACT_APP_URL;


  try {
    const response = await axios.get(`${URL}/TablaOT`,{params:{materiaPrim}});
    console.log("Resultado desde api", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetRegistrosHomogenización;
