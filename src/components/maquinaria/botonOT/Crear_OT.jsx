import React, { useEffect, useState } from 'react'
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'
import DCKBT from '../detallado/DCKBT'
import DCKTA from '../detallado/DCKTA'
import DCKEXT from '../detallado/DCKEXT'
import DCKCTA from '../detallado/DCKCTA'
import LogoEco from '../../utilidades/LogoEco'
import DCKCTAM from '../detallado/DCKCTAM'
import DCKCM2 from '../detallado/DCKM2'
import DCKMM from '../detallado/DCKMM'
import DCKPH2 from '../detallado/DCKPH2'
import DCKPHM from '../detallado/DCKPHM'
import DCKPM from '../detallado/DCKPM'

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
      case 'ckbt':
        return <DCKBT id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'ckta':
        return <DCKTA id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'ckext':
         return <DCKEXT id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'ckcta':
         return <DCKCTA id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'ckctam':
         return <DCKCTAM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'ckm2':
          return <DCKCM2 id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'ckmm':
          return <DCKMM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'ckph2':
          return <DCKPH2 id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'ckphm':
          return <DCKPHM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'ckpm':
          return <DCKPM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
          
  
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
    </div>
  );
}

export default CrearOT;
