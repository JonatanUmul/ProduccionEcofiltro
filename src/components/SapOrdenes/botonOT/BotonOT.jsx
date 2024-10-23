
import React, { useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';
import OTHP from '../encabezados/OTHP';
import OTSA from '../encabezados/OTSA';
import OTCA1 from '../encabezados/OTCA1';
import OTCA2 from '../encabezados/OTCA2';
import OTPV from '../encabezados/OTPV';
import OTFM from '../encabezados/OTFM';
import OTP from '../encabezados/OTP';
import OTHH from '../encabezados/OTHH';
import OTIP from '../encabezados/OTIP'
import OTCC from '../encabezados/OTCC'
// import { useAbility } from '../AbilityContext';


const BotonOT = ({darkMode }) => {
  // const ability = useAbility();
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
  // const puedeGestionar = ability.can('manage', 'BotonOT');


  // Función para renderizar el componente correspondiente al formulario seleccionado
  const renderSelectedForm = () => {
    switch (selectedOption) {
      case '1':
        return <OTHP />;
      case '2':
        return <OTSA />;
      case '3':
        return <OTCA1 />;
      case '4':
        return <OTCA2 />;
      case '5':
        return <OTPV />;
      case '6':
          return <OTFM />;
      case '7':
          return <OTP />;
      case '8':
          return <OTHH />;
      case '9':
          return <OTIP />;
      // case '10':
      //       return <OTCC />;
        
            
      default:
        return null;
    }
  };

  return (
    <div className="dropdown">
      <Modal isOpen={modal} toggle={toggleModal} backdrop="static" collapse={true}>
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
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '1', 'Orden de Trabajo - Humedad en Patio')}>
          1. Humedad en patios 
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '2', 'Orden de Trabajo - Secado de Materia Prima')}>
          2. Secado de materia prima 
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '3', 'Orden de Trabajo - Cernido de Aserrin 1')}>
          3. Cernido de Aserrìn 1 
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '4', 'Orden de Trabajo - Cernido de Aserrin 2')}>
          4. Cernido de Aserrìn 2 
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '5', 'Orden de Trabajo - Pulverizado de Materia Prima')}>
          5. Pulverizado de materia prima 
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '6', 'Orden de Trabajo - Formulacion')}>
          6.Formulación 
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '7', 'Orden de Trabajo - Producción')}>
          7.Producción 
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '8', 'Orden de Trabajo - Hornos')}>
          8.Hornos 
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '9', 'Orden de Trabajo - Impregnación')}>
          9.Impregnación
        </a>
      {/*  <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '10', 'Orden de Trabajo - Control de Calidad')}>
          10.Control de Calidad
        </a>
         */}
     
      </div>
    </div>
  );
};

export default BotonOT;
