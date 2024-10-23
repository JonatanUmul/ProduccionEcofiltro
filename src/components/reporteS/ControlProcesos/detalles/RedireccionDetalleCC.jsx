
import React, {  useState } from 'react'

import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'

import RDTCC from '../consultas/RDTCC'

const Detalle = ({datos,nombretabla }) => {
  const [modalVisible, setModalVisible] = useState(false); 

console.log('nombre tabla',nombretabla)

  // Función para abrir el modal cuando se hace clic en el botón
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal 
  const handleCloseModal = () => {
    setModalVisible(false);
  };

console.log('datos',datos[0].id)

  // Función para renderizar el formulario seleccionado según el ID
  const renderSelectedForm = () => {
    switch (nombretabla) {
      case 'cthh':
          return <RDTCC 
          dats={datos}

  />
          
     
      default:
        return <p>Formulario no encontrado</p>;
    }
  };

  // Definir una función de manejo de clics
  const handleClick = () => {
    // Aquí puedes realizar cualquier acción necesaria con el ID seleccionado
    // Por ejemplo, abrir el modal correspondiente
    handleOpenModal();
  };

  return (
    
    <div className="container-fluid">
    <div className="d-flex justify-content-center align-items-center">
  <a type="button" onClick={handleClick}>
    <i className="bi bi-arrow-bar-right"></i>
  </a>
  <Modal isOpen={modalVisible} toggle={handleCloseModal} >
    <ModalHeader toggle={handleCloseModal}>{nombretabla}</ModalHeader>
    <ModalBody>{renderSelectedForm()}</ModalBody>
    <ModalFooter></ModalFooter>
  </Modal>
  </div>
</div>

  
  );
}

export default Detalle;
