import React, { useEffect, useState } from "react";
import CrearCodigos from "../../../services/CrearCodigos";
import PostSeriesProduccion from "../../../services/PostSeriesProduccion";
import { useLocation } from "react-router-dom";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";

const CodigosEcofiltro = () => {
  const navigate = useNavigate();
  const [serialProduccion, setSerialProduccion] = useState([]);
  const [id_proceso, setId_proceso]=useState(0)
  const location = useLocation();
  const fila = location.state?.fila;
  const id_modelo= fila.id_ufmodelo

  console.log('en creacion de codigo',fila)

const model=fila.nombre_ufmodelo
const id_model=()=>{
  console.log(model)
  if(model==="20 LTS"){
    setId_proceso(4)

  }
  else if(model==='Mini'){
    setId_proceso(6)
  }
  else{
    setId_proceso(5)
  }
}
useEffect(()=>{
  id_model()
},[model])




  const producido = fila.producido;
  const identificador = fila.letra_fin;
  const CodigoInicioNumber = fila.codigoInicio;
  const fecha_cre = new Date(fila.fecha_real);
  const id_dtp = fila.id;

  const dia = String(fecha_cre.getDate()).padStart(2, "0");
  const mes = String(fecha_cre.getMonth() + 1).padStart(2, "0");
  const año = fecha_cre.getFullYear().toString().slice(-2);
  const fechaConcatenado = dia + mes + año;

  const datosParaCodigos = {
    producido,
    identificador,
    CodigoInicioNumber,
    fechaConcatenado,
  };

  useEffect(() => {
    const CrearCode = async () => {
      try {
        const response = await CrearCodigos({ datosParaCodigos });
        setSerialProduccion(response);
      } catch (error) {
        console.log(error);
      }
    };

    CrearCode();
  }, [fila.producido, identificador]);

  const PostCodigos = async () => {
    const response = await PostSeriesProduccion({ serialProduccion, id_dtp, id_proceso, id_modelo });

    window.location.href = "/Home/TablaReportesOT/MermasOTP";
  };
  //  Divide los códigos en filas con 5 columnas cada una
  const chunkedCodes = [];
  const columnasPorFila = 5;

  for (let i = 0; i < serialProduccion.length; i += columnasPorFila) {
    chunkedCodes.push(serialProduccion.slice(i, i + columnasPorFila));
  }

  const volverAtras = () => {
    navigate('/Home/TablaReportesOT/ROTP');
  };

  return (
    <div className=" mt-4">
      <Button onClick={volverAtras} className="btn btn-danger">
        Regresar
      </Button>
      <h4 className="mb-4">Códigos Generados para Producción #{fila.id}</h4>
      <h5 className="mb-4">Total Códigos: {serialProduccion.length}</h5>
      <Button onClick={PostCodigos}>Crear Códigos</Button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "10px",
          maxHeight: "70vh",
          overflowY: "auto",
          padding: "10px",
          background: "#f8f9fa",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        {serialProduccion.map((codigo, index) => (
          <div
            key={index + 1}
            style={{
              background: "white",
              border: "1px solid #dee2e6",
              borderRadius: "6px",
              padding: "8px",
              textAlign: "center",
              fontWeight: "500",
              fontSize: "0.9rem",
              wordBreak: "break-all",
            }}
          >
            {codigo}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodigosEcofiltro;
