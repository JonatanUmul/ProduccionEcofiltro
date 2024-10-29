import React, { useState, useRef } from 'react';
import PlanificarMes from './PlanificacionDiario';
import Isuees from './Isuues/TablaIsuues';
import Dashboard from './DashBoard';

const App = () => {
  const sectionRef = useRef(null);
  const [opcion, setOpcion] = useState(null);
  const [fullscreen, setFullscreen] = useState(false); // Estado para modo pantalla completa

  const BuscarOpcion = (e, option) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto de los enlaces
    setOpcion(option); // Actualizar el estado con la opción seleccionada
  };

  const handleFullscreen = () => {
    if (sectionRef.current.requestFullscreen) {
      sectionRef.current.requestFullscreen();
    } else if (sectionRef.current.webkitRequestFullscreen) {
      sectionRef.current.webkitRequestFullscreen();
    } else if (sectionRef.current.msRequestFullscreen) {
      sectionRef.current.msRequestFullscreen();
    }

    // Ajustamos la altura después de activar pantalla completa y actualizamos el estado
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.style.height = `${window.innerHeight}px`;
        setFullscreen(!fullscreen); // Actualizar el estado para forzar re-renderizado
      }
    }, 500);
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
          Opciones
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
      
      <div className="row" style={{ gap: '10px', marginBottom: '20px' }}>
        <button
          style={{ marginTop: '5px', width: '10%' }}
          className="btn-primary"
          onClick={handleFullscreen}
        >
          Pantalla Completa
        </button>
      </div>
      
      {/* Renderizar el componente seleccionado */}
      <div ref={sectionRef} style={{ justifyContent: 'center', display: 'flex',  }}>
        {opcion ? renderOpcion() : <Dashboard />}
      </div>
    </div>
  );
};

export default App;
