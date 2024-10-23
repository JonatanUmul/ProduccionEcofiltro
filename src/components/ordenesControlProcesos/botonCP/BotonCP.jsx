import React, { useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';
import CPS from '../encabezados/CPS';
import CPI from '../encabezados/CPB';
import CRM from '../encabezados/CRM';
import CTT from '../encabezados/CTT';
import CTH from '../encabezados/CTH';
import  CPCD from '../encabezados/CPCD';
import CFMP from '../encabezados/CFMP'


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
        return <CPS />;
    
      case '2':
          return <CPI />;

      case '3':
          return <CRM />
    
      case '4':
          return <CTT />;
      case '5':
            return <CTH />;
      case '6':
             return <CPCD />;
     case '7':
            return <CFMP />;
           

    
      default:
        return null;
    }
  };

  return (
    <div className="dropdown">
      <Modal isOpen={modal} toggle={toggleModal} backdrop="static" collapse={true}  >
        {/* Solo mostrar el ModalHeader si hay un título */}
        {modalTitle && <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>}
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
        Crear OT
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '1', 'Control Pulida Superior')}>
          1. Control Pulida Superior
        </a>
      
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '2', 'Control Pulida Base')}>
          2. Control Pulida Inferior
        </a>

        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '3', 'Reporte de Mermas')}>
          3. Reporte de Mermas
        </a>

        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '4', 'Temperatura Tunel')}>
          4. Temperatura Tunel
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '5', 'Temperatura Hornos')}>
          5. Temperatura Hornos
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '6', 'Calidad Crudos Diaria')}>
        6. Calidad Crudos Diaria
      </a>  
      <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '7', 'Control Producciòn Formulaciòn')}>
        7. Control Formulacion Producciòn
      </a>  

        {/* Agrega más elementos del menú desplegable aquí */}
      </div>
    </div>
  );
};

export default BotonOT;
