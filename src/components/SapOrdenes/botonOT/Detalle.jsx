
import React, {  useState } from 'react'

import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'


import ConsultaDTHP from './BotonOT'


const Detalle = ({porcentaje,OTDats, encabezado, id,EncName, fecha_creacion }) => {
  const [modalVisible, setModalVisible] = useState(false); 
const[datosdeConsu, setDatosConsu]=useState('')
  // Función para abrir el modal cuando se hace clic en el botón
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal 
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDataLoaded = (respuestaApi) => {
    setDatosConsu(respuestaApi);
  };

console.log('Prueba consulta de',datosdeConsu.id)
  // Función para renderizar el formulario seleccionado según el ID
  const renderSelectedForm = () => {
    switch (encabezado) {
      case 'othp':
        return <ConsultaDTHP id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />



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
    <div>
      {/* Botón para abrir el modal */}
      
      <a type="button"  onClick={handleClick}>
      {porcentaje? <i style={{color:'red'}} class="icon ion-md-attach"></i>:<i class="bi bi-arrow-bar-right"></i> }
      
      </a>
      {/* Modal */}
      <Modal isOpen={modalVisible} toggle={handleCloseModal} size="xl">
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
