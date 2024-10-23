import React, { useState } from 'react'
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'
import LogoEco from '../../utilidades/LogoEco'
import DMBT from '../detallado/DMBT'
import DMTA from '../detallado/DMTA'
import DMEXT from '../detallado/DMEXT'
import DMCTA from '../detallado/DMCTA'
import DMTAM from '../detallado/DMTAM'
import DMM2 from '../detallado/DMM2'
import DMMM from '../detallado/DMMM'
import DMPH2 from '../detallado/DMPH2'
import DMPHM from '../detallado/DMPHM'
import DMPM from '../detallado/DMPM'




const CrearOT = ({ encabezado, id,EncName, fecha_creacion }) => {
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

console.log('propr recibios', encabezado, id)

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
      case 'mbt':
        return <DMBT id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mta':
        return <DMTA id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mext':
         return <DMEXT id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mcta':
         return <DMCTA id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mtam':
         return <DMTAM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mm2':
          return <DMM2 id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mmm':
          return <DMMM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mph2':
          return <DMPH2 id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mphm':
          return <DMPHM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'mpm':
          return <DMPM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
          
          
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
      <button type="button" className="btn btn-success btn-sm" style={{ width: '60px' }} onClick={handleClick}>
  OT
</button>

      {/* Modal */}
      <Modal isOpen={modalVisible} toggle={handleCloseModal} size='lg'>
        <ModalHeader toggle={handleCloseModal}>
          <LogoEco/>
        </ModalHeader>
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

export default CrearOT;
