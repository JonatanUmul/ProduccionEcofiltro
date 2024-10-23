import React, { useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ROTPB from './ROTPB'
import ROTPS from './ROTPS'
import ROTT from './encabezados/ROTT'
import ROTH from './encabezados/ROTH'



const BotonOT = () => {
  const [modal, setModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    const dropdownToggle = document.getElementById('dropdownMenuButton');
    if (dropdownToggle) {
      new bootstrap.Dropdown(dropdownToggle);
    }
  }, []);

  const toggleModal = () => setModal(!modal);

  // Función para manejar el evento de clic en un elemento del menú desplegable
  const handleDropdownItemClick = (event, option, title) => {
    // Evita que el enlace predeterminado se active
    event.preventDefault();
    // Abre el modal
    setSelectedOption(option);
    setModalTitle(title);
    toggleModal();
  };

  // Función para renderizar el componente correspondiente al formulario seleccionado
  const renderSelectedForm = () => {
    switch (selectedOption) {
    
      case '1':
        return <ROTPB/>
      case '2':
          return <ROTPS/>
      case '3':
          return <ROTT/>
      case '4':
            return <ROTH/>

      default:
        return null;
    }
  };

  return (
    <div className="dropdown">
    
    {/* Renderiza el componente correspondiente al formulario seleccionado dentro del modal */}

      <button
        className="btn btn-secondary dropdown-toggle mb-3"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Reporte
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '1', 'Pulida Base')}>
          1. Pulida Base
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '2', 'Pulida Superior')}>
        2. Pulida Superior
      </a>
      <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '3', 'Temperatura Tunel')}>
        3. Temperatura Tunel
      </a>
      <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '4', 'Temperatura Hornos')}>
        4. Temperatura Hornos
      </a>
  
    

        {/* Agrega más elementos del menú desplegable aquí */}
      </div>
      { renderSelectedForm() }
      
      
    </div>

  );
};

export default BotonOT;
