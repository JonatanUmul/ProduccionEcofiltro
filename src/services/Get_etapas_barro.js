import axios from "axios";

const 
GetRegistrosHomogenización = async ({
  id_fase_aprobacion,
  estado_proceso,
}) => {
  const URL = process.env.REACT_APP_URL;
  console.log(
    "en get para la homogenización",
    id_fase_aprobacion,
    estado_proceso
  );

  try {
    const response = await axios.get(`${URL}/etapas_barro`, {
      params:{ 
        id_fase_aprobacion, 
        estado_proceso },
    });
    console.log("Resultado desde api", response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetRegistrosHomogenización;
