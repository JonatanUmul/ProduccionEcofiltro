
import React, {  useState } from 'react'

import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'

import ROTT from '../consultas/ROTT'
import ROTH from '../consultas/ROTH'

const Detalle = ({  id, nombretabla,codigoInicio,codigoFinal,cantidad }) => {

  const [modalVisible, setModalVisible] = useState(false); 



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
      case 'ctt':
        return <ROTT id={id}  nombretabla={nombretabla} codigoInicio={codigoInicio} codigoFinal={codigoFinal} cantidad={cantidad}  />
      case 'cth':
          return <ROTH id={id}  nombretabla={nombretabla}/>
          
     
      default:
        return <p>Formulario no encontrado</p>;
    }
  };

  // Definir una función de manejo de clics
  const handleClick = () => {
    console.log(`Se ha seleccionado la orden de trabajo con ID: ${nombretabla}`);
    console.log(`Se ha seleccionado la orden de trabajo con ID: ${id}`);
    // Aquí puedes realizar cualquier acción necesaria con el ID seleccionado
    // Por ejemplo, abrir el modal correspondiente
    handleOpenModal();
  };

  return (
    <div >
    <a type="button" onClick={handleClick}>
      <i className="bi bi-arrow-bar-right"></i>
    </a>
    <Modal isOpen={modalVisible} toggle={handleCloseModal} size="md" >
      <ModalHeader toggle={handleCloseModal}>{nombretabla}</ModalHeader>
      <ModalBody>{renderSelectedForm()}</ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  </div>
  
  );
}

export default Detalle;
