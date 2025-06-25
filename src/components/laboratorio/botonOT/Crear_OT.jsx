
import React, { useEffect, useState } from 'react'
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'
import LogoEco from '../../utilidades/LogoEco'
import OTDMP from '../detallado/DOTDMP'
import OTDMPB from '../detallado/DOTDMPB'
import DCLiquido from '../detallado/DCLiquido'
import { Color } from 'antd/es/color-picker'
import DCPlastico from '../detallado/DCPlastico'
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
       
        case 'CLiqido':
          return <DCLiquido id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />

        case 'CPlastico':
            return <DCPlastico id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
  

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

  const NameButton=()=>{
    switch (encabezado) {
      case 'otdmp':
        return 'Aserrín'

        case 'otdmpb':
          return 'Barro'
       
        case 'CLiqido':
          return 'Liquido'

        case 'CPlastico':
          return 'Plastico'

      default:
        return <p>Error</p>;
    }

  }
  return (
    <div>
     
     {/* <button disabled={existenciaAserrin!=null || existenciaBarro!=null ? true :false} type="button" className={existenciaAserrin!=null || existenciaBarro!=null ? 'btn' :"btn btn-success bt-sm"} style={{  width: '60px', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', alignItems:'center'  }} onClick={handleClick}>
    {NameButton()}
   </button>  */}
 
 <button  type="button" className={existenciaAserrin!=null || existenciaBarro!=null ? 'btn' :"btn btn-success bt-sm"} style={{  width: '60px', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', alignItems:'center', border:'1px solid black'  }} onClick={handleClick}>
    {NameButton()}
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
