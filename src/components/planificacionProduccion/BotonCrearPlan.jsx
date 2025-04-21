import React, { useEffect, useState } from 'react';
import DashBoard from './DashBoard';
import Inicio from './Board';
import PlanificarMes from './PlanificacionDiario';

const App = () => {
  const [opcion, setOpcion] = useState(null);

  const BuscarOpcion = (e, option) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto de los enlaces
    setOpcion(option);
  };

const seleccionMenu=()=>{
  switch (opcion) {
    case '1':
      return <PlanificarMes />;
    case '2':
      return <DashBoard/>
    default:
      return null;
  }
};
  

   


  return (
    <div className="btn-group" role="group">
      <button
        type="button"
        className="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Dropdown
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="#" onClick={(e) => BuscarOpcion(e, "1")}>
            Planificar Mes
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#" onClick={(e) => BuscarOpcion(e, "2")}>
            DashBoard
          </a>
        </li>
      </ul>
      </div>
     {opcion>0 ? seleccionMenu():<Inicio/>}
     
    </div>
  );
};

export default App;
