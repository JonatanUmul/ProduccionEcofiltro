
import React, { useEffect, useState } from 'react'
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'
import MuestrasBarroLimitesAterberger from '../detallado/MuestrasBarroLimitesAterberger'
import RegistroDeCaminadas from '../detallado/RegistroDeCamionadas'
import RegistroDeSacosDeBarro from '../detallado/RegistroDeSacosDeBarroPulverizado'
import LogoEco from '../../utilidades/LogoEco'
// import OTDMP from '../../../detallado/DOTDMP'
import OTDMP from '../encabezados/MezcladoDeAserrin.jsx'
import OTFM from '../../ordenesTrabajo/encabezados/OTFM.jsx'
import DTFM from '../../ordenesTrabajo/detallado/DTFM.jsx'
import Datos_Aserrin from '../detallado/Datos_Aserrin.jsx'
import DetalleMezcladoAserrin from '../detallado/DetalleMezcladoAserrin.jsx'


const CrearOT = ({ datosApi, encabezados}) => {
  console.log(datosApi, encabezados)
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [nombreRol, setNombrerol]=useState('')
    const encabezado=encabezados ? encabezados : datosApi?.encabezado
console.log('encabezado',encabezado)
  // Función para abrir el modal cuando se hace clic en el botón
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(()=>{setNombrerol( localStorage.getItem('rol'))},[])
  

  // Función para renderizar el formulario seleccionado según el ID
  const renderSelectedForm = () => {
 
    switch (encabezado) {
      case 'muestras':
        return <MuestrasBarroLimitesAterberger datosApi={datosApi} onClose={handleCloseModal}/>
      case 'muestrasAprobados':
        return <RegistroDeCaminadas datosApi={datosApi} onClose={handleCloseModal}/>
      case 'Pulverizado':
         return <RegistroDeSacosDeBarro datosApi={datosApi} onClose={handleCloseModal}/>
      case 'dot_mezclado_aserrin':
          return <OTDMP datosApi={datosApi} onClose={handleCloseModal}/>
      case 'ot_mezclado_aserrin':
          return <DetalleMezcladoAserrin datosApi={datosApi} onClose={handleCloseModal}/>
      case 'Datos_Aserrin':
          return <Datos_Aserrin datosApi={datosApi} onClose={handleCloseModal}/>
      case 'OTFM':
          return <OTFM datosApi={datosApi} onClose={handleCloseModal}/>
      case 'otfm':
          return <DTFM datosApi={datosApi} onClose={handleCloseModal}/>
      
        
  
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
   
        <button type="button" className="btn bt-sm" style={{ width: '60px', fontSize: '0.8rem',  justifyContent: 'center', alignItems:'center', background:'gray', color:'white', border:'none' }} onClick={handleClick}>
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
