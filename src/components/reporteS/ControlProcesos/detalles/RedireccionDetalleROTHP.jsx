
import React, {  useState } from 'react'

import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'

import ROTHP from '../consultas/ROTHP'


const Detalle = ({patio,nombretabla, fechaSecado, id_patio, cantidad_inicial, cantidad_final, merma, FirmaJefe, NombreJefe }) => {
  const [modalVisible, setModalVisible] = useState(false); 

console.log('nombre tabla',patio)

  // Función para abrir el modal cuando se hace clic en el botón
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal 
  const handleCloseModal = () => {
    setModalVisible(false);
  };



  // Función para renderizar el formulario seleccionado según el ID
  const renderSelectedForm = () => {
    switch (nombretabla) {
      case 'daserrin':
          return <ROTHP 
  nombretabla={nombretabla}
  fechaSecado={fechaSecado}
  id_patio={id_patio} 
   cantidad_inicial={cantidad_inicial}
    cantidad_final={cantidad_final}
     merma={merma}
     patio={patio}
     FirmaJefe={FirmaJefe}
     NombreJefe={NombreJefe}
  />
          
     
      default:
        return <p>Formulario no encontrado</p>;
    }
  };

  // Definir una función de manejo de clics
  const handleClick = () => {
    console.log(`Se ha seleccionado la orden de trabajo con ID: ${nombretabla}`);

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
  <Modal isOpen={modalVisible} toggle={handleCloseModal} className="responsive-modal">
    <ModalHeader toggle={handleCloseModal}>{nombretabla}</ModalHeader>
    <ModalBody>{renderSelectedForm()}</ModalBody>
    <ModalFooter></ModalFooter>
  </Modal>
  </div>
</div>

  
  );
}

export default Detalle;
