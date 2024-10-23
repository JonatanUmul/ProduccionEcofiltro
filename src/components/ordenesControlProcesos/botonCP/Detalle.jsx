import React, {  useState } from 'react'

import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'

import ConsultaDCPB from '../consutas/ConsultaDCPB'
import ConsultaDCPS from '../consutas/ConsultaDCPS'
import ConsultaDRM from '../consutas/ConsultaDRM'
import ConsultaDTT from '../consutas/ConsultaDTT'
import ConsultaDTH from '../consutas/ConsultaDTH'
import ConsultaDCPCD from '../consutas/ConsultaDCPCD'
import ConsultaDCFMP from '../consutas/ConsultaDCFMP'
const Detalle = ({ encabezado, id,EncName, fecha_creacion }) => {
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
    switch (encabezado) {
      case 'cpb':
        return <ConsultaDCPB id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />

      case 'cps':
        return <ConsultaDCPS id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
      

      case 'crm':
        return <ConsultaDRM id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>

      case 'ctt':
        return <ConsultaDTT id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
      
      case 'cth':
          return <ConsultaDTH id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>

     case 'cpcd':
            return <ConsultaDCPCD id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
      
      case 'cfmp':
              return <ConsultaDCFMP id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
        
      default:
        return <p>Formulario no encontrado</p>;
    }
  };

  // Definir una función de manejo de clics
  const handleClick = () => {
    console.log(`Se ha seleccionado la orden de trabajo con ID: ${encabezado}`);
    console.log(`Se ha seleccionado la orden de trabajo con ID: ${id}`);
    // Aquí puedes realizar cualquier acción necesaria con el ID seleccionado
    // Por ejemplo, abrir el modal correspondiente
    handleOpenModal();
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <a type="button"  onClick={handleClick}>
      <i class="bi bi-arrow-bar-right"></i>
      </a>
      {/* Modal */}
      <Modal isOpen={modalVisible} toggle={handleCloseModal} size="xl" backdrop="static">
        <ModalHeader toggle={handleCloseModal}>{encabezado } - {EncName}</ModalHeader>
        <ModalBody>
          {/* Renderiza el componente correspondiente al formulario seleccionado dentro del modal */}
          {renderSelectedForm()}
        </ModalBody>
        <ModalFooter>
          {/* Puedes agregar botones de acción necesarios */}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Detalle;
