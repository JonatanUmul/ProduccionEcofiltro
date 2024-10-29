
import React, { useEffect, useState } from 'react'
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'
import LogoEco from '../../utilidades/LogoEco'
import OTDMP from '../detallado/DOTDMP'
import OTDMPB from '../detallado/DOTDMPB'

const CrearOT = ({ encabezado, id, fecha_creacion, EncName,existenciaAserrin, existenciaBarro }) => {
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [nombreRol, setNombrerol]=useState('')
console.log('propr recibios', encabezado, id)

  // Función para abrir el modal cuando se hace clic en el botón
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(()=>{setNombrerol( localStorage.getItem('rol'))},[])
  console.log('RolName capturado',nombreRol)
  

  // Función para renderizar el formulario seleccionado según el ID
  const renderSelectedForm = () => {
    switch (encabezado) {
      case 'otdmp':
        return <OTDMP id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}  />

        case 'otdmpb':
          return <OTDMPB id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
  
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
     
    <button disabled={existenciaAserrin!=null || existenciaBarro!=null ? true:false}  type="button" className="btn btn-success bt-sm" style={{ width: '60px', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', alignItems:'center' }} onClick={handleClick}>
     {encabezado=='otdmp' ? 'Aserrin':'Barro'}
   </button>
    
        

      
      {/* Modal */}
      <Modal isOpen={modalVisible} toggle={handleCloseModal} backdrop="static">
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
