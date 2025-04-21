
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
import Horneados from '../otproduccion/Horneados';
import OTAserrinPinoTamizado from '../otproduccion/OTAserrinPinoTamizado';
import OTAserrinPinoGrueso from '../otproduccion/OTAserrinPinoGrueso';
import ControlCalidad from '../otproduccion/ControlCalidad'
import Impregnacion from '../otproduccion/Impregnacion'
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
        return <OTP onClose={toggleModal}/>;
      case '2':
        return <OTBS onClose={toggleModal}/>;
      case '3':
        return <OTAserrinSecoLaUnion onClose={toggleModal}/>;
      case '4':
        return <OTAserrinTamizadoJordan1 onClose={toggleModal}/>;
      case '5':
        return <OTAserrinTamizadoJordan2 onClose={toggleModal}/>;
      case '6':
          return <OTAserrinFinolaUnion onClose={toggleModal}/>;
      case '7':
          return <OTAserrinFinolaUnion2 onClose={toggleModal}/>;
      case '8':
          return <OTAserrinPinoTamizado onClose={toggleModal}/>
      case '9':
          return <OTAserrinPinoGrueso onClose={toggleModal}/>
      case '10':
          return <Horneados onClose={toggleModal}/>
      case '11':
            return <ControlCalidad onClose={toggleModal}/>
      case '12':
            return <Impregnacion onClose={toggleModal} />

      default:
        return null;
    }
  };

  return (
    <div className="dropdown">
      <Modal isOpen={modal} toggle={toggleModal} backdrop="static" collapse={true}>
   
        {modalTitle && <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>}
        <ModalBody>
        
          {renderSelectedForm()}
        </ModalBody>
        <ModalFooter>

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
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '3', 'Orden de Trabajo - Aserrín Seco La Union')}>
          3. Aserrín Seco La Union
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '4', 'Orden de Trabajo - Aserrín Tamizado la Union 1')}>
          4. Aserrín Tamizado la Union 1
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '5', 'Orden de Trabajo - Aserrín Tamizado la Union 2')}>
          5. Aserrín Tamizado la Union 2
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '6', 'Aserrín Fino la Union')}>
          6. Aserrín Fino la Union
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '7', 'Aserrín Fino la Union 2')}>
          7. Aserrin Fino la Union 2
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '8', 'Aserrín Pino Tamizado')}>
          8. Aserrín Pino Tamizado
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '9', 'Aserrín Pino Grueso')}>
          9. Aserrín Pino Grueso
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '10', 'Horneados')}>
          10. Horneados
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '11', 'Control de Calidad')}>
          11. Control de Calidad
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '12', 'Impregnación')}>
          12. Impregnación
        </a>
       
      
     
      </div>
    </div>
  );
};

export default BotonOT;
