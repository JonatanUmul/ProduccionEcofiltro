import axios from "axios";
import ErrorAlert from "../components/UI/alerts/ErrorAlert";
import SuccessAlertFlotante from "../components/UI/alerts/SuccesAletFlotante";

const Update_SerieEcofiltroCrudos = async ({ NuevoEstadoSerirTasa }) => {
  const URL = process.env.REACT_APP_URL;

  try {
    const response = await axios.put(`${URL}/Update_SerieEcofiltroTasa`, {
       NuevoEstadoSerirTasa
    });
    console.log('respuesta',response)
    SuccessAlertFlotante(response.data.mensaje)
    return response.data;
  } catch (error) {
    console.error("Error al actualizar estado de la serie:", error);
    ErrorAlert(error);
    throw error;
  }
};

export default Update_SerieEcofiltroCrudos;
