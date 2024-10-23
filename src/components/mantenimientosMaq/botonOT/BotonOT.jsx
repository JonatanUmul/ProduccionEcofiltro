import React, { useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';
import MTA from '../encabezados/MTA';
import MEXT from '../encabezados/MEXT' 
import MCTA from '../encabezados/MCTA' 
import MBT from '../encabezados/MBT'
import MPH2 from '../encabezados/MPH2'
import MPHM from '../encabezados/MPHM'
import MMM from '../encabezados/MMM'
import MM2 from '../encabezados/MM2'
import MCTAM from '../encabezados/MCTAM'
import MPM from '../encabezados/MPM'

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
        return <MTA 
        modalTitle={modalTitle}/>;
      case '2':
        return <MEXT   
        modalTitle={modalTitle}/>;
      case '3':
        return <MCTA 
        modalTitle={modalTitle}/>;
      case '4':
        return <MBT 
        modalTitle={modalTitle}/>;    
      case '5':
        return <MPH2 
        modalTitle={modalTitle}/>;
      case '6':
        return <MPHM
         modalTitle={modalTitle}/>;
      case '7':
        return <MMM
         modalTitle={modalTitle}/>;
      case '8':
          return <MM2
           modalTitle={modalTitle}/>;
      case '9':
         return <MCTAM
            modalTitle={modalTitle}/>; 
      case '10':
          return <MPM
             modalTitle={modalTitle}/>;   

      default:
        return null;
    }
  };

  return (
    <div className="dropdown">
      <Modal isOpen={modal} toggle={toggleModal} backdrop="static" collapse={true}>
  {/* Solo mostrar el ModalHeader si hay un título */}
  {modalTitle && (
    <ModalHeader toggle={toggleModal} className="text-center" style={{ color: 'gray' }}>
      {modalTitle}
    </ModalHeader>
  )}
  <ModalBody>
    {/* Renderiza el componente correspondiente al formulario seleccionado dentro del modal */}
    {renderSelectedForm()}
  </ModalBody>
  <ModalFooter>
    {/* Puedes agregar botones de acción necesarios */}
  </ModalFooter>
</Modal>

      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Crear
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '1', 'Tanque de Agua 2.0')}>
          1. Tanque de Agua 2.0 
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '2', 'Extrusora 2.0')}>
          2. Extrusora 2.0
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '3', 'Cortador Automático')}>
          3. Cortador Automático  
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '4', 'Banda Trasnportadora 2.0')}>
          4. Banda Trasnportadora 2.0
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '5', 'Prensa Hidraulica 2.0')}>
          5. Prensa Hidraulica 2.0
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '6', 'Prensa Hidraulica Mini')}>
          6. Prensa Hidraulica Mini
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '7', 'Mezcladora Mini')}>
          7. Mezcladora Mini
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '8', 'Mezcladora 2.0')}>
          8. Mezcladora 2.0
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '9', 'Tanque de Agua Mini')}>
          9. Tanque de Agua Mini
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '10', 'Prensa Hidraulica Manual')}>
          10. Prensa Hidraulica Manual
        </a>

    

        {/* Agrega más elementos del menú desplegable aquí */}
      </div>
    </div>
  );
};

export default BotonOT;
