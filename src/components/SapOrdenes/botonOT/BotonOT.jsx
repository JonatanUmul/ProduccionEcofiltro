
import React, { useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';
import OTP from '../otproduccion/Otp';
import OTBS from '../otproduccion/OTBS';
import OTAserrinSecoLaUnion from '../otproduccion/OTAserrinSecoLaUnion';
import OTAserrinTamizadoJordan1 from '../otproduccion/OTAserrinTamizadoJordan1'
import OTAserrinTamizadoJordan2 from '../otproduccion/OTAserrinTamizadoJordan2';
import OTAserrinFinolaUnion from '../otproduccion/OTAserrinFinolaUnion';
import OTAserrinFinolaUnion2 from '../otproduccion/OTAserrinFinolaUnion2';
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
        return <OTP/>;
      case '2':
        return <OTBS />;
      case '3':
        return <OTAserrinSecoLaUnion/>;
      case '4':
        return <OTAserrinTamizadoJordan1/>;
      case '5':
        return <OTAserrinTamizadoJordan2/>;
      case '6':
          return <OTAserrinFinolaUnion/>;
     
      case '7':
          return <OTAserrinFinolaUnion2/>;

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
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '1', 'Orden de Trabajo - Producción')}>
          1. Producción
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '2', 'Orden de Trabajo - Barro Seco')}>
          2. Barro Seco
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '3', 'Orden de Trabajo - Aserrin Seco La Union')}>
          3. Aserrin Seco La Union
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '4', 'Orden de Trabajo - Aserrin Tamizado la Union 1')}>
          4. Aserrin Tamizado la Union 1
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '5', 'Orden de Trabajo - Aserrin Tamizado la    2')}>
          4. Aserrin Tamizado la Union 2
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '6', 'Aserrin Fino la Union')}>
          5. Aserrin Fino la Union
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '7', 'Aserrin Fino la Union 2')}>
          8. Aserrin Fino la Union 2
        </a>
      
      
     
      </div>
    </div>
  );
};

export default BotonOT;
