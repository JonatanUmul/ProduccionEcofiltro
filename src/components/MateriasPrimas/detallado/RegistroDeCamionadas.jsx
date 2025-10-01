import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import SuccesAlert from "../../UI/alerts/succesAlert.jsx";
import ErrorAlert from "../../UI/alerts/ErrorAlert.jsx";
import InformationAlert from "../../UI/alerts/AlertAnt.jsx";
import Skeleton from "../detallado/Skeleton.jsx";
import Button from "../../UI/Button.jsx";
import GetRegistrosMuestrasBarro from '../../../services/GetLoteRegistroDeCamionadas.js'
import PostLoteRegistroDeCamionadas from '../../../services/PostLoteRegistroDeCamionadas.js'
// import CameraWeb from '../../hooks/CameraWeb'
const URL = process.env.REACT_APP_URL;

const LoteBarro = ({onClose,datosApi  }) => {
 

  const { handleSubmit, register, reset } = useForm();
  const [id_creador, setIdCreador] = useState("");
  const [correlativo, setCorrelativo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]=useState('')
  useEffect(() => {
    const id = localStorage.getItem("id_creador");

    setIdCreador(id);
  }, []);

  
  const Correlativo = async () => {
    const response = await GetRegistrosMuestrasBarro();
    setCorrelativo(response.data.correlativo);
  };

  useEffect(() => {
    try {
      Correlativo();
    } catch (error) {
      setError(error)
    }
   
  }, []);

  const onSubmit = async (forms) => {
    try {
      const payload = {
        muestra_id:datosApi.id,
        codigo_lote: correlativo,
        observaciones: forms.observaciones,
        id_creador: id_creador,
      };
      const response = PostLoteRegistroDeCamionadas({payload})
console.log('Respuesta del servidorss',response)
      setLoading(true);
      reset();
      // window.location.href = "/Home/TablaBarro";
      const respuesta=response.data.message
      console.log('mensaje para la respuest',respuesta)
      SuccesAlert({respuesta}); 
      onClose()
    } catch (error) {
      setLoading(false);
      ErrorAlert();
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
          Registrar Camionada al Lote principal: {datosApi.codigo_lote}
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
