
import React, {  useState } from 'react'

import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'
import DetalleOrders from '../otproduccion/DetalleOrders'

// import ConsultaDTHP from './BotonOT'


const Detalle = ({resultado}) => {
  console.log(resultado)
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


  // Función para renderizar el formulario seleccionado según el ID
  const renderSelectedForm = () => {
    // switch (1) {
    //   case 'othp':
        return <DetalleOrders resultado={resultado} />
    //   default:
    //     return <p>Formulario no encontrado</p>;
    // }
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
      Detalle
      </a>
      {/* Modal */}
      <Modal isOpen={modalVisible} toggle={handleCloseModal} size="xl" backdrop="static">
        <ModalHeader toggle={handleCloseModal}></ModalHeader>
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
