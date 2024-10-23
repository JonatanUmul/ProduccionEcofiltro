import React, { useState } from 'react';
import PlanificarMes from './PlanificacionDiario';
import Isuees from './Isuues/TablaIsuues';
import Dashboard from './DashBoard'
const App = () => {
  const [opcion, setOpcion] = useState(null);
  console.log('Opción seleccionada', opcion);

  const BuscarOpcion = (e, option) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto de los enlaces
    setOpcion(option); // Actualizar el estado con la opción seleccionada
  };

  const renderOpcion = () => {
    switch (opcion) {
      case '1':
        return <PlanificarMes />;
      case '2':
        return <Isuees />;
        case '3':
            return <Dashboard />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="btn-group" role="group">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#" onClick={(e) => BuscarOpcion(e, '1')}>
              Planificar Mes
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={(e) => BuscarOpcion(e, '2')}>
              Creación de Issues
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={(e) => BuscarOpcion(e, '3')}>
              Board
            </a>
          </li>
        </ul>
      </div>

      {/* Renderizar el componente seleccionado */}
      <div>
        {opcion ?renderOpcion():<Dashboard/> }
      </div>
    </div>
  );
};

export default App;
