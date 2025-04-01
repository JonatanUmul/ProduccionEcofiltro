import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../utilidades/FormatearFecta";
const URL = process.env.REACT_APP_URL;

const TablaIndices = () => {
  const [datos, setDatos] = useState([]);
  const [fecha, setFecha]= useState(formatFecha(Date()))
  console.log(datos)
  console.log(fecha)
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get(`${URL}/IndicesAtterberg/${fecha}`);
        setDatos(response.data.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    obtenerDatos();
  }, [fecha]);

  return (
    <div>
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Registros de Índices de Atterberg</h4>
      <input type="date" placeholder="Fecha de producción" onChange={(e)=>setFecha(e.target.value)}></input>
      <div className="table-responsive mt-4">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>Fecha Ensayo</th>
              <th>Límite Líquido</th>
              <th>Límite Plástico</th>
              <th>Índice Plástico</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(datos)&&datos.map((item, index) => (
              <tr key={index}>
                <td>{formatFecha(item.fecha_produccion)}</td>
                <td>{item.limite_liquido}</td>
                <td>{item.limite_plastico}</td>
                <td>{item.indice_plastico}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaIndices;
