
import React, { useEffect, useState } from 'react'
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'
import DTHP from '../detallado/DTHP'
import DTSASERRIN from '../detallado/DTSASERRIN'
import DTCMP1 from '../detallado/DTCA1'
import DTCA2 from '../detallado/DTCA2'
import DTPV from '../detallado/DTPV'
import DTFM from '../detallado/DTFM'
import DTP from '../detallado/DTP'
import DTHH from '../detallado/DTHH'
import LogoEco from '../../utilidades/LogoEco'
import DTIP from '../detallado/DTIP'
import DTCC from '../detallado/DTCC'



const CrearOT = ({ encabezado, id,EncName, fecha_creacion, codInicio,codFin, horneado }) => {
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
      case 'othp':
        return <DTHP id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />

      case 'otsa':
        return <DTSASERRIN id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
      

      case 'otca1':
        return <DTCMP1 id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>

      case 'otca2':
        return <DTCA2 id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>

      case 'otpv':
          return <DTPV id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
    
      case 'otfm':
          return <DTFM id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
    
      case 'otp':
            return <DTP id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
      
      case 'othh':
            return <DTHH id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
      
      case 'otip':
            return <DTIP id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
        
      case 'cthh':
            return <DTCC id={id} encabezado={encabezado} codInicio={codInicio} codFin={codFin} fecha_creacion={fecha_creacion} horneado={horneado}/>
        
  
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
