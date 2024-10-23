import React, { useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';
import CKTA from '../encabezados/CKTA';
import CKEXT from '../encabezados/CKEXT' 
import CKCTA from '../encabezados/CKCTA' 
import CKBT from '../encabezados/CKBT'
import CKPH2 from '../encabezados/CKPH2'
import CKPHM from '../encabezados/CKPHM'
import CKMM from '../encabezados/CKMM'
import CKM2 from '../encabezados/CKM2'
import CKCTAM from '../encabezados/CKCTAM'
import CKPM from '../encabezados/CKPM'

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
        return <CKTA 
        modalTitle={modalTitle}/>;
      case '2':
        return <CKEXT   
        modalTitle={modalTitle}/>;
      case '3':
        return <CKCTA 
        modalTitle={modalTitle}/>;
      case '4':
        return <CKBT 
        modalTitle={modalTitle}/>;    
      case '5':
        return <CKPH2 
        modalTitle={modalTitle}/>;
      case '6':
        return <CKPHM
         modalTitle={modalTitle}/>;
      case '7':
        return <CKMM
         modalTitle={modalTitle}/>;
      case '8':
          return <CKM2
           modalTitle={modalTitle}/>;
      case '9':
         return <CKCTAM
            modalTitle={modalTitle}/>; 
      case '10':
          return <CKPM
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
