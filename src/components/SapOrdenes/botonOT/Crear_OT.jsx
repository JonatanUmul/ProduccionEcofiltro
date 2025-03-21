
import React, { useEffect, useState } from 'react'
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'
import DTHP from '../manodeobraOTP/manoOTP'
import OTBS from '../otproduccion/OTBS'
import LogoEco from '../../utilidades/LogoEco'




const CrearOT = ({ resultado, ItemNo }) => {
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  // const [nombreRol, setNombrerol]=useState('')
const DocumentNumber= resultado
console.log('Resultado en Crear_OT',resultado, ItemNo)
  // Función para abrir el modal cuando se hace clic en el botón
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // useEffect((resultado)=>{
  //   cas
  // },[resultado])
  // useEffect(()=>{setNombrerol( localStorage.getItem('rol'))},[])
  // console.log('RolName capturado',nombreRol)

  // Función para renderizar el formulario seleccionado según el ID
  const renderSelectedForm = () => {
    switch (ItemNo) {
      case ItemNo="PP500000":
        return <DTHP resultadoItem={DocumentNumber}/>
      case ItemNo="MP100002":
          return <OTBS resultadoItem={DocumentNumber}/>
  

      default:
        return <p>Formulario no encontrado</p>;
    }
  };

  // Definir una función de manejo de clics
  const handleClick = () => {
 
    handleOpenModal();
  };

  return (
    <div>
   
        <button type="button" className="btn btn-success bt-sm" style={{ width: '60px', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', alignItems:'center' }} onClick={handleClick}>
        OT
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
