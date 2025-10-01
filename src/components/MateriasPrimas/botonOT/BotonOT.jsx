
import React, { useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';
import LoteBarro from '../encabezados/LoteBarro';
import LoteAserrin from '../encabezados/LoteBarro';

// import { useAbility } from '../AbilityContext';


const BotonOT = ({darkMode, materiaPrima }) => {

  // const ability = useAbility();
  const [modal, setModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [materiaPrim, setMateriaPrim ] = useState('')
  const enc_matprima=materiaPrim=='Aserrin'? 2:1
  useEffect(()=>{
    setMateriaPrim(materiaPrima)
  },[materiaPrima])
  
  console.log('materiaPrima',materiaPrim)
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
        return <LoteBarro toggleModal={toggleModal} materiaPrima={materiaPrim} enc_matprima={enc_matprima}/>;
      case '2':
         return <LoteAserrin toggleModal={toggleModal} materiaPrima={materiaPrim} enc_matprima={enc_matprima}/>;  
            
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
    {materiaPrim==='Barro'? 
  <a  className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '1', 'Orden de Trabajo - Camionada de barro')}>
          1. Registrar camionada de barro
        </a>
        : 
        <a disabled className="dropdown-item" href="#" >
          1. Registrar camionada de barro
        </a>}
        
        {materiaPrim==='Aserrin'? 
     <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '1', 'Orden de Trabajo - Camionada de aserrín')}>
          2. Registrar camionada de aserrín
        </a> 
        : <a disabled className="dropdown-item" href="#">
        2. Registrar camionada de aserrín
      </a> }
 
        
      
     
      </div>
    </div>
  );
};

export default BotonOT;
