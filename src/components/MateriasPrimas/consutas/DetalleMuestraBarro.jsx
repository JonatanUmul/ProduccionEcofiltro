import React, { useEffect, useState } from "react";
import { formatFecha } from "../../utilidades/FormatearFecta";
import GetRegistrosMuestrasBarro from "../../../services/GetRegistrosMuestrasBarro";
import AlertAnt from '../../UI/alerts/AlertAnt'
import "./estiloTabla.css";
const ConsultaDTCA1 = ({ datosApi }) => {
  const [error, setError] = useState("");
  const [datos, setDatos] = useState([]);

  const codigo_lote = datosApi.codigo_lote;

  const ObtenerDatos = async () => {
    try {
      const response = await GetRegistrosMuestrasBarro({
        codigo_lote: codigo_lote,
      });
      setDatos(response.data.datos);
      console.log("Respuesta del servidor", response);
    } catch (error) {
      console.log(error.response.data.mensaje);
      setError(error.response.data.mensaje);
    }
  };

  useEffect(() => {
    ObtenerDatos();
  }, []);
 
      const limite_liquido= (datos.reduce((acc, x)=>acc+parseInt(x.limite_liquido),0)/datos.length)
      const limite_plastico= (datos.reduce((acc, x)=>acc+parseInt(x.limite_plastico),0)/datos.length)
      const limo= (datos.reduce((acc, x)=>acc+parseInt(x.limo),0)/datos.length)
      const arcilla= (datos.reduce((acc, x)=>acc+parseInt(x.arcilla),0)/datos.length)
      const arena= (datos.reduce((acc, x)=>acc+parseInt(x.arena),0)/datos.length)



  return (
    <div className="table-responsive">
      {error && <AlertAnt  error={error}/>}
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha del ensayo</th>
            <th scope="col">Código de Lote</th>
            <th scope="col">Responsable</th>
            <th scope="col">Limite Liquido</th>
            <th scope="col">Limite Plastico</th>
            <th scope="col">Limo</th>
            <th scope="col">Arcilla</th>
            <th scope="col">Arena</th>
          </tr>
        </thead>
       
          <tbody>
            {Array.isArray(datos) &&
              datos.length > 0 &&
              datos.map((fila, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatFecha(fila.fecha_creacion)}</td>
                  <td>{fila.codigo_lote}</td>
                  <td>{fila.responsable}</td>
                  <td>{fila.limite_liquido}%</td>
                  <td>{fila.limite_plastico}%</td>
                  <td>{fila.limo}%</td>
                  <td>{fila.arcilla}%</td>
                  <td>{fila.arena}%</td>
                
                </tr>
              ))}
          </tbody>
                <th>Totales</th>
                <td colSpan={3}></td>
              
                <td >{limite_liquido}%</td>
                <td >{limite_plastico}%</td>
                <td >{limo}%</td>
                <td >{arcilla}%</td>
                <td >{arena}%</td>
      </table>
    </div>
  );
};

export default ConsultaDTCA1;
