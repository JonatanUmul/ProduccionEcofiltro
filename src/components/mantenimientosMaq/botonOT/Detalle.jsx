import React, { useState } from 'react'

import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'


import ConsultaMTA from '../consutas/ConsultaMTA'
import ConsultaMEXT from '../consutas/ConsultaMext'
import ConsultaMBT from '../consutas/ConsultaMBT'
import ConsultaMCTA from '../consutas/ConsultaMCTA'
import ConsultaMTAM from '../consutas/ConsultaMTAM'
import ConsultaMM2 from '../consutas/ConsultaMM2'
import ConsultaMMM from '../consutas/ConsultaMMM'
import ConsultaMPH2 from '../consutas/ConsultaMPH2'
import ConsultaMPHM from '../consutas/ConsultaMPHM'
import ConsultaMPM from '../consutas/ConsultaMPM'

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
    
      case 'mta':
        return <ConsultaMTA id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mext':
        return <ConsultaMEXT id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mbt':
        return <ConsultaMBT id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mcta':
        return <ConsultaMCTA id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mtam':
        return <ConsultaMTAM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mm2':
        return <ConsultaMM2 id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mmm':
        return <ConsultaMMM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mph2':
        return <ConsultaMPH2 id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mphm':
        return <ConsultaMPHM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mpm':
        return <ConsultaMPM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
     

        
    

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
    <>
      {/* Botón para abrir el modal */}
      <a type="button"  onClick={handleClick}>
      <i class="bi bi-arrow-bar-right"></i>
      </a>
      {/* Modal */}
      <Modal isOpen={modalVisible} toggle={handleCloseModal} size="lg">
        <ModalHeader toggle={handleCloseModal}>{encabezado } - {EncName}</ModalHeader>
        <ModalBody>
          {/* Renderiza el componente correspondiente al formulario seleccionado dentro del modal */}
          {renderSelectedForm()}
        </ModalBody>
        <ModalFooter>
          {/* Puedes agregar botones de acción necesarios */}
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Detalle;
