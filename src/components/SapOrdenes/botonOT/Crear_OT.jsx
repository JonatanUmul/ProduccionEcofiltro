
import React, { useEffect, useState } from 'react'
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'
import DTHP from '../manodeobraOTP/manoOTP'
import OTBS from '../otproduccion/OTBS'
import LogoEco from '../../utilidades/LogoEco'




const CrearOT = ({ resultado }) => {
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  // const [nombreRol, setNombrerol]=useState('')
  const DocumentNumber= resultado
  // Función para abrir el modal cuando se hace clic en el botón
  const handleOpenModal = () => {
    setModalVisible(true);
  };
  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Función para renderizar el formulario seleccionado según el ID
  let ItemNo = resultado.ItemNo
  const renderSelectedForm = () => {
    
  //   switch (ItemNo) {
  //     case ItemNo="PP500000":
  //       return <DTHP resultadoItem={DocumentNumber}/>
    

      



  //     default:
  //       return <p>Formulario no encontrado</p>;
  //   }
  // };
  
    const itemCodes = [
      "MP100003", "MP100005", "PP500000", "PP500001", "PP500002",
      "PP500100", "PP500101", "PP500200", "PP500201", "PP500202",
      "PP500300", "PP500301", "PP500302", "MP100004", "PP500102",
      "MP100002", "MP100018", "MP100019", "MP100016", "MP100020",
      "MP100021", "MP100027", "MP100028"
    ];
  
    if (itemCodes.includes(ItemNo)) {
      return <DTHP resultadoItem={DocumentNumber} />;
    } else {
      return <p>Formulario no encontrado</p>;
    }
  }
  
  

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
