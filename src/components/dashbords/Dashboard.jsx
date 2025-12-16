import React, { useEffect, useState } from 'react';
import './estilos.css';
import { formatFecha } from "../utilidades/FormatearFecta";
import Tabla_Temp from './GraficosHornos/Tabla_Temp';
const Dashboard = () => {
  /*const [filtros, setFiltros] = useState({
    turn: 1,
    horno: 1,
    fecha_creacion_inicio: formatFecha(new Date()),
    fecha_creacion_fin: formatFecha(new Date())
  });

  const handleFiltrosChange = (newFiltros) => {
    setFiltros(newFiltros);
  };

*/
  return (
    <div className="row">

    <div className="row">

    </div> 
    <div className="col mb-5">
    <div style={{ marginBottom: '20px' }}>
    <Tabla_Temp/>
    </div>
    </div>
    </div>

 
    
  );
};

export default Dashboard;
