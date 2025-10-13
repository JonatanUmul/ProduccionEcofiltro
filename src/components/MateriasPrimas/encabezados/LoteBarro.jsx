import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import SuccesAlert from "../../UI/alerts/succesAlert.jsx";
import ErrorAlert from "../../UI/alerts/ErrorAlert.jsx";
import Skeleton from "../detallado/Skeleton.jsx";
import Button from "../../UI/Button.jsx";
// import CameraWeb from '../../hooks/CameraWeb'
const URL = process.env.REACT_APP_URL;

const LoteBarro = ({ toggleModal, materiaPrima, enc_matprima }) => {
 
  const { handleSubmit, register, reset } = useForm();
  const [id_creador, setIdCreador] = useState("");
  const [correlativo, setCorrelativo] = useState([]);
  const [loading, setLoading] = useState(false);
  const id_materia_prima=materiaPrima==="Barro"?1:2
  console.log("Loading duranyte envio a api", id_materia_prima);
  useEffect(() => {
    const id = localStorage.getItem("id_creador");

    setIdCreador(id);
  }, []);

  const Correlativo = async () => {
    const response = await axios.get(`${URL}/CorrelativoMuestraBarro`,{params:{id_materia_prima}});
    setCorrelativo(response.data.correlativo);
  };

  useEffect(() => {
    Correlativo();
  }, []);

  const onSubmit = async (forms) => {
    console.log('forms',forms)
    try {
      const payload = {
        codigo_lote: correlativo,
        estado: 1,
        observaciones: forms.observaciones,
        sacos:forms.sacos,
        id_creador: id_creador,
        enc_matprima
      };

      const response = await axios.post(`${URL}/registroMuestra`, payload);
       
  
      console.log('response',response);
      const respuesta='Guardado correctamente'
      setLoading(true);
      reset();
      SuccesAlert(respuesta);
     { materiaPrima=='Barro'?    window.location.href = "/Home/TablaRecepcionBarro": window.location.href = "/Home/TablaRecepcionAserrin"}
   
      toggleModal();
    } catch (error) {
     const message = 'Ocurrió un error inesperado'
      setLoading(false);
      ErrorAlert(message);
      console.error("Error al enviar los datos:", error);
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className=" mt-1 d-flex justify-content-center">
      <div
        className="card  p-4"
        style={{ maxWidth: "600px", width: "100%", border: "0px" }}
      >
        <h4 className="text-center text-primary mb-4">
          Registro camionada de barro
        </h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-floating mb-3">
            <input
              disabled
              value={correlativo}
              type="text"
              className="form-control"
              id="codigo_lote"
              placeholder="Código de Lote"
            />
            <label htmlFor="codigo_lote">Código de Lote</label>
          </div>

          <div className="form-floating mb-3">
            <input
              disabled
              type="date"
              className="form-control"
              id="fecha"
              defaultValue={currentDate}
            />
            <label htmlFor="fecha">Fecha</label>
          </div>
          {materiaPrima==='Aserrin'?
           <div className="form-floating mb-3">
           <input
             
             type="number"
             className="form-control"
             id="sacos"
             {...register("sacos")}
           />
           <label htmlFor="sacos">Sacos</label>
         </div>:''}
         

          <div className="form-floating mb-4">
            <textarea
             disabled= {loading ? true: false}
              className="form-control"
              placeholder="Observaciones"
              id="observaciones"
              style={{ height: "100px" }}
              {...register("observaciones")}
            ></textarea>
            <label htmlFor="observaciones">Observaciones</label>
          </div>
          {/* <CameraWeb name={correlativo}/> */}
          {loading ? (
            <Skeleton active={loading} />
          ) : (
            <Button type="submit" className="btn btn-primary w-100">
            Crear muestra
            </Button>
        
          )}
        </form>
      </div>
    </div>
  );
};

export default LoteBarro;
