
import React, {  useState } from 'react'
import './CssdetalleOTT.css'
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'

import ROTT from '../consultas/ROTT'
import ROTH from '../consultas/ROTH'
import ROTHTablaxCodigos from '../consultas/ROTHTablaxCodigos'

const Detalle = ({  
  id_modelo,
  id_turno,
  id_horno,
  datos,
  id,
  nombretabla,
  codigoInicio,
  codigoFinal,
  cantidad,
  fechaHorneado,
  turnoHorneado,
  turnoHorn,
  hornedo,
  MCrudas,
  LBarro,
  LBaserrin,
  aserradero,
  tipCernido,
  modelo,
  hornn,
  hornero }) => {
 console.log('datos en prueba' ,id_modelo,id_turno,id_horno)
 console.log('datos de prueba', datos)
  const [modalVisible, setModalVisible] = useState(false); 

console.log('verificacndo fecha',turnoHorn)

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
      case 'cthh':
          return <ROTH datos={datos}  id_modelo={id_modelo} id_turno={id_turno} id_horno={id_horno} />
      case 'ROTHTablaxCodigos':
            return <ROTHTablaxCodigos datos={datos}  />
            
     
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
    
    <div className="container-fluid">
    <div className="d-flex justify-content-center align-items-center">
  <a style={{alignItems:'center'}} type="button" onClick={handleClick}>
    <i className="bi bi-arrow-bar-right"></i>
  </a>
  <Modal isOpen={modalVisible} toggle={handleCloseModal} className="responsive-modal" backdrop="static">
    <ModalHeader toggle={handleCloseModal}>{nombretabla}</ModalHeader>
    <ModalBody>{renderSelectedForm()}</ModalBody>
    <ModalFooter></ModalFooter>
  </Modal>
  </div>
</div>

  
  );
}

export default Detalle;
